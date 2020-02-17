const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
let restController = {
    getRestaurants: (req, res) => {
        Restaurant.findAll({ nest: true, raw: true, include: Category }).then(restaurants => {
            const data = restaurants.map(r => ({
                ...r,
                description: r.description.substring(0, 50)
            }))
            return res.render('restaurants', {
                restaurants: data
            })
        })
    },
    getRestaurant: (req, res) => {
        return Restaurant.findByPk(req.params.id, {
            nest: true,
            raw: true,
            include: Category
        }).then(restaurant => {
            return res.render('restaurant', { restaurant })
        })
    }
}
module.exports = restController