import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const { TekoID } = window

TekoID.init({
  clientId: 'b67d0f95d70545b3a55a492e21f0a276',
  scopes: ['openid', 'profile']
}).then(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

export { TekoID }
