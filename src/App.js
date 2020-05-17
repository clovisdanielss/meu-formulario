import React, { Component } from 'react'
import './App.css'
import Login from './login/index.js'
import Formularios from './formularios'
import Logged from './login/logged.js'
import Formulario from './formulario'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import FormularioReadOnly from './formulario-read-only'
import { GlobalStateContext } from './context'

const fakeData = [
  {
    _id: '0',
    titulo: 'Exemplo 1',
    link: 'http://www.fakelink.com.br'
  },
  {
    _id: '1',
    titulo: 'Exemplo 2',
    link: 'http://www.fakelin1k.com.br'
  },
  {
    _id: '2',
    titulo: 'Exemplo 3',
    link: 'http://www.fakelin2.com.br'
  },
  {
    _id: '3',
    titulo: 'Exemplo 4',
    link: 'http://www.fak3link.com.br'
  }
]

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
    this.onFakeSave = this.onFakeSave.bind(this)
  }

  onLogin (user) {
    this.setState({ user: user })
  }

  onFakeSave (data) {
    let maxId = null
    fakeData.map((data) => {
      if (!maxId || data.id > maxId) {
        maxId = data.id
      }
    })
    data.link = 'www.fakelink' + maxId + '.com'
    data.id = maxId++
    fakeData.push(data)
    this.forceUpdate()// Because is fake
  }

  render () {
    return (
      <Router className='App'>
        <div id='header'>
          <h3>MeuFormulário</h3>
        </div>
        <hr />
        <Switch>
          <Protected path='/formularios/'>
            <Formularios fakeData={fakeData} />
          </Protected>
          <Route path='/formulario/:id/responder'>
            <FormularioReadOnly />
          </Route>
          <Protected path='/formulario/'>
            <Formulario onFakeSave={this.onFakeSave} />
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
