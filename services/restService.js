const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const pageLimit = 12
let restService = {
  getRestaurants: (req, res, callback) => {
    let offset = 0
    let whereQuery = {}
    let categoryId = ''
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery['CategoryId'] = categoryId
    }
    Restaurant.findAndCountAll({ nest: true, raw: true, include: Category, where: whereQuery, offset: offset, limit: pageLimit }).then(result => {
      const page = Number(req.query.page) || 1
      const pages = Math.ceil(result.count / pageLimit)
      const totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
      const prev = page - 1 < 1 ? 1 : page - 1
      const next = page + 1 > pages ? pages : page + 1
      const data = result.rows.map(r => ({
        ...r,
        description: r.description.substring(0, 50),
        isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(r.id),
        isLiked: req.user.LikedRestaurants.map(d => d.id).includes(r.id)
      }))
      Category.findAll({ nest: true, raw: true }).then(categories => {
        // console.log(data)
        callback({
          restaurants: data,
          categories: categories,
          categoryId: categoryId,
          page: page,
          totalPage: totalPage,
          prev: prev,
          next: next
        })
      })
    })
  },
  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: User, as: 'FavoritedUsers' },
        { model: User, as: 'LikedUsers' },
        { model: Comment, include: [User] }
      ]
    }).then(restaurant => {
      restaurant.viewCounts += 1
      restaurant.save()
      const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
      const isLiked = restaurant.LikedUsers.map(d => d.id).includes(req.user.id)
      callback(JSON.parse(JSON.stringify({ restaurant, isFavorited, isLiked })))
    })
  },
  getFeeds: (req, res, callback) => {
    return Restaurant.findAll({
      nest: true,
      raw: true,
      limit: 10,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [Category]
    }).then(restaurants => {
      Comment.findAll({
        nest: true,
        raw: true,
        limit: 10,
        order: [
          ['createdAt', 'DESC']
        ],
        include: [User, Restaurant]
      }).then(comments => {
        callback({
          restaurants: restaurants,
          comments: comments
        })
      })
    })
  },
  getDashboard: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: [User] }
      ]
    }).then(restaurant => {
      callback({ restaurant: JSON.parse(JSON.stringify(restaurant)) })
    })
  },
  getTopRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      include: [
        { model: User, as: 'FavoritedUsers' }
      ]
    }).then(restaurants => {
      restaurants = restaurants.map(r => ({
        ...r.dataValues,
        description: r.dataValues.description ? r.dataValues.description.substring(0, 50) : '',
        FavoritedCount: r.FavoritedUsers.length,
        isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(r.id)
      }))
      restaurants = restaurants.sort((a, b) => b.FavoritedCount - a.FavoritedCount).slice(0, 10)
      callback({ restaurants })
    })
  }
}
module.exports = restService