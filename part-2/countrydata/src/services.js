/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const countriesBaseURL = 'https://restcountries.com/v3.1/all'

const getAll = () => {
	const request = axios.get(countriesBaseURL)
	return request.then((response) => {
		let id = 1
		const newData = response.data
			.filter((country) => country.independent)
			.map((country) => {
				let { area, capital, flags, languages, name, capitalInfo } = country
				capital = capital[0]
				name = name.common
				flags = flags.png
				languages = Object.values(languages)
				capitalInfo = capitalInfo.latlng
				return { area, capital, flags, languages, name, id: id++, capitalInfo }
			})
		return newData
	})
}

const weatherBaseURL = ''

export default { getAll }
