import React from 'react'
import tekoAuth from './oauthClients'
import logo from './logo.svg'
import './App.css'
import currentUser from './user'
import { generateRandomString, setCookie } from './utils'

const App = props => {
  if (currentUser.isLoggedIn())
    return <HomePageView {...props} userInfo={currentUser.getInfo()} />
  return <LoginView {...props} />
}

const HomePageView = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>User logged in!</p>
        <p>Current user info: {props.userInfo.name}</p>
        <p
          className='App-link'
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
        >
          Logout
        </p>
      </header>
    </div>
  )
}

const LoginView = props => {
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
