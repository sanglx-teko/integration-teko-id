import React from 'react'
import logo from './logo.svg'
import './App.css'

const App = props => {
  if (window.tekoId.isLoggedIn())
    return (
      <HomePageView {...props} userInfo={window.tekoId.getCurrentUserInfo()} />
    )
  return <LoginView {...props} />
}

const HomePageView = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>User logged in!</p>
        <p>Current user info: {props.userInfo.name}</p>
        <p className='App-link' onClick={window.tekoId.logout}>
          Logout
        </p>
      </header>
    </div>
  )
}

const LoginView = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p className='App-link' onClick={window.tekoId.login}>
          Login with Teko
        </p>
      </header>
    </div>
  )
}

export default App
