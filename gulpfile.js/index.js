const config = require('./config')
const distJavascript = require('./tasks/dist').distJavascript(config.localServerProjectPath, config.files.js, config.fileOrder.js)
const distCss = require('./tasks/dist').distCss(config.localServerProjectPath, config.files.css, config.fileOrder.css)

// The name of the task. This is name is also used for running the task, for example 'gulp js'.
distJavascript.displayName = 'js'
distCss.displayName = 'css'

exports.distJavascript = distJavascript
exports.distCss = distCss
