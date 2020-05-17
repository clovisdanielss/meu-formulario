import React, { Component } from 'react'

class CustomInput extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    const idQuestion = this.props.idQuestion
    const type = e.target.getAttribute('type')
    const value = this.props.component.type === 'file'
      ? e.target.files[0] : e.target.value
    var answer = {
      idQuestion: idQuestion,
      value: value,
      idComponent: e.target.getAttribute('data-id'),
      titleQuestion: this.props.titleQuestion,
      type: type
    }

    this.props.onChangeAnswer(answer)
  }

  render () {
    if (this.props) {
      const type = this.props.component.type
      const text = this.props.component.text
      const id = this.props.component.id
      if (type === 'textarea') {
        return (
          <div>
            <textarea data-id={id} onChange={this.onChange} />
          </div>
        )
      } else if (type === 'file' || type === 'date') {
        return (
          <div>
            <input data-id={id} type={type} className='input-text' onChange={this.onChange} accept='image/*' />
          </div>
        )
      } else {
        return (
          <div>
            <div className='div-left'>
              <input data-id={id} value={text} type={type} name={'question' + this.props.idQuestion} onChange={this.onChange} />
            </div>
            <div className='div-right'>
              <label>{text}</label>
            </div>
          </div>
        )
      }
    }
  }
}

export default CustomInput
