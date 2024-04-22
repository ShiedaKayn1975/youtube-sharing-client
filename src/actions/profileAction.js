import client from '../api/server'

export const loadProfile = () => dispatch => {
  dispatch({
    type: 'LOADING_STATE_UPDATED',
    resource: 'currentUser',
    state: 'loading'
  })

  return client.get('/api/v1/me', {}, {
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => {
    // TODO: better way to dispatch multi actions
    dispatch({
      type: 'PROFILE_LOADING_SUCCESS',
      payload: {
        user: response.data,
      }
    })

    dispatch({
      type: 'LOADING_STATE_UPDATED',
      resource: 'currentUser',
      state: 'success'
    })
  })
  .catch(error => {
    dispatch({
      type: 'LOADING_STATE_UPDATED',
      resource: 'currentUser',
      state: 'failed'
    })
  })
}
