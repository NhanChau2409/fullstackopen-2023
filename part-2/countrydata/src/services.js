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

const weatherQuery = (capitalInfo) => {
	const apiKey = process.env.REACT_APP_API_KEY

	const [lat, lon] = capitalInfo
	const weatherBaseURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
	const request = axios.get(weatherBaseURL)
	return request.then((respone) => {
		const { temp, wind_speed } = respone.data.current
		const iconURL = `https://openweathermap.org/img/wn/${respone.data.current.weather[0].icon}@2x.png`

		return { temp, wind_speed, iconURL }
	})
}

export default { getAll, weatherQuery }
