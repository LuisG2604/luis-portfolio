// Projet 2 - 2728670

'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

export default function EditEventPage({ params }: { params: { id: string } }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) })
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setValue('title', data.title)
          setValue('date', data.date.slice(0, 10))
          setValue('location', data.location)
          setValue('description', data.description)
          setValue('imageUrl', data.imageUrl)
          setPreview(data.imageUrl)
        }
        setLoading(false)
      })
  }, [params.id, setValue])

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const res = await fetch(`/api/events/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      alert('Événement modifié avec succès !')
      router.push(`/events/${params.id}`)
    } else {
      alert("Erreur lors de la modification.")
    }

    setIsSubmitting(false)
  }

  if (loading) return <p className="text-center mt-10 text-gray-600 dark:text-gray-300">Chargement...</p>

  return (
    <div className="container mx-auto px-4 py-8 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Modifier l’événement</h1>
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

        <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-500 dark:bg-yellow-300 text-white dark:text-black py-2 rounded hover:bg-white hover:text-black border border-yellow-500 dark:border-yellow-300 transition">
          {isSubmitting ? 'Envoi...' : 'Modifier événement'}
        </button>
      </form>
    </div>
  )
}
