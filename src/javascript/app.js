function randomId (length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function generateScaleFunction (prevMin, prevMax, newMin, newMax) {
    const offset = newMin - prevMin,
        scale = (newMax - newMin) / (prevMax - prevMin);

    return function (x) {
        return offset + scale * x;
    };
}

const config = {
    'apiUrl': {
        'game': 'https://nr3353.hbo-ict.org/api/Game',
        'score': 'https://nr3353.hbo-ict.org/api/GameScore'
    },
};

$(document).ready(function () {
    Env.init(Environments.production);
    Game.init(config.apiUrl.game, config.apiUrl.score);

    Weather.init('#reversi-weather');
});
