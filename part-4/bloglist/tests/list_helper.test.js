const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('Total likes', () => {
	test('of empty list is zero', () => {
		const emptyList = []
		expect(listHelper.totalLikes(emptyList)).toBe(0)
	})

	test('when list has only one blog, equals the likes of that', () => {
		const oneBlogList = [helper.initialBlogs[0]]
		expect(listHelper.totalLikes(oneBlogList)).toBe(7)
	})

	test('of a bigger list is calculated right', () => {
		expect(listHelper.totalLikes(helper.initialBlogs)).toBe(36)
	})
})

describe('Favorite blog', () => {
	test('of empty list is empty object', () => {
		const emptyList = []
		expect(listHelper.favoriteBlog(emptyList)).toEqual(null)
	})

	test('when list has only one blog is that blog', () => {
		const oneBlogList = [helper.initialBlogs[0]]
		expect(listHelper.favoriteBlog(oneBlogList)).toEqual({
			title: 'React patterns',
			author: 'Michael Chan',
			likes: 7,
		})
	})

	test('of a bigger list is returned right', () => {
		expect(listHelper.favoriteBlog(helper.initialBlogs)).toEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		})
	})
})

describe('Most blogs author', () => {
	test('of empty list is empty object', () => {
		const emptyList = []
		expect(listHelper.mostBlogs(emptyList)).toEqual(null)
	})

	test('when list has only one blog is that author', () => {
		const oneBlogList = [helper.initialBlogs[0]]
		expect(listHelper.mostBlogs(oneBlogList)).toEqual({
			author: 'Michael Chan',
			blogs: 1,
		})
	})

	test('of a bigger list is returned right', () => {
		expect(listHelper.mostBlogs(helper.initialBlogs)).toEqual({
			author: 'Robert C. Martin',
			blogs: 3,
		})
	})
})

describe('Most likes author', () => {
	test('of empty list is empty object', () => {
		const emptyList = []
		expect(listHelper.mostLikes(emptyList)).toEqual(null)
	})

	test('when list has only one blog is that author', () => {
		const oneBlogList = [helper.initialBlogs[0]]
		expect(listHelper.mostLikes(oneBlogList)).toEqual({
			author: 'Michael Chan',
			likes: 7,
		})
	})

	test('of a bigger list is returned right', () => {
		expect(listHelper.mostLikes(helper.initialBlogs)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17,
		})
	})
})
