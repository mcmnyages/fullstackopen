import { useState, useEffect } from 'react'
import weatherService from '../service/weather'

const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        setWeather([])
        country.capital.forEach(city => {
            weatherService
                .getCityWeather(city)
                .then(weatherData => {
                    setWeather([weatherData])
                })
        })
    }, [country])

    return (
        <div>
            <h2> {country.name.common}</h2>
            <p> capital {country.capital.join(', ')}</p>
            <p> area {country.area} </p>
            <h3>languages: </h3>
            <ul>
                {
                    Object.values(country.languages).map(language =>
                        <li key={language}>
                            {language}
                        </li>
                    )
                }
            </ul>
            <p>Population: {country.population}</p>
            <p>Flag:</p>
            <img
                src={country.flags.png}
                alt={`flag of ${country.name.common}`}
                width="150"
            />
            <p> Coat Of Arms:</p>
            <img
                src={country.coatOfArms.png}
                alt={`coat of arms of ${country.name.common}`}
                width="100"
            />
            {
                weather.map(cityWeather => (
                    <div key={cityWeather.name}>
                        <h2> Weather in {cityWeather.name} </h2>
                        <p> Temperature:
                            {' '}{cityWeather.main.temp} °C </p>
                        <img
                            src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                            alt={cityWeather.weather[0].description}
                        />
                        <p> Wind:{' '}{cityWeather.wind.speed} m/s</p>
                        <p>{cityWeather.weather[0].description}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CountryDetail