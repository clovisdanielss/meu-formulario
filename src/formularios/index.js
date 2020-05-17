import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {GlobalStateContext} from '../context'
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

  componentDidMount () {
    this.loadForms()
  }

  onSelect (e) {
    this.setState({
      itemSelected: e.target.id
    })
  }

  onRemove (e) {
    var _id = parseInt(e.target.id)
    // Fake remove on DB
    this.props.fakeData.splice(_id, 1)
    this.forceUpdate()
    // EndFake
    this.onEmptySelection()
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
            <div className='table-button'>
              <Link onClick={this.onEmptySelection} to={this.onEditPath}>
                <button>
                Editar
                </button>
              </Link>
            </div>
            <div className='table-button'>
              <Link onClick={this.onRemove} to='/formularios'>
                <button>
                Remover
                </button>
              </Link>
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
                    <td>{item.link}</td>
                    <td><input onChange={this.onSelect} type='radio' name='select' id={item._id} /></td>
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
