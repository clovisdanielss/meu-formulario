import React, { Component } from 'react'
import CustomInput from './custom-input'

class CartaoPergunta extends Component {
  constructor (props) {
    super(props)

    this.state = {
      components: []
    }

    this.loadComponents = this.loadComponents.bind(this)
  }

  loadComponents () {
    this.setState({ components: this.props.question.components })
  }

  componentDidMount () {
    this.loadComponents()
  }

  render () {
    return (
      <div className='auto-generated'>
        <div className='question-text-div'>
          <h3>{this.props.question.title}</h3>
        </div>
        <div>
          {this.state.components.map((item, key) => {
            return (
              <CustomInput
                key={key}
                component={item}
                onChangeAnswer={this.props.onChangeAnswer}
                idQuestion={this.props.question.id}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default CartaoPergunta
