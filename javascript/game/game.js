const apiUrl = '/api/url';

const Game = (function (url) {

    let config = {
        apiUrl: url,
    }

    /**
     * Initializes the game object.
     */
    const init = function () {
        console.log(config.apiUrl)
    }

    return {
        init: init
    }
})(apiUrl);