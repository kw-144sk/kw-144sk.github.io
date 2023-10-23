'use strict'
const glob = require('glob')
const tmpl = require('./build-tmpl-com')
const mat = 'scss|tmpl'
const cplMess = 'Templates Building'

glob(
  `assets/+(${mat})/**/*.*`,
  {
    ignore: tmpl.initCMS([
      // `**/+(_**|etc)/**`,
      `**/_**/**`,
      `**/etc/**`
    ]),
  },
  (_, files) => {
    console.time(cplMess)
    let second = []
    for (const fn of files) {
      const ext = tmpl.ext(fn, '.')
      if (ext === 'scss') {
        tmpl.xCSS(fn)
      } else {
        second.push(fn)
      }
    }
    for (const fn of second) {
      const ext = tmpl.ext(fn, '.')
      if (ext === 'html') tmpl.xPass(fn)
      if (ext === 'ejs') tmpl.xEJS(fn)
    }
    console.timeEnd(cplMess)
  }
)

