export default (state = [], action) => {
  switch (action.type) {
  case 'PUSH_NOTIFICATION':
    const newNotification = action.payload.newNotification
    const existedNotification = state.find((element) => element.id == newNotification.id)
    if(!existedNotification){
      return [newNotification, ...state]
    }else{
      return state
    }
  default:
    return state
  }
}
