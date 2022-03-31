class GameStatistics {

    /**
     * The amount of white fiches.
     *
     * @type {number}
     */
    #whiteFiches;

    /**
     * The amount of black fiches.
     *
     * @type {number}
     */
    #blackFiches;

    /**
     * Constructs the game statistics.
     *
     * @param {number} whiteFiches
     *   The white fiches amount.
     * @param {number} blackFiches
     *   The black fiches amount.
     */
    constructor (whiteFiches = 0, blackFiches = 0) {
        this.#whiteFiches = whiteFiches;
        this.#blackFiches = blackFiches;
    }

    get WhiteFiches () {
        return this.#whiteFiches;
    }

    get BlackFiches () {
        return this.#blackFiches;
    }

    /**
     * Sets the game statistics about the fiches amount.
     *
     * @param {number} whiteFiches
     *   The white fiches amount.
     * @param {number} blackFiches
     *   The black fiches amount.
     */
    setFichesAmount (whiteFiches, blackFiches) {
        this.#whiteFiches = whiteFiches;
        this.#blackFiches = blackFiches;
    }

}