const initialState = {
	good: 0,
	ok: 0,
	bad: 0,
}

const counterReducer = (state = initialState, action) => {
	console.log(action)
	let { good, ok, bad } = state
	switch (action.type) {
		case 'GOOD':
			good += 1
			return { ...state, good }
		case 'OK':
      ok+=1 
			return { ...state, ok }
		case 'BAD':
      bad+=1
			return { ...state, bad }
		case 'ZERO':
      good = bad = ok = 0
			return {good, ok, bad}
		default:
			return state
	}
}

export default counterReducer
