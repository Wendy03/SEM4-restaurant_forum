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
  },
  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      req.flash('error_messages', "Name didn't exist!")
      return res.redirect('back')
    } else {
      return Category.create({
        name: req.body.name
      })
        .then((category) => {
          res.redirect('/admin/categories')
        })
    }
  },
}

module.exports = categoryService