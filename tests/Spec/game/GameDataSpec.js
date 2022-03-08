describe('Game Data behavior tests', function () {
  it('should have a global game module', function () {
    expect(Game.Data).toBeDefined()
  })

  it('should have an initialize method', function () {
    expect(typeof Game.Data.init).toBe('function')
  })

  const onSuccess = jasmine.createSpy('onSuccess')
  const onFailure = jasmine.createSpy('onFailure')

  beforeEach(function () {
    jasmine.Ajax.install()
  })

  afterEach(function () {
    jasmine.Ajax.uninstall()
  })

  it('should return a game model', function () {
    Env.init(Environments.development)
    const promise = Game.Data.get()
    return promise
      .then(result => {
        expect(result.Id).toBe(1)
        expect(result.Description).toBe('This a Reversi game.')
        expect(result.Token).toBe('fNtIKMuvJkSDBvuB8lbfCwii')

        return onSuccess()
      })
      .catch(function (err) {
        return onFailure()
      })
      .finally(function () {
        expect(onSuccess).toHaveBeenCalled()
        expect(onFailure).not.toHaveBeenCalled()
      })
  })
})
