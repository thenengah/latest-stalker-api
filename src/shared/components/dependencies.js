import React from 'react'
import { connect } from 'react-redux'

import Dependency from './dependency'
import styles from '../styles'

class Dependencies extends React.Component { 

  get dependencies () {
    return this.props.dependency ? this.props.dependency.dependencies : [] 
  }

  render() {
    return (
      <div className={styles('utility:container')}>
        {this.dependencies.map(({ name, version, latest }) =>
          <Dependency
            key={name}
            name={name}
            version={version}
            latest={latest}
          />
        )}
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    dependency: state.dependency
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dependencies)
