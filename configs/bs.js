'use strict'
const glob = require('glob')
const bs = require('browser-sync')
const build = require('../tmpl-build.json')
const base_ops = {
  // host: "localhost",
  watch: true,
  open: false,
  logLevel: "silent"
}
let base_port = 5000
if (build.output === false) process.exit()
const preview = (build.preview && typeof build.preview.file === 'string') ? '/preview/' : '';
const serv_ops = Object.assign(
  base_ops,
  {
    server: `${process.cwd() + preview}`,
    port: base_port,
    reloadDelay: 100,
    ui: { port: base_port + 1 }
  }
)
bs.create().init(serv_ops)
console.log({ PreviewServer: `http:://localhost:${serv_ops.port}` })
base_port += 1000
