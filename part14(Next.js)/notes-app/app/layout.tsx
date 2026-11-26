import "./globals.css"
import NavBar from "./components/NavBar"
import Providers from "./components/Providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}