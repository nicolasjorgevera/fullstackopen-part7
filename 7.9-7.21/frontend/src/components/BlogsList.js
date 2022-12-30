import React from 'react'
import { useSelector } from 'react-redux'
import NewBlog from './NewBlog'
import {
  Typography,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material'
import {
  useNavigate
} from 'react-router-dom'


const BlogsList = () => {

  const blogs = useSelector(store => store.blogs)
  const user = useSelector(store => store.loginUser)
  const navigate = useNavigate()


  return (
    <>
      <Typography variant='h4' sx={{ my: 4 }} > <b>Blogs</b></Typography>
      {user ? <><NewBlog /><br></br></> : null}
      <div id="blogList">
        <List dense={true}>
          {
            blogs.map(blog => (
              <ListItemButton key={blog.id} onClick={() => navigate(`/blogs/${blog.id}`)}>
                <ListItemText primary={blog.title} />
              </ListItemButton>
            )
            )
          }
        </List>
      </div>
    </>
  )
}

export default BlogsList