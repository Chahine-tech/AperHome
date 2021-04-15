const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient()
const fs = require('fs')

function getAllRestaurants(){

    const restaurants = JSON.parse(fs.readFileSync(`${__dirname}/data/restaurants.json`))
    return restaurants
        .filter((restaurant) => restaurant.fields["nom_restaurant", "adresse"])
        .map((restaurant) => ({ name: restaurant.fields["nom_restaurant"], adresse : restaurant.fields["adresse"]}))

    
}
async function main() {
    const restaurants = getAllRestaurants()
    for (let data of restaurants) {
        try {await prisma.restaurant.create({ data })
        console.log(data)}
        catch(error) {
            console.log(error)
        }
    }

}


main()
  .finally(async () => {
    await prisma.$disconnect()
  })


