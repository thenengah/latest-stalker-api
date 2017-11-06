import {
  fetch,
  setup,
  teardown,
  uris
} from './harness'

import fs from 'fs'
import FormData from 'form-data'

describe('api stalk (success)', () => {

  let form, body

  beforeAll(() =>
    jest.setTimeout(15000)
  )

  beforeAll(async() =>
    await setup() 
  )

  beforeAll(done =>
    fs.readFile(__dirname + '/../package.json', (er, file) => {
      if (er) {
        done(er)
      } else {
        form = new FormData()
        form.append('file', file, 'package.json')
        done()
      }
    })
  )

  beforeAll(() =>
    fetch(uris.uploads, {
      method: 'POST',
      body: form 
    }).then(res =>
      res.json()
    ).then(_body =>
      body = _body
    )
  )

  it('should have name', () =>
    expect(!!body.name).toEqual(true)
  )

  it('should have satisfied', () =>
    expect(Array.isArray(body.satisfied)).toEqual(true)
  )

  it('should have unsatisfied', () =>
    expect(Array.isArray(body.unsatisfied)).toEqual(true)
  )

  afterAll(async() =>
    await teardown()
  )

})
