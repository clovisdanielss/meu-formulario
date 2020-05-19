import React, { Component } from 'react'
import CartaoPergunta from './cartao-pergunta'
import { Link } from 'react-router-dom'
import { GlobalStateContext } from '../context'

class Formulario extends Component {
  static contextType = GlobalStateContext

  constructor (props) {
    super(props)
    this.state = {
      title: '',
      questions: [],
      questionsId: 0,
      componentsId: 0,
      selected: null,
      selectedBoard: null,
      selectedList: null,
      boards: [],
      lists: []
    }
    this.onAddQuestion = this.onAddQuestion.bind(this)
    this.onAddComponent = this.onAddComponent.bind(this)
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onSelectBoard = this.onSelectBoard.bind(this)
    this.onSelectList = this.onSelectList.bind(this)

    this.onChangeQuestion = this.onChangeQuestion.bind(this)
    this.onChangeComponent = this.onChangeComponent.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeRequired = this.onChangeRequired.bind(this)

    this.onSave = this.onSave.bind(this)
    this.loadBoards = this.loadBoards.bind(this)
    this.loadLists = this.loadLists.bind(this)
  }

  onSelectBoard (e) {
    let selected = null
    const selector = e.target
    this.state.boards.map((board) => {
      if (board.id === selector.options[selector.selectedIndex].getAttribute('data-id')) {
        selected = board
      }
    })
    this.setState({ selectedBoard: selected })
  }

  onSelectList (e) {
    let selected = null
    const selector = e.target
    this.state.lists.map((list) => {
      if (list.id === selector.options[selector.selectedIndex].getAttribute('data-id')) {
        selected = list
      }
    })
    this.setState({ selectedList: selected })
  }

  loadBoards () {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      const boards = JSON.parse(xhr.responseText)
      this.setState({
        boards: boards,
        selectedBoard: boards[0]
      })
      this.loadLists()
    })
    xhr.open('get', process.env.REACT_APP_API + 'trello/boards')
    xhr.setRequestHeader('Authorization', this.context.user.lastToken)
    xhr.send()
  }

  loadLists () {
    if(!this.state.selectedBoard){
      return 1
    }
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      const lists = JSON.parse(xhr.responseText)
      this.setState({ lists: lists, selectedList:lists[0] })
    })
    xhr.open('get', process.env.REACT_APP_API + 'trello/boards/' + this.state.selectedBoard.id + '/lists')
    xhr.setRequestHeader('Authorization', this.context.user.lastToken)
    xhr.send()
  }

  onSave () {
    const form = {
      title: this.state.title,
      idList: this.state.selectedList.id,
      questions: this.state.questions
    }
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () =>{
      if(xhr.readyState === 4){
        if(xhr.status !== 201){
          alert("Houve um erro!")
        }else{
          alert("Salvo com sucesso!")
        }
      }
    }
    xhr.open('post', process.env.REACT_APP_API + 'users/' + this.context.user.id + '/forms')
    xhr.setRequestHeader('Authorization', this.context.user.lastToken)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(form))
  }

  onChangeTitle (e) {
    this.setState({
      title: e.target.value
    })
  }

  onSelect (e) {
    this.setState({
      selected: e.target.getAttribute('data-id')
    })
  }

  onAddQuestion () {
    this.state.questions.push({
      id: this.state.questionsId,
      title: '',
      components: []
    })
    this.setState({ questionsId: this.state.questionsId + 1 })
  }

  onAddComponent (e, type) {
    if (this.state.selected) {
      this.state.questions.map((question) => {
        if (question.id == this.state.selected) {
          question.components.push({
            id: this.state.componentsId,
            type: type,
            data: ''
          })
        }
      })
      this.setState({ componentsId: this.state.componentsId + 1 })
    } else {
      alert('Primeiro selecione uma pergunta')
    }
  }

  onRemoveQuestion (e) {
    if (this.state.selected) {
      const questions = []
      let next = null
      this.state.questions.map((question, key) => {
        if (question.id != this.state.selected) {
          questions.push(question)
        } else if (this.state.questions[key + 1]) {
          next = this.state.questions[key + 1].id
        }
      })
      this.setState({
        questions: questions,
        selected: next
      })
    } else {
      alert('Primeiro selecione uma pergunta')
    }
  }

  onChangeComponent (id, text) {
    this.state.questions.map((question) => {
      question.components.map((component) => {
        if (component.id == id) {
          component.data = text
        }
      })
    })
  }

  onChangeRequired(e){
    if(this.state.selected){
      var questions = []
      this.state.questions.map((question)=>{
        if(question.id == this.state.selected){
          if(!question.required){
            question.required = true
          }else{
            question.required = false
          }
        }
        questions.push(question)
      })
      this.setState({questions:questions})
    }
    else{
      alert('Primeiro selecione uma pergunta')
    }
  }

  onChangeQuestion (id, title, component = null) {
    this.state.questions.map((question) => {
      if (question.id == id) {
        question.title = title
      }
    })
  }

  componentDidMount () {
    this.loadBoards()
  }

  componentDidUpdate(){
    if(this.state.selectedList &&
      this.state.selectedList.idBoard !=
      this.state.selectedBoard.id){
      this.loadLists()
    }
  }

  render () {
    return (
      <div>
        <div className='menu-form'>
          <div>
            <h3>
              Menu
            </h3>
          </div>
          <hr />
          <div>
              <h3>Selecione o quadro do trelo desejado:</h3>
              <select onChange={this.onSelectBoard}>
                {this.state.boards.map((board, key) => {
                  return (
                    <option key={key} data-id={board.id}>
                      {board.name}
                    </option>
                  )
                })}
              </select>
            </div>
            {this.state.selectedBoard ? <div>
              <h3>Selecione a lista do quadro:</h3>
              <select onChange={this.onSelectList}>
                {this.state.lists.map((list, key) => {
                  return (
                    <option key={key} data-id={list.id}>
                      {list.name}
                    </option>
                  )
                })}
              </select>
                                        </div> : null}
          <div className='menu-div-buttons'>
            <div>
              <button onClick={this.onAddQuestion}>
              Adicionar cartão pergunta
              </button>
              <button onClick={this.onRemoveQuestion}>
              Remover cartão pergunta
              </button>
              <button onClick={(e) => { this.onAddComponent(e, 'textarea') }}>
              Adicionar textarea
              </button>
            </div>
            <div>
              <button onClick={(e) => { this.onAddComponent(e, 'checkbox') }}>
              Adicionar checkbox
              </button>
              <button onClick={(e) => { this.onAddComponent(e, 'radio') }}>
              Adicionar radiobox
              </button>
              <button onClick={(e) => { this.onAddComponent(e, 'date') }}>
              Adicionar campo data
              </button>
            </div>
            <div>
              <button onClick={(e) => { this.onAddComponent(e, 'file') }}>
              Adicionar carregar arquivo
              </button>
              <Link to='/formularios' onClick={this.onSave}>
                <button>
              Salvar
                </button>
              </Link>
              <button onClick={this.onChangeRequired}>
                Definir questão obrigatória
              </button>
            </div>
          </div>
        </div>
        <div className='editor-form'>
          <div>
            <h3>
              Título
            </h3>
            <input onChange={this.onChangeTitle} />
          </div>
          <hr />
          <div>
            {this.state.questions.map((question, key) => {
              return (
                <CartaoPergunta
                  question={question}
                  index={key}
                  key={key}
                  onSelect={this.onSelect}
                  onChangeQuestion={this.onChangeQuestion}
                  onChangeComponent={this.onChangeComponent}
                  question={question}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Formulario
