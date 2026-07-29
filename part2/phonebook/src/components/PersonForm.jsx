const PersonForm = ({
    addPerson,
    newName,
    number,
    handlePersonChange,
    handleNumberChange
})=>{
    return(
        <div>
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
        </div>
    )
}
export default PersonForm