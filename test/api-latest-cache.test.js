import {
  fetch,
  redis,
  setup,
  teardown,
  uris
} from './harness'

const name = 'mocha'
const version = Date.now() // semver?

describe('api latest (cache)', () => {

  let body 

  beforeAll(async() =>
    await setup() 
  )

  beforeAll(() =>
    fetch(uris.latest(name))
  )

  beforeAll(async() =>
    await redis.run('set', `latest:${name}`, [JSON.stringify({version})])
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

  it('should have overloaded version', () =>
    expect(body.version).toEqual(version)
  )

  afterAll(async() =>
    await teardown()
  )

})
