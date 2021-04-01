import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
const continentData = require('../../../jsonfile/restaurants-casvp.json');

const api = Router()

api.get('/', async (req, res) => {
  dotenv.config();

const db = new Prisma({
  secret: process.env.PRISMA_SECRET,
  endpoint: process.env.PRISMA_ENDPOINT
});

const seedContinents = () => {
  // adding continents to the data
  Promise.all(
    continentData.map(async continentItem => {
      const { imageURL, continent } = continentItem;
      const response = await db.createContinent({
        name: nom_restaurant || 'default name',
        ville,
        adresse,

    });
      return response;
    })
  );
};

seedContinents();

})


export default api
