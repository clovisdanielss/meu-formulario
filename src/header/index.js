import React from 'react'
import { Link } from 'react-router-dom'
const Header = (props) => {
  return (
    <div id='header'>
      {
        props.title
          ? (<h3>{props.title}</h3>)
          : (<Link to='/formularios'>
            <h3>MeuFormulário</h3>
          </Link>)
      }
      <hr />
    </div>

  )
}

export default Header
