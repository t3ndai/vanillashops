//imports 
import { API_URL } from './config.js'
import { getData, navigate } from './utils.js'
import { AuthorizationError } from './errors.js'

//Actions 

export async function checkAuth() {
 
  try {
    await getData(API_URL)
    navigate('/views/dash.html')
  }catch (err) {
    return false
  }
  
}