const apiUrl = 'https://localhost:7042/api/Game';

const Game = (function (url) {
    const config = {
        apiUrl: url,
        refreshRate: 1000,
        // In seconds
        waitingThreshold: 60,
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
                updateQuitGameTimer(game, isWaitingPlayer);

                if (isWaitingPlayer) {
                    render();
                }

                renderQuitGameTimerProgressBar(game, gameContainer);
            }, config.refreshRate);

            // Creates the event and listens to it for refreshing the game.
            gameContainer.bind('refresh-reversi', function () {
                render();

                // Resets the counter, in order to play the game again.
                localStorage.removeItem('counter');
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
     * Renders the quit game timer progress bar.
     *
     * @param {GameModel} game
     *   The game.
     * @param {jQuery} parent
     *   The parent of the progress bar.
     */
    const renderQuitGameTimerProgressBar = function (game, parent) {
        if (!game.IsPlaying()) {
            return;
        }

        const progressContainer = parent.find('#quit-game-timer-container');
        const quitGameCounter = getWaitingCounterValue();
        const progressCounter = config.waitingThreshold - quitGameCounter;
        const scaleProgress = generateScaleFunction(0, config.waitingThreshold, 0, 100);
        const progressInPercentage = scaleProgress(quitGameCounter);

        progressContainer.html(
            '<div class="progress" style="height: 40px;">\n' +
            `  <div class="progress-bar h5 bg-warning" role="progressbar" aria-valuenow="${progressInPercentage}"\n` +
            `  aria-valuemin="0" aria-valuemax="100" style="height: 100%; width:${progressInPercentage}%">\n` +
            `    <span class="sr-only px-lg-3">Nog ${progressCounter} seconden...</span>\n` +
            '  </div>\n' +
            '</div>'
        );
    };

    /**
     * Checks if the opponent is still active. If not, the game will be ended and the winner will be determined.
     *
     * @param {GameModel} game
     *   The game.
     * @param {boolean} isWaitingPlayer
     *   If the current player is the waiting player.
     */
    const updateQuitGameTimer = function (game, isWaitingPlayer) {
        if (!game.IsPlaying()) {
            return;
        }

        const counterKey = 'counter';

        let counterValue = getWaitingCounterValue();
        counterValue++;
        localStorage.setItem(counterKey, counterValue.toString());

        const halfOfWaitingThreshold = Math.round(config.waitingThreshold / 2);
        if (counterValue === halfOfWaitingThreshold) {
            if (isWaitingPlayer) {
                new FeedbackWidget('counter-message' + randomId(10))
                    .show('Pas op! Het potje wordt misschien gestopt omdat je tegenstander nog geen zet heeft gedaan.', FeedbackTypes.warning);
                return;
            }

            new FeedbackWidget('counter-message' + randomId(10))
                .show('Pas op! Als je nog langer wacht, dan wordt je uit het potje gegooid.', FeedbackTypes.warning);
            return;
        }

        if (counterValue > config.waitingThreshold) {
            Game.Data.quit(get().Token);
        }
    };

    /**
     * Gets the waiting counter value.
     *
     * @return {number}
     *   The waiting counter value.
     */
    const getWaitingCounterValue = function () {
        const counterValue = Number.parseInt(localStorage.getItem('counter'));
        if (isNaN(counterValue)) {
            return 0;
        }

        return counterValue;
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
            if (playerToken === game.PlayerTwo.Token) {
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
