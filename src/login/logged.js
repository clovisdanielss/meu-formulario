import React,{Component} from 'react'
import {UpdateGlobalStateContext} from '../context.js'
import {Redirect} from 'react-router-dom'

class Logged extends Component{
  static contextType = UpdateGlobalStateContext

  constructor(props){
    super(props)
    this.state={
      token : document.URL.split('#')[1].split('=')[1],
      isUserLogged:false,
    }
    this.loadUser = this.loadUser.bind(this)
  }

  componentDidMount(){
    this.loadUser()
  }

  loadUser(){
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      const user = JSON.parse(xhr.responseText)
      this.context({user:user})
      this.setState({isUserLogged:true})
    })
    xhr.open('get', process.env.REACT_APP_API + 'logged')
    xhr.setRequestHeader('Authorization', this.state.token)
    xhr.send()
  }

  render(){
    if(this.state.isUserLogged){
      return (<Redirect to='/formularios'/>)
    }else{
      return (<div/>)
    }
  }
}

export default Logged