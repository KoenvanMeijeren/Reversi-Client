/**
 * Provides widget for giving feedback.
 */
class FeedbackWidget {

    #elementId;

    /**
     * Constructs the feedback widget.
     *
     * @param {string} elementId
     *   The id of the element.
     */
    constructor(elementId) {
        this.#elementId = elementId;
    }

    /**
     * Gets the element id.
     *
     * @returns {string}
     *   The element id.
     */
    get elementId() {
        return this.#elementId;
    }

    /**
     * Shows the element.
     */
    show() {
        const element = this.#getElement();
        if (element === undefined || element === null) {
            return;
        }

        element.style.display = 'block';
    }

    /**
     * Hides the element.
     */
    hide() {
        const element = this.#getElement();
        if (element === undefined || element === null) {
            return;
        }

        element.style.display = 'none';
    }

    /**
     * Gets the element.
     *
     * @returns {HTMLElement}
     *   The HTML element.
     */
    #getElement() {
        return document.getElementById(this.elementId);
    }

}