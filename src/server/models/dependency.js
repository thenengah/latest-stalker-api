import get from '../get'
import redis from '../redis'
import uris from '../uris'
import { extract } from '../../shared/mixins'

const re = {
  lines: /\n/g,
  repo: 'sidebar[^\0]*?github.com/(.*?)"',
  file: /([^"]*?\/package.json)"/
}

class Dependency {

  constructor(name, dependencies=null) {
    this.props = { name, dependencies }
  }

  static async rank(name) {
    return await redis.run('zrank', 'dependencies', [name])
  }

  get name() {
    return this.props.name
  }

  set dependencies(dependencies ) {
    this.props.dependencies = dependencies 
  }

  get key() {
    return `dependencies:${this.name}`
  }

  async get() {
    return (await this.fromCache()) || (await this.fromRegistry())
  }

  async fromCache() {
    const value = await redis.run('get', this.key) 
    if (value) this.dependencies = JSON.parse(value).dependencies
    return this.props.dependencies ? this.props : null
  }

  async fromRegistry() {
    const repo = await this.getRepo()
    const pack = await this.getPack(repo)
    const raw = await this.getRaw(pack)
    this.dependencies = extract(raw) 
    await redis.run('set', this.key, [JSON.stringify(this.props)])
    await redis.run('expire', this.key, [3600])
    return this.props
  }

  async getRepo() {
    return (await get({ uri: uris.repo(this.name) })).match(re.repo)[1]
  }

  async getPack(repo) {
    return (await get({ uri: uris.file(repo) })).match(re.file)[1]
  }

  async getRaw(pack) {
    return await get({ uri: uris.raw(pack), json: true })
  }

}

export default Dependency 
