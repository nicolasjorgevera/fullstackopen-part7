import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginUserReducer'
import { useNavigate } from 'react-router-dom'

import {
  Typography
} from '@mui/material'


const Logout = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    setTimeout(() => navigate('/'), 5000)
  }

  useEffect(() => handleLogout, [])

  return (
    <div>
      <Typography variant="h5" sx={{ my: 4 }}><b>Succesful Logout</b></Typography>
      <br></br>
      <Typography variant="body1" sx={{ my: 4 }}>Redirection to home page in a few secods...</Typography>
    </div>
  )
}

export default Logout