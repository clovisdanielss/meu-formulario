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
    this.setState({
      text: e.target.value
    })
    this.props.onChangeComponent(this.state.id, e.target.value)
  }

  render () {
    if (this.state.type === 'textarea') {
      return (
        <div data-id={this.state.id}>
          <textarea data-id={this.state.id} onChange={this.onChange} />
        </div>
      )
    } else {
      return (
        <div data-id={this.state.id}>
          <input data-id={this.state.id} type={this.state.type} name={'question' + this.props.questionId} />
          <input type='text' onChange={this.onChange} />
        </div>
      )
    }
  }
}

export default CustomInput
