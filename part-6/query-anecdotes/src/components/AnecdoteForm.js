import { useMutation, useQueryClient } from 'react-query'
import anecdoteServices from '../services/anecdotes'
import { useNotiDispatch } from '../utils/notificationContext'

const AnecdoteForm = () => {
	const notiDispatch = useNotiDispatch()
	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation(
		anecdoteServices.create,
		{
			onSuccess: () => {
				queryClient.invalidateQueries('anecdotes')
			},
      onError: (e) => {
        notiDispatch({ type: 'ERROR', error: e.message })
        setTimeout(() => {notiDispatch({type: ''})}, 3000) // Set noti NULL    
      }
		}
	)

	const onCreate = event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		newAnecdoteMutation.mutate(content)
		notiDispatch({ type: 'ADD', anecdote: {content} })
		setTimeout(() => {notiDispatch({type: ''})}, 3000) // Set noti NULL
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
