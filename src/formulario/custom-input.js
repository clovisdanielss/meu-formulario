import React, { Component } from 'react'
import Datetime from 'react-datetime-picker'

class CustomInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      date: null
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    if (this.props.component.type === 'date') {
      const value = e
      this.props.onChangeComponent(this.props.component.id, e)
      this.setState({ date: value })
    } else if (this.props.component.type !== 'file') {
      this.props.onChangeComponent(this.props.component.id, e.target.value)
    } else {
      this.props.onChangeComponent(this.props.component.id, e.target.files[0])
    }
  }

  componentWillReceiveProps (props) {
    document.getElementById('component' + this.props.component.id).value = props.component.data
  }

  render () {
    if (this.props.component.type === 'textarea') {
      return (
        <div data-id={this.props.component.id}>
          <textarea id={'component' + this.props.component.id} data-id={this.props.component.id} onChange={this.onChange} />
        </div>
      )
    } else if (this.props.component.type === 'file') {
      return (
        <div>
          <input id={'component' + this.props.component.id} className='input-text' data-id={this.props.component.id} type={this.props.component.type} onChange={this.onChange} accept='image/*' />
        </div>
      )
    } else if (this.props.component.type === 'date') {
      return (
        <div id={'component' + this.props.component.id}>
          <Datetime
            minDate={new Date()} disableClock hourPlaceholder='Setas para editar horas' value={this.state.date}
            data-id={this.props.component.id}
            type={this.props.component.type} className='input-text' onChange={this.onChange}
          />
        </div>

      )
    } else {
      return (
        <div data-id={this.props.component.id}>
          <div className='div-left'>
            <input data-id={this.props.component.id} type={this.props.component.type} name={'question' + this.props.idQuestion} />
          </div>
          <div className='div-right'>
            <input id={'component' + this.props.component.id} className='input-text' type='text' onChange={this.onChange} />
          </div>
        </div>
      )
    }
  }
}

export default CustomInput
