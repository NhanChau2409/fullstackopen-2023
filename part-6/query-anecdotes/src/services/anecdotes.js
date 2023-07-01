import axios from 'axios'
import helper from '../utils/anecdote'
const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseURL)
	return response.data
}

const create = async content => {
	if (content.length < 5) {
		throw new Error(
			'too short anecdote, must have length 5 or more'
		)
	}

	const anecdote = helper.asObject(content)
	const response = await axios.post(baseURL, anecdote)
	return response.data
}

const vote = async anecdote => {
	const response = await axios.put(
		baseURL + `/${anecdote.id}`,
		anecdote
	)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, vote }
