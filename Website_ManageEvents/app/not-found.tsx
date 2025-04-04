// Projet 1 - 2728670

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page non trouvée</p>
      <p className="mt-2 text-gray-500">La page que vous cherchez n'existe pas ou a été déplacée.</p>

      <Link href="/">
        <span className="mt-6 bg-blue-600 text-white px-6 py-2 rounded cursor-pointer">
          Retour à l'accueil
        </span>
      </Link>
    </div>
  );
}
