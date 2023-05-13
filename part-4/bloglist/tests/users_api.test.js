const helper = require('./test_helper')
// const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

// This is only for generate data into database
beforeEach(async () => {
	for (const user of helper.initalUsers) {
		await api.post('/api/users').send(user)
	}
})

test('null test', () => {})

afterAll(async () => {
	await mongoose.connection.close()
})
