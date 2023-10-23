'use strict'
const tmpl = require('./build-tmpl-com');
const argv = require('argv');
const live = {
  init() {
    tmpl.initCMS();
    for (const s in process.argv) {
      if (RegExp('^assets/.+/(' + tmpl.cms_en.join('|') + ')').test(process.argv[s])) {
        this.read = process.argv[s]
        this.file = process.argv[s].extParse()
        this.running = __filename.extParse().name + '\n -> ' + process.argv[s]
        return this.read
      }
    }
  },
}

if (live.init()) {
  console.time(live.running)
  if (live.file.ext === 'scss') tmpl.xCSS(live.read)
  if (live.file.ext === 'ejs') tmpl.xEJS(live.read, true)
  if (live.file.ext === 'ejs.js')
    tmpl.xEJS(live.read.substring(0, live.read.lastIndexOf('.')), true)
  if (
    live.file.ext === 'html' ||
    live.file.ext === 'md' ||
    live.file.ext === 'txt'
  ) {
    tmpl.xPass(live.read, true)
  }
  tmpl.xPreviewStyles(tmpl.cms.preview.styles,1)
  console.timeEnd(live.running)
}

