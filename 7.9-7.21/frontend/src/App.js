import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loggedUser } from './reducers/loginUserReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import Users from './components/Users'
import Logout from './components/Logout'
import User from './components/User'
import Blog from './components/Blog'


import {
  Routes,
  Route,
  Link,
  Navigate,
  useMatch
} from 'react-router-dom'
import {
  Container,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'

import { ThemeProvider, createTheme } from '@mui/material/styles'

const App = () => {
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#7d3fb5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  })

  const dispatch = useDispatch()

  const loginUser = useSelector(store => store.loginUser)
  const users = useSelector(store => store.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedUser(user))
    }
  }, [])

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blogId = matchBlog
    ? matchBlog.params.id
    : null

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div>
          <AppBar position="static">
            <Toolbar >
              <Box sx={{ flexGrow: 1 }}>
                <Button variant="outlined" sx={{ mx: 0.25 }} color="inherit" component={Link} to="/" >
              Home
                </Button>
                <Button variant="outlined" sx={{ mx: 0.25  }} color="inherit" component={Link} to="/blogs" >
              Blog List
                </Button>
                <Button variant="outlined" sx={{ mx: 0.25  }} color="inherit" component={Link} to="/users" >
              Users
                </Button>
              </Box>
              <div></div>
              {loginUser
                ?
                <>
                  <Typography>{loginUser.username} loggin in</Typography>
                  <Button variant="outlined" sx={{ mx: 1  }} color="inherit" component={Link} to="/logout">
                Logout
                  </Button>
                </>
                :
                <Button variant="outlined" sx={{ mx: 0.25  }} color="inherit" component={Link} to="/login">
                Login
                </Button>
              }
            </Toolbar>
          </AppBar>
        </div>
        <Notification />
        <Routes>
          <Route path="/blogs/:id" element={blogId ? <Blog blogId={blogId} /> : <Navigate replace to="/blogs" />} />
          <Route path='/users/:id' element={user ? <User user={user} /> : <Navigate replace to="/users" />} />
          <Route path="/users" element={loginUser ? <Users /> : <Navigate replace to="/login" />} />
          <Route path='/blogs' element={<BlogsList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<BlogsList />} />
        </Routes>

      </Container>
    </ThemeProvider>
  )
}


export default App
