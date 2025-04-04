import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const events = await prisma.event.findMany()
  return NextResponse.json(events)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { title, date, location, description, imageUrl } = body

  if (!title || !date || !location || !description || !imageUrl) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

  const newEvent = await prisma.event.create({
    data: {
      title,
      date: new Date(date),
      location,
      description,
      imageUrl,
    },
  })

  return NextResponse.json(newEvent, { status: 201 })
}
