import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'


const NewBlog = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const addBlog = async (blogObject) => {
    dispatch(createBlog(blogObject))
    blogFormRef.current.toggleVisibility()
  }

  const NewBlog = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {user === null
        ? null
        : NewBlog()
      }
    </div>

  )

}

export default NewBlog
