import { useState, useEffect } from 'react'
import { Content, Filter } from './components'
import services from './services'

function App() {
	const [nameFilter, setNameFilter] = useState('')
	const [countries, setCountries] = useState([])

	useEffect(() => {
		services.getAll().then((data) => {
			setCountries(data)
		})
	}, [])

	return (
		<div>
			<Filter filterState={[nameFilter, setNameFilter]} />
			<Content
				countries={countries}
				filterState={[nameFilter, setNameFilter]}
			/>
		</div>
	)
}

export default App
