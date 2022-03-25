$(document).ready(function () {
    Env.init(Environments.production);
    Game.init(afterGameInit);

    /**
     * Runs after initializing the game.
     */
    function afterGameInit () {
        Game.Data.init();
        Game.Model.init();
        Game.Reversi.init();

        const gameToken = Game.Data.getToken();

        Game.Data.get(gameToken).then(game => {
            const gameContainer = Game.Data.getContainer();
            const gamePlay = gameContainer.find(`#game-play-${gameToken}`);

            gamePlay.append(game.ToString());
        });
    }
});
