const Input = ({ text, name, type, stateObject }) => {
	const [state, setState] = stateObject
	return (
		<div>
			{text}
			<input
				name={name}
				type={type}
				value={state}
				onChange={({ target }) => {
					setState(target.value)
				}}
			/>
		</div>
	)
}

export default Input
