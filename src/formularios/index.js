import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

class Formularios extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemSelected: null
    }
    this.onSelect = this.onSelect.bind(this)
    this.onEditPath = this.onEditPath.bind(this)
    this.onEmptySelection = this.onEmptySelection.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  onSelect (e) {
    this.setState({
      itemSelected: e.target.id
    })
  }

  onRemove (e) {
    var _id = parseInt(e.target.id)
    // Fake remove on DB
    fakeData.splice(_id, 1)
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

  componentDidUpdate () {
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <div>
          <div>
            <Link to='/formulario'>
              <button>
                Criar
              </button>
            </Link>
          </div>
          <div>
            <Link onClick={this.onEmptySelection} to={this.onEditPath}>
              <button>
                Editar
              </button>
            </Link>
          </div>
          <div>
            <Link onClick={this.onRemove} to='/formularios'>
              <button>
                Remover
              </button>
            </Link>
          </div>
          <div>
            <input type='text' />
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Título:</th>
                <th>Link:</th>
                <th>Selecionar</th>
              </tr>
            </thead>
            <tbody>
              {fakeData.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item.titulo}</td>
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
