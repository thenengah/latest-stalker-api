import fetch from 'isomorphic-fetch'
import redis from '../src/server/redis'
import server from '../src/server'

const uris = {
  latest: (name) => `http://127.0.0.1:${process.env.PORT}/api/latest/${name}`,
  uploads: `http://127.0.0.1:${process.env.PORT}/api/stalk`
}

const setup = async() => {
  await server.start(
    process.env.PORT, 
    process.env.HOST
  )
}

const teardown = async() => {
  return Promise.all([
    await server.stop(),
    await redis.quit()
  ])
}

export {
  fetch,
  redis,
  setup,
  teardown,
  uris
}
