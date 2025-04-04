// Projet 2 - 2728670

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: Number(params.id) },
  })

  if (!event) {
    return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 })
  }

  return NextResponse.json(event)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const { title, date, location, description, imageUrl } = body

  const updatedEvent = await prisma.event.update({
    where: { id: Number(params.id) },
    data: {
      title,
      date: new Date(date),
      location,
      description,
      imageUrl,
    },
  })

  return NextResponse.json(updatedEvent)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.event.delete({
    where: { id: Number(params.id) },
  })

  return NextResponse.json({ message: 'Événement supprimé' })
}
