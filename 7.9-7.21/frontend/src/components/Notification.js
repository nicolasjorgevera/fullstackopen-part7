import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(store => store.notification)
  if (notification === null) {
    return null
  }
  return (
    <>
      <Alert onClose={() => dispatch(clearNotification())} severity={notification.successful ? 'success' : 'error'}>{notification.text}</Alert>
    </>
  )
}

export default Notification