import React from 'react'
import logo from './logo.svg'
import TekoID from 'teko-oauth2'
import './App.css'

const App = props => {
  if (TekoID.user.isLoggedIn())
    return <HomePageView {...props} userInfo={TekoID.user.getUserInfo()} />
  return <LoginView />
}

const HomePageView = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
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
