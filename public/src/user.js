import jwtDecode from 'jwt-decode'
import { memStorage } from './index'

const currentUser = {
  getInfo: () => {
    const { idToken } = memStorage
    if (!idToken) return null
    return jwtDecode(idToken)
  },
  isLoggedIn: () => {
    const { expireTime } = memStorage
    if (!expireTime) return false
    if (new Date() >= expireTime) return false
    return true
  }
}

export default currentUser
