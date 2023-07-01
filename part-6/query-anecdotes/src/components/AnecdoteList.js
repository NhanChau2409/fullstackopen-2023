import { useMutation, useQueryClient } from 'react-query'
import anecdoteServices from '../services/anecdotes'
import { useNotiDispatch } from '../utils/notificationContext'

const Anecdote = ({ anecdote }) => {
    const notiDispatch = useNotiDispatch()
	const queryClient = useQueryClient()

	const voteAnecdote = useMutation(anecdoteServices.vote, {
		onSuccess: () => {
			queryClient.invalidateQueries('anecdotes')
		},
	})
	const handleVote = anecdote => {
		const votedAnecdote = {
			...anecdote,
			votes: anecdote.votes + 1,
		}
		voteAnecdote.mutate(votedAnecdote)
        notiDispatch({ type: 'VOTE', anecdote: votedAnecdote })
		setTimeout(() => {notiDispatch({type: ''})}, 3000) // Set noti NULL
	}

	return (
		<div key={anecdote.id}>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => handleVote(anecdote)}>
					vote
				</button>
			</div>
		</div>
	)
}

const AnecdoteList = ({ anecdotes }) => {
	return (
		<div>
			{anecdotes.map(anecdote => (
				<Anecdote anecdote={anecdote} key={anecdote.id} />
			))}
		</div>
	)
}

export default AnecdoteList