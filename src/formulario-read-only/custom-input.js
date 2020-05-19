import React, { Component } from 'react'
import Datetime from 'react-datetime-picker'

class CustomInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: null
    }
    this.onChange = this.onChange.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
  }

  onChange (e) {
    const idQuestion = this.props.idQuestion
    const type = this.props.component.type
    const value = type === 'date'
      ? e : e.target.value
    var answer = {
      idQuestion: idQuestion,
      value: value,
      idComponent: this.props.component.id,
      titleQuestion: this.props.titleQuestion,
      type: type
    }
    if (type === 'date') {
      this.setState({ date: value })
    }
    this.props.onChangeAnswer(answer)
  }

  onChangeFile (e) {
    const file = e.target.files[0]
    var reader = new FileReader()
    const props = this.props
    reader.readAsArrayBuffer(file)
    reader.onload = (e) => {
      const buffer = Buffer.from(e.target.result).toJSON().data
      var answer = {
        idQuestion: props.idQuestion,
        value: { data: buffer, name: file.name },
        idComponent: props.component.id,
        titleQuestion: props.titleQuestion,
        type: props.component.type
      }
      props.onChangeAnswer(answer)
    }
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
      } else if (type === 'file') {
        return (
          <div>
            <input data-id={id} type={type} className='input-text' onChange={this.onChangeFile} />
          </div>
        )
      } else if (this.props.component.type === 'date') {
        return (
          <div className='datetime'>
            <Datetime
              minDate={new Date()} disableClock hourPlaceholder='Up/Dn' value={this.state.date} data-id={id} type={type} className='input-text' onChange={this.onChange}
            />
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
