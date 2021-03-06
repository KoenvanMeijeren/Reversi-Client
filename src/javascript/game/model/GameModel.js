/**
 * The various statuses.
 *
 * @type {Readonly<{Finished: string, Playing: string, Quit: string, Queued: string, Pending: string, Created: string}>}
 */
const Status = Object.freeze({
    Created: 'Created',
    Queued: 'Queued',
    Pending: 'Pending',
    Playing: 'Playing',
    Finished: 'Finished',
    Quit: 'Quit',
});

/**
 * The various colors.
 *
 * @type {Readonly<{White: string, Black: string, None: string}>}
 */
const Color = Object.freeze({
    White: 'White',
    Black: 'Black',
    None: 'None',
});

class GameModel {

    /**
     * The id.
     *
     * @type {number}
     */
    #Id;

    /**
     * The description.
     *
     * @type {string}
     */
    #Description;

    /**
     * The token.
     *
     * @type {string}
     */
    #Token;

    /**
     * The player one object.
     *
     * @type {PlayerModel}
     */
    #PlayerOne;

    /**
     * The player two object.
     *
     * @type {PlayerModel}
     */
    #PlayerTwo;

    /**
     * The id.
     *
     * @type {PlayerModel}
     */
    #CurrentPlayer;

    /**
     * The predominant color.
     *
     * @type {Color}
     */
    #PredominantColor;

    /**
     * The board.
     *
     * @type {Array<Array<Color>>}
     */
    #Board;

    /**
     * The possible moves.
     *
     * @type {Array<Array<boolean>>}
     */
    #PossibleMoves;

    /**
     * The status.
     *
     * @type {Status}
     */
    #Status;

    /**
     * The game statistics.
     *
     * @type {GameStatistics}
     */
    #GameStatistics;

    /**
     * Constructs the new game object.
     *
     * @param {number} id
     *   The id.
     * @param {string} description
     *   The description.
     * @param {string} token
     *   The token.
     * @param {PlayerModel} playerOne
     *   The player one.
     * @param {PlayerModel} playerTwo
     *   The player two.
     * @param {PlayerModel} currentPlayer
     *   The current player.
     * @param {string} predominantColor
     *   The predominant color.
     * @param {string} board
     *   The board.
     * @param {string} possibleMoves
     *   The possible moves.
     * @param {Status} status
     *   The status.
     * @param {number} conqueredWhiteFiches
     *   The conquered white fiches amount.
     * @param {number} conqueredBlackFiches
     *   The conquered black fiches amount.
     */
    constructor (id, description, token, playerOne, playerTwo, currentPlayer, predominantColor, board, possibleMoves, status, conqueredWhiteFiches, conqueredBlackFiches) {
        this.#GameStatistics = new GameStatistics();

        this.#Id = id;
        this.#Description = description;
        this.#Token = token;
        this.#PlayerOne = playerOne;
        this.#PlayerTwo = playerTwo;
        this.#CurrentPlayer = currentPlayer;
        this.#PredominantColor = GameModel.#stringToColor(predominantColor);
        this.#Board = this.#BoardToArray(board);
        this.#PossibleMoves = GameModel.#PossibleMovesToArray(possibleMoves);
        this.#Status = status;

        this.#GameStatistics.setConqueredFichesAmount(conqueredWhiteFiches, conqueredBlackFiches);
    }

    get Id () {
        return this.#Id;
    }

    get Description () {
        return this.#Description;
    }

    get Token () {
        return this.#Token;
    }

    get PlayerOne () {
        return this.#PlayerOne;
    }

    get PlayerTwo () {
        return this.#PlayerTwo;
    }

    get CurrentPlayer () {
        return this.#CurrentPlayer;
    }

    get PredominantColor () {
        return this.#PredominantColor;
    }

    get Board () {
        return this.#Board;
    }

    get PossibleMoves () {
        return this.#PossibleMoves;
    }

    get Status () {
        return this.#Status;
    }

    get GameStatistics () {
        return this.#GameStatistics;
    }

    /**
     * Renders the game to a string.
     *
     * @return {string}
     *   The game as string.
     */
    ToString () {
        return this.#Status + ' - ' + this.#Token;
    }

    /**
     * Determines if the game has ended.
     *
     * @return {boolean}
     *   True if the game has ended.
     */
    IsEnded () {
        return this.IsFinished() || this.IsQuit();
    }

    /**
     * Determines if the game has finished.
     *
     * @return {boolean}
     *   True if the game has finished.
     */
    IsFinished () {
        return this.#Status === Status.Finished;
    }

    /**
     * Determines if the game has quit.
     *
     * @return {boolean}
     *   True if the game has quit.
     */
    IsQuit () {
        return this.#Status === Status.Quit;
    }

    /**
     * Determines if the game is currently played.
     *
     * @return {boolean}
     *   True if the game is played.
     */
    IsPlaying () {
        return this.#Status === Status.Playing;
    }

    /**
     * Renders the board string to an array.
     *
     * @param {string} board
     *   The board as a string.
     *
     * @return {Array<Array<Color>>}
     *   The board as object.
     */
    #BoardToArray (board) {
        const input = board
            .replace('[[', '')
            .replace(']]', '')
            .split('],[');

        const convertedInput = [];
        input.forEach(function (values, index) {
            convertedInput[index] = values.split(',');
        });

        const fichesAmount = {
            white: 0,
            black: 0
        };

        let result = [];
        convertedInput.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                switch (column) {
                case '0':
                    row[columnIndex] = Color.None;
                    break;
                case '1':
                    row[columnIndex] = Color.White;
                    fichesAmount.white++;
                    break;
                case '2':
                    row[columnIndex] = Color.Black;
                    fichesAmount.black++;
                    break;
                default:
                    if (column.includes('0')) {
                        row[columnIndex] = Color.None;
                        break;
                    }

                    if (column.includes('1')) {
                        row[columnIndex] = Color.White;
                        fichesAmount.white++;
                        break;
                    }

                    if (column.includes('2')) {
                        row[columnIndex] = Color.Black;
                        fichesAmount.black++;
                        break;
                    }

                    throw new Error('Invalid value given! Expected one of the color values, but received: ' + column);
                }
            });

            result[rowIndex] = row;
        });

        this.#GameStatistics.setFichesAmount(fichesAmount.white, fichesAmount.black);

        return result;
    }

    /**
     * Renders the possible moves string to an array.
     *
     * @param {string} possibleMoves
     *   The possible moves as a string.
     *
     * @return {Array<Array<boolean>>}
     *   The board as object.
     */
    static #PossibleMovesToArray (possibleMoves) {
        const input = possibleMoves
            .replace('[[', '')
            .replace(']]', '')
            .split('],[');

        const convertedInput = [];
        input.forEach(function (values, index) {
            convertedInput[index] = values.split(',');
        });

        let result = [];
        convertedInput.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                switch (column) {
                case 'true':
                    row[columnIndex] = true;
                    break;
                case 'false':
                    row[columnIndex] = false;
                    break;
                default:
                    throw new Error('Invalid value given! Expected one of the boolean values, but received: ' + column);
                }
            });

            result[rowIndex] = row;
        });

        return result;
    }

    /**
     * Parses a string to the corresponding color value.
     *
     * @param {string} string
     *   The string to be parsed.
     *
     * @return {Color}
     *   The parsed color.
     */
    static #stringToColor (string) {
        if (string === 'White') {
            return Color.White;
        }

        if (string === 'Black') {
            return Color.Black;
        }

        return Color.None;
    }
}