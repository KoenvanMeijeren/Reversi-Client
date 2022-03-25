Game.Data = (function () {
    /**
     * The config.
     *
     * @type {{baseUrl: string, mock: [{subUrl: string, data: GameModel}]}}
     */
    const config = {
        baseUrl: Game.getApiUrl(),
        mock: [
            {
                subUrl: 'token/',
                data: new GameModel(
                    1,
                    'This a Reversi game.',
                    'fNtIKMuvJkSDBvuB8lbfCwii',
                    new PlayerOne('abcdef'),
                    new PlayerTwo('qwerty'),
                    new PlayerUndefined('abcdef'),
                    '[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]',
                    Status.Created
                )
            }
        ]
    };

    /**
     * Initializes the game data.
     */
    function init () {

    }

    /**
     * Gets the container of the game.
     *
     * @return {jQuery}
     *   The game container.
     */
    function getContainer () {
        return $('.game');
    }

    /**
     * Gets the game play container.
     *
     * @return {jQuery}
     *   The game play container.
     */
    function getGamePlayContainer () {
        const gameToken = Game.Data.getToken();

        return Game.Data.getContainer().find(`#game-play-${gameToken}`);
    }

    /**
     * Gets the token of the game.
     *
     * @return {string}
     *   The game token.
     */
    function getToken () {
        return this.getContainer().data('game-token');
    }

    /**
     * Gets the token of the player.
     *
     * @return {string}
     *   The player token.
     */
    function getPlayerToken () {
        return this.getContainer().data('game-player');
    }

    /**
     * Gets the state of the game.
     *
     * @param {string} token
     *   The token of the game.
     *
     * @returns {Promise<GameModel>}
     *   The game.
     */
    function get (token) {
        if (Env.isDevelopment()) {
            return getMockData('token/');
        }

        return getByToken(token, '')
            .then((data) => {
                return new GameModel(
                    data.id,
                    data.description,
                    data.token,
                    new PlayerOne(data.playerOne.token),
                    new PlayerTwo(data.playerTwo.token),
                    new PlayerModel(data.currentPlayer.token, data.currentPlayer.color),
                    data.board,
                    data.status
                );
            })
            .catch((exception) => {
                if (Env.isDevelopment()) {
                    console.log(exception);
                    return;
                }

                console.log('Er ging iets fout tijdens het ophalen van de gegevens.');
            });
    }

    /**
     * Gets the data from the API.
     *
     * @param {string} token
     *   The token of the game.
     * @param {string} url
     *   The url to fetch the data from.
     *
     * @returns {Promise}
     *   The promise.
     */
    function getByToken (token, url) {
        return getApiData(`${config.baseUrl}/${token}/${url}`);
    }

    /**
     * Gets the data from the API.
     *
     * @param {string} url
     *   The url to fetch the data from.
     *
     * @returns {Promise}
     *   The promise.
     */
    function getApiData (url) {
        return $.get(url)
            .then(response => response)
            .catch(exception => {
                if (Env.isDevelopment()) {
                    console.log(exception);
                    return;
                }

                console.log('Er ging iets fout tijdens het ophalen van de gegevens.');
            });
    }

    /**
     * Gets the mock data for the given url.
     *
     * @param {string} url
     *   The url.
     *
     * @returns {Promise}
     *   The promise.
     */
    function getMockData (url) {
        const data = config.mock.find(row => row.subUrl === url);

        return new Promise((resolve, reject) => {
            resolve(data.data);
        });
    }

    return {
        init,
        getContainer,
        getGamePlayContainer,
        getToken,
        getPlayerToken,
        get,
    };
})();
