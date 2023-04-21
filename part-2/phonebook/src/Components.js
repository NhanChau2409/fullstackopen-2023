const Header = ({ name }) => {
	return (
		<div>
			<h2>{name}</h2>
		</div>
	)
}

const SubmitButton = ({ type, text }) => {
	return (
		<div>
			<button type={type}>{text}</button>
		</div>
	)
}

const Input = ({ text, onChange, value }) => {
	return (
		<div>
			{text} <input onChange={onChange} value={value} />
		</div>
	)
}

const Form = ({
	submitHandler,
	inputHanlder,

	nameState,
	numberState,
}) => {
	const [newName, setNewName] = nameState
	const [newNumber, setNewNumber] = numberState

	return (
		<form onSubmit={submitHandler}>
			<Input
				text={'name:'}
				onChange={inputHanlder(setNewName)}
				value={newName}
			/>
			<Input
				text={'number:'}
				onChange={inputHanlder(setNewNumber)}
				value={newNumber}
			/>
			<SubmitButton type={'submit'} text={'add'} />
		</form>
	)
}

const Person = ({ name, number }) => {
	return (
		<p style={{ display: 'inline-block' }}>
			{name} {number}
		</p>
	)
}

const DeleteButton = ({ deletePerson, deleteFunc }) => {
	const deleteHandler = (deletePerson, deleteFunc) => {
		return () => {
			if (window.confirm(`Delete ${deletePerson.name}`)) {
				// console.log(deletePerson)
				deleteFunc(deletePerson)
			}
		}
	}
	return (
		<button onClick={deleteHandler(deletePerson, deleteFunc)}>delete</button>
	)
}

const Persons = ({ persons, filter, deleteFunc }) => {
	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	)

	return (
		<div>
			{filteredPersons.map((person) => (
				<div key={person.id}>
					<Person key={person.name} name={person.name} number={person.number} />
					<DeleteButton
						key={`delete-${person.id}`}
						deletePerson={person}
						deleteFunc={deleteFunc}
					/>
				</div>
			))}
		</div>
	)
}

const Filter = ({ inputHandler, filterState }) => {
	const [filter, setFilter] = filterState
	return (
		<div>
			<Input
				text={'filter shown with'}
				onChange={inputHandler(setFilter)}
				value={filter}
			/>
		</div>
	)
}

const Noti = ({ messStyle, message }) => {
	if (message === null) {
		return null
	}

	return <div style={messStyle}>{message}</div>
}

export { Header, Form, Persons, Filter, Noti }
