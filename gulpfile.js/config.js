module.exports = {
    localServerProjectPath: 'E:\\Development\\C#\\WebDev\\ReversiMvc\\ReversiMvc\\wwwroot',
    files: {
        js: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'src/javascript/**/*.js',
            'src/javascript/*.js'
        ],
        css: [
            'src/css/app.scss'
        ],
        icons: [
            'src/icons/**/*'
        ],
        templates: [
            'src/templates/*.hbs'
        ],
        handlebars: [
            'src/lib/handlebars.js'
        ],
    },
  fileOrder: {
    js: [
        'node_modules/jquery/dist/*.js',
        'node_modules/bootstrap/dist/js/*.js',
        'src/javascript/system/environment.js',
        'src/javascript/widget/FeedbackWidget.js',
        'src/javascript/widget/GameBoardWidget.js',
        'src/javascript/weather/weather.js',
        'src/javascript/game/model/GameModel.js',
        'src/javascript/game/model/PlayerModel.js',
        'src/javascript/game/game.js',
        'src/javascript/game/game.reversi.js',
        'src/javascript/game/game.stats.js',
        'src/javascript/game/game.data.js',
        'src/javascript/app.js'
    ],
    css: [
        'src/css/app.scss'
    ]
  }
}
