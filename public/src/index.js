import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { tekoAuth as oauthClient } from './oauthClients'
import * as serviceWorker from './serviceWorker'

window.oauth2Callback = uri => {
  oauthClient.code
    .getToken(uri, {
      body: {
        scope: 'profile',
        code_verifier: 'miraihanabichallenge'
      }
    })
    .then(user => {
      console.log('User Token:', user)
    })
    .catch(err => {
      console.error(err)
    })
}

const queryString = window.location.search
if (queryString.includes('code') && queryString.includes('state')) {
  window.oauth2Callback(window.location.href)
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
