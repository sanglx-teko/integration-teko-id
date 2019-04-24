import ClientOAuth2 from 'client-oauth2'

export default new ClientOAuth2({
  clientId: 'public-sample-client',
  accessTokenUri: 'https://id.teko.vn/oauth/token',
  authorizationUri: 'https://id.teko.vn/oauth/authorize',
  redirectUri: 'http://localhost:3000',
  scopes: ['openid', 'profile'],
  state: sessionStorage.getItem('state') || null
})
