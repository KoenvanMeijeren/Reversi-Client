Game.Model = (function () {

    let config = {}

    /**
     * Initializes the game object.
     */
    const init = function () {
        console.log(config.apiUrl)
    }

    return {
        init: init
    }
})();