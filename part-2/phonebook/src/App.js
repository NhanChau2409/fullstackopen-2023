import axios from 'axios'
import { useState, useEffect } from 'react'
import { Header, Form, Persons, Filter } from './Components'
import services from './services'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		services.getAll().then((person) => setPersons(person))
	}) // do not pass in empty array -> will run everytimes render or change in json server

	const submitHandler = (event) => {
		event.preventDefault()

		let isExisted = false
		let isReplace = false

		const newPerson = { name: newName, number: newNumber }

		persons.forEach((person) => {
			if (person.name === newName) {
				isExisted = true
				if (
					window.confirm(
						`${person.name} is already added to phonebook, replace the old number with a new one?`
					)
				) {
					services.changePerson(person, newPerson)
				}
				return
			}
		})

		setNewName('')
		setNewNumber('')

		if (!isExisted) {
			// setPersons(persons.concat(newPerson)) -> no need to specific change state anymore
			services.addPerson(newPerson)
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
			<Persons
				persons={persons}
				filter={filter}
				deleteFunc={services.deletePerson}
			/>
		</div>
	)
}

export default App
