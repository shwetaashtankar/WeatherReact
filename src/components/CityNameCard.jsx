import { useState, useEffect } from 'react'
import './CityNameCard.css'

import WeatherIcon from './WeatherIcon'

function CityNameCard({ CityData, onClose }) {

  const [city, setCity] = useState([])
  const [weatherCondition, setWeatherCondition] = useState(null);

  // console.log(CityData)

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CityData}&appid=77b60caed084ca920156da9068278de6`)
      let data = await res.json()
      console.log(data)
      setCity(data)
      if (data.weather && data.weather.length > 0) {
        setWeatherCondition(data.weather[0].main.toLowerCase());
      }
    }

    fetchData()
  }, [CityData])

  // console.log(CityData)



  return (
    <>
      <div className='blurPage'></div>

      <div className='container'>
        <span className="btn">
          <button onClick={onClose}>X</button>
        </span>

        <div className="details">
          <h3>{city.name}</h3>
          
          <span className="weather-icon">
            {weatherCondition && <WeatherIcon condition={weatherCondition} />}
          </span>
          <p>Temp:🌡{city.main ? ((city.main.temp - 273.15).toFixed(0)) : "Loading..."}°C</p>
          <p>Humidity: {city.main ? (city.main.humidity) : "Loading..."}%</p>
          <p>WindSpeed: {city.wind ? (city.wind.speed) : "Loading..."}km/h</p>
          <p>Pressure:🎐{city.main ? (city.main.pressure) : "Loading..."}</p>             
        </div>

      </div>
    </>
  )
}

export default CityNameCard
