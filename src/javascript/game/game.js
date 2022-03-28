const apiUrl = 'https://localhost:7042/api/Game';

const Game = (function (url) {
    const config = {
        apiUrl: url,
        refreshRate: 1000
    };

    let stateMap = {
        game: null
    };

    /**
     * Initializes the game object.
     *
     * @param {function} callback
     *   The callable function. This function is called before initializing the game.
     */
    const init = function (callback) {
        callback();

        const gameToken = Game.Data.getToken();
        const playerToken = Game.Data.getPlayerToken();
        if (gameToken == null || playerToken == null) {
            throw new Error('Cannot render the game');
        }

        // Refreshes the game state every 2 seconds.
        render();
        setInterval(function () {
            Game.Data.get(gameToken).then(game => {
                stateMap.game = game;
            });

            // @todo: Test if this works while playing for real.
            const game = get();
            if (game?.CurrentPlayer.Token !== null && game?.CurrentPlayer.Token !== playerToken) {
                console.log('Re-rendered the game');
                render();
                return;
            }

            console.log('Refreshed game state');
        }, config.refreshRate);
    };

    /**
     * Renders the game.
     */
    const render = function () {
        const gameToken = Game.Data.getToken();
        Game.Data.get(gameToken).then(game => {
            stateMap.game = game;

            new GameBoardWidget(Game.Data.getGamePlayContainer(), game).render();

            Game.Reversi.initClickableFiches();
        });
    };

    /**
     * Gets the current game state.
     *
     * @return {GameModel|null}
     *   The current game state.
     */
    const get = function () {
        return stateMap.game;
    };

    /**
     * Gets the API url.
     *
     * @return {string}
     *   The API url.
     */
    const getApiUrl = function () {
        return config.apiUrl;
    };

    return {
        init,
        get,
        getApiUrl
    };
})(apiUrl);
