const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const Person = require('./modules/persons')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(
	morgan((tokens, req, res) => {
		const format = [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			'-',
			tokens['response-time'](req, res),
			'ms',
		]
		if (req.method !== 'POST') {
			return format.join(' ')
		} else {
			return format.concat(tokens.body(req, res)).join(' ')
		}
	})
)

app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then((persons) => {
			response.json(persons)
		})
		.catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
	Person.find({})
		.then((persons) => {
			const requestReceivedTime = new Date()
			const res = `<div>
			<p>phonebook has info for ${persons.length} people</p>
			<p>${requestReceivedTime}</p>
		</div>`

			response.send(res)
		})
		.catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	Person.findById(id)
		.then((person) => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => {
			next(error)
		})
})

app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	Person.findByIdAndDelete(id)
		.then((result) => {
			response.status(204).end()
		})
		.catch((error) => next(error))
})

app.post('/api/persons/', (request, response, next) => {
	const body = request.body

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then((savedPerson) => response.json(savedPerson))
		.catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	const body = request.body

	Person.findByIdAndUpdate(id, { number: body.number }, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote)
		})
		.catch((error) => {
			next(error)
		})
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	}

	next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
