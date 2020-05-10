import React, { Component } from 'react'
import './App.css'
import Login from './login'
import Formularios from './formularios'
import Formulario from './formulario'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin (user) {
    this.setState({ user: user })
  }

  render () {
    return (
      <Router className='App'>
        <Switch>
          <Route path='/formularios/'>
            <Formularios />
          </Route>
          <Route path='/formulario/:id'>
            <div />
          </Route>
          <Route path='/formulario/'>
            <Formulario />
          </Route>
          <Route path=''>
            <Login onLogin={this.onLogin} />
          </Route>
        </Switch>
      </Router>
    )
  }
}
export default App
