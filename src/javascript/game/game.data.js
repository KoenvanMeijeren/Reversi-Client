Game.Data = (function () {
  /**
   * The config.
   *
   * @type {{baseUrl: string, mock: [{subUrl: string, data: GameModel}]}}
   */
  const config = {
    baseUrl: 'https://localhost:7042/api/Game',
    mock: [
      {
        subUrl: 'token/',
        data: new GameModel(
          1,
          'This a Reversi game.',
          'fNtIKMuvJkSDBvuB8lbfCwii',
          new PlayerOne('abcdef'),
          new PlayerTwo('qwerty'),
          new PlayerOne('abcdef'),
          '[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]',
          Status.Created
        )
      }
    ]
  }

  /**
   * Initializes the game object.
   */
  function init () {

  }

  /**
   * Gets the state of the game.
   *
   * @returns {Promise}
   *   The game.
   */
  function get () {
    if (Env.isDevelopment()) {
      return getMockData('token/')
    }

    return getByToken('fNtIKMuvJkSDBvuB8lbfCwii', '')
      .then((data) => {
        return new GameModel(
          data.id,
          data.description,
          data.token,
          new PlayerModel(data.playerOne.token, data.playerOne.color),
          new PlayerModel(data.playerTwo.token, data.playerTwo.color),
          new PlayerModel(data.currentPlayer.token, data.currentPlayer.color),
          data.board,
          data.status
        )
      })
      .catch((exception) => {
        if (Env.isDevelopment()) {
          console.log(exception)
          return
        }

        console.log('Er ging iets fout tijdens het ophalen van de gegevens.')
      })
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
    return getApiData(`${config.baseUrl}/${token}/${url}`)
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
          console.log(exception)
          return
        }

        console.log('Er ging iets fout tijdens het ophalen van de gegevens.')
      })
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
    const data = config.mock.find(row => row.subUrl === url)

    return new Promise((resolve, reject) => {
      resolve(data.data)
    })
  }

  return {
    init: init,
    get: get
  }
})()
