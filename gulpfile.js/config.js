module.exports = {
    localServerProjectPath: './wwwroot',
    files: {
        js: [
            'javascript/**/*.js',
            'javascript/*.js'
        ]
    },
    fileOrder: {
        js: [
            'javascript/system/environment.js',
            'javascript/widget/FeedbackWidget.js',
            'javascript/game/model/GameModel.js',
            'javascript/game/model/PlayerModel.js',
            'javascript/game/game.js',
            'javascript/game/game.reversi.js',
            'javascript/game/game.model.js',
            'javascript/game/game.data.js',
            'javascript/app.js',
        ]
    },
    firstname: 'Koen'
};