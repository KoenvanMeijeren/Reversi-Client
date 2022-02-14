const Game = (function(){

    console.log('hallo, vanuit een module');

    /**
     * Initializes the game object.
     */
    const privateInit = function() {
        console.log('Private information')
    }

    return {
        init: privateInit
    }
})();

Game.init();