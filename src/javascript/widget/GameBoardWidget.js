/**
 * Provides widget for Reversi game board.
 */
class GameBoardWidget {

    /**
     * The parent element.
     *
     * @type {jQuery}
     */
    #parent;

    /**
     * The game.
     *
     * @type {GameModel}
     */
    #game;

    /**
     * The token of the logged in player.
     *
     * @type {string}
     */
    #loggedInPlayerToken;

    /**
     * Constructs the game board widget.
     *
     * @param {jQuery} parent
     *   The parent of the widget.
     * @param {GameModel} game
     *   The game.
     * @param {string} loggedInPlayerToken
     *   The token of the logged in player.
     */
    constructor (parent, game, loggedInPlayerToken) {
        this.#parent = parent;
        this.#game = game;
        this.#loggedInPlayerToken = loggedInPlayerToken;
    }

    /**
     * Renders the game.
     */
    render () {
        this.#parent.html('');
        this.#parent.append(this.#createTable());
    }

    /**
     * Creates the table.
     *
     * @return {HTMLTableElement}
     *   The renderable table.
     */
    #createTable () {
        const game = this.#game;
        const isCurrentPlayer = this.#isCurrentPlayer();

        const table = document.createElement('table');
        table.setAttribute('class', 'reversi-table');

        this.#game.Board.forEach(function (boardRow, boardRowIndex) {
            const row = document.createElement('tr');
            row.setAttribute('class', 'reversi-row');
            table.appendChild(row);

            boardRow.forEach(function (boardColumn, boardColumnIndex) {
                const column = document.createElement('td');
                column.setAttribute('class', `reversi-column`);

                const possibleMove = game.PossibleMoves[boardRowIndex][boardColumnIndex];

                const fiche = document.createElement('div');
                fiche.setAttribute('class', 'reversi-column-fiche');
                fiche.setAttribute('data-selectable', possibleMove && isCurrentPlayer ? 'true' : 'false');
                fiche.setAttribute('data-row', boardRowIndex.toString());
                fiche.setAttribute('data-column', boardColumnIndex.toString());
                fiche.setAttribute('data-color', boardColumn.toString());

                column.appendChild(fiche);
                row.appendChild(column);
            });
        });

        return table;
    }

    /**
     * Determines who the current player is.
     *
     * @return {boolean}
     *   Whether the player is the current one or not.
     */
    #isCurrentPlayer () {
        return this.#game?.CurrentPlayer.Token !== null && this.#game?.CurrentPlayer.Token === this.#loggedInPlayerToken;
    }

}