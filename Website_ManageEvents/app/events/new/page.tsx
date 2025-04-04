// Projet 2 - 2728670

'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const schema = yup.object().shape({
  title: yup.string().required('Le titre est requis'),
  date: yup.string().required('La date est requise'),
  location: yup.string().required('La localisation est requise'),
  description: yup.string().required('La description est requise'),
  imageUrl: yup.string().matches(/^\/.+\.(jpg)$/, 'Le lien doit commencer par "/" et être un fichier dans le dossier public/').required("L'URL de l'image est requise"),
})

type FormData = {
  title: string
  date: string
  location: string
  description: string
  imageUrl: string
}

export default function NewEventPage() {
  const [preview, setPreview] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    res.ok ? (alert('Événement créé avec succès !'), router.push('/events')) : alert('Erreur lors de la création de l’événement')
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Créer un nouvel événement</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Titre</label>
          <input {...register('title')} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white" />
          <p className="text-red-600 text-sm">{errors.title?.message}</p>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Date</label>
          <input type="date" {...register('date')} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white" />
          <p className="text-red-600 text-sm">{errors.date?.message}</p>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Localisation</label>
          <input {...register('location')} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white" />
          <p className="text-red-600 text-sm">{errors.location?.message}</p>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Description</label>
          <textarea rows={4} {...register('description')} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white" />
          <p className="text-red-600 text-sm">{errors.description?.message}</p>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Image URL | Exemple: /tech.jpg</label>
          <input {...register('imageUrl')} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white" onChange={(e) => {
            const value = e.target.value
            setValue('imageUrl', value)
            setPreview(value.startsWith('/') ? value : '')
          }} />
          <p className="text-red-600 text-sm">{errors.imageUrl?.message}</p>
          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Aperçu de l’image :</p>
              <img src={preview} alt="aperçu" className="w-full max-h-64 object-contain border rounded" />
            </div>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 dark:bg-blue-400 text-white dark:text-black py-2 rounded hover:bg-white hover:text-black border border-blue-600 dark:border-blue-400 transition">
          {isLoading ? 'Envoi...' : 'Créer événement'}
        </button>
      </form>
    </div>
  )
}
