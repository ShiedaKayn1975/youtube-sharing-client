import actionCable from 'actioncable'

const WS_HOST = process.env.REACT_APP_WS_SERVICE_HOST

const createConsumer = (user_id) => actionCable.createConsumer(`${WS_HOST}/api/v1/cable/${user_id}`)

export function subscribeNotificationChannel(user_id, dispatch){

  createConsumer(user_id).subscriptions.create({channel: "NotificationChannel", user: user_id}, {
    received: (newNotification) => {
      dispatch({
        type: 'PUSH_NOTIFICATION',
        payload: {
          newNotification: newNotification,
        }
      })
    }
  })
}
