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
            const token = Game.Data.getToken();
            const playerToken = Game.Data.getPlayerToken();
            const color = Game.get().CurrentPlayer.Color;
            const row = element.data('row');
            const column = element.data('column');

            element.attr('data-color', color);
            element.attr('data-selectable', 'false');
            element.addClass('reversi-column-fiche-animation');

            Game.Data.saveDoMove(token, playerToken, row, column).then(function () {
                setInterval(function () {
                    Game.Data.getContainer().trigger('refresh-reversi');
                }, 100);
            });
        });
    };

    return {
        init,
        initClickableFiches
    };
})();
