import Input from './Input'

const Form = ({ onSubmit, inputs, buttonText }) => {
	return (
		<div>
			<form onSubmit={onSubmit}>
				{inputs.map(input => {
					return <Input key={input.id} {...input} />
				})}

				<button type='submit'>{buttonText}</button>
			</form>
		</div>
	)
}

export default Form
