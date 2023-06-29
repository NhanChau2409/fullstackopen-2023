import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
	const [postUser] = useState(blog.users[0])

	const handleLikeButton = async blog => {
		const { id, likes } = blog
		let updatedBlog
		try {
			updatedBlog = await blogService.putBlog(id, {
				likes: likes + 1,
			})
		} catch (error) {
			updatedBlog = blog
		}

		updateBlog(updatedBlog)
	}

	const handleRemoveButton = async blog => {
		if (
			window.confirm(
				`Remove blog ${blog.title} by ${blog.author}`
			)
		) {
			const id = blog.id
			await blogService.deleteBlog(id)
			deleteBlog(blog)
		}
	}

	return (
		<div
			style={{
				paddingTop: 5,
				paddingLeft: 2,
				border: 'solid',
				borderWidth: 3,
				marginBottom: 3,
			}}
		>
			<Togglable
				viewButtonLabel='view'
				hideButtonLabel='hide'
				contentStyle={{ fontSize: '20px' }}
				content={`${blog.title} ${blog.author}`}
			>
				<div>
					<p>{blog.url}</p>
					<p>
						likes: {blog.likes}
						<button
							style={{ marginLeft: '10px' }}
							onClick={() => handleLikeButton(blog)}
						>
							like
						</button>
					</p>
					<p>{postUser.name}</p>
					{user !== undefined ? (
						user.id === postUser.id ? (
							<button
								onClick={() => handleRemoveButton(blog)}
							>
								remove
							</button>
						) : null
					) : null}
				</div>
			</Togglable>
		</div>
	)
}

export default Blog
