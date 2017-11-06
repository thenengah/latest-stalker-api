import redis from 'redis'
import uuid from 'uuid'

const client = redis.createClient({
  url: process.env.REDIS
})

const namespace = uuid.v4() 

const test = async(cmd, key, args=[]) => {
  return Promise.all([
    new Promise((resolve, reject) =>
      client[cmd](`${namespace}:${key}`, ...args, (er, value) =>
        er ? reject(er) : resolve(value)
      )
    ),
    new Promise((resolve, reject) =>
      client.expire(`${namespace}:${key}`, 10, (er) => 
        er ? reject(er) : resolve()
      )
    )
  ]).then(promises => 
    promises[0]
  )
} 

const real = async(cmd, key, args=[]) => {
  return new Promise((resolve, reject) =>
    client[cmd](key, ...args, (er, value) =>
      er ? reject(er) : resolve(value)
    )
  )
} 

const quit = async() => {
  return new Promise((resolve, reject) =>
    client.quit(er => er ? reject(er) : resolve())
  )
}

const run = process.env.NODE_ENV === 'test' ? test : real

client.on('error', er => 
  console.log(er.stack)
)

export default {
  quit,
  run
} 
