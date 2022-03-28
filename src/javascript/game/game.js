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

        Game.Data.get(Game.Data.getToken()).then(game => {
            // Game has ended, so it is pointless to start refreshing the state.
            const initGame = get();
            if (initGame.IsEnded()) {
                notifyPlayerIfRequested(initGame);
                return;
            }

            // Refreshes the game state every 2 seconds.
            setInterval(function () {
                let game = get();
                if (game.IsEnded()) {
                    if (localStorage.getItem('reload-game') === 'true') {
                        location.reload();
                    }
                }

                refreshGameState();
                game = get();

                notifyPlayerIfRequested(game);

                if (game?.CurrentPlayer.Token !== null && game?.CurrentPlayer.Token !== playerToken) {
                    render();
                }
            }, config.refreshRate);

            // Creates the event and listens to it for refreshing the game.
            gameContainer.bind('refresh-reversi', function () {
                render();
            });
        });
    };

    /**
     * Refreshes the game state.
     */
    const refreshGameState = function () {
        Game.Data.get(Game.Data.getToken()).then(game => {
            stateMap.game = game;

            localStorage.removeItem('notify-player');
            localStorage.setItem('notify-player', 'false');
            localStorage.setItem('reload-game', 'false');

            // Initialize previous game state, if not present.
            if (stateMap.previousGame === null) {
                stateMap.previousGame = game;
            }

            // Status has changed, so the view must change in order to avoid unexpected behavior, so refresh the page.
            if (game.Status !== stateMap.previousGame.Status) {
                localStorage.removeItem('notify-player');
                localStorage.setItem('notify-player', 'true');
                localStorage.setItem('reload-game', 'true');

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
     * Notifies the player of changes, if requested.
     *
     * @param {GameModel} game
     *   The game.
     */
    const notifyPlayerIfRequested = function (game) {
        const notifyPlayer = localStorage.getItem('notify-player');
        if (notifyPlayer !== 'true') {
            return;
        }

        if (game.Status === Status.Pending) {
            new FeedbackWidget(game.Status.toString()).show('Tegenstander gevonden!');
        } else if (game.Status === Status.Playing) {
            new FeedbackWidget(game.Status.toString()).show('Reversi potje is gestart!');
        } else if (game.Status === Status.Quit) {
            new FeedbackWidget(game.Status.toString()).show('Reversi potje is gestopt!');
        } else if (game.Status === Status.Finished) {
            new FeedbackWidget(game.Status.toString()).show('Reversi potje is uitgespeeld!');
        }
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
