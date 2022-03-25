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

        // Refreshes the game state every 2 seconds.
        render();
        setInterval(function () {
            render();

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

            const gamePlay = Game.Data.getGamePlayContainer();
            gamePlay.html('');

            gamePlay.append(game.ToString);
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
