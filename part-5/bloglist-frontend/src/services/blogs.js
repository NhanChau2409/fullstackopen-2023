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

const postBlog = async blog => {
	const config = {
		headers: { Authorization: token },
	}
	try {
		const response = await axios.post(baseUrl, blog, config)
		console.log(response.status, response.data)
	} catch (exception) {
		console.log(exception, token)
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, postBlog }
