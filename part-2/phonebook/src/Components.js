const Header = ({ name }) => {
	return (
		<div>
			<h2>{name}</h2>
		</div>
	)
}

const Button = ({ type, text }) => {
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
			<Button type={'submit'} text={'add'} />
		</form>
	)
}

const Person = ({ name, number }) => {
	return (
		<p>
			{name} {number}
		</p>
	)
}

const Persons = ({ persons, filter }) => {
	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	)

	return (
		<div>
			{filteredPersons.map((person) => (
				<Person key={person.name} name={person.name} number={person.number} />
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
export { Header, Form, Persons, Filter }
