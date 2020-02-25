const db = require('../models')
const Comment = db.Comment
let commentService = {
  postComment: (req, res, callback) => {
    return Comment.create({
      text: req.body.text,
      RestaurantId: req.body.restaurantId,
      UserId: req.user.id
    })
      .then((comment) => {
        callback({ status: 'success', message: 'Comment was successfully updated', RestaurantId: comment.RestaurantId })
      })
  },
  deleteComment: (req, res) => {
    return Comment.findByPk(req.params.id)
      .then((comment) => {
        comment.destroy()
          .then((comment) => {
            callback({ status: 'success', message: '', RestaurantId: comment.RestaurantId })
          })
      })
  }
}
module.exports = commentService