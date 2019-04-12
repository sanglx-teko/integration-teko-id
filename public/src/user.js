import jwtDecode from 'jwt-decode'

const currentUser = {
  getInfo: () => {
    const idToken = localStorage.getItem('id_token')
    if (!idToken) return null
    return jwtDecode(idToken)
  },
  isLoggedIn: () => {
    const expireTime = localStorage.getItem('expires_in')
    if (!expireTime) return false
    if (new Date() >= expireTime) return false
    return true
  }
}

export default currentUser
