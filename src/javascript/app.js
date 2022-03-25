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
