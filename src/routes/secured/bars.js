import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
const barsData = require('../../../jsonfile/restaurants-casvp.json');

const api = Router()

api.get('/', async (req, res) => {
  dotenv.config();

const db = new Prisma({
  secret: process.env.PRISMA_SECRET,
  endpoint: process.env.PRISMA_ENDPOINT,
});

const seedBars = () => {
  // adding bars to the data
  Promise.all(
    barsData.map(async barsItem => {
      
      const { ville, bars, adresse } = barsItem;
      const response = await db.createBars({
        name: bars || 'default name',
        ville,
        adresse,

    });
      return response;
    })
  );
};

seedBars();

})


export default api
