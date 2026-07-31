import { useState, useEffect } from "react"
import countriesService from './service/countries'
import Notification from "./component/Notification"
import Countries from "./component/Countries"
import Country from "./component/Country"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        console.log("All countries", response)
        setCountries(response)
      })
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query)
    const matches = countries.filter(country => {
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    })
    if (matches.length > 10) {
      setMessage('Too many matches,specify another filter')
      setFilteredCountries([])
    } else {
      setMessage('')
      setFilteredCountries(matches)
    }
  }

  const handleShowCountry=(countryToShow)=>{
    setFilteredCountries([countryToShow])
  }

  console.log('Filtered countires', filteredCountries)


  return (
    <div>
      Find countries:
      <input onChange={handleSearch} value={search} />
      <div>
        <Notification message={message} />
       {filteredCountries.length > 0 && (
          <Countries 
            countries={filteredCountries} 
            onShowClick={handleShowCountry} 
          />
        )}

      </div>
    </div>
  )

}

export default App