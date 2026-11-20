import { eq } from "drizzle-orm"
import { db } from "../../db"
import { notes } from "../../db/schema"

export const getNotes = async (importantOnly: boolean) => {
  if (importantOnly) {
    return db.select().from(notes).where(eq(notes.important, true))
  }
  return db.select().from(notes)
}

export const getNoteById = async (id: number) => {
  const result = await db.select().from(notes).where(eq(notes.id, id))
  return result[0]
}

export const addNote = async (content: string, important: boolean, userId: number) => {
  await db.insert(notes).values({ content, important, userId })
}

export const toggleImportance = async (id: number) => {
  const note = await getNoteById(id)
  if (note) {
    await db
      .update(notes)
      .set({ important: !note.important })
      .where(eq(notes.id, id))
  }
}