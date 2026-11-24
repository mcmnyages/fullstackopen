import Link from "next/link"
import { getNotes } from "../services/notes"

export const instant = false

const Notes = async ({
  searchParams,
}: {
  searchParams: Promise<{ important?: string }>
}) => {
  const { important } = await searchParams
  const showImportant = important === "true"
  const notes = await getNotes(showImportant)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <div className="mb-4">
        <Link
          href={showImportant ? "/notes" : "/notes?important=true"}
          className="text-blue-600 hover:underline"
        >
          {showImportant ? "show all" : "show important only"}
        </Link>
      </div>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/notes/${note.id}`}
              className="text-blue-600 hover:underline"
            >
              {note.content}
            </Link>
            {note.important && (
              <strong className="ml-2 text-amber-600">(important)</strong>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Notes