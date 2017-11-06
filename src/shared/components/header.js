import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from '../styles'

class Header extends React.Component { 

  render() {
    return (
      <div className={styles('utility:container')}>
        <div className={styles('header:container')}>
          <Link to="/" className={styles('header:h1')} onClick={this.props.onClick}>
            Latest Stalker
          </Link>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({ type: 'REFRESH' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
