import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'


const api = Router()

api.post('/add', async (req, res) => {

    const acceptedFields = ['content','userId','isComplete']
  
    const missingValues = acceptedFields.filter(field => !req.body[field])
    const {content, userId} = req.body

    const prisma = new PrismaClient()
    try {
      const task = await prisma.task.create({
        data: {
          content,
          userId,
          isComplete,
        }
      })
      res.json({success : true})
    }
      catch (err) {
        res.status(400).json({ error: err.message })
      }
})

api.put('/update/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)

    const prisma = new PrismaClient()
    const task = await prisma.task.findFirst({
      where: {
        id,
        isComplete
      }
    })
    const updatedtask = await prisma.task.update({
      where: {
        id,
      },
      data: {
      isComplete: task.isComplete ? false : true,
      }
    })

    res.json({ data: {updateTasks} })
  } catch (err) {
    res.status(BAD_REQUEST.status).json({ error: err.message })
  }
})

api.delete('/delete/:id', async (req, res) => {

  const prisma = new PrismaClient()

  try {
    const id = parseInt(req.params.id, 10)
    
        const task = await prisma.task.delete({
        where: {
            id,
        }
    })

    res.json({ data: { task } })
} catch (err) {
    res.status(400).json({ error: err.message })
}
})


  
export default api
