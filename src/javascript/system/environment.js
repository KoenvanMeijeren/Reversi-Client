/**
 * The various feedback types.
 *
 * @type {Readonly<{development: string, production: string}>}
 */
const Environments = Object.freeze({
  development: 'development',
  production: 'production'
})

const Env = (function () {
  /**
   * The environment.
   *
   * @type {Environments}
   */
  let environment = Environments.development

  /**
   * Initializes the game object.
   *
   * @param {Environments} env
   *   The current environment.
   */
  function init (env = Environments.development) {
    if (!Object.values(Environments).includes(env)) {
      throw new Error('Invalid environment given!')
    }

    environment = env
  }

  /**
   * Determines if the environment is development.
   *
   * @returns {boolean}
   *   Whether the environment is development or not.
   */
  function isDevelopment () {
    return environment === Environments.development
  }

  /**
   * Determines if the environment is production.
   *
   * @returns {boolean}
   *   Whether the environment is production or not.
   */
  function isProduction () {
    return environment === Environments.production
  }

  /**
   * Gets the current environment.
   *
   * @return {Environments}
   *   The environment.
   */
  function get () {
    return environment
  }

  return {
    init: init,
    isDevelopment: isDevelopment,
    isProduction: isProduction,
    get: get
  }
}());
