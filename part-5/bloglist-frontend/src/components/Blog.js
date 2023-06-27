import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
	const handleLikeButton = async blog => {
		const { id, ...content } = blog
		const updatedBlog = await blogService.putBlog(id, {
			...content,
			likes: content.likes + 1,
		})
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
				content={blog.title}
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
					<p>{blog.author}</p>
					{user !== null && user.id === blog.users[0] ? (
						<button
							onClick={() => handleRemoveButton(blog)}
						>
							remove
						</button>
					) : null}
				</div>
			</Togglable>
		</div>
	)
}

export default Blog
