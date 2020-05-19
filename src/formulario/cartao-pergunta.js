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

  componentWillReceiveProps (props) {
    document.getElementById('question' + this.props.question.id).value = props.question.title
  }

  render () {
    return (
      <div id={this.props.question.id} className='auto-generated'>
        <div className='div-left'>
          <input onClick={this.props.onSelect} data-id={this.props.question.id} type='radio' name='selected' />
        </div>
        <div className='div-right'>
          <div className='question-text-div'>
            <label
              className='question-label'
              htmlFor={'question' + this.props.question.id}
            >
                   Questão {1 + this.props.index}{this.props.question.required ? '*' : null}
            </label>
            <input className='input-text' id={'question' + this.props.question.id} type='text' onChange={this.onChangeQuestion} />
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
