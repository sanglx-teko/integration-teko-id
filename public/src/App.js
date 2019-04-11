import React, { Component } from 'react'
import tekoAuth from './oauthClients'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <a
            href={tekoAuth.code.getUri({
              query: {
                code_challenge: 'miraihanabichallenge',
                code_challenge_method: 'plain'
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
}

export default App
