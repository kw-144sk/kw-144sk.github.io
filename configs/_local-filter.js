'use strict'
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const Filters = {
  addProcess: (file, name) => {
    if (typeof file === 'string' && typeof name === 'string') {
      process[name] = file
    }
  },
  getPrototypeName: (data) => {
    if (data === null) {
      return 'Null'
    }
    if (!data) {
      return (d => d.charAt(0).toUpperCase() + d.slice(1))(typeof data)
    }
    return Object.getPrototypeOf(data).constructor.name
  },
  string: {
    extParse() {
      const r = path.parse(this)
      return {
        ...r,
        ext: r.base.substring(r.base.indexOf('.')).substring(1),
        name: r.base.substring(0, r.base.indexOf('.'))
      }
    },
    typeName() {
      return Filters.getPrototypeName(this)
    },
    removeWspace() {
      return this
        .replace(/\s{2}/g, ' ')
        .replace(/[\n|\r|\n\r]/g, ' ')
    },
    KANAzenFilter() {
      const r = str => {
        var kanaMap = { 'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ', 'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ', 'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド', 'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ', 'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ', 'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ', 'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ', 'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ', 'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ', 'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト', 'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ', 'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ', 'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ', 'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ', 'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ', 'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン', 'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ', 'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ', '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・' }
        var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
        return str.replace(reg, match => kanaMap[match]).replace(/ﾞ/g, '゛').replace(/ﾟ/g, '゜');
      }
      return r(this)
    },
    AttrJSON() {
      const jsontx = ('{' + this.trim().replace(/['|"]/g, '').replace(/([\w\-_]+)/g, '"$1"') + '}')
        .replace(/\s/g, ',')
        .replace(/=/g, ':')
      return JSON.parse(jsontx)
    }
  },
  array: {
    typeName() {
      return Filters.getPrototypeName(this)
    },
    extInt() {
      return this.filter(v => typeof v === 'number' && v && v % 1 === 0)
    },
    args() {
      let r = {}
      for (const d of this) {
        r[Filters.getPrototypeName(d)] = d
      }
      return r
    }
  }
}

module.exports = Filters
