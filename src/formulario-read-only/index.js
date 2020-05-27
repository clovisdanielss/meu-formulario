import React, { Component } from 'react'
import CartaoPergunta from './cartao-pergunta'
import Header from '../header'
class FormularioReadOnly extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: { questions: [] },
      answers: [],
      wait: false
    }

    this.loadForm = this.loadForm.bind(this)
    this.onChangeAnswer = this.onChangeAnswer.bind(this)
    this.isMissingRequired = this.isMissingRequired.bind(this)
    this.onRemoveFiles = this.onRemoveFiles.bind(this)
    this.onSend = this.onSend.bind(this)
  }

  isMissingRequired () {
    var totalReqs = 0
    this.state.form.questions.map((question) => {
      if (question.required) {
        totalReqs++
        const answers = this.state.answers
        for (let i = 0; i < answers.length; i++) {
          const answer = answers[i]
          if (answer.titleQuestion === question.title) {
            if (answer.type === 'file' &&
                answer.value.name.length > 3) {
              totalReqs--
              break
            } else if (answer.type === 'date' &&
              answer.value.toString().length > 3) {
              totalReqs--
              break
            } else if (answer.value.length > 3) {
              totalReqs--
              break
            }
          }
        }
      }
    })
    console.log(totalReqs)
    return totalReqs > 0
  }

  onSend (e) {
    var xhr = new XMLHttpRequest()
    xhr.open('post', process.env.REACT_APP_API + 'answers')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status < 300) {
          alert('Enviado com sucesso!')
        } else {
          alert('Houve algum erro, tente novamente!')
        }
        window.location.reload()
      }
    }
    var form = this.state.form
    form.answers = this.state.answers
    if (this.isMissingRequired()) {
      alert('Falta preencher um campo obrigatório.')
    } else {
      xhr.send(JSON.stringify(form))
      this.setState({ wait: true })
    }
  }

  onRemoveFiles (idComponent) {
    var newAnswers = []
    this.state.answers.map((answer) => {
      if (answer.type !== 'file') {
        newAnswers.push(answer)
      }
    })
    this.setState({ answers: newAnswers })
  }

  onChangeAnswer (answer) {
    var findCount = 0
    const type = answer.type
    const isRadio = type === 'radio'
    const isFile = type === 'file'
    const isCheckbox = type === 'checkbox'
    var newAnswers = []
    const _answers = this.state.answers
    for (let i = 0; i < _answers.length; i++) {
      const _answer = _answers[i]
      // Permitir unica resposta para uma pergunta.
      if (isRadio && _answer.idQuestion === answer.idQuestion) {
        _answer.value = answer.value
        _answer.idComponent = answer.idComponent
        findCount += 1
      }
      // Permitir multiplas respostas de idComponente distintos.
      else if (!isRadio && !isFile && _answer.idComponent === answer.idComponent) {
        _answer.value = answer.value
        findCount += 1
        if (isCheckbox && !answer.checked) {
          continue
        }
      }
      newAnswers.push(_answer)
    }
    // Se nenhuma resposta existente foi encontrado, adicione.
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

  componentDidUpdate () {
    console.log(this.state.answers)
  }

  render () {
    if (this.state.wait) {
      return [
        <Header title={this.state.form.title} key='0' />,
        <div key='1' className='container'>
          <h1>Aguarde enquanto carregamos!</h1>
        </div>
      ]
    } else {
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
                  onRemoveFiles={this.onRemoveFiles}
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
}

export default FormularioReadOnly
