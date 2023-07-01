import {
	createContext,
	useReducer,
	useContext,
} from 'react'

const notiReducer = (state, action) => {
	switch (action.type) {
		case 'ADD': {
			return ` new anecdote ${action.anecdote.content} added`
		}
		case 'VOTE': {
			return `anecdote ${action.anecdote.content} voted`
		}
        case 'ERROR': {
            return action.error
        }
		default: {
			return null
		}
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
	const [noti, notiDispatch] = useReducer(notiReducer, null)

	return (
		<NotificationContext.Provider
			value={[noti, notiDispatch]}
		>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const useNotiValue = () => {
	const notiAndDispatch = useContext(NotificationContext)
	return notiAndDispatch[0]
}

export const useNotiDispatch = () => {
	const notiAndDispatch = useContext(NotificationContext)
	return notiAndDispatch[1]
}

export default NotificationContext
