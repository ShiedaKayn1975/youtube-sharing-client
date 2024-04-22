import { createStore, applyMiddleware, compose } from 'redux'
import {thunk} from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const initialStore = {}

export default function configureStore(initialState = initialStore, middlewares = []) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    typeof(initialState) === 'object' ? initialState : initialState(),
    composeEnhancers(
      applyMiddleware(thunk, ...middlewares)
    )
  )
}
