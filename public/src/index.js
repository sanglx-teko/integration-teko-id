import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import tekoAuth from './oauthClients'
import * as serviceWorker from './serviceWorker'

export let memStorage = {}

window.oauth2Callback = uri => {
  tekoAuth.code
    .getToken(uri, {
      body: { code_verifier: sessionStorage.getItem('code_verifier') }
    })
    .then(user => {
      memStorage = {
        ...memStorage,
        idToken: user.data.id_token,
        accessToken: user.accessToken,
        expireTime: user.expires,
        scopes: user.data.scopes
      }
      ReactDOM.render(<App />, document.getElementById('root'))
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      window.history.pushState(null, document.title, '/')
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
