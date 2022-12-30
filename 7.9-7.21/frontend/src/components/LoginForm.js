import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginUserReducer'
import { useNavigate } from 'react-router-dom'
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Typography
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
    navigate('/')
  }


  return (
    <div>
      <Typography variant='h5' sx={{ my: 4 }}>Login</Typography>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
        <OutlinedInput
          id="input-username"
          type={'text'}
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          label="Username"
        />
      </FormControl>
      <br></br>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="input-password"
          type={showPassword ? 'text' : 'password'}
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <br></br>
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </div>
  )
}

export default LoginForm