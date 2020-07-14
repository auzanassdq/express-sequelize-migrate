const db = require('../../src/db/models')
const { user, post, postImage } = db

module.exports = {
  getPost: (req, res) => {},

  addPost: (req, res) => {
    const {imagePost, ...postBody} = req.postBody
    post.create(postBody)
    .then(result => {
      postImage.create({
        name: req.file.originalName,
        path: req.file.path,
        postId: result.id
      })

      return result
    })
    .then(result => {
      res.status(201).send({
        message: 'post created',
        result
      })
    })
    .catch(error => {
      res.status(400).send({
        message: "can't create post",
        error: error.stack
      })
    })
  },

}