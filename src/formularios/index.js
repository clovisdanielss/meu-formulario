import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { GlobalStateContext } from '../context'
class Formularios extends Component {
  static contextType = GlobalStateContext

  constructor (props) {
    super(props)
    this.state = {
      itemSelected: null,
      forms: []
    }

    this.onSelect = this.onSelect.bind(this)
    this.onEditPath = this.onEditPath.bind(this)
    this.onEmptySelection = this.onEmptySelection.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.loadForms = this.loadForms.bind(this)
  }


  onSelect (e) {
    this.setState({
      itemSelected: e.target.id
    })
  }

  onRemove (e) {
    this.onEmptySelection()
    var id = this.state.itemSelected
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status === 204) {
          alert('Removido com sucesso!')
          const forms = []
          this.state.forms.map((form) => {
            if (form.id != id) {
              forms.push(form)
            }
          })
          this.setState({ forms: forms })
        } else {
          alert('Falha em remover!')
        }
      }
    }
    xhr.open('delete', process.env.REACT_APP_API + 'users/' + this.context.user.id + '/forms/' + id)
    xhr.setRequestHeader('Authorization', this.context.user.lastToken)
    xhr.send()
  }

  onEditPath (e) {
    if (this.state.itemSelected) {
      return '/formulario/' + this.state.itemSelected
    } else {
      return '/formularios'
    }
  }

  onEmptySelection () {
    if (!this.state.itemSelected) {
      alert('Selecione um item para realizar esta ação.')
    }
  }

  loadForms () {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      const forms = JSON.parse(xhr.responseText)
      this.setState({ forms: forms })
    })
    xhr.open('get', process.env.REACT_APP_API + 'users/' + this.context.user.id + '/forms')
    xhr.setRequestHeader('Authorization', this.context.user.lastToken)
    xhr.send()
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  render () {
    return (
      <div className='container'>
        <div>
          <div className='menu-table'>
            <div className='table-button'>
              <Link to='/formulario'>
                <button>
                Criar
                </button>
              </Link>
            </div>
            {/*<div className='table-button'>
              <Link onClick={this.onEmptySelection} to={this.onEditPath}>
                <button>
                Editar
                </button>
              </Link>
            </div>*/}
            <div className='table-button'>
              <Link onClick={this.onRemove} to='/formularios'>
                <button>
                Remover
                </button>
              </Link>
            </div>
            <div className='table-button'>
              <button onClick={this.loadForms}>
                Atualizar 
              </button>
            </div>
          </div>
          <div className='table-search'>
            <input type='text' />
          </div>
        </div>
        <div className='table-div'>
          <table>
            <thead>
              <tr>
                <th>Título:</th>
                <th>Link:</th>
                <th>Selecionar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.forms.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item.title}</td>
                    <td><Link to={'/formulario/' + item.link + '/responder'}>{item.link}</Link></td>
                    <td><input onChange={this.onSelect} type='radio' name='select' id={item.id} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Formularios
