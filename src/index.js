import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { GlobalStateContext, UpdateGlobalStateContext, globalState } from './context.js'

const GlobalStateProvider = ({ children }) => {
  const [state, setState] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    globalState)
  return (
    <GlobalStateContext.Provider value={state}>
      <UpdateGlobalStateContext.Provider value={setState}>
        {children}
      </UpdateGlobalStateContext.Provider>
    </GlobalStateContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
