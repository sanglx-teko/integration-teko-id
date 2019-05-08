import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

window.TekoID.init({
  clientId: 'public-sample-client',
  redirectUri: 'http://localhost:3000',
  scopes: ['openid', 'profile']
}).then(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
