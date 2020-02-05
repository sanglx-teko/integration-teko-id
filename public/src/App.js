import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { TekoID } from './index'

const App = props => {
  const [update, forceUpdate] = useState(false)
  if (TekoID.user.isLoggedIn())
    return <HomePageView userInfo={TekoID.user.getUserInfo()} />
  return <LoginView update={update} forceUpdate={forceUpdate} />
}

const HomePageView = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <a
          href='http://localhost:3000'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={logo} className='App-logo' alt='logo' />
        </a>
        <p>User logged in!</p>
        <p>Current user info: {props.userInfo.sub}</p>
        <ul>
          {Object.keys(props.userInfo).map((item, idx) => (
            <div style={{ fontSize: 15 }} key={idx}>
              {item}: {props.userInfo[item]}
            </div>
          ))}
        </ul>
        <p
          className='App-link'
          onClick={() => {
            TekoID.user.logout()
          }}
        >
          Logout
        </p>
      </header>
    </div>
  )
}

export const LoginView = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p className='App-link' onClick={() => TekoID.user.login()}>
          Login with Teko
        </p>
      </header>
    </div>
  )
}

export default App
