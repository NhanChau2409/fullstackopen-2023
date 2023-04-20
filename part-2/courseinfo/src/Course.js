const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} part={part}></Part>
			))}
			<Total parts={parts}></Total>
		</div>
	)
}

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	)
}

const Total = ({ parts }) => {
	return (
		<b>
			total of{' '}
			{parts.reduce((total, curr) => {
				return curr.exercises + total
			}, 0)}{' '}
			exercises
		</b>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<h1>{course.name}</h1>
			<Content parts={course.parts}></Content>
		</div>
	)
}

export default Course
