import { useQuery } from '@apollo/client/react'
import { useEffect } from 'react'
import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './queries'


const App = () => {
  const result = useQuery(ALL_PERSONS)
  const [time, setTime] = useState(new Date)
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
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  )
}

export default App