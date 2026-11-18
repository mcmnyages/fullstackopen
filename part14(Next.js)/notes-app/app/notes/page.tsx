import { getNotes } from "../services/notes"

const Notes = () => {
  const notes = getNotes()
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.content} {note.important && <strong>(important)</strong>}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Notes
