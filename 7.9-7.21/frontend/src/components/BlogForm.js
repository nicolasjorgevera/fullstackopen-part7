import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography
} from '@mui/material'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)

  const addNote = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes(0)
  }

  return (
    <>
      <Typography variant='h6' sx={{ my: 2 }}>New Blog</Typography>
      <TextField
        label="Title"
        id="title"
        type="text"
        value={newTitle}
        name="Title"
        margin="dense"
        onChange={({ target }) => setNewTitle(target.value)}
      />
      <br></br>
      <TextField
        label="Author"
        id="author"
        type="text"
        value={newAuthor}
        name="Author"
        margin="dense"
        onChange={({ target }) => setNewAuthor (target.value)}
      />
      <br></br>
      <TextField
        label="Url"
        id="url"
        type="text"
        value={newUrl}
        margin="dense"
        onChange={({ target }) => setNewUrl(target.value)}
      />
      <br></br>
      <TextField
        label="Likes"
        id="likes"
        type="number"
        value={newLikes}
        margin="dense"
        onChange={({ target }) => setNewLikes(target.value)}
      />
      <br></br>
      <Button variant="contained" onClick={addNote}>Add Note</Button>
    </>
  )
}

export default BlogForm