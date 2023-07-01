import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import anecdoteServices from './services/anecdotes'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
	const result = useQuery(
		'anecdotes',
		anecdoteServices.getAll,
		{
			retry: 1,
			refetchOnWindowFocus: false,
		}
	)

	if (result.isLoading) {
		return <div>Loading ...</div>
	}

	if (result.isError) {
		return (
			<div>
				anecdote service not available due to problems in
				server
			</div>
		)
	}

	const anecdotes = result.data

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />
			<AnecdoteList anecdotes={anecdotes} />
		</div>
	)
}

export default App
