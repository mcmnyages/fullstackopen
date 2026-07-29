import { useState } from 'react'

const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch]= useState('')

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
      filter shown with
      <input 
      value={search}
      onChange={handleSearch}
      />
      <h1>Add New</h1>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handlePersonChange}
          />
        </div>

        <div>
          number:
          <input
            value={number}
            onChange={handleNumberChange}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      <ul>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
