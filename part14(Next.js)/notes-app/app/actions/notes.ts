"use server"

import { redirect } from "next/navigation"
import { addNote,toggleImportance   } from "../services/notes"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createNote = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const content = formData.get("content") as string
  if (!content || content.length < 10) {
    return { error: "Note content must be at least 10 characters long" }
  }
  const important = formData.get("important") === "on"
  await addNote(content, important)

  revalidatePath("/notes")
  redirect("/notes")
}

export const toggleNoteImportance = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await toggleImportance(id)
  revalidatePath(`/notes/${id}`)
  revalidatePath("/notes")
}

