import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
    this.onChangeInputs = this.onChangeInputs.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }

  // Método para mudança de estado
  onChangeInputs (e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  // Método para autenticação
  onLogin (e) {
    let fakeUser = this.state
    const fakeRequest = () => {
      return {
        username: fakeUser.username,
        _id: 0
      }
    }
    fakeUser = fakeRequest()
    this.props.onLogin(fakeUser)
    console.log(fakeUser)
  }

  render () {
    return (
      <div id='login'>
        <div>
          <label htmlFor='username'>Usuário:</label>
          <input onChange={this.onChangeInputs} id='username' />
        </div>
        <div>
          <label htmlFor='password'>Senha:</label>
          <input onChange={this.onChangeInputs} id='password' type='password' />
        </div>
        <Link id='login-link' to='/formularios' onClick={this.onLogin}><button type='button'>Entrar</button></Link>
      </div>
    )
  }
}

export default Login
