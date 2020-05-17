import React, { Component } from 'react'
import './App.css'
import Login from './login/index.js'
import Formularios from './formularios'
import Logged from './login/logged.js'
import Formulario from './formulario'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import FormularioReadOnly from './formulario-read-only'
import { GlobalStateContext } from './context'

const Protected = ({ children, ...rest }) => {
  const context = React.useContext(GlobalStateContext)
  const isAuth = () => {
    return context.user
  }
  return (
    <Route
      {...rest} render={({ location }) =>
        isAuth() ? (children)
          : (<Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
             />)}
    />
  )
}

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
        <div id='header'>
          <Link to='/formularios'>
            <h3>MeuFormulário</h3>
          </Link>
        </div>
        <hr />
        <Switch>
          <Protected path='/formularios/'>
            <Formularios />
          </Protected>
          <Route path='/formulario/:link/responder'>
            <FormularioReadOnly />
          </Route>
          <Protected path='/formulario/'>
            <Formulario />
          </Protected>
          <Route path='/logged'>
            <Logged />
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
