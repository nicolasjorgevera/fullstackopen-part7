const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User =  require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(body.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
    comments: body.comments || []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogsRouter.delete ('/:id', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(body.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    await user.blogs.filter((blog) => blog !== blog.id)
    await user.save()
    response.status(204).end()
  } else {
    response.status(400).json({ error: 'invalid user' })
  }
})


blogsRouter.put ('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id,
    comments: body.comments
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blog)
})

blogsRouter.put ('/:id/comments', async (request, response) => {
  const comment = request.body.comment
  const blog = await Blog.findById(request.params.id)
  console.log('BLOG:', blog)
  const newComments = blog.comments.concat (comment)
  console.log('NEW COMMENTS:', newComments)
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user,
    comments: newComments
  }
  console.log('NEW BLOG:', updatedBlog)
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.json(updatedBlog)
})


module.exports = blogsRouter