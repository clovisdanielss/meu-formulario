import React, { Component } from 'react'
import CartaoPergunta from './cartao-pergunta'
import { Link } from 'react-router-dom'

class Formulario extends Component {
  constructor (props) {
    super(props)
    this.state = {
      titulo: '',
      questions: [],
      questionsId: 0,
      componentsId: 0,
      selected: null
    }
    this.onAddQuestion = this.onAddQuestion.bind(this)
    this.onAddComponent = this.onAddComponent.bind(this)
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onChangeQuestion = this.onChangeQuestion.bind(this)
    this.onChangeComponent = this.onChangeComponent.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
  }

  onSave () {
    const form = {
      titulo: this.state.titulo,
      questions: this.state.questions
    }
    this.props.onFakeSave(form)
  }

  onChangeTitle (e) {
    this.setState({
      titulo: e.target.value
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
      console.log(this.state.selected)
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

  onChangeQuestion (id, title, component = null) {
    this.state.questions.map((question) => {
      if (question.id == id) {
        question.title = title
      }
    })
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <div>
          <div>
            <h3>
              Menu
            </h3>
            <hr />
          </div>
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
            <button onClick={(e) => { this.onAddComponent(e, 'checkbox') }}>
              Adicionar checkbox
            </button>
            <button onClick={(e) => { this.onAddComponent(e, 'radio') }}>
              Adicionar radiobox
            </button>
            <button onClick={(e) => { this.onAddComponent(e, 'date') }}>
              Adicionar campo data
            </button>
            <button onClick={(e) => { this.onAddComponent(e, 'file') }}>
              Adicionar carregar arquivo
            </button>
            <Link to='/formularios' onClick={this.onSave}>
              <button>
              Salvar
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div>
            <h3>
              Título
            </h3>
            <input onChange={this.onChangeTitle} />
            <hr />
          </div>
          <div>
            {this.state.questions.map((question, key) => {
              console.log(question)
              return (
                <CartaoPergunta
                  id={question.id}
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
