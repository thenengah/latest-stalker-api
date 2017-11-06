import React from 'react'
import semver from 'semver'
import { connect } from 'react-redux'

import images from '../images'
import styles from '../styles'

class Upload extends React.Component { 

  get name() {
    return this.props.dependency.name
  }

  get dependencies() {
    return this.props.dependency.dependencies || []
  }

  getSatisfied(type) {
    return this.dependencies.filter(dependency =>
      this.props.latest[dependency.name]
    ).filter(dependency => {
      try {
        return type === semver.satisfies(
          this.props.latest[dependency.name], 
          semver.validRange(dependency.version)
        )
      } catch (er) { console.log(er.stack) }
    }).length
  }

  render() {
    if (!this.props.dependency) {
      return (
        <div className={styles('utility:container')}>
          <img className={styles('upload:example')} src={images.example}/>
        </div>
      )
    } else {
      return (
        <div className={styles('utility:container')}>
          <div className={styles('upload:container')}>
            <div className={styles('upload:unsatisfied')}>
              <span>{this.getSatisfied(false)}</span>
            </div>
            <div className={styles('upload:satisfied')}>
              <span>{this.getSatisfied(true)}</span>
            </div>
            <div className={styles('upload:name')}>
              {this.name}
            </div>
          </div>
        </div>
      )
    }
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    dependency: state.dependency,
    latest: state.latest
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload)
