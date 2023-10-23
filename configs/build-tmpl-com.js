'use strict'
const LocalFilter = require('./_local-filter')
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
// const csv = require('csv-parse/lib/sync')
const makeDir = require('make-dir')
const ejs = require('ejs')
const sass = require('sass')
const postcss = require('postcss')
const postcssGapProperties = require('postcss-gap-properties')
const autoprefixer = require('autoprefixer')
const axios = require('axios')
const UglifyJS = require("uglify-js")
const Root = process.cwd()
const EJSfilter = {
  errCommonFilter: (d) => {
    console.log(
      {
        mess:
          '(Pass) any:'.replace('any', process.filter_file || ''),
        input: {
          data: d.data,
          runas: d.runas,
          script: d.data.script[d.runas]
        }
      }
    )
  },
  string: {
    repFWword(data) {
      const regex = /\[\[__([\w_-]+)__\]\]/g
      return (data && LocalFilter.getPrototypeName(data) === 'Object') ? this.replace(regex, (_, word) => data[word]) : this
    },
    repSentence(data) {
      return (s => {
        if (LocalFilter.getPrototypeName(data) === 'Array') {
          for (const c of data) {
            if (c.name) {
              s = s.replace(new RegExp(c.from, 'g'), c.to)
            }
          }
        }
        return s
      })(this)
    },
    repTemplate(data) {
      return this.replace(
        /<ejs-template([^<>]*?)>([\s\S]*?)<\/ejs-template>/g,
        (_, attr, template) => {
          const runas = attr.AttrJSON().script
          if (runas !== undefined) {
            return (data && runas && data.script[runas]) ?
              data.script[runas](
                [
                  data.pagedata,
                  template.removeWspace().replace(/> </g, '><').trim().split(/<hr[^<>]+type="template-slit"[^><]*>/)
                ].args()
              )
              :
              EJSfilter.errCommonFilter({ data, runas })
          }
          return ''
        }
      )
    },
    EJScommonFilter(data = false) {
      return (s => {
        if (typeof s === 'string') {
          s = s
            .repTemplate(data)
            .replace(/\<\/\{[^>]*\>/g, '')
            .replace(/\<\{ \//g, '<{/')
        }
        return s
      })(this)
    },
    EJSpreviewFilter(data) {
      return (s => {
        if (typeof s === 'string') {
          s = s
            .repSentence(data.testcase)
            .replace('[[[__preview_styleset__]]]', '')
            .replace(/<{(.+)}>/g, (_, y) => {
              if (y[0] === ('$')) {
                return y
              }
              if (y[0] === ('*')) {
                return '<!-- ' + y + ' -->'
              }
              return ''
            })
        }
        return s
      })(this)
    },
    TerminalFilter(o) {
      return (s => {
        if (typeof s === 'string') {
          s = s.repSentence(o)
        }
        return s
      })(this)
    }
  },
}

String.prototype.__proto__ = { ...LocalFilter.string, ...EJSfilter.string }
Array.prototype.__proto__ = { ...LocalFilter.array, ...EJSfilter.array }

module.exports = {
  Default: { 'output': true, 'preview': false, 'throw_assets': undefined, 'subdir_css': undefined, 'subdir_html': undefined },
  buildJson: `${Root}/tmpl-build.json`,
  assetSrc: `${Root}/assets/media/img/`,
  Dist: `${Root}/docs/`,
  previewDist: 'preview',
  previewSrc: 'assets/ejs/_parts/_preview.ejs',
  complete: 0,
  ext(s, deli) {
    return s.slice(s.lastIndexOf(deli) + 1)
  },
  match(s, deli) {
    return !!(s.indexOf(deli) + 1)
  },
  initCMS(ign = []) {
    try {
      this.cms = this.readECsetting()
      if (!this.cms) {
        throw ['initCMS() --> build abort']
      }
      return this.setupCMS(ign)
    } catch (e) {
      console.error(e)
      return `**`
    }
  },
  setupCMS(ign) {
    this.cms_en = []
    // for (const cname in this.cms) {
    // // output CMS setting
    // if (this.cms[cname].output) {
    //   this.cms_en.push(cname)
    // } else {
    //   ign.push(`**/${cname}/**`)
    //   continue
    // }

    // set EC pagedata
    this.embadPagedata()

    // copy assets
    if (this.cms.throw_assets) {
      let dist
      const CnR = (pp) => pp.replace('[cname]', 'github')
      if (typeof this.cms.throw_assets === 'string') {
        dist = CnR(this.Dist) + this.cms.throw_assets.split('/').pop()
      }
      if (typeof this.cms.throw_assets === 'boolean') {
        dist = CnR(this.Dist) + 'assets'
      }
      if (dist) fse.copySync(CnR(this.assetSrc), dist)
    }
    // }
    return ign
  },
  embadPagedata(cname) {
    if (typeof this.cms.pagedata === 'undefined') this.cms.pagedata = {}
    // if (!this.cms.pagedata.stores && fs.existsSync('assets/db/' + cname + '.csv')) {
    //   this.cms.pagedata.stores = csv(
    //     fs.readFileSync('assets/db/' + cname + '.csv'),
    //     {
    //       columns: true,
    //       on_record: (r) => {
    //         r.id = Number(r.id)
    //         r.region_code = (r.postal_code) ? Number(RegExp('[0-9]+').exec(r.postal_code)) : -1
    //         r.postal_code_p = (r.postal_code) ? (RegExp('[0-9\-]+').exec(r.postal_code)) : '999-9999'
    //         r.store_type = r.store_type.split(/[,|]/).filter(Boolean)
    //         r.phone = r.phone.split(/[,|]/).filter(Boolean)
    //         r.start_date = (r.start_date) ? Number(r.start_date) : 1
    //         r.end_date = (r.end_date) ? Number(r.end_date) : 1
    //         r.active = Boolean(Number(r.active))
    //         Object.keys(r).forEach(function (k) {
    //           if (typeof r[k] === 'string' && r[k][0] === '#') r[k] = ''
    //         })
    //         return r
    //       }
    //     }
    //   )
    // }
  },
  readECsetting() {
    const s = this.getJSON(this['buildJson'])
    // for (const c in s) {
    //   s[c] = { ...this.Default, ...s[c] }
    // }
    return s
  },
  getJSON(path) {
    try {
      return JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (err) {
      // console.error(['getJSON() FilePath Error :: Check for arg 1'])
      return false
    }
  },
  genFilePath(o, data) {
    makeDir.sync(o.dp)
    fs.writeFile(path.format({ dir: o.dp, name: o.basename, ext: '.' + o.format }), data, _ => { this.complete++ })

  },
  setDployPoint(o) {
    const settype = typeof o.subdir
    // if (o.path.indexOf(o.cn + '/') >= 0) {
    if (settype === 'string') {
      o.dp += `/${o.subdir}`
    }
    if (settype === 'boolean' && o.subdir) {
      o.dp += path.dirname(o.path.replace(/assets\/[^/\s]+\//, ''))
    }
    // }
    return o.dp
  },
  outputFile(filepath, format, code) {
    const ops = {
      chkOpo: function (w) {
        return (w.indexOf(this.name) > -1) || (!(w.lastIndexOf('.') + 1) && w.indexOf(this.basename) > -1)
      },
      path: filepath,
      basename: path.basename(filepath, `.${this.ext(filepath, '.')}`),
      name: this.ext(filepath, '/'),
      type: this.ext(filepath, '.'),
      format: format
    }
    const Output = _ => this.genFilePath(ops, code.TerminalFilter(this.cms.exchange))

    // for (ops.cn of this.cms_en) {
    ops.dp = this.Dist.replace('[cname]', 'github')

    //   // CSS subDir option
    if (format === 'css') {
      ops.subdir = this.cms.subdir_css
      this.setDployPoint(ops)
    }

    //   // HTML Preview & subDir option
    if (format === 'html') {
      if (this.cms.preview.file === ops.name) this.xPreview('github', code)
      ops.subdir = this.cms.subdir_html
      this.setDployPoint(ops)
    }

    //   // file output
    Output()

    //   // option output
    //   if (typeof this.cms.output === 'object') {
    //     for (const oc of this.cms.output) {
    //       if (typeof oc === 'string' && ops.chkOpo(oc)) Output()
    //       if (typeof oc === 'object') {
    //         for ([ops.basename, ops.ref] of Object.entries(oc)) {
    //           if (ops.chkOpo(ops.ref)) Output()
    //         }
    //       }
    //     }
    //   }
    // }
  },
  xPreviewStyles(styles = this.cms.preview.styles, finaly = false, cicle = 0) {
    if (finaly && this.complete < finaly) {
      setTimeout(_ => {
        if (cicle < 99) {
          cicle++
          this.xPreviewStyles(styles, finaly, cicle)
        } else {
          console.error('xPreviewStyles(): Over Cicle 100 ProcessAbort...')
          process.exit()
        }
      }, 100)
    } else {
      let code = ''
      if (LocalFilter.getPrototypeName(styles) === 'Array') {
        styles.forEach(e => {
          fs.copyFileSync(e, [this.previewDist, path.basename(e)].join('/'))
          code += '<link rel="stylesheet" href="' + path.basename(e) + '">'
        })
      }
      return code
    }
  },
  xPreview(cn, p) {
    ejs.renderFile(
      this.previewSrc,
      {
        rmWhitespace: true,
        pageData: {
          template: p
        },
      },
      (err, code) => {
        try {
          (async set => {
            if (LocalFilter.getPrototypeName(set.testcase) === 'Array') {
              for (const ex of set.testcase) {
                if (ex.name) {
                  const sd = await axios
                    .get(ex.from, { validateStatus: status => status === 200, timeout: 5 * 1000 })
                    .then(r => !!r).catch(_ => false)
                  ex.name = sd && ex.name
                }
              }
            }

            code = code.replace('</head>', this.xPreviewStyles() + '\n</head>')

            this.genFilePath(
              { dp: this.previewDist, basename: 'index', format: 'html' },
              code.EJSpreviewFilter(set)
            )
          })({
            subdir_css: this.cms.subdir_css,
            cms: 'github',
            ...this.cms.preview
          })
        } catch (_e) {
          console.error({ err, _e })
          return
        }
      }
    )
  },
  xPass(f, lv = false) {
    // for (const cn of this.cms_en) {
    //   if (this.match(f, cn)) {
    const dp = this.setDployPoint({
      path: f,
      dp: this.Dist.replace('[cname]', 'github'),
      cn: 'github',
      subdir: this.cms.subdir_html
    })
    makeDir.sync(dp)
    fs.copyFileSync(f, path.resolve(dp, this.ext(f, '/')).replace('[cname]', 'github'))
    if (lv && typeof this.cms.preview === 'object') this.xPreview('github', fs.readFileSync(f, 'utf-8'))
    //   }
    // }
  },
  xEJS(f, lv = false) {
    const pd = { pagedata: {} }
    const filePageData = (f) => {
      // for (const cn of this.cms_en) {
      //   if (this.match(f, cn)) {
      if (lv && typeof this.cms.preview === 'object') this.cms.preview.file = this.ext(f, '/')
      pd.script = (fs.existsSync(f + '.js')) ? require(Root + '/' + f + '.js') : {}
      pd.pagedata = {
        minifyJs: UglifyJS,
        stores: (pd.script.pagedata) ? this.cms[cn].pagedata.stores : undefined
      }
      return pd
      //   }
      // }
    }
    ejs.renderFile(
      path.resolve(f),
      {
        rmWhitespace: true,
        pageData: filePageData(f)
      },
      (err, code) => {
        try {
          LocalFilter.addProcess(f, 'filter_file');
          this.outputFile(f, 'html', code.EJScommonFilter(pd))
        } catch (_e) {
          console.error({ err, _e })
          return
        }
      }
    )
  },
  xCSS(f) {
    const cssBuff = sass.renderSync({ file: path.resolve(f), outputStyle: "compressed" }).css
    const posted = postcss([autoprefixer({ remove: false }), postcssGapProperties]).process(cssBuff, { from: undefined }).css
    this.outputFile(f, 'css', posted)
  }
}
