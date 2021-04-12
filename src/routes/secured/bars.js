import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { BAD_REQUEST } from '../../constants/api'

const api = Router()

api.get('/', async (req, res) => {
  try {

    const prisma = new PrismaClient()
    const restaurants = await prisma.restaurant.findMany({
      select: {
        name: true,
        adresse: true,

      }
    })

    res.json({ data: { restaurants } })
  } catch (err) {
    res.status(BAD_REQUEST.status).json({ error: err.message })
  }
})


export default api
