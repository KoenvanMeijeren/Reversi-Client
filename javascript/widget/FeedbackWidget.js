/**
 * The various feedback types.
 *
 * @type {Readonly<{secondary: string, success: string, warning: string, danger: string, primary: string, info: string}>}
 */
const FeedbackTypes = Object.freeze({
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'danger',
    warning: 'warning',
    info: 'info',
});

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
        this.#elementId = '#' + elementId;

        const element = this.#getElement();
        if (element.length < 1) {
            $('body').append("<div id='"+ elementId +"' class='alert d-none' role='alert'></div>")
        }
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
     *
     * @param {string} message
     *   The message.
     * @param {FeedbackTypes} type
     *   The type of the message. E.g. success or error. Defaults to info.
     */
    show(message, type = FeedbackTypes.info) {
        const element = this.#getElement();
        if (element === undefined || element === null) {
            return;
        }

        element.text(message);
        element.addClass('d-block');
        element.addClass('alert-' + type);
    }

    /**
     * Hides the element.
     */
    hide() {
        const element = this.#getElement();
        if (element === undefined || element === null) {
            return;
        }

        element.removeClass('d-block');
        element.addClass('d-none');
    }

    /**
     * Gets the element.
     *
     * @returns {jQuery}
     *   The HTML element.
     */
    #getElement() {
        return $(this.elementId);
    }

}