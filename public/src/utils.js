import crypto from 'crypto'

export const generateRandomString = (length = 20) => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

export const createS256CodeChallenge = codeVerifier =>
  crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('utf-8')

export const comparePlainCodeChallenge = (codeVerifier, codeChallenge) =>
  codeVerifier === codeChallenge

export const compareS256CodeChallenge = (codeVerifier, codeChallenge) =>
  createS256CodeChallenge(codeVerifier) === codeChallenge

export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export const getCookie = cname => {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
