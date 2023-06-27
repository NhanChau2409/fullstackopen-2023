import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const postBlog = async content => {
	const config = {
		headers: { Authorization: token },
	}
	try {
		const response = await axios.post(
			baseUrl,
			content,
			config
		)
		return response.data
	} catch (exception) {
		console.log(exception, token)
	}
}

const putBlog = async (id, content) => {
	const response = await axios.put(
		baseUrl + `/${id}`,
		content
	)
	return response.data
}

const deleteBlog = async id => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.delete(
		baseUrl + `/${id}`,
		config
	)
	return response.data
}

export default {
	getAll,
	setToken,
	postBlog,
	putBlog,
	deleteBlog,
}
