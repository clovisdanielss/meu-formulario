import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
class Transicao extends Component {
  constructor (props) {
    super(props)
  }

  shouldComponentUpdate (nProps, nState) {
    return nProps.goNext
  }

  render () {
    if (this.props.goNext) {
      return (<Redirect to={this.props.redirect} />)
    } else {
      return (<div />)
    }
  }
}

export default Transicao
