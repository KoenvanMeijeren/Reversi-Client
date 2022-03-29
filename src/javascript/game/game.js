const apiUrl = 'https://localhost:7042/api/Game';

const Game = (function (url) {
    const config = {
        apiUrl: url,
        refreshRate: 1000,
        // In seconds
        waitingThreshold: 30,
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

        // Resets the counter, in order to play the game again.
        localStorage.removeItem('counter');

        Game.Data.get(Game.Data.getToken()).then(game => {
            // Game has ended, so it is pointless to start refreshing the state.
            const initGame = get();
            if (initGame.IsEnded()) {
                saveScore(initGame);
                notifyPlayerIfRequested(initGame);
                localStorage.removeItem('notify-player');

                return;
            }

            // Refreshes the game state every 2 seconds.
            setInterval(function () {
                let game = get();
                if (game.IsEnded()) {
                    if (localStorage.getItem('reload-game') === 'true') {
                        localStorage.removeItem('reload-game');

                        location.reload();
                    }
                }

                refreshGameState();
                game = get();
                const isWaitingPlayer = game?.CurrentPlayer.Token !== null && game?.CurrentPlayer.Token !== playerToken;

                saveScore(game);
                notifyPlayerIfRequested(game);
                checkIfOpponentIsActive(isWaitingPlayer);

                if (isWaitingPlayer) {
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
     * Checks if the opponent is still active. If not, the game will be ended and the winner will be determined.
     *
     * @param {boolean} isWaitingPlayer
     *   If the current player is the waiting player.
     */
    const checkIfOpponentIsActive = function (isWaitingPlayer) {
        const counterKey = 'counter';
        if (isWaitingPlayer) {
            localStorage.removeItem(counterKey);
            return;
        }

        let counterValue = Number.parseInt(localStorage.getItem(counterKey));
        if (isNaN(counterValue)) {
            counterValue = 0;
        }

        counterValue++;
        localStorage.setItem(counterKey, counterValue.toString());

        const halfOfWaitingThreshold = Math.round(config.waitingThreshold / 2);
        if (counterValue === halfOfWaitingThreshold) {
            new FeedbackWidget('counter-message' + randomId(10))
                .show('Pas op! Als je nog langer wacht, dan wordt je uit het potje gegooid.', FeedbackTypes.warning);
            return;
        }

        if (counterValue > config.waitingThreshold) {
            Game.Data.quit(get().Token);
        }
    };

    /**
     * Saves the score of the game.
     *
     * @param {GameModel} game
     *   The game.
     */
    const saveScore = function (game) {
        if (!game.IsEnded()) {
            return;
        }

        Game.Data.saveScore(game.Token);
    };

    /**
     * Notifies the player of changes, if requested.
     *
     * @param {GameModel} game
     *   The game.
     */
    const notifyPlayerIfRequested = function (game) {
        const notifyPlayer = localStorage.getItem('notify-player');
        const playerToken = Game.Data.getPlayerToken();
        if (notifyPlayer !== 'true') {
            return;
        }

        let winnerText = 'Het is een gelijkspel geworden!';
        if (game.PredominantColor === Color.White) {
            winnerText = 'De tegenstander heeft gewonnnen!';
            if (playerToken === game.PlayerOne.Token) {
                winnerText = 'Jij hebt gewonnen!';
            }
        } else if (game.PredominantColor === Color.Black) {
            winnerText = 'De tegenstander heeft gewonnnen!';
            if (playerToken === game.PlayerOne.Token) {
                winnerText = 'Jij hebt gewonnen!';
            }
        }

        if (game.Status === Status.Pending) {
            new FeedbackWidget(game.Status.toString() + randomId(10)).show('Tegenstander gevonden!');
        } else if (game.Status === Status.Playing) {
            new FeedbackWidget(game.Status.toString() + randomId(10)).show('Reversi potje is gestart!');
        } else if (game.Status === Status.Quit) {
            new FeedbackWidget(game.Status.toString() + randomId(10)).show('Reversi potje is gestopt. ' + winnerText);
        } else if (game.Status === Status.Finished) {
            new FeedbackWidget(game.Status.toString() + randomId(10)).show('Reversi potje is uitgespeeld. ' + winnerText);
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
