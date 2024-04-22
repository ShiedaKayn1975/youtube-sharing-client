import { combineReducers } from 'redux'
import currentUser from './currentUser'
import loadingState from './loadingState'
import notification from './notification'

export default combineReducers({
  currentUser,
  loadingState,
  notification
})
