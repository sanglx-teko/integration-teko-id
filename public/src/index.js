import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

window.TekoID.init({
  authorizationUri: 'http://localhost:5000/oauth/authorize',
  tokenUri: 'http://localhost:5000/oauth/token',
  clientId: '223449891694322388403506853641423214378',
  redirectUri: 'http://localhost:3000',
  scopes: [
    'openid',
    'user_profile:read',
    'user_profile:write',
    'issues:read',
    'issues:write'
  ]
}).then(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
