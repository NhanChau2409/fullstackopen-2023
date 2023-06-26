const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

require('express-async-errors')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('users')
	response.json(blogs)
})

blogRouter.post(
	'/',
	middleware.userExtractor,
	async (request, response) => {
		const body = request.body
		const user = request.user

		const blog = new Blog({
			title: body.title,
			url: body.url,
			author: body.author,
			likes: body.likes,
			users: [user.id],
		})

		const savedBlog = await blog.save()
		response.status(201).json(savedBlog)
	}
)

blogRouter.delete(
	'/:id',
	middleware.userExtractor,
	async (request, response) => {
		const user = request.user

		const deleteBlog = await Blog.findById(
			request.params.id
		)

		if (!deleteBlog.users[0].toString() === user.id) {
			const error = new Error()
			error.name = 'AuthorizationError'
			error.message = 'user invalid'
			throw error
		}

		await deleteBlog.deleteOne()

		response.status(204).end()
	}
)

blogRouter.put('/:id', async (request, response) => {
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		response.body,
		{
			new: true,
		}
	)
	response.status(200).json(updatedBlog)
})

module.exports = blogRouter
