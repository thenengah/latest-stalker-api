import {
  fetch,
  setup,
  teardown,
  uris
} from './harness'

describe('api stalk (fail)', () => {

  let res 

  beforeAll(async() =>
    await setup() 
  )

  beforeAll(() =>
    fetch(uris.uploads, {
      method: 'POST'
    }).then(_res =>
      res = _res 
    )
  )

  it('should fail', () =>
    expect(res.status).toEqual(400)
  )

  afterAll(async() =>
    await teardown()
  )

})
