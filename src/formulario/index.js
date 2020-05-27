import React, { Component } from 'react'
import CartaoPergunta from './cartao-pergunta'
import { Link } from 'react-router-dom'
import { GlobalStateContext } from '../context'

class Formulario extends Component {
  static contextType = GlobalStateContext
  constructor (props) {
    super(props)
    let url = window.location.pathname.split('/')
    let linkForm = null
    if(url.length === 3){
      linkForm = url[2]
    }
    this.state = {
      linkForm: linkForm,
      title: '',
      questions: [{
        id:0,
        title:'Nome da Postagem',
        required:true,
        components:[
          {
            id:0,
            type:'textarea',
            text:''
          } 
        ]
      }],
      questionsId: 1,
      componentsId: 1,
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
    this.loadForm = this.loadForm.bind(this)
  }

  // Seleciona um novo quadro trello.
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

  // Seleciona uma nova lista trello.
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

  //Caso esteja sendo usado um formulário como template.
  loadForm(){
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', ()=>{
      const form = JSON.parse(xhr.responseText)
      console.log(form)
      let maxQId = 0
      let maxCId = 0
      form.questions.map((question)=>{
        question.id = maxQId
        maxQId ++
        question.components.map((component)=>{
          component.id = maxCId
          maxQId ++
        })
      })
      this.setState({
        questions:form.questions,
        questionsId:maxQId,
        componentsId:maxCId
      })
    })
    xhr.open('get', process.env.REACT_APP_API + 'users/' + 
      this.context.user.id + '/forms/' + this.state.linkForm +'?full=true')
    xhr.setRequestHeader('Authorization', this.context.user.lastToken)
    xhr.send()
  }

  // Carrega os quadros trello daquele user.
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

  // Carrega as listas trello daquele quadro.
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

  // Salva o formulário.
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

  // Modifica o título do formulário.
  onChangeTitle (e) {
    this.setState({
      title: e.target.value
    })
  }

  // Seleciona uma nova questão para adicionar componentes.
  onSelect (e) {
    this.setState({
      selected: e.target.getAttribute('data-id')
    })
  }

  // Adiciona questão ao formulário.
  onAddQuestion () {
    this.state.questions.push({
      id: this.state.questionsId,
      title: '',
      components: []
    })
    this.setState({ questionsId: this.state.questionsId + 1 })
  }

  // Adiciona um componente a questão selecionada.
  onAddComponent (e, type) {
    if (this.state.selected) {
      this.state.questions.map((question) => {
        if (question.id == this.state.selected) {
          question.components.push({
            id: this.state.componentsId,
            type: type,
            text: ''
          })
        }
      })
      this.setState({ componentsId: this.state.componentsId + 1 })
    } else {
      alert('Primeiro selecione uma pergunta')
    }
  }

  // Remove uma questão selecionada do formulário.
  onRemoveQuestion (e) {
    if (this.state.selected && this.state.selected != 0) {
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
      if(this.state.selected === 0){
        alert('Esse campo não pode ser removido.')
      }else{
        alert('Primeiro selecione uma pergunta')  
      }
    }
  }

  // Realiza alteração no componente, caso seja necessário.
  onChangeComponent (id, text) {
    var questions = []
    this.state.questions.map((question) => {
      question.components.map((component) => {
        if (component.id == id) {
          component.text = text
        }
      })
      questions.push(question)
    })
    this.setState({questions:questions})
  }

  // Modifica uma questão para obrigatória/opicional.
  onChangeRequired(e){
    if(this.state.selected && this.state.selected != 0){
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
      if(this.state.selected === 0){
        alert('Esse campo não pode ser removido.')
      }else{
        alert('Primeiro selecione uma pergunta')  
      }
    }
  }

  // Modifica uma questão.
  onChangeQuestion (id, title, component = null) {
    var questions = []
    this.state.questions.map((question) => {
      if (question.id == id) {
        question.title = title
      }
      questions.push(question)
    })
    this.setState({questions:questions})
  }


  componentDidMount () {
    this.loadBoards()
    if(this.state.linkForm){
      this.loadForm()
    }
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
                (Des)definir questão obrigatória
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
          <div className='form'>
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
