"use client"

import AuthSessionProvider from "./SessionProvider"
import { NotificationProvider } from "./NotificationContext"
import Notification from "./Notification"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthSessionProvider>
      <NotificationProvider>
        <Notification />
        {children}
      </NotificationProvider>
    </AuthSessionProvider>
  )
}