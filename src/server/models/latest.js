import semver from 'semver'
import get from '../get'
import redis from '../redis'
import uris from '../uris'

class Latest {

  constructor(name, version=null) {
    this.props = { name, version }
  }

  get name() {
    return this.props.name
  }

  set version(version){
    semver.valid(version)
    this.props.version = version 
  }

  get key() {
    return `latest:${this.name}`
  }

  get uri() {
    return uris.latest(this.name)
  }

  get json() {
    return this.props
  }

  async get() {
    return (await this.fromCache()) || (await this.fromRegistry())
  }

  async fromCache() {
    try {
      const value = await redis.run('get', this.key)
      if (value) {
        this.version = JSON.parse(value).version
        await redis.run('zincrby', 'dependencies', [1, this.name])
      }
    } catch (er) { console.log(er.stack) }
    return this.props.version ? this.json : null
  }

  async fromRegistry() {
    try {
      const latest = (await get({ uri: this.uri, json: true })).latest
      if (latest) {
        this.version = latest
        await redis.run('zincrby', 'dependencies', [1, this.name])
      }
      await redis.run('set', this.key, [JSON.stringify(this.json)])
      await redis.run('expire', this.key, [3600])
    } catch (er) { console.log(er.stack) }
    return this.json
  }

}

export default Latest 
