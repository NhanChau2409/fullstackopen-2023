/* eslint-disable eqeqeq */
import { useState } from 'react'
import services from './services'

const Filter = ({ filterState }) => {
	const [nameFilter, setNameFilter] = filterState
	return (
		<div>
			find countries
			<input
				onChange={(event) => {
					setNameFilter(event.target.value)
				}}
				value={nameFilter}
			/>
		</div>
	)
}

const Text = ({ text, style }) => {
	return <p style={style}>{text}</p>
}

const Header1 = ({ text }) => {
	return <h1>{text}</h1>
}

const BulletList = ({ text, array }) => {
	return (
		<div>
			<h3>{text}</h3>
			<ul>
				{array.map((value) => (
					<li key={value}>{value}</li>
				))}
			</ul>
		</div>
	)
}

const Image = ({ img, alt }) => {
	return <img src={img} alt={alt} />
}

const Button = ({ text, onClickHandler }) => {
	return <button onClick={onClickHandler}>{text}</button>
}

const GeneralInfo = ({ country, setNameFilter }) => {
	const onClickHandler = () => {
		setNameFilter(country.name)
	}

	return (
		<div>
			<Text style={{ display: 'inline-block' }} text={country.name} />
			<Button onClickHandler={onClickHandler} text={'show'} />
		</div>
	)
}

const Weather = ({ city }) => {
	const [weather, setWeather] = useState({})
	services.weatherQuery(city).then((data) => setWeather(data))

	const {temp, iconURL, wind_speed} = weather

	return (
		<div>
			<Text text={`temperature ${temp} Celcius`} />
			<Image img={iconURL}/>
			<Text text={`wind ${wind_speed} m/s`}/>
		</div>
	)
}

const DetailInfo = ({ country }) => {
	return (
		<div>
			<Header1 text={country.name} />
			<Text text={`capital ${country.capital}`} />
			<Text text={`area ${country.area}`} />
			<BulletList text={'languages:'} array={country.languages} />
			<Image img={country.flags} />
			<Weather city={country.capitalInfo} />
		</div>
	)
}

const Content = ({ countries, filterState }) => {
	const [nameFilter, setNameFilter] = filterState

	if (!nameFilter.trim()) {
		return
	}

	const filterCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(nameFilter.toLowerCase())
	)

	if (filterCountries.length == 1) {
		return (
			<DetailInfo
				country={filterCountries[0]}
				array={filterCountries[0].languages}
			/>
		)
	} else if (filterCountries.length > 10) {
		return <div>Too many mathches, specify another one</div>
	} else {
		return (
			<div>
				{filterCountries.map((country) => {
					return (
						<GeneralInfo
							key={country.id}
							country={country}
							setNameFilter={setNameFilter}
						/>
					)
				})}
			</div>
		)
	}
}

export { Filter, Content }
