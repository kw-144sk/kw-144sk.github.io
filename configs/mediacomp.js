'use strict'
const LocalFilter = require('./_local-filter')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const glob = require('glob')
const makeDir = require('make-dir')
const argv = require('argv')
const MediaComp = {
  opsArgv: [
    {
      name: 'input',
      short: 'i',
      type: 'path',
      description: '変換ファイルの単一指定、入力ファイルと同じ場所に出力されます。--dirオプションが指定されてる場合は--dirオプションが優先されます',
      example: "'mediacomp -i pj-root/filepath' or 'mediacomp --input=pj-root/filepath'",
      error: "ファイルを確認できませんでした"
    },
    {
      name: 'dir',
      short: 'd',
      type: 'path',
      description: '作業ディレクトリ指定、サブフォルダは無視します。--inputオプションが同時に指定されてる場合--inputオプションを無効化します',
      example: "'mediacomp -d pj-root/dirpath' or 'mediacomp --dir=pj-root/dirpath'",
      error: "ディレクトリを確認できませんでした"
    },
    {
      name: 'sizes',
      short: 'z',
      type: 'csv,int',
      description: '入力された画像の長辺解像度を参考に複数指定された解像度毎にリサイズし圧縮します。同時に--sizecompオプションが有効である必要があります。入力解像度を超える変換は実行されず、縦横比を維持します。',
      example: "'mediacomp -z 3840,2880,1920,1600,1440,960' or 'mediacomp --sizes=3840,2880,1920,1600,1440,960'",
      error: "無効な設定値です。半角数字で入力、複数指定はカンマで区切ります"
    },
    {
      name: 'subname',
      short: 's',
      type: 'string',
      description: '圧縮後ファイルに添加されるサブ拡張子及びサブフォルダの名前として使用されます。--sizecompオプションが有効の場合、そちらの解像度数値が--subnameとして使用されます。デフォルト値: cmp',
      example: "'mediacomp -s subdir' or 'mediacomp --subname=subdir'",
      error: "無効な設定値です。半角英数のみ入力してください、それ以外の文字は無視されます"
    },
    {
      name: 'sizecomp',
      short: 'c',
      type: 'boolean',
      description: '--sizesオプションで指定された解像度毎に圧縮を実行するか選択します。無効(false)の場合、入力された画像解像度のまま圧縮・出力します。デフォルト値: true',
      example: "'mediacomp -c false(0)' or 'mediacomp --sizecomp=false(0)'",
      error: "無効な設定値です。boolean型で入力してください。"
    },
    {
      name: 'withname',
      short: 'n',
      type: 'boolean',
      description: '圧縮後ファイルにサブ拡張子を追加する（true）かサブフォルダを作成して格納する（false）かを選択します。デフォルト値: true',
      example: "'mediacomp -n false(0)' or 'mediacomp --withname=false(0)'",
      error: "無効な設定値です。boolean型で入力してください。"
    },
    {
      name: 'webp',
      short: 'w',
      type: 'boolean',
      description: 'webpファイルでの圧縮を実行するか選択します。入力された画像形式と並行して圧縮され同じ場所へ出力されます。デフォルト値: false',
      example: "'mediacomp -w true(1)' or 'mediacomp --webp=true(1)'",
      error: "無効な設定値です。boolean型で入力してください。"
    }
  ],
  extractArgv() {
    const onset = function (args) {
      try {
        if (this.type.name === 'path' && !fs.existsSync(args.options[this.name])) {
          throw {
            option: `--${this.name}, -${this.short}`,
            input: args.options[this.name].toString(),
            err_desc: this.error
          }
        }
      } catch (error) {
        console.error(error, '---- Process Abort.')
        process.exit()
      }
      return false
    }

    for (const o of this.opsArgv) {
      argv.option({ ...o, onset })
    }
    return argv.run().options
  },
  init(glob_pattern = '') {
    const opSet = this.extractArgv()
    const baseset = {
      dir: 'assets/media',
      subname: 'cmp',
      sizes: [3840, 2880, 1920, 1600, 1440, 960]
    }
    this.set = {
      dir: opSet.dir || baseset.dir,
      subname: (opSet.subname || baseset.subname).replace(/[^a-zA-Z0-9]+/g, ''),
      sizes: (opSet.sizes || baseset.sizes).extInt(),
      sizecomp: (() => opSet.sizecomp === false ? false : true)(),
      withname: (() => opSet.withname === false ? false : true)(),
      webp: !!opSet.webp
    }
    if (opSet.dir) {
      delete opSet.input
    }
    if (opSet.input) {
      this.set.dir = path.dirname(opSet.input)
    }
    return ((opSet.dir || opSet.input) || this.set.dir) + (opSet.input ? '' : glob_pattern)
  },
  initDir() {
    if (!this.set.withname && Array.isArray(this.set.sizes)) {
      const subname = (this.set.sizecomp) ? this.set.sizes : [this.set.subname]
      for (const subdir of subname) {
        makeDir(this.set.dir + '/' + subdir)
      }
    }
  },
  initFile() {
    this.set.filename = path.basename(this.set.filepath)
    return { ...this.set }
  },
  subDist(...args) {
    const typearg = args.args()
    const op = typearg.Object || undefined
    const subname = typearg.Number || typearg.String
    return op.withname ?
      op.filepath.replace(op.filename, op.filename.replace(/\.(\w+)$/, `.${subname}.$1`)) :
      op.filepath.replace(op.filename, subname + '/' + op.filename)
  },
  output(...args) {
    const typearg = args.args()
    const info = typearg.Object || undefined
    const setsize = typearg.Number || this.set.subname
    const dp = this.subDist(info, setsize)
    const dpWebp = dp.replace(/\.\w+\.\w+$/, a => a.replace('.' + setsize, e => (this.set.withname && typearg.Number) ? e : '')).replace(/\.\w+$/, '.webp')

    if (info.format === 'png')
      sharp(typearg.Buffer).png({ compressionLevel: 9 }).toFile(dp, _ => { })
    if (info.format === 'jpeg')
      sharp(typearg.Buffer).jpeg({ quality: 95, mozjpeg: true }).toFile(dp, _ => { })
    if (!!this.set.webp && !fs.existsSync(`${dpWebp}`))
      sharp(typearg.Buffer).webp({ quality: 85 }).toFile(`${dpWebp}`, _ => { })
  },
  Comp() {
    const sets = this.initFile()
    const mediafile = sharp(this.set.filepath)

    if (sets.sizecomp && Array.isArray(sets.sizes)) {
      for (const sized of sets.sizes) {
        mediafile.metadata().then(meta => {
          if (sized <= meta.width || sized <= meta.height) {
            mediafile.rotate().resize(sized, sized, { fit: 'inside' }).toBuffer((e, data, info) => {
              try {
                if (e) { throw { e, file: sets.filepath } }
                this.output(data, { format: info.format, ...sets }, sized)
              } catch (err) {
                console.error(err)
              }
            })
          }
        })
      }
    } else {
      mediafile.rotate().toBuffer(
        (e, data, info) => {
          try {
            if (e) { throw { e, file: sets.filepath } }
            this.output(data, { format: info.format, ...sets })
          } catch (err) {
            console.error(err)
          }
        }
      )
    }
  },
}

Array.prototype.__proto__ = LocalFilter.array

glob(
  MediaComp.init(`/*.+(png|jpg|jpeg)`),
  {
    nocase: true,
    ignore:
      [
        `**/+(_**).*`,
        `**/*.+(${MediaComp.set.subname}|[0-9]).*`
      ]
  },
  (_, files) => {
    if (!!files.length) MediaComp.initDir()
    for (MediaComp.set.filepath of files) {
      MediaComp.Comp()
    }
  }
)

