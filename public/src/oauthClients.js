import ClientOAuth2 from 'client-oauth2'

export default new ClientOAuth2({
  clientId: 'public-sample-client',
  accessTokenUri: 'http://localhost:5000/oauth/token',
  authorizationUri: 'http://localhost:5000/oauth/authorize',
  redirectUri: 'http://localhost:3000',
  scopes: ['openid', 'profile'],
  state: sessionStorage.getItem('state') || null
})
