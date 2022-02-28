const config = require('./config');
const js = require('./tasks/dist').dist(config.localServerProjectPath, config.files.js, config.fileOrder.js);
js.displayName = 'js';

const hello = function (done) {
    console.log(`Groeten van ${config.firstname}!`)
    done();
}


exports.default = hello;
exports.js = js;