import { Router } from 'express'
//import { PrismaClient } from '@prisma/client'
const api = Router()



api.get('/', async (req, res) => {
  
  let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

});
export default api
