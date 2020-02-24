const db = require('../models')
const Category = db.Category
let categoryService = {
  getCategories: (req, res, callback) => {
    return Category.findAll({ raw: true })
      .then(categories => {
        if (req.params.id) {
          Category.findByPk(req.params.id, { raw: true })
            .then((category) => {
              return res.render('admin/categories', { categories, category })
            })
        } else {
          return callback({ categories: categories })
        }
      })
  }
}

module.exports = categoryService