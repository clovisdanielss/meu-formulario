import React, { Component } from 'react'
import CartaoPergunta from './cartao-pergunta'
var fakeData = [
  {
    id: 0,
    title: 'Quanto é 7*8 ?',
    components: [
      {
        id: 0,
        type: 'radio',
        text: '10'
      },
      {
        id: 1,
        type: 'radio',
        text: '56'
      },
      {
        id: 2,
        type: 'radio',
        text: '60'
      },
      {
        id: 3,
        type: 'radio',
        text: '64'
      }
    ]
  },
  {
    id: 1,
    title: 'Qual comida você mais gosta ?',
    components: [
      {
        id: 4,
        type: 'checkbox',
        text: 'Biscoito'
      },
      {
        id: 5,
        type: 'checkbox',
        text: 'Pão'
      },
      {
        id: 6,
        type: 'checkbox',
        text: 'Leite'
      }
    ]
  }
]

class FormularioReadOnly extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questions: [],
      answers: []
    }

    this.loadForm = this.loadForm.bind(this)
    this.onChangeAnswer = this.onChangeAnswer.bind(this)
  }

  onChangeAnswer (answer, allowPush) {
    var findCount = 0
    this.state.answers.map((_answer) => {
      if (!allowPush && _answer.idQuestion === answer.idQuestion) {
        _answer.value = answer.value
        _answer.idComponent = answer.idComponent
        findCount += 1
      } else if (allowPush && _answer.idComponent === answer.idComponent) {
        _answer.value = answer.value
        findCount += 1
      }
    })
    if (!findCount) {
      this.state.answers.push(answer)
    }
  }

  loadForm () {
    this.setState({
      questions: fakeData
    })
  }

  componentDidMount () {
    this.loadForm()
  }

  componentDidUpdate () {
    console.log(this.state.answers)
  }

  render () {
    return (
      <div className='container'>
        {this.state.questions.map((question, key) => {
          return (
            <CartaoPergunta
              key={key}
              question={question}
              onChangeAnswer={this.onChangeAnswer}
            />
          )
        })}
      </div>
    )
  }
}

export default FormularioReadOnly
