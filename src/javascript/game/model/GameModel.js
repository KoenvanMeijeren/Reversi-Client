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
})

/**
 * The various colors.
 *
 * @type {Readonly<{White: string, Black: string, None: string}>}
 */
const Color = Object.freeze({
  White: 'White',
  Black: 'Black',
  None: 'None',
})

class GameModel {

  /**
   * The id.
   *
   * @type {number}
   */
  #Id

  /**
   * The description.
   *
   * @type {string}
   */
  #Description

  /**
   * The token.
   *
   * @type {string}
   */
  #Token

  /**
   * The player one object.
   *
   * @type {PlayerModel}
   */
  #PlayerOne

  /**
   * The player two object.
   *
   * @type {PlayerModel}
   */
  #PlayerTwo

  /**
   * The id.
   *
   * @type {PlayerModel}
   */
  #CurrentPlayer

  /**
   * The board.
   *
   * @type {Array<Array<Color>>}
   */
  #Board

  /**
   * The status.
   *
   * @type {Status}
   */
  #Status

  /**
   * Constructs the new game object.
   *
   * @param {number} id
   * @param {string} description
   * @param {string} token
   * @param {PlayerModel} playerOne
   * @param {PlayerModel} playerTwo
   * @param {PlayerModel} currentPlayer
   * @param {string} board
   * @param {Status} status
   */
  constructor (id, description, token, playerOne, playerTwo, currentPlayer, board, status) {
    this.#Id = id
    this.#Description = description
    this.#Token = token
    this.#PlayerOne = playerOne
    this.#PlayerTwo = playerTwo
    this.#CurrentPlayer = currentPlayer
    this.#Board = this.BoardToArray(board)
    this.#Status = status
  }

  get Id () {
    return this.#Id
  }

  get Description () {
    return this.#Description
  }

  get Token () {
    return this.#Token
  }

  get PlayerOne () {
    return this.#PlayerOne
  }

  get PlayerTwo () {
    return this.#PlayerTwo
  }

  get CurrentPlayer () {
    return this.#CurrentPlayer
  }

  get Board () {
    return this.#Board
  }

  get Status () {
    return this.#Status
  }

  /**
   * Updates the status of the game.
   *
   * @param {Array<Array<Color>>} board
   * @param {PlayerModel} currentPlayer
   * @param {Status} status
   */
  UpdateStatus (board, currentPlayer, status) {
    this.#Board = this.BoardToArray(board)
    this.#CurrentPlayer = currentPlayer
    this.#Status = status
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
  BoardToArray (board) {
    const input = board
      .replace('[[', '')
      .replace(']]', '')
      .split('],[')

    const convertedInput = []
    input.forEach(function (values, index) {
      convertedInput[index] = values.split(',')
    })

    let result = []
    convertedInput.forEach(function (row, rowIndex) {
      row.forEach(function (column, columnIndex) {
        switch (column) {
          case '0':
            row[columnIndex] = Color.None
            break
          case '1':
            row[columnIndex] = Color.White
            break
          case '2':
            row[columnIndex] = Color.Black
            break
          default:
            throw new Error('Invalid value given! Expected one of the color values, but received: ' + column)
        }
      })

      result[rowIndex] = row
    })

    return result
  }
}