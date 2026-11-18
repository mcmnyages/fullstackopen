"use server"

import { redirect } from "next/navigation"
import { addNote } from "../services/notes"

export const createNote = async (formData: FormData) => {
  const content = formData.get("content") as string
  const important = formData.get("important") === "on"
  addNote(content, important)
  redirect("/notes")
}