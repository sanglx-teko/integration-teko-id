import ClientOAuth2 from 'client-oauth2'
import * as constants from './constants'

export default new ClientOAuth2({
  clientId: constants.TEKO_ID,
  accessTokenUri: 'https://localhost:5000/oauth/token',
  authorizationUri: 'http://localhost:5000/oauth/authorize',
  redirectUri: 'https://localhost:3000',
  scopes: ['profile'],
  state: 'mirai.hanabi'
})
