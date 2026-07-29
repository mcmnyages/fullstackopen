import { useState, useEffect } from 'react'
import axios from  'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons,setPersons]=useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch]= useState('')

  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(
      (response)=>{
        setPersons(response.data)
      }
    )
  },[])

  const addPerson = (e) => {
    e.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook!`)
      return
    }

    const personObj = {
      name: newName,
      number: number,
    }

    setPersons(persons.concat(personObj))
    setNewName('')
    setNumber('')
  }

  const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }
  const handleSearch =(e)=>{
    setSearch(e.target.value)
  }
  const personsToShow= persons.filter(person=>person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      search={search}
      onSearchChange={handleSearch}
      />
      <PersonForm
      addPerson={addPerson}
      newName={newName}
      number={number}
      handlePersonChange={handlePersonChange}
      handleNumberChange={handleNumberChange}
      />
      <Persons
      persons={personsToShow}
      />
    </div>
  )
}

export default App
