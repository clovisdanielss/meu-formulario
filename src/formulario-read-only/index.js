import React, { Component } from 'react'
import CartaoPergunta from './cartao-pergunta'
import Header from '../header'
class FormularioReadOnly extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: { questions: [] },
      answers: []
    }

    this.loadForm = this.loadForm.bind(this)
    this.onChangeAnswer = this.onChangeAnswer.bind(this)
    this.onSend = this.onSend.bind(this)
  }

  onSend (e) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert('Enviado com sucesso!')
          window.location.reload()
        } else {
          alert('Houve algum erro!')
        }
      }
    }
    xhr.open('post', process.env.REACT_APP_API + 'answers')
    xhr.setRequestHeader('Content-Type', 'application/json')
    var form = this.state.form
    form.answers = this.state.answers
    xhr.send(JSON.stringify(form))
  }

  onChangeAnswer (answer) {
    var findCount = 0
    const type = answer.type
    const allowMulti = type !== 'radio'
    var newAnswers = []
    this.state.answers.map((_answer) => {
      if (!allowMulti && _answer.idQuestion === answer.idQuestion) {
        _answer.value = answer.value
        _answer.idComponent = answer.idComponent
        _answer.type = type
        _answer.titleQuestion = answer.titleQuestion
        findCount += 1
      } else if (allowMulti && _answer.idComponent === answer.idComponent) {
        if (type === 'textarea') {
          _answer.value = answer.value
        } else {
          _answer.value = answer.value
        }
        findCount += 1
      }
      newAnswers.push(_answer)
    })
    if (!findCount) {
      newAnswers = this.state.answers
      newAnswers.push(answer)
    }
    this.setState({ answers: newAnswers })
  }

  loadForm () {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      var form = JSON.parse(xhr.responseText)
      this.setState({ form: form })
    })
    const link = document.URL.split('/')[4]
    xhr.open('get', process.env.REACT_APP_API + 'forms/' + link + '?full=true')
    xhr.send()
  }

  componentDidMount () {
    this.loadForm()
  }

  render () {
    return [
      <Header title={this.state.form.title} key='0' />,
      <div className='container' key='1'>
        <div className='auto-generated'>
          {this.state.form.questions.map((question, key) => {
            return (
              <CartaoPergunta
                key={key}
                question={question}
                onChangeAnswer={this.onChangeAnswer}
              />
            )
          })}
        </div>
        <div>
          <button onClick={this.onSend}>Enviar</button>
        </div>
      </div>
    ]
  }
}

export default FormularioReadOnly
