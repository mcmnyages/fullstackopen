import { useQuery } from '@apollo/client/react'
import { useEffect } from 'react'
import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './queries'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'

const App = () => {
  const result = useQuery(ALL_PERSONS)
  const [time, setTime] = useState(new Date)
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  useEffect(() => {
    const timeId = setInterval(() => {
      setTime(new Date)
    }, 1000)
    return () => clearInterval(timeId)
  })


  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h1>{time.toLocaleTimeString()}</h1>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App