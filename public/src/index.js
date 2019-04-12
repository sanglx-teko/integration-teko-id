import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import tekoAuth from './oauthClients'
import { getCookie } from './utils'
import * as serviceWorker from './serviceWorker'

window.oauth2Callback = uri => {
  tekoAuth.code
    .getToken(uri, {
      body: { code_verifier: getCookie('code_verifier') }
    })
    .then(user => {
      localStorage.setItem('expires_in', user.expires)
      localStorage.setItem('access_token', user.accessToken)
      localStorage.setItem('id_token', user.data.id_token)
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
