const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('Authorization')
	console.log(authorization)
	if (
		authorization &&
		authorization.startsWith('Bearer ')
	) {
		// Not return response because response will be pass to the next middleware
		request.token = authorization.replace('Bearer ', '')
		console.log(request.token)
	}
	next()
}

const userExtractor = async (request, response, next) => {
	const token = request.token

	// JsonWebTokenError - check if valid token format or not null
	const decodedToken = jwt.verify(token, process.env.SECRET)

	// AuthorizationError - valid token format but not have id in there
	if (
		!decodedToken.id ||
		!(await User.findById(decodedToken.id))
	) {
		const error = new Error()
		error.name = 'AuthorizationError'
		error.message = 'token invalid'
		throw error
	}

	request.user = decodedToken
	next()
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	// Return response beacause of send back error to client
	if (error.name === 'CastError') {
		return response
			.status(400)
			.send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response
			.status(400)
			.json({ error: error.message })
	} else if (error.name === 'AuthorizationError') {
		return response
			.status(401)
			.json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response
			.status(400)
			.json({ error: error.message })
	}

	next(error)
}

const unknownEndpoint = (request, response) => {
	return response
		.status(404)
		.send({ error: 'unknown endpoint' })
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
}
