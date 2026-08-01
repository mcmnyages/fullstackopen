import axios from 'axios'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const baseUrl ='https://api.openweathermap.org/data/2.5'
const getCityWeather=(city)=>{
    const request  = axios.get(`${baseUrl}/weather?q=${city}&appid=${apiKey}`)
    return request.then(response=>{
        return response.data
    })
}

export default {
    getCityWeather
}

