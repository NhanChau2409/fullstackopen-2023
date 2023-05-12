const _ = require('lodash')

const totalLikes = (blogs) => {
	return blogs.length === 0 ? 0 : _.sumBy(blogs, 'likes')
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null
	}

	const result = _.maxBy(blogs, 'likes')

	const { title, author, likes } = result
	return { title, author, likes }
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null
	}

	const authorCounts = _.countBy(blogs, 'author')
	const [author, count] = _.maxBy(_.toPairs(authorCounts), _.last)
	return { author, blogs: count }
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null
	}

	const groupByAuthor = _.groupBy(blogs, 'author')
	const likesByAuthor = _.mapValues(groupByAuthor, (blogs) => totalLikes(blogs))
	const [author, count] = _.maxBy(_.toPairs(likesByAuthor), _.last)
	return { author, likes: count }
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }
