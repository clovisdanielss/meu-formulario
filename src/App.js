import React, { Component } from 'react'
import Login from './login/index.js'
import Formularios from './formularios'
import Logged from './login/logged.js'
import Formulario from './formulario-editor'
import Header from './header'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import FormularioReadOnly from './formulario-default'
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
        <Switch>
          <Protected path='/formularios/'>
            <Header />
            <Formularios />
          </Protected>
          <Route path='/formulario/:link/responder'>
            <FormularioReadOnly />
          </Route>
          <Protected path='/formulario/'>
            <Header />
            <Formulario />
          </Protected>
          <Route path='/logged'>
            <Header />
            <Logged />
          </Route>
          <Route path=''>
            <Header />
            <Login onLogin={this.onLogin} />
          </Route>
        </Switch>
      </Router>
    )
  }
}
export default App
