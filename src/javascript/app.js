function randomId (length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

$(document).ready(function () {
    Env.init(Environments.production);
    Game.init(preGameInit);

    /**
     * Runs before initializing the game.
     */
    function preGameInit () {
        Game.Data.init();
        Game.Model.init();
        Game.Reversi.init();
    }
});
