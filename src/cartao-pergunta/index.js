import React, { Component } from 'react'

class CartaoPergunta extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id,
      question: '',
      components: []
    }
    this.onChangeQuestion = this.onChangeQuestion.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  onAdd (element) {
    this.state.components.push(element)
    this.forceUpdate()
  }

  onChangeQuestion (e) {
    this.setState({
      question: e.target.value
    })
    this.props.onChangeQuestion(this.state.id, e.target.value)
  }

  render () {
    return (
      <div id={this.props.id}>
        <input onClick={this.props.onSelect} data-id={this.props.id} type='radio' name='selected' />
        <div>
          <label htmlFor={'question' + this.props.id}>Questão {1 + this.props.index}</label>
          <input id={'question' + this.props.id} type='text' onChange={this.onChangeQuestion} />
        </div>
        <div>
          {this.state.components.map((item, key) => {
            return (
              <div key={key}>
                {item}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default CartaoPergunta
