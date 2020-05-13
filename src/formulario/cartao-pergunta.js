import React, { Component } from 'react'
import CustomInput from './custom-input'

class CartaoPergunta extends Component {
  constructor (props) {
    super(props)
    this.onChangeQuestion = this.onChangeQuestion.bind(this)
  }

  onChangeQuestion (e) {
    this.props.onChangeQuestion(this.props.question.id, e.target.value)
  }

  componentDidUpdate () {
    console.log('questao', this.props.question)
  }

  componentWillReceiveProps (props) {
    document.getElementById('question' + this.props.id).value = props.question.title
  }

  render () {
    return (
      <div id={this.props.id} className='auto-generated'>
        <div className='div-left'>
          <input onClick={this.props.onSelect} data-id={this.props.id} type='radio' name='selected' />
        </div>
        <div className='div-right'>
          <div className='question-text-div'>
            <label className='question-label' htmlFor={'question' + this.props.id}>Questão {1 + this.props.index}</label>
            <input className='input-text' id={'question' + this.props.id} type='text' onChange={this.onChangeQuestion} />
          </div>
          <div>
            {this.props.question.components.map((component, key) => {
              return (
                <div className='question-component-div' key={key}>
                  <CustomInput
                    component={component}
                    idQuestion={this.props.question.id}
                    onChangeComponent={this.props.onChangeComponent}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default CartaoPergunta
