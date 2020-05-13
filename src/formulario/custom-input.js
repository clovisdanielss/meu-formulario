import React, { Component } from 'react'

class CustomInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id,
      text: '',
      type: props.type ? props.type : 'checkbox'
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    if (this.state.type !== 'file') {
      this.setState({
        text: e.target.value
      })
      this.props.onChangeComponent(this.state.id, e.target.value)
    } else {
      this.setState({
        text: e.target.files[0]
      })
      this.props.onChangeComponent(this.state.id, e.target.files[0])
    }
  }

  render () {
    if (this.state.type === 'textarea') {
      return (
        <div data-id={this.state.id}>
          <textarea data-id={this.state.id} onChange={this.onChange} />
        </div>
      )
    } else if (this.state.type === 'date' || this.state.type === 'file') {
      return (
        <div>
          <input className='input-text' data-id={this.state.id} type={this.state.type} onChange={this.onChange} accept='image/*' />
        </div>
      )
    } else {
      return (
        <div data-id={this.state.id}>
          <div className='div-left'>
            <input data-id={this.state.id} type={this.state.type} name={'question' + this.props.questionId} />
          </div>
          <div className='div-right'>
            <input className='input-text' type='text' onChange={this.onChange} />
          </div>
        </div>
      )
    }
  }
}

export default CustomInput
