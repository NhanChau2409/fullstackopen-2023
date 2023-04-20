import { useState } from 'react'
import { Header, NameSubmitForm, PersonList } from './Components'

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
	const [newName, setNewName] = useState('')

	const submitHandler = (event) => {
		event.preventDefault()
		const newPerson = { name: newName }
		setPersons(persons.concat(newPerson))
		setNewName('')
	}

	const inputHandler = (event) => {
		setNewName(event.target.value)
	}

	return (
		<div>
			<Header name={'Phonebook'} />
			<NameSubmitForm
				submitHandler={submitHandler}
				inputHanlder={inputHandler}
				inputValue={newName}
			/>
			<Header name={'Numbers'} />
			<PersonList persons={persons} />
		</div>
	)
}

export default App
