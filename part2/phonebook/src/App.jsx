import { useState, useEffect } from 'react'
import phoneService from './service/phone'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons,setPersons]=useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch]= useState('')

  useEffect(()=>{
    phoneService
    .getAll()
    .then(
      (response)=>{
        console.log('Check the responses',response)
        setPersons(response)
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
  
    phoneService
    .addPerson(personObj)
    .then(response=>{
      setPersons(persons.concat(response))
    })

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
