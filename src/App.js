import React, { Component } from 'react'
import './App.css'
import Login from './login'
import Formularios from './formularios'
import Formulario from './formulario'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import FormularioReadOnly from './formulario-read-only'

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
        <Switch>
          <Route path='/formularios/'>
            <Formularios fakeData={fakeData} />
          </Route>
          <Route path='/formulario/:id'>
            <FormularioReadOnly />
          </Route>
          <Route path='/formulario/'>
            <Formulario onFakeSave={this.onFakeSave} />
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
