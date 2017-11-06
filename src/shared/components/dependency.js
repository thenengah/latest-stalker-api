import React from 'react'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import semver from 'semver'
import { connect } from 'react-redux'

import styles from '../styles'

class Dependency extends React.Component { 

  get name() {
    return this.props.name
  }

  get version() {
    return _.truncate(this.props.version, { length: 10 })
  }

  get latest() {
    return this.props.latest[this.name]
  }

  get isSatisfied() {
    if (this.latest) {
      try {
        return semver.satisfies(this.latest, semver.validRange(this.props.version))
      } catch (er) { console.log(er.stack) }
    }
  }

  get backgroundColor() {
    return this.latest ? (this.isSatisfied ? '#434343' : '#ff5050') : 'white'
  }

  get copy() {
    if (this.latest) {
      return this.isSatisfied ? 'satisfies' : 'unsatisfies'
    }
  }

  componentDidMount() {
    return fetch(
      `/api/latest/${this.name}`
    ).then(res =>
      res.json()
    ).then(body =>
      this.props.onLatest(body)
    )
  }

  render() {
    return (
      <div className={styles('dependency:check')}>
        <div>
          <div className={styles('dependency:status')} style={{ backgroundColor: this.backgroundColor }}></div>
          <div className={styles('dependency:name')} >
            <b>{_.truncate(this.name, {length: 35})}</b>
            <span>&nbsp;·&nbsp;</span>
            <span>{this.version}</span>
            <span>&nbsp;</span>
            <span>&nbsp;·&nbsp;</span>
            <span>{_.truncate(this.latest || 'checking...', {length: 10})}</span>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    latest: state.latest
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLatest: (body) => {
      dispatch({
        type: 'LATEST',
        body
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dependency)
