const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)

	await User.deleteMany({})

	for (const user of helper.initalUsers) {
		await api.post('/api/users').send(user)
	}
})

describe('When there is initially some notes saved', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)

		await User.deleteMany({})

		for (const user of helper.initalUsers) {
			await api.post('/api/users').send(user)
		}
	})

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
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)

		await User.deleteMany({})

		for (const user of helper.initalUsers) {
			await api.post('/api/users').send(user)
		}
	})

	test('with content is successfully added', async () => {
		await api
			.post('/api/users')
			.send(helper.newUser)
			.expect(201)

		const loginResponse = await api
			.post('/api/login')
			.send({
				username: helper.newUser.username,
				password: helper.newUser.password,
			})

		const token = loginResponse.body.token

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(helper.newBlog)
			.expect(201)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length + 1
		)
	}, 100000)

	test('without content is not added', async () => {
		await api
			.post('/api/users')
			.send(helper.newUser)
			.expect(201)

		const loginResponse = await api
			.post('/api/login')
			.send({
				username: helper.newUser.username,
				password: helper.newUser.password,
			})

		const token = loginResponse.body.token

		const newBlog = {
			...helper.newBlog,
			title: null,
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(400)
	}, 100000)

	test('with invalid token is not added', async () => {
		// await api
		// 	.post('/api/users')
		// 	.send(helper.newUser)
		// 	.expect(201)

		await api
			.post('/api/login')
			.send({
				username: helper.newUser.username,
				password: helper.newUser.password,
			})
			.expect(401)
	}, 100000)
})

describe('Delete blog', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)

		await User.deleteMany({})

		for (const user of helper.initalUsers) {
			await api.post('/api/users').send(user)
		}
	})

	test('succeeds with status code 204 if id is valid && authorized', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogsToDelete = blogsAtStart[0]

		const loginResponse = await api
			.post('/api/login')
			.send({
				username: helper.initalUsers[0].username,
				password: helper.initalUsers[0].password,
			})
		const token = loginResponse.body.token

		await api
			.delete(`/api/blogs/${blogsToDelete.id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)
	}, 100000)
})

describe('Update note', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)

		await User.deleteMany({})

		for (const user of helper.initalUsers) {
			await api.post('/api/users').send(user)
		}
	})

	test('succeeds with status code 200 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogsToUpdate = blogsAtStart[0]

		const updateBlog = {
			title: 'New name',
			author: 'New author',
			url: 'New URL',
			likes: 10,
		}

		await api
			.put(`/api/blogs/${blogsToUpdate.id}`)
			.send(updateBlog)
			.expect(200)
	}, 100000)
})

afterAll(async () => {
	await mongoose.connection.close()
})
