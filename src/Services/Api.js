// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const auth = apisauce.create({
  // base URL is read from the "constructor"
  baseURL: "https://adminauthentication.developmentyard.org/api",
  // here are some default headers
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json'
  },
  timeout: 30000
})


const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: "https://scholigit.developmentyard.org/api",
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      Accept: 'application/json'
    },
    timeout: 30000
  })
  
export default {
    api,
    auth
}
