const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const setNotification = ( text, successful, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { text, successful }
    })
    await setTimeout(() => {
      dispatch(clearNotification())}, seconds * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer
