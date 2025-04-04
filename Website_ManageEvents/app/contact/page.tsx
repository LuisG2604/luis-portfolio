// Projet 2 - 2728670

'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required("L’email est requis"),
  message: yup.string().required('Le message est requis'),
})

type FormData = {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) })

  const onSubmit = (data: FormData) => {
    console.log('Formulaire soumis :', data)
    alert('Message envoyé ! Vérifie la console.')
  }

  return (
    <div className="container mx-auto px-4 py-8 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-center">Nous contacter</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">Vous pouvez nous contacter pour toute question ou demande d'information.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nom</label>
          <input {...register('name')} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p className="text-red-600 text-sm">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
          <input type="email" {...register('email')} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p className="text-red-600 text-sm">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Message</label>
          <textarea {...register('message')} rows={4} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p className="text-red-600 text-sm">{errors.message?.message}</p>
        </div>

        <button type="submit" className="bg-blue-600 dark:bg-blue-400 text-white dark:text-black px-6 py-2 rounded w-full transition-all duration-300 hover:bg-white hover:text-black border border-blue-600 dark:border-blue-400">
          Envoyer
        </button>
      </form>
    </div>
  )
}
