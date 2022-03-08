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
})

/**
 * Provides widget for giving feedback.
 */
class FeedbackWidget {

  /**
   * The key of the storage.
   *
   * @type {string}
   */
  #storageKey = 'feedback_widget'

  /**
   * The id of the element.
   *
   * @type {string}
   */
  #elementId

  /**
   * Constructs the feedback widget.
   *
   * @param {string} elementId
   *   The id of the element.
   */
  constructor (elementId) {
    this.#elementId = '#' + elementId

    const element = this.#getElement()
    if (element.length < 1) {
      $('body').append(`<div id='${elementId}' class='alert' role='alert'>
<button type="button" class="alert-close" aria-label="Close"></button>
<div class="message-container"><span class="icon"></span><div class="message"></div> </div>
</div>`)
    }

    this.hide()
  }

  /**
   * Gets the element id.
   *
   * @returns {string}
   *   The element id.
   */
  get elementId () {
    return this.#elementId
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
    const element = this.#getElement()

    element.append(`<div class="actions mt-5 justify-content-end text-end">
    <button type="button" class="btn btn-danger mx-sm-2 mt-sm-2">${decline}</button>
    <button type="button" class="btn btn-primary mx-sm-2 mt-sm-2">${accept}</button>
</div>`)
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
    this.log(message, type)

    const element = this.#getElement()
    element.find('.message-container > .message').text(message)

    element.removeClass(function (index, className) {
      return (className.match(/(^|\s)alert-\S+/g) || []).join(' ')
    })
    element.addClass('alert-' + type)

    if (element.hasClass('d-block')) {
      return
    }

    element.removeClass('d-none')
    element.addClass('d-block')
  }

  /**
   * Hides the element.
   */
  hide () {
    const element = this.#getElement()
    if (element.hasClass('d-none')) {
      return
    }

    element.removeClass('d-block')
    element.addClass('d-none')
  }

  /**
   * Displays the history of the feedback.
   *
   * @returns string
   *   The renderable history.
   */
  history () {
    const logs = Object.values(JSON.parse(localStorage.getItem(this.#storageKey)))
    let output = String()
    for (let delta = 0; delta < Object.keys(logs).length; delta++) {
      const log = logs[delta]

      output += `${log.type}  -  ${log.message} <\\n>`
    }

    return output
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
    }

    let messages = JSON.parse(localStorage.getItem(this.#storageKey))
    if (messages === null) {
      messages = {}
    }

    const keys = Object.keys(messages)
    const messageCount = keys.length

    const firstKey = keys[0]
    let lastKey = Number.parseInt(keys.pop())
    if (isNaN(lastKey)) {
      lastKey = 0
    }

    messages[lastKey + 1] = jsonMessage
    if (messageCount > 10) {
      delete messages[firstKey]
    }

    localStorage.setItem(this.#storageKey, JSON.stringify(messages))
  }

  /**
   * Removes all messages from the storage.
   */
  removeLog () {
    localStorage.removeItem(this.#storageKey)
  }

  /**
   * Gets the element.
   *
   * @returns {jQuery}
   *   The HTML element.
   */
  #getElement () {
    return $(this.elementId)
  }

}