import React from 'react'
import tekoAuth from './oauthClients'
import logo from './logo.svg'
import './App.css'
import { generateRandomString, setCookie } from './utils'

const App = props => {
  const newState = generateRandomString()
  setCookie('state', newState)

  const newCodeVerifier = generateRandomString()
  setCookie('code_verifier', newCodeVerifier)
  const codeChallenge = newCodeVerifier

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <a
          href={tekoAuth.code.getUri({
            query: {
              code_challenge: codeChallenge,
              code_challenge_method: 'plain',
              state: newState
            }
          })}
          className='App-link'
        >
          Login with Teko
        </a>
      </header>
    </div>
  )
}

export default App
