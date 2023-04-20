import { useState } from 'react'
import { Header, NameSubmitForm, PersonList } from './Components'

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
	const [newName, setNewName] = useState('')

	const submitHandler = (event) => {
		event.preventDefault()

		let isExisted = false

		persons.forEach((person) => {
			if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
				isExisted = true
			}
		})

		const newPerson = { name: newName }
		setNewName('')

		if (!isExisted) {
			setPersons(persons.concat(newPerson))
		}
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
