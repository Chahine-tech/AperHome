import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express();
import { PrismaClient } from '@prisma/client'
import routes from './routes'


  
app.get('/', (_req, res) => {
    res.send("Please take a look at our <a href='/api'>API</a>")
  })

  app.use('/api', routes)


app.listen(process.env.PORT, function() {
    console.log(`Server starting at http://localhost:${process.env.PORT}`);
  });

