const db = require('../models')
const Category = db.Category
let categoryController = {
    getCategories: (req, res) => {
        return Category.findAll({ nest: true, raw: true }).then(categories => {
            return res.render('admin/categories', { categories })
        })
    }
}

module.exports = categoryController