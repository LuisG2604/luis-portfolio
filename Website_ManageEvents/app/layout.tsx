// Projet 2 - 2728670

'use client'

import './globals.css'
import Link from 'next/link'
import { useState } from 'react'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'

// Fonction pour le mode dark/light
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded shadow">
      {theme === 'light' ? '🌙 Mode sombre' : '☀️ Mode clair'}
    </button>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <html lang="fr" className="dark">
      <body className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col min-h-screen">
        <ThemeProvider>
          <ThemeToggleButton />
          <nav className="bg-blue-600 dark:bg-blue-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
              <Link href="/" className="text-2xl font-bold">Funevent</Link>

              <button
                className="md:hidden text-white text-2xl"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ☰
              </button>

              <div className="hidden md:flex space-x-4">
                <Link href="/" className="nav-link">Accueil</Link>
                <Link href="/events" className="nav-link">Événements</Link>
                <Link href="/contact" className="nav-link">Contact</Link>
              </div>
            </div>

            {menuOpen && (
              <div className="md:hidden bg-blue-700 dark:bg-blue-900 p-4 flex flex-col space-y-2 text-center">
                <Link href="/" className="nav-link-mobile" onClick={() => setMenuOpen(false)}>Accueil</Link>
                <Link href="/events" className="nav-link-mobile" onClick={() => setMenuOpen(false)}>Événements</Link>
                <Link href="/contact" className="nav-link-mobile" onClick={() => setMenuOpen(false)}>Contact</Link>
              </div>
            )}
          </nav>

          <main className="container mx-auto px-4 flex-grow">
            {children}
          </main>

          <footer className="bg-blue-600 dark:bg-blue-800 text-white text-center py-4 mt-10">
            <p>© 2025 Funevent | Projet 2 - 2728670</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
