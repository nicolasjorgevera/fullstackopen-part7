import blogsServices from '../services/blogs'
import { setNotification } from './notificationReducer'

const sortBlogs = (blogs) => {
  blogs.sort ( function (a, b) {
    return (b.likes - a.likes)
  })
  return blogs
}

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return sortBlogs(action.data)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return state.filter (blog => blog.id !== action.data.id)
  case 'UPDATE_BLOG':{
    const updatedBlogs = state.map (blog => {
      if (blog.id === action.data.id) {
        return { ...blog, likes: action.data.likes }
      }
      return blog
    })
    const tidyBlogs = sortBlogs(updatedBlogs)
    return tidyBlogs
  }
  case 'ADD_COMMENT':{
    const updatedBlogs = state.map (blog => {
      if (blog.id === action.data.blog.id) {
        return { ...blog, comments: blog.comments.concat(action.data.comment)  }
      }
      return blog
    })
    const tidyBlogs = sortBlogs(updatedBlogs)
    return tidyBlogs
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsServices.getAll()
    dispatch(
      {
        type: 'INIT_BLOGS',
        data: blogs
      }
    )
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogsServices.create(blog)
      dispatch(
        {
          type:'NEW_BLOG',
          data: newBlog
        }
      )
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} added`, true, 5))
    } catch (error) {
      dispatch(setNotification(`ERROR: ${error.response.data.error}`, false, 5))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogsServices.remove(blog)
      dispatch(
        {
          type: 'DELETE_BLOG',
          data: blog
        }
      )
      dispatch(setNotification(`The blog ${blog.title} by ${blog.author} deleted`, true, 5))
    } catch (error) {
      dispatch(setNotification(`ERROR: ${error.response.data.error}`, false, 5))
    }
  }
}


export const voteBlog = (blog) => {
  return async dispatch => {
    try {
      const newLikes = blog.likes + 1
      const updatedBlog = { ...blog, likes: newLikes }
      await blogsServices.update(updatedBlog)
      dispatch ({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
    } catch (error) {
      dispatch(setNotification(`ERROR: ${error.response.data.error}`, false, 5))
    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      await blogsServices.addComment(blog, comment)
      dispatch({
        type: 'ADD_COMMENT',
        data: {
          blog: blog,
          comment: comment
        }
      })
    } catch (error) {
      dispatch(setNotification(`ERROR: ${error.response.data.error}`, false, 5))
    }
  }
}

export default reducer

