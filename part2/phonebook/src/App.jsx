import { useState, useEffect } from 'react'
import phoneService from './service/phone'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phone from './service/phone'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  useEffect(() => {
    phoneService
      .getAll()
      .then(
        (response) => {
          setPersons(response)
        }
      )
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObj = {
      name: newName,
      number: number,
    }


    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        const updatePerson = {
          ...existingPerson,
          number: personObj.number
        }
        phoneService
          .updatePerson(existingPerson.id, updatePerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id === returnedPerson.id
                  ? returnedPerson
                  : person
              )
            )

            setMessage(`${newName}'s number has been changed to ${updatePerson.number} successfully`)
            setMessageType('success')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }).catch(error=>{
            setMessageType('error')
            setMessage(error.response.data.error)
          })
      }
    } else {

      phoneService
        .addPerson(personObj)
        .then(response => {
          setPersons(persons.concat(response))
          setMessageType('success')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(error=>{
          setMessageType('error')
          setMessage(error.response.data.error)
        })
      setNewName('')
      setNumber('')
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (
      window.confirm(`Delete ${person.name} ?`)
    )
      phoneService
        .deletePerson(id)
        .then(() => {
          setMessageType('success')
          setMessage(`Successfully deleted ${person.name}'s details!`)
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(
          (error) => {
            setMessageType('error')
            setMessage(
              `Information of ${person.name} has already been removed from the server`
            )
            setTimeout(()=>{
              setMessage(null)
            }, 5000)
          }
        )
  }

  const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        type={messageType}
        message={message}
      />
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
        deleteItem={deletePerson}
      />
    </div>
  )
}

export default App
