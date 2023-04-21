import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(baseURL)
	return request.then((response) => response.data)
}

const addPerson = (newPerson) => {
	const request = axios.post(baseURL, newPerson)
	return request.then((response) => response.data)
}

const deletePerson = (deletePerson) => {
	const request = axios.delete(`${baseURL}/${deletePerson.id}`)
	return request.then((response) => response.data)
}

const changePerson = (person, changePerson) => {
	const request = axios.put(`${baseURL}/${person.id}`, changePerson)
	return request.then((response) => response.data)
}
export default { getAll, addPerson, deletePerson, changePerson }
