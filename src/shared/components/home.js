import React from 'react'

import Dependencies from './dependencies'
import Form from './form'
import Header from './header'
import Upload from './upload'

class Home extends React.Component { 

  render() {
    return (
      <div>
        <Header />
        <Form />
        <Upload />
        <Dependencies />
      </div>
    )
  }

}

export default Home 
