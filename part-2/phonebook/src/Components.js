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

const NameSubmitForm = ({ submitHandler, inputHanlder, inputValue }) => {
	return (
		<form onSubmit={submitHandler}>
			<Input text={'name:'} onChange={inputHanlder} value={inputValue} />
			<Button type={'submit'} text={'add'} />
		</form>
	)
}

const Person = ({ name }) => {
	return <p>{name}</p>
}

const PersonList = ({ persons }) => {
	return (
		<div>
			{persons.map((person) => (
				<Person key={person.name} name={person.name} />
			))}
		</div>
	)
}

export { Header, NameSubmitForm, PersonList }
