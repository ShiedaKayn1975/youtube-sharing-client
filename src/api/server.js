import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.api+json'
  }
})

client.hasToken = () => {
  return !!client.defaults.headers['Authorization']
}

client.receiveAuthToken = (token, persist = true) => {
  client.defaults.headers['Authorization'] = 'Bearer ' + token
  if (persist) localStorage.setItem('jwtToken', token)
}

client.removeAuthToken = () => {
  delete client.defaults.headers['Authorization']
}

client.loadTokenFromLocal = () => {
  client.isVisiting = false
  let token = localStorage.getItem('jwtToken')
  if (token) {
    client.receiveAuthToken(token)
  }
}

client.login = (data, onSuccess, onError) => {
  return client.post('/api/v1/login', {
      email: data.email,
      password: data.password
    }, { headers: { 'Content-Type': 'application/json'} })
    .then(response => {
      client.receiveAuthToken(response.data.token)
      if (onSuccess) onSuccess(response)
      window.location = '/'
    })
    .catch(error => {
      if(onError){
        onError(error)
      }
    })
}

client.signup = (data, onSuccess, onError) => {
  return client.post('/api/v1/signup', {
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation
  }, { headers: { 'Content-Type': 'application/json' } })
  .then(response => {
    let token = response.data.token
    client.receiveAuthToken(token)
    if (onSuccess) onSuccess(response)
    window.location = '/'
  })
  .catch(error => {
  })
}

client.loadTokenFromLocal()

export default client
