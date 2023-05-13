const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

require('express-async-errors')

userRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs')
	response.json(users)
})

userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	/* validate password in controllers
	because password when sending to database is transformed (hashed)
	can not use mongoose validation isntead
	but username is fine */
	if (password === null || password.length < 3) {
		const error = new Error()
		error.name='ValidationError'
		error.message =
			'password must be at least 3 characters long'
		throw error // throw the error to be caught by the error handling middleware
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(
		password,
		saltRounds
	)

	const user = new User({
		username,
		name,
		passwordHash,
	})
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

module.exports = userRouter
