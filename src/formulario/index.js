import React, { Component } from 'react'
import CartaoPergunta from './cartao-pergunta'
import CustomInput from './custom-input'

class Formulario extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: [],
      questionsId: 0,
      componentsId: 0,
      references: {},
      selected: null
    }
    this.onAddQuestion = this.onAddQuestion.bind(this)
    this.onAddComponent = this.onAddComponent.bind(this)
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onChangeQuestion = this.onChangeQuestion.bind(this)
    this.onChangeComponent = this.onChangeComponent.bind(this)
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
    this.state.references[this.state.questionsId] = React.createRef()
    this.setState({ questionsId: this.state.questionsId + 1 })
  }

  onAddComponent (e, type) {
    if (this.state.selected) {
      this.state.references[this.state.selected].current.onAdd(<CustomInput
        id={this.state.componentsId}
        type={type}
        onChangeComponent={this.onChangeComponent}
        questionId={this.state.selected}
      />)
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
      delete this.state.references[this.state.selected]
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
          component.text = text
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
          </div>
        </div>
        <div>
          <div>
            <h3>
            Formulário
            </h3>
            <hr />
          </div>
          <div>
            {this.state.questions.map((question, key) => {
              console.log(question)
              return (
                <CartaoPergunta
                  ref={this.state.references[question.id]}
                  id={question.id}
                  index={key}
                  key={key}
                  onSelect={this.onSelect}
                  onChangeQuestion={this.onChangeQuestion}
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
