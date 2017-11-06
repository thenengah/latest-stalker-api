import React from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Home from './home'

class App extends React.Component { 

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    )
  }

}

export default App 
