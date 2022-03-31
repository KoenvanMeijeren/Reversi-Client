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

    /**
     * Determines if the object is equal or not.
     *
     * @param {object|null} object
     *   The object to compare.
     *
     * @return {boolean}
     *   True if the objects are equal.
     */
    isEqual (object) {
        if (object === null || !object instanceof GameStatistics) {
            console.log(object);
            return false;
        }

        return this.WhiteFiches !== object.WhiteFiches
            || this.BlackFiches !== object.BlackFiches;
    }

}