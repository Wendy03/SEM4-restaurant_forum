const db = require('../models')
const Category = db.Category
let categoryController = {
    getCategories: (req, res) => {
        return Category.findAll({ nest: true, raw: true }).then(categories => {
            return res.render('admin/categories', { categories })
        })
    },
    postCategory: (req, res) => {
        if (!req.body.name) {
            req.flash('error_messages', 'Name didn\'t exist!')
            return res.redirect('back')
        } else {
            return Category.create({
                    name: req.body.name
                })
                .then((category) => {
                    res.redirect('/admin/categories')
                })
        }
    }
}

module.exports = categoryController