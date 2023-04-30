const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url = `mongodb+srv://nhanchau2409:${password}@cluster0.bggd5tc.mongodb.net/test`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
	name: process.argv[3],
	number: process.argv[4],
})

// person.save().then((result) => {
// 	console.log(`added ${person.name} ${person.number} to phonebook`)
// 	mongoose.connection.close()
// })

Person.find({}).then((result) => {
	console.log('phonebook:')
	result.forEach((person) => {
		console.log(person.name, person.number)
	})
	mongoose.connection.close()
})
