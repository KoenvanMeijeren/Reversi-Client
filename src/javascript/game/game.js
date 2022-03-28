const apiUrl = 'https://localhost:7042/api/Game';

const Game = (function (url) {
    const config = {
        apiUrl: url,
        refreshRate: 1000
    };

    let stateMap = {
        game: null,
        // Holds the game version with a different status from the current one.
        previousGame: null
    };

    /**
     * Initializes the game object.
     *
     * @param {function} callback
     *   The callable function. This function is called before initializing the game.
     */
    const init = function (callback) {
        callback();

        const gameContainer = Game.Data.getContainer();
        const gameToken = Game.Data.getToken();
        const playerToken = Game.Data.getPlayerToken();
        if (gameToken == null || playerToken == null) {
            throw new Error('Cannot render the game');
        }

        // Initializes the game.
        render();

        // Refreshes the game state every 2 seconds.
        setInterval(function () {
            refreshGameState();
            const game = get();
            if (game?.CurrentPlayer.Token !== null && game?.CurrentPlayer.Token !== playerToken) {
                console.log('Re-rendered the game');
                render();
                return;
            }

            console.log('Refreshed game state');
        }, config.refreshRate);

        // Creates the event and listens to it for refreshing the game.
        gameContainer.bind('refresh-reversi', function () {
            render();
        });
    };

    /**
     * Refreshes the game state.
     */
    const refreshGameState = function () {
        Game.Data.get(Game.Data.getToken()).then(game => {
            stateMap.game = game;

            // Initialize previous game state, if not present.
            if (stateMap.previousGame === null) {
                stateMap.previousGame = game;
            }

            // Status has changed, so the view must change in order to avoid unexpected behavior, so refresh the page.
            if (game.Status !== stateMap.previousGame.Status) {
                location.reload();
            }
        });
    };

    /**
     * Renders the game.
     */
    const render = function () {
        const gameToken = Game.Data.getToken();
        const playerToken = Game.Data.getPlayerToken();

        Game.Data.get(gameToken).then(game => {
            stateMap.game = game;

            new GameBoardWidget(Game.Data.getGamePlayContainer(), game, playerToken).render();

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
