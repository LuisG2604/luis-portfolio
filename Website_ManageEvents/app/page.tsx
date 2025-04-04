// Projet 2 - 2728670

import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: 'Événements à venir - Funevent',
  description: 'Découvrez tous les événements à venir organisés par Funevent.',
}

export default function Home() {
  return (
    <div className="min-h-screen text-black dark:text-white">
      <div className="relative h-[80vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-extrabold leading-tight">Découvrez les meilleurs événements près de chez vous!</h1>
          <p className="mt-4 text-lg text-gray-200">Concerts, ateliers, conférences et plus encore. Réservez votre place dès maintenant!</p>
          <Link href="/events">
            <span className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 hover:bg-white hover:text-black border border-blue-600 cursor-pointer">
              Explorer les événements
            </span>
          </Link>
        </div>
      </div>

      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Catégories d'Événements</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Trouvez le type d'événement qui vous convient.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <Image src="/concert.jpg" width={500} height={250} alt="Concert" className="rounded-lg" />
              <h3 className="text-2xl font-semibold mt-4">Concerts & Festivals</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Vibrez au rythme des meilleurs artistes en live.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <Image src="/yoga.jpg" width={500} height={250} alt="Yoga" className="rounded-lg" />
              <h3 className="text-2xl font-semibold mt-4">Ateliers & Bien-être</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Découvrez des activités relaxantes et enrichissantes.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <Image src="/peinture.jpg" width={500} height={250} alt="Peinture" className="rounded-lg" />
              <h3 className="text-2xl font-semibold mt-4">Art & Culture</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Explorez le monde fascinant de l’art et de la créativité.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Événements Populaires</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Ne manquez pas ces événements exceptionnels.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <Image src="/tech.jpg" width={800} height={300} alt="Conférence Tech" className="rounded-lg" />
              <h3 className="text-2xl font-semibold mt-4">Conférence Tech 2025</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Les experts partagent les dernières tendances technologiques.</p>
              <Link href="/events">
                <span className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-white hover:text-black border border-blue-600 cursor-pointer">
                  Voir Plus
                </span>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <Image src="/concert.jpg" width={800} height={300} alt="Festival Rock" className="rounded-lg" />
              <h3 className="text-2xl font-semibold mt-4">Festival Rock</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Un show inoubliable avec des groupes légendaires.</p>
              <Link href="/events">
                <span className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-white hover:text-black border border-blue-600 cursor-pointer">
                  Voir Plus
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
