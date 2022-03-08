const apiUrl = '/api/url'

const Game = (function (url) {
  const config = {
    apiUrl: url
  }

  /**
   * Initializes the game object.
   *
   * @param {function} callback
   *   The callable function. This function is called after initializing the game.
   */
  const init = function (callback) {
    callback()
  }

  return {
    init: init
  }
})(apiUrl)
