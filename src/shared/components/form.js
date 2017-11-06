import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import extract from '../mixins/extract'
import styles from '../styles'

class Form extends React.Component { 

  onChange(event) {
    const reader = new FileReader()
    reader.onload = () => {
      const file = JSON.parse(reader.result)
      this.props.onFile({
        name: file.name, 
        dependencies: extract(file)
      })
    }
    reader.readAsText(event.target.files[0])
  }

  render() {
    if (!!this.props.dependency) return <div/>
    return (
      <div className={styles('utility:container')}>
        <form>
          <input id='file' type='file' onChange={this.onChange.bind(this)} required className={styles('utility:hide')}/>
          <label htmlFor='file' className={styles('form:label')} >Check your package.json</label>
        </form>
        <p>
          <span>Then try the</span>
          <span>&nbsp;</span>
          <Link to="https://github.com/thenengah/latest-stalker-api">api</Link>
          <span>&nbsp;or&nbsp;</span>
          <Link to="https://github.com/thenengah/latest-stalker-module">module</Link>
        </p>
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
  return {
    onFile: (dependency) => {
      dispatch({
        type: 'FILE',
        dependency
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
