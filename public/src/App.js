import React from 'react'
import logo from './logo.svg'
import './App.css'

const TekoID = window.TekoID

const App = props => {
  if (TekoID.user.isLoggedIn())
    return <HomePageView {...props} userInfo={TekoID.user.getUserInfo()} />
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
            TekoID.user.logout()
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
