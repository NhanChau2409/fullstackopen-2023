const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe('When there is initially some notes saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	}, 100000)

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(
			helper.initialBlogs.length
		)
	}, 100000)

	test('blog unique identifier property is named id', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[0].id).toBeDefined()
	}, 100000)
})

describe('When add new blog', () => {
	test('with content is successfully added', async () => {
		const newBlog = {
			title: 'New name',
			author: 'New author ',
			url: 'New URL',
			likes: 0,
			id: '5a422b891b54a676234d17fb',
		}

		await api.post('/api/blogs').send(newBlog).expect(201)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length + 1
		)
	}, 100000)

	test('without content is not added', async () => {
		const newBlog = {
			author: 'New author ',
			likes: 0,
			id: '5a422b891b54a676234d17fb',
		}

		await api.post('/api/blogs').send(newBlog).expect(400)
	}, 100000)
})

describe('Delete blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogsToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogsToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)
	}, 100000)
})

describe('Update note', () => {
	test('succeeds with status code 200 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogsToUpdate = blogsAtStart[0]

		const updateBlog = {
			title: 'New name',
			author: 'New author',
			url: 'New URL',
			likes: 10,
		}

		console.log(blogsToUpdate.id)

		await api
			.put(`/api/blogs/${blogsToUpdate.id}`)
			.send(updateBlog)
			.expect(200)
	}, 100000)
})

afterAll(async () => {
	await mongoose.connection.close()
})
