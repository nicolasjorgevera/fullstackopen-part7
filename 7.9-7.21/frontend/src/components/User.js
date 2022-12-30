import React from 'react'
import {
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import {
  useNavigate
} from 'react-router-dom'


const User = ({ user }) => {
  if (!user) return null
  const blogs = user.blogs
  const navigate = useNavigate()
  return (
    <>
      <Typography variant="h5" sx={{ my: 4 }}>
        <b>{user.username}</b>
      </Typography>
      <Typography variant="subtitle1" sx={{ my: 2 }}>
        <b>List of blogs</b>
      </Typography>
      <List>
        {blogs.map(blog => (
          <ListItemButton key={blog.id} onClick={() => navigate(`/blogs/${blog.id}`)}>
            <ListItemText primary={blog.title} />
          </ListItemButton>
        ))}
      </List>
    </>
  )
}

export default User