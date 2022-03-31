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
     * The amount of conquered white fiches.
     *
     * @type {number}
     */
    #conqueredWhiteFiches;

    /**
     * The amount of conquered black fiches.
     *
     * @type {number}
     */
    #conqueredBlackFiches;

    /**
     * Constructs the game statistics.
     *
     * @param {number} whiteFiches
     *   The white fiches amount.
     * @param {number} blackFiches
     *   The black fiches amount.
     * @param {number} conqueredWhiteFiches
     *   The conquered white fiches amount.
     * @param {number} conqueredBlackFiches
     *   The conquered black fiches amount.
     */
    constructor (whiteFiches = 0, blackFiches = 0, conqueredWhiteFiches = 0, conqueredBlackFiches = 0) {
        this.#whiteFiches = whiteFiches;
        this.#blackFiches = blackFiches;
        this.#conqueredWhiteFiches = conqueredWhiteFiches;
        this.#conqueredBlackFiches = conqueredBlackFiches;
    }

    get WhiteFiches () {
        return this.#whiteFiches;
    }

    get BlackFiches () {
        return this.#blackFiches;
    }

    get ConqueredWhiteFiches () {
        return this.#conqueredWhiteFiches;
    }

    get ConqueredBlackFiches () {
        return this.#conqueredBlackFiches;
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
     * Sets the game statistics about the fiches amount.
     *
     * @param {number} conqueredWhiteFiches
     *   The conquered white fiches amount.
     * @param {number} conqueredBlackFiches
     *   The conquered black fiches amount.
     */
    setConqueredFichesAmount (conqueredWhiteFiches, conqueredBlackFiches) {
        this.#conqueredWhiteFiches = conqueredWhiteFiches;
        this.#conqueredBlackFiches = conqueredBlackFiches;
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