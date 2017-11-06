import {
  fetch,
  setup,
  teardown,
  uris
} from './harness'

const name = 'missing-package-name'

describe('api latest (missing)', () => {

  let body

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

  it('should have correct name', () =>
    expect(body.name).toEqual(name)
  )

  it('should have correct version', () =>
    expect(body.version).toEqual(null)
  )

  afterAll(async() =>
    await teardown()
  )

})
