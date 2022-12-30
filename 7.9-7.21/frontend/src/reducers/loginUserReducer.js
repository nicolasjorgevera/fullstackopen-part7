import loginServices from '../services/login'
import blogsServices from '../services/blogs'
import { setNotification } from './notificationReducer'
import { useDispatch } from 'react-redux'




const loginUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  case 'SET_LOGGEDUSER':
    return action.data
  default:
    return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginServices.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      await blogsServices.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
      dispatch(setNotification('succesfull login', true, 5))
    } catch (exception){
      const dispatch = useDispatch()
      dispatch(setNotification(`ERROR: ${exception.response.data.error}`, false, 5))
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return dispatch => {
    dispatch({
      type: 'CLEAR_USER'
    })
    dispatch(setNotification('successful logout', true, 5))
  }
}

export const loggedUser = (user) => {
  return async dispatch => {
    try {
      await blogsServices.setToken(user.token)
      dispatch({
        type: 'SET_LOGGEDUSER',
        data: user
      })
    } catch (exception) {
      const dispatch = useDispatch()
      dispatch(setNotification(`ERROR: ${exception.response.data.error}`, false, 5))
    }
  }
}

export default loginUserReducer