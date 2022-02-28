const config = require('./config');
const dist = require('./tasks/dist').dist(config.localServerProjectPath, config.files.js, config.fileOrder.js);

// The name of the task. This is name is also used for running the task, for example 'gulp js'.
dist.displayName = 'js';

const hello = function (done) {
    console.log(`Groeten van ${config.firstname}!`)
    done();
}


exports.default = hello;
exports.dist = dist;