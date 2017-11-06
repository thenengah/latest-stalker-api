import redis from './redis'
import { Dependency } from './models'

const work = async(set=[]) => { 
  try {
    const name = set.shift()
    if (name) {
      console.log(await redis.run('zrevrank', 'dependencies', [name]), name)
      await new Dependency(name).get()
    }
    set = set.length ? set : (await redis.run('zrevrange', 'dependencies', [0, 250]))
  } catch (er) { console.log(er.stack) }
  setTimeout(async() => { await work(set) }, 500)
}

export default {
  work
} 
