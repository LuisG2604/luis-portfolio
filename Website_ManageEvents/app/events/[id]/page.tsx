// Projet 1 - 2728670

import { notFound, redirect } from "next/navigation"
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

async function getEvent(id: string): Promise<Event | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export const metadata = {
  title: 'Événements à venir - Funevent',
  description: 'Découvrez tous les événements à venir organisés par Funevent.',
}

export default async function EventDetail({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id)
  if (!event) return notFound()

  const deleteEvent = async () => {
    "use server"
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.id}`, { method: 'DELETE' })
    if (res.ok) redirect('/events')
    else throw new Error("Erreur lors de la suppression.")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-black dark:text-white">
      <Image src={event.imageUrl} width={800} height={500} alt={event.title} className="rounded-lg shadow-lg" />
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold">{event.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">{event.description}</p>
        <p className="mt-4 text-gray-700 dark:text-gray-200 font-semibold">📅 {new Date(event.date).toLocaleDateString()} - 📍 {event.location}</p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button className="min-w-[120px] bg-blue-600 dark:bg-blue-400 text-white dark:text-black px-6 py-2 rounded-lg font-semibold transition hover:bg-white hover:text-black border border-blue-600 dark:border-blue-400">
          Réserver
        </button>

      <Link href={`/events/${event.id}/edit`}>
        <span className="min-w-[120px] bg-yellow-500 dark:bg-yellow-300 text-white dark:text-black px-6 py-2 rounded-lg font-semibold transition hover:bg-white hover:text-black border border-yellow-500 dark:border-yellow-300 text-center inline-block">
          Modifier
        </span>
      </Link>

      <form action={deleteEvent}>
        <button type="submit" className="min-w-[120px] bg-red-600 dark:bg-red-400 text-white dark:text-black px-6 py-2 rounded-lg font-semibold transition hover:bg-white hover:text-black border border-red-600 dark:border-red-400">
          Supprimer
        </button>
      </form>
      </div>
    </div>
  )
}
