import { useState } from 'react'
import { Header, Form, Persons, Filter } from './Components'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	const submitHandler = (event) => {
		event.preventDefault()

		let isExisted = false

		persons.forEach((person) => {
			if (person.name === newName) {
				alert(`${newName} is already added to phonebook`)
				isExisted = true
			}
		})

		const newPerson = { name: newName, number: newNumber }
		setNewName('')
		setNewNumber('')

		if (!isExisted) {
			setPersons(persons.concat(newPerson))
		}
	}

	const inputHandler = (setStringState) => {
		return (event) => {
			setStringState(event.target.value)
		}
	}

	return (
		<div>
			<Header name={'Phonebook'} />
			<Filter inputHandler={inputHandler} filterState={[filter, setFilter]} />
			<Header name={'add a new'} />
			<Form
				submitHandler={submitHandler}
				inputHanlder={inputHandler}
				nameState={[newName, setNewName]}
				numberState={[newNumber, setNewNumber]}
			/>
			<Header name={'Numbers'} />
			<Persons persons={persons} filter={filter} />
		</div>
	)
}

export default App
