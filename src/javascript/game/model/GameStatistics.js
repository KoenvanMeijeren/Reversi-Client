class GameStatistics {

    /**
     * The amount of white fiches.
     *
     * @type {number}
     */
    #whiteFiches = 0;

    /**
     * The amount of black fiches.
     *
     * @type {number}
     */
    #blackFiches = 0;

    get WhiteFiches () {
        return this.#whiteFiches;
    }

    get BlackFiches () {
        return this.#blackFiches;
    }

    get ConqueredFiches () {
        const conqueredFichesString = localStorage.getItem('conqueredFiches');
        const conqueredFichesNumeric = Number.parseInt(conqueredFichesString);
        if (isNaN(conqueredFichesNumeric)) {
            return 0;
        }

        return conqueredFichesNumeric;
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