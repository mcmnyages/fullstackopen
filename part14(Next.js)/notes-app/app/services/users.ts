import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users,notes } from "../../db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export const getUserWithNotes = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { notes: true },
  })
}