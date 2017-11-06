import {
  fetch,
  redis,
  setup,
  teardown,
  uris
} from './harness'

const name = 'mocha'

describe('api latest (registry)', () => {

  let body, latest

  beforeAll(async() =>
    await setup() 
  )

  beforeAll(() =>
    fetch(
      uris.latest(name)
    ).then(res =>
      res.json() 
    ).then(_body =>
      body = _body
    )
  )

  beforeAll(async() =>
    latest = JSON.parse(await redis.run('get', `latest:${name}`))
  )

  it('should have correct name', () =>
    expect(body.name).toEqual(latest.name)
  )

  it('should have correct version', () =>
    expect(body.version).toEqual(latest.version)
  )

  afterAll(async() =>
    await teardown()
  )

})
