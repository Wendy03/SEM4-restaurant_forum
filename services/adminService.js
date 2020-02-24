const fs = require('fs')
const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({ nest: true, raw: true, include: [Category] })
      .then(restaurants => callback({ restaurants }))
  },
  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { nest: true, raw: true, include: [Category] })
      .then(restaurant => callback({ restaurant }))
  },
}


module.exports = adminService