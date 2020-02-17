const db = require('../models')
const Category = db.Category
let categoryController = {
    getCategories: (req, res) => {
        return Category.findAll({ nest: true, raw: true }).then(categories => {
            if (req.params.id) {
                Category.findByPk(req.params.id, { nest: true, raw: true })
                    .then((category) => {
                        return res.render('admin/categories', { categories, category })
                    })
            } else {
                return res.render('admin/categories', { categories: categories })
            }
        })
    },
    postCategory: (req, res) => {
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
    putCategory: (req, res) => {
        if (!req.body.name) {
            req.flash('error_messages', 'name didn\'t exist')
            return res.redirect('back')
        } else {
            return Category.findByPk(req.params.id)
                .then((category) => {
                    category.update(req.body)
                        .then((category) => {
                            res.redirect('/admin/categories')
                        })
                })
        }
    },
    deleteCategory: (req, res) => {
        return Category.findByPk(req.params.id)
            .then((category) => {
                category.destroy()
                    .then((category) => {
                        res.redirect('/admin/categories')
                    })
            })
    }
}

module.exports = categoryController