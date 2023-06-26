import Togglable from './Togglable'

const Blog = ({ blog }) => {
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
				contentStyle={{ 'font-size': '20px' }}
				content={blog.title}
			>
				<div>
					<p>{blog.url}</p>
					<p>
						likes: {blog.likes}
						<button style={{ marginLeft: '10px' }}>
							like
						</button>
					</p>
					<p>{blog.author}</p>
				</div>
			</Togglable>
		</div>
	)
}

export default Blog
