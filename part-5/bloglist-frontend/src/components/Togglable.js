import {
	useState,
	useImperativeHandle,
	forwardRef,
} from 'react'

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		}
	})

	const buttonContent = (label) => (
		<p style={props.contentStyle}>
			{props.content}
			<button
				style={{ marginLeft: '10px' }}
				onClick={toggleVisibility}
			>
				{label}
			</button>
		</p>
	)

	return (
		<div>
			<div style={hideWhenVisible}>{buttonContent(props.viewButtonLabel)}</div>
			<div style={showWhenVisible}>
				{buttonContent(props.hideButtonLabel)}
				{props.children}
			</div>
		</div>
	)
})

export default Togglable
