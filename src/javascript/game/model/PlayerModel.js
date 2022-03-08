class PlayerModel {

  /**
   * The token of the player.
   *
   *@type {string}
   */
  #Token

  /**
   * The color.
   *
   *@type {Color}
   */
  #Color

  /**
   * Constructs the player object.
   *
   * @param {string} token
   * @param {Color} color
   */
  constructor (token, color) {
    this.#Token = token
    this.#Color = color
  }

  /**
   * Gets the token.
   *
   * @returns {string}
   *   The token.
   */
  get Token () {
    return this.#Token
  }

  /**
   * Gets the color.
   *
   * @returns {Color}
   *   The color.
   */
  get Color () {
    return this.#Color
  }
}

class PlayerOne extends PlayerModel {

  /**
   * Constructs a new player one object.
   *
   * @param {string} token
   *   The token.
   */
  constructor (token) {
    super(token, Color.White)
  }

}

class PlayerTwo extends PlayerModel {

  /**
   * Constructs a new player two object.
   *
   * @param {string} token
   *   The token.
   */
  constructor (token) {
    super(token, Color.Black)
  }

}

class PlayerUndefined extends PlayerModel {

  /**
   * Constructs a new player undefined object.
   *
   * @param {string} token
   *   The token.
   */
  constructor (token) {
    super(token, Color.None)
  }

}