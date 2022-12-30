import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteBlog, removeBlog, addComment } from '../reducers/blogsReducer'
import {
  Typography,
  Button,
  Link,
  Box,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel
} from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'

const Blog = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const loginUser = useSelector(store => store.loginUser)
  const blogs = useSelector(store => store.blogs)
  const blog = blogs.find(blog => blog.id === blogId)

  const dispatch = useDispatch()

  const updateBlog = async (blogObject) => {
    dispatch(voteBlog(blogObject))
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`remove ${blogObject.title} by ${blogObject.author}?`)) {
      dispatch(removeBlog(blogObject))
    }
  }

  const addCommentToBlog = async (blog) => {
    console.log(comment)
    dispatch(addComment(blog, comment))
    setComment('')
  }





  if (!blog) return null

  return (
    <div>
      <Typography></Typography>
      <Typography variant='h5' sx={{ my: 4 }}>
        {blog.title}
      </Typography>
      <Box component="div" sx= {{ my: 2 }} >
        <Typography sx={{ display: 'inline' }} >URL: </Typography>
        <Link href={blog.url} sx={{ display:'inline', my: 2 }} underline="hover">
          {blog.url}
        </Link>
      </Box>
      <Box component="div" sx={{ my: 2 }}>
        <Typography sx={{ display: 'inline' }}  >{blog.likes} likes </Typography>
        <Button variant="contained" sx={{ display: 'inline' }} onClick={() => updateBlog(blog)}>like</Button>
      </Box >
      {loginUser
        ? (loginUser.username === blog.user.username)
          ? <Button variant="contained" sx={{ my: 4 }} onClick={() => deleteBlog(blog)}>remove</Button>
          : null
        : null
      }
      <Typography variant='subtitle1' sx={{ my: 2 }}>
        <b>Comments</b>
      </Typography>
      {loginUser
        ?
        <FormControl>
          <InputLabel >Add a comment...</InputLabel>
          <OutlinedInput
            label="Add a comment..."
            size="medium"
            variant="outlined"
            onChange={({ target }) => setComment(target.value)}
            value={comment}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => addCommentToBlog(blog)}>
                  <CommentIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        :
        null
      }
      <List dense={true}>
        {
          blog.comments.map(comment => (
            <ListItem key={comment}   sx={{
              magin: 0,
              paddingLeft: 5,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              fontStyle: 'italic'
            }}>
              <ListItemText primary={'❝ ' + comment + ' ❞'} />
            </ListItem>
          ))
        }
      </List>
    </div>
  )
}

export default Blog