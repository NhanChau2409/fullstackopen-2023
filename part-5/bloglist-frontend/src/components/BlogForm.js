import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Form from './Form'
import Togglable from './Togglable'

const BlogForm = ({ createBlog, setMessages }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createFormRef = useRef()

	const handleCreate = async event => {
		try {
			event.preventDefault()
			const blog = { title, author, url, likes: 0 }
			let postedBlog
			try {
				postedBlog = await blogService.postBlog(blog)
			} catch (error) {
				postedBlog = blog
			}
			createBlog(postedBlog)

			setMessages('new blog added')
			setTimeout(() => {
				setMessages(null)
			}, 5000)

			createFormRef.current.toggleVisibility()
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
				id: 'title',
				text: 'title:',
				name: 'title',
				type: 'text',
				stateObject: [title, setTitle],
			},
			{
				id: 'author',
				text: 'author:',
				name: 'author',
				type: 'text',
				stateObject: [author, setAuthor],
			},
			{
				id: 'url',
				text: 'url:',
				name: 'url',
				type: 'text',
				stateObject: [url, setUrl],
			},
		],
		buttonText: 'create',
	}

	return (
		<Togglable
			viewButtonLabel='create new note'
			hideButtonLabel='cancel'
			ref={createFormRef}
		>
			<Form {...createFormParams} />
		</Togglable>
	)
}

export default BlogForm
