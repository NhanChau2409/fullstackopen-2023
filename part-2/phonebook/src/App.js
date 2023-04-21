import { useState, useEffect } from 'react'
import { Header, Form, Persons, Filter, Noti } from './Components'
import services from './services'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [successNoti, setSuccessNoti] = useState(null)
	const [failNoti, setFailNoti] = useState(null)

	useEffect(() => {
		services.getAll().then((person) => setPersons(person))
	}) // do not pass in empty array -> will run everytimes render or change in json server

	const submitHandler = (event) => {
		event.preventDefault()

		let isExisted = false

		const newPerson = { name: newName, number: newNumber }

		persons.forEach((person) => {
			if (person.name === newName) {
				isExisted = true
				if (
					window.confirm(
						`${person.name} is already added to phonebook, replace the old number with a new one?`
					)
				) {
					services
						.changePerson(person, newPerson)
						.then((response) => notiMessage(`Added ${newPerson.name}`, true))
						.catch((error) =>
							notiMessage(
								`Information of ${newPerson.name} has already been removed from server`,
								false
							)
						)
				}
				return
			}
		})

		setNewName('')
		setNewNumber('')

		if (!isExisted) {
			// setPersons(persons.concat(newPerson)) -> no need to specific change state anymore
			services
				.addPerson(newPerson)
				.then((response) => notiMessage(`Added ${newPerson.name}`, true))
		}
	}

	const inputHandler = (setStringState) => {
		return (event) => {
			setStringState(event.target.value)
		}
	}

	const notiMessage = (message, isSuccess) => {
		const setNoti = isSuccess ? setSuccessNoti : setFailNoti

		setNoti(message)
		setTimeout(() => {
			setNoti(null)
		}, 5000)
	}

	const errorStyle = {
		color: 'red',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}

	const successStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}

	return (
		<div>
			<Header name={'Phonebook'} />
			<Noti messStyle={successStyle} message={successNoti} />
			<Noti messStyle={errorStyle} message={failNoti} />
			<Filter inputHandler={inputHandler} filterState={[filter, setFilter]} />
			<Header name={'Add a new'} />
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
