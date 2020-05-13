import React, { Component } from 'react'

class CartaoPergunta extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id,
      question: props.question.title ? props.question.title : '',
      components: []
    }
    this.onChangeQuestion = this.onChangeQuestion.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  onAdd (component) {
    var components = this.state.components.concat(component)
    this.setState({ components: components })
  }

  onChangeQuestion (e) {
    this.setState({
      question: e.target.value
    })
    this.props.onChangeQuestion(this.state.id, e.target.value)
  }

  componentWillReceiveProps (props) {
    this.setState({
      id: props.id,
      question: props.question.title ? props.question.title : ''
    })
  }

  componentDidUpdate () {
    console.log('questao', this.state)
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
            <input value={this.state.title} className='input-text' id={'question' + this.props.id} type='text' onChange={this.onChangeQuestion} />
          </div>
          <div>
            {this.state.components.map((item, key) => {
              return (
                <div className='question-component-div' key={key}>
                  {item}
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
