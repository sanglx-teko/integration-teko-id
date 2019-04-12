import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as constants from './constants'
import tekoAuth from './oauthClients'
import * as serviceWorker from './serviceWorker'

window.oauth2Callback = uri => {
  tekoAuth.code
    .getToken(uri, {
      body: { code_verifier: 'miraihanabichallenge' }
    })
    .then(user => {
      console.log('User Token:', user)
      localStorage.setItem(constants.TEKO_ACCESS_TOKEN_KEY, user.accessToken)
      localStorage.setItem(constants.TEKO_ID_TOKEN_KEY, user.idToken)
      window.location.replace('/')
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
