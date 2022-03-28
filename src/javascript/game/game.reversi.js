Game.Reversi = (function () {
    const config = {};

    /**
     * Initializes the game.
     */
    const init = function () {

    };

    /**
     * Initializes the clickable fiches.
     *
     * Binds to each reversi column a click event and when clicked executes changing the color.
     */
    const initClickableFiches = function () {
        $('.reversi-column div[data-selectable="true"]').bind('click', function () {
            const element = $(this);
            const color = Game.get().CurrentPlayer.Color;

            element.attr('data-color', color);
            element.attr('data-selectable', 'false');
        });
    };

    return {
        init,
        initClickableFiches
    };
})();
