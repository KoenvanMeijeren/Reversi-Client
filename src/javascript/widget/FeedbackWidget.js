/**
 * The various feedback types.
 *
 * @type {Readonly<{success: string, warning: string, danger: string, info: string}>}
 */
const FeedbackTypes = Object.freeze({
    success: 'success',
    danger: 'danger',
    warning: 'warning',
    info: 'info',
});

/**
 * Provides widget for giving feedback.
 */
class FeedbackWidget {

    /**
     * The key of the storage.
     *
     * @type {string}
     */
    #storageKey = 'feedback_widget';

    /**
     * The id of the element.
     *
     * @type {string}
     */
    #elementId;

    /**
     * Constructs the feedback widget.
     *
     * @param {string} elementId
     *   The id of the element.
     */
    constructor (elementId) {
        this.#elementId = '#' + elementId;

        const element = this.#getElement();
        if (element.length < 1) {
            $('body').append(`<div id='${elementId}' class='message-alert' role='alert'>
<a href="#" class="button button-danger button-close" aria-label="Close"></a>
<div class="message-container"><div class="message"><span class="icon"></span></div> </div>
</div>`);
        }

        this.hide();

        $(`#${elementId} > .button-close`).on('click', function () {
            const alert = $(this).parent('.message-alert');

            if (alert.hasClass('show')) {
                alert.removeClass('show');
            }

            if (alert.hasClass('hide')) {
                alert.removeClass('hide');
            }

            alert.addClass('hide');

            // Completely removes the element after animation.
            setTimeout(function () {
                alert.addClass('d-none');
            }, 1000);
        });
    }

    /**
     * Gets the element id.
     *
     * @returns {string}
     *   The element id.
     */
    get elementId () {
        return this.#elementId;
    }

    /**
     * Adds actions to the widget.
     *
     * @param {string} decline
     *   The decline button text.
     * @param {string} accept
     *   The accept button text.
     */
    addActions (decline = 'Cancel', accept = 'Ok') {
        const element = this.#getElement();

        element.append(`<div class="actions">
    <button type="button" class="button button-danger button-decline">${decline}</button>
    <button type="button" class="button button-primary button-accept">${accept}</button>
</div>`);
    }

    /**
     * Shows the element.
     *
     * @param {string} message
     *   The message.
     * @param {FeedbackTypes} type
     *   The type of the message. E.g. success or error. Defaults to info.
     */
    show (message, type = FeedbackTypes.info) {
        this.log(message, type);

        const element = this.#getElement();
        element.find('.message-container > .message').append(message);

        element.removeClass(function (index, className) {
            return (className.match(/(^|\s)message-alert-\S+/g) || []).join(' ');
        });
        element.addClass('message-alert-' + type);

        if (element.hasClass('show')) {
            return;
        }

        element.removeClass('hide');
        element.addClass('show');
    }

    /**
     * Hides the element.
     */
    hide () {
        const element = this.#getElement();
        if (element.hasClass('hide')) {
            return;
        }

        element.removeClass('hide');
        element.addClass('show');
    }

    /**
     * Displays the history of the feedback.
     *
     * @returns string
     *   The renderable history.
     */
    history () {
        const logs = Object.values(JSON.parse(localStorage.getItem(this.#storageKey)));
        let output = String();
        for (let delta = 0; delta < Object.keys(logs).length; delta++) {
            const log = logs[delta];

            output += `${log.type}  -  ${log.message} <\\n>`;
        }

        return output;
    }

    /**
     * Logs the message to the storage.
     *
     * @param {string} message
     *   The message.
     * @param {FeedbackTypes} type
     *   The type of the message. E.g. success or error. Defaults to info.
     */
    log (message, type) {
        const jsonMessage = {
            message: message,
            type: type,
        };

        let messages = JSON.parse(localStorage.getItem(this.#storageKey));
        if (messages === null) {
            messages = {};
        }

        const keys = Object.keys(messages);
        const messageCount = keys.length;

        const firstKey = keys[0];
        let lastKey = Number.parseInt(keys.pop());
        if (isNaN(lastKey)) {
            lastKey = 0;
        }

        messages[lastKey + 1] = jsonMessage;
        if (messageCount > 10) {
            delete messages[firstKey];
        }

        localStorage.setItem(this.#storageKey, JSON.stringify(messages));
    }

    /**
     * Removes all messages from the storage.
     */
    removeLog () {
        localStorage.removeItem(this.#storageKey);
    }

    /**
     * Gets the element.
     *
     * @returns {jQuery}
     *   The HTML element.
     */
    #getElement () {
        return $(this.elementId);
    }

}