const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const pageLimit = 12
let restController = {
    getRestaurants: (req, res) => {
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
            let page = Number(req.query.page) || 1
            let pages = Math.ceil(result.count / pageLimit)
            let totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
            let prev = page - 1 < 1 ? 1 : page - 1
            let next = page + 1 > pages ? pages : page + 1
            const data = result.rows.map(r => ({
                ...r,
                description: r.description.substring(0, 50)
            }))
            Category.findAll({ nest: true, raw: true }).then(categories => {
                console.log(req.query.page)
                return res.render('restaurants', {
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