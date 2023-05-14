import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	const [messages, setMessages] = useState('')

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		const userJSON =
			window.localStorage.getItem('loggedUser')
		if (userJSON) {
			const user = JSON.parse(userJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})
			blogService.setToken(user.token)
			window.localStorage.setItem(
				'loggedUser',
				JSON.stringify(user)
			)
			setUser(user)
		} catch (exception) {
			setMessages('wrong credentials')
			setTimeout(() => {
				setMessages(null)
			}, 5000)
		} finally {
			setUsername('')
			setPassword('')
		}
	}

	const loginFormParams = {
		onSubmit: handleLogin,
		inputs: [
			{
				id: 1,
				text: 'username',
				name: 'username',
				type: 'text',
				stateObject: [username, setUsername],
			},
			{
				id: 2,
				text: 'password',
				name: 'password',
				type: 'password',
				stateObject: [password, setPassword],
			},
		],
		buttonText: 'login',
	}

	const loginForm = <Form {...loginFormParams} />

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleCreate = event => {
		event.preventDefault()
		try {
			const blog = { title, author, url, likes: 0 }
			blogService.postBlog(blog)
			setMessages('new blog added')
			setTimeout(() => {
				setMessages(null)
			}, 5000)
		} catch (exception) {
			setMessages('fail to add new blog')
			setTimeout(() => {
				setMessages(null)
			}, 5000)
		} finally {
			setTitle('')
			setAuthor('')
			setUrl('')
		}
	}

	const createFormParams = {
		onSubmit: handleCreate,
		inputs: [
			{
				id: 1,
				text: 'title:',
				name: 'title',
				type: 'text',
				stateObject: [title, setTitle],
			},
			{
				id: 2,
				text: 'author:',
				name: 'author',
				type: 'text',
				stateObject: [author, setAuthor],
			},
			{
				id: 3,
				text: 'url:',
				name: 'url',
				type: 'text',
				stateObject: [url, setUrl],
			},
		],
		buttonText: 'create',
	}

	const createForm = <Form {...createFormParams} />

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification message={messages} />
				{loginForm}
			</div>
		)
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification message={messages} />
			<div>
				{user.name} logged in
				<button
					onClick={() => {
						window.localStorage.removeItem('loggedUser')
						setUser(null)
					}}
				>
					logout
				</button>
			</div>
			<h2>Create new</h2>
			{createForm}
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App
