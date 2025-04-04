// Projet 2 - 2728670

import Link from "next/link"
import Image from "next/image"

type Event = {
  id: number
  title: string
  date: string
  location: string
  description: string
  imageUrl: string
}

async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, { cache: 'no-store' })
  if (!res.ok) {
    console.error('Erreur lors du chargement des événements')
    return []
  }
  return res.json()
}

export const metadata = {
  title: 'Événements à venir - Funevent',
  description: 'Découvrez tous les événements à venir organisés par Funevent.',
}

export default async function Events() {
  const events = await getEvents()

  return (
    <div className="container mx-auto px-4 py-8 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-center my-10">Événements à venir</h1>

      <div className="text-center mb-10">
        <Link href="/events/new">
          <span className="inline-block bg-green-600 dark:bg-green-500 text-white dark:text-black px-6 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:text-black border border-green-600 dark:border-green-400 cursor-pointer">
            ➕ Ajouter un événement
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image src={event.imageUrl} width={800} height={500} alt={event.title} className="w-full h-auto rounded-t-xl" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{event.title}</h2>
              <p className="mt-2 font-semibold">📅 {new Date(event.date).toLocaleDateString()} - 📍 {event.location}</p>
              <Link href={`/events/${event.id}`}>
                <span className="mt-4 inline-block bg-blue-600 dark:bg-blue-400 text-white dark:text-black px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:text-black border border-blue-600 dark:border-blue-400 cursor-pointer">
                  Voir Détails
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
