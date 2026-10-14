const Person = ({ person, deleteItem}) => {
    return (
        <div>
            <li>
                {person.name} {person.number}
                <button onClick={()=>deleteItem(person.id)}>Delete</button>
            </li>
        </div>
    )
}

export default Person