import Person from "./Person"

const Persons = ({ persons,deleteItem }) => {
    return (
        <div>
            <h2>Numbers</h2>

            <ul>
                {persons.map((person) => (
                    <Person
                    key={person.name}
                    person={person}
                    deleteItem={deleteItem}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Persons