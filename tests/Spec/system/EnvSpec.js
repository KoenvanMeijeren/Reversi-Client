describe('Env behavior', function () {
  it('should have a global env module', function () {
    expect(Env).toBeDefined()
  })

  it('should have an initialize method', function () {
    expect(typeof Env.init).toBe('function')
  })

  it('should have a development env when requested', function () {
    Env.init()
    expect(Environments.development).toBe(Env.get())
  })

  it('should have a production env when requested', function () {
    Env.init(Environments.production)
    expect(Environments.production).toBe(Env.get())
  })

  it('should throw an error for an undefined environment', function () {
    expect(function () {
      Env.init('unknown env')
    }).toThrow(new Error('Invalid environment given!'))
  })
})
