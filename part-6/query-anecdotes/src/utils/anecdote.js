const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { asObject }
