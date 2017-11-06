import semver from 'semver'
import Latest from './latest'
import Dependency from './dependency'
import { extract } from '../../shared/mixins'

class Upload {

  constructor(file) {
    this.props = { file }
  }

  get dependencies() {
    return extract(this.props.file)
  }

  async get() {
    const { name, version } = this.props.file
    const dependencies = await this.getAnalysis()
    const satisfied = dependencies.filter(d => d.satisfied)
    const unsatisfied = dependencies.filter(d => !d.satisfied)
    return {
      name,
      version,
      satisfied,
      unsatisfied
    }
  }

  async getAnalysis() {
    return Promise.all(
      this.dependencies.map(async({name, version}) => {
        let latest = null, satisfied = null
        try {
          latest = (await new Latest(name).get()).version
          satisfied = semver.satisfies(latest, semver.validRange(version))
        } catch (er) {
          console.log(er.stack)
        }
        return { 
          name, 
          version, 
          latest, 
          satisfied
        }
      })
    )
  }

}

export default Upload 
