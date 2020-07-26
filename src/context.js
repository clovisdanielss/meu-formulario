import React from 'react'

import './index.css'

const globalState = {
  user: {
    "id": 5,
    "username": "clovisdaniel",
    "lastToken": "0b29404f41a13693ffef7dd2c847affc8623a3107441e0176de868e3b49c47bb"
  }
}

const GlobalStateContext = React.createContext(globalState)
const UpdateGlobalStateContext = React.createContext(undefined)

export {
  GlobalStateContext,
  UpdateGlobalStateContext,
  globalState
}
