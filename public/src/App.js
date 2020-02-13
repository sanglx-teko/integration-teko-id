import React, { Fragment, useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import TekoID from 'teko-oauth2'

const App = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    TekoID.init({
      clientId: 'f82a2730cafa497c848253bb211d7910',
      redirectUri: 'http://localhost:3000',
      scopes: ['openid', 'profile', 'read:permissions'],
      oauthDomain: 'https://oauth.develop.tekoapis.net'
    }).then(() => {
      setIsLoading(false)
      setIsLoggedIn(TekoID.user.isLoggedIn())
    })
  }, [])

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : isLoggedIn ? (
        <HomePageView userInfo={TekoID.user.getUserInfo()} />
      ) : (
        <LoginView />
      )}
    </Layout>
  )
}

const Loading = () => 'Loading user info....'

const HomePageView = props => (
  <Fragment>
    <p>User logged in!</p>
    <p>Current user id: {props.userInfo.sub}</p>
    <ul>
      {Object.keys(props.userInfo)
        .filter(
          item =>
            ![
              'auth_time',
              'aud',
              'at_hash',
              'iss',
              'meta_data',
              'nonce',
              'sid',
              'sub'
            ].includes(item)
        )
        .map((item, idx) => (
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
  </Fragment>
)

export const LoginView = props => (
  <p className='App-link' onClick={() => TekoID.user.login()}>
    Login with Teko
  </p>
)

const Layout = props => (
  <div className='App'>
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      {props.children}
    </header>
  </div>
)

export default App
