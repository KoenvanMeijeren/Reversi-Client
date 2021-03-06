Game.Data = (function () {
    /**
     * The config.
     *
     * @type {{mock: [{subUrl: string, data: GameModel}]}}
     */
    const config = {
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
                    'None',
                    '[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]',
                    '[[false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false],[false,false,false,false,true,false,false,false],[false,false,false,false,false,true,false,false],[false,false,true,false,false,false,false,false],[false,false,false,true,false,false,false,false],[false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false]]',
                    Status.Created
                )
            }
        ]
    };

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
                let object;
                try {
                    object = JSON.parse(data);
                } catch (e) {
                    object = data;
                }

                return new GameModel(
                    object.id,
                    object.description,
                    object.token,
                    new PlayerOne(object.playerOne.token),
                    new PlayerTwo(object.playerTwo.token),
                    new PlayerModel(object.currentPlayer.token, object.currentPlayer.color),
                    object.predominantColor,
                    object.board,
                    object.possibleMoves,
                    object.status,
                    object.conqueredWhiteFiches,
                    object.conqueredBlackFiches,
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
     * Saves the game score.
     *
     * @param {string} token
     *   The token of the game.
     *
     * @return {Promise}
     *   The promise.
     */
    const saveScore = function (token) {
        return getApiData(`${Game.getScoreApiUrl()}/${token}`);
    };

    /**
     * Saves the do move action.
     *
     * @param {string} token
     *   The token of the game.
     * @param {string} playerToken
     *   The token of the player.
     * @param {number} row
     *   The row.
     * @param {number} column
     *   The column.
     *
     * @return {Promise}
     *   The promise.
     */
    function saveDoMove (token, playerToken, row, column) {
        return putApiData(`${Game.getApiUrl()}/do-move`, {
            token: token,
            playerToken: playerToken,
            row: row,
            column: column
        });
    }

    /**
     * Quits the game.
     *
     * @param {string} token
     *   The token.
     *
     * @return {Promise}
     *   The promise.
     */
    function quit (token) {
        return putApiData(`${Game.getApiUrl()}/${token}/quit`);
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
        return getApiData(`${Game.getApiUrl()}/${token}/${url}`);
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
     * PUTs the data into the designated URL of the API.
     *
     * @param {string} url
     *   The url to upload the data to.
     * @param {object} data
     *   The data to be uploaded.
     *
     * @returns {Promise}
     *   The promise.
     */
    function putApiData (url, data = {}) {
        return $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
        })
            .then(response => response)
            .catch(exception => {
                if (Env.isDevelopment()) {
                    console.log(exception);
                    return;
                }

                console.log('Er ging iets fout tijdens het opslaan van de gegevens.');
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
        getContainer,
        getGamePlayContainer,
        getToken,
        getPlayerToken,
        get,
        saveDoMove,
        saveScore,
        quit,
    };
})();
