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
     * Constructs the game board widget.
     *
     * @param {jQuery} parent
     *   The parent of the widget.
     * @param {GameModel} game
     *   The game.
     */
    constructor (parent, game) {
        this.#parent = parent;
        this.#game = game;
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
        const table = document.createElement('table');
        table.setAttribute('class', 'reversi-table');

        this.#game.Board.forEach(function (boardRow) {
            const row = document.createElement('tr');
            row.setAttribute('class', 'reversi-row');
            table.appendChild(row);

            boardRow.forEach(function (boardColumn) {
                const column = document.createElement('td');
                column.setAttribute('class', `reversi-column`);

                const fiche = document.createElement('div');
                fiche.setAttribute('class', 'reversi-column-fiche');
                fiche.setAttribute('data-selectable', boardColumn === Color.None ? 'true' : 'false');
                fiche.setAttribute('data-color', boardColumn.toString());

                column.appendChild(fiche);
                row.appendChild(column);
            });
        });

        return table;
    }

}