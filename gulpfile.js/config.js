module.exports = {
  localServerProjectPath: './wwwroot',
  files: {
    js: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'src/javascript/**/*.js',
      'src/javascript/*.js'
    ],
    css: [
      'src/css/app.scss'
    ]
  },
  fileOrder: {
    js: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'src/javascript/system/environment.js',
      'src/javascript/widget/FeedbackWidget.js',
      'src/javascript/game/model/GameModel.js',
      'src/javascript/game/model/PlayerModel.js',
      'src/javascript/game/game.js',
      'src/javascript/game/game.reversi.js',
      'src/javascript/game/game.model.js',
      'src/javascript/game/game.data.js',
      'src/javascript/app.js'
    ],
    css: [
        'src/css/app.scss'
    ]
  }
}
