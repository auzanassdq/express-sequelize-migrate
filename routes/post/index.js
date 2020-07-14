const express = require('express')
const route = express.Router()
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/posts')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })
const {getPost, addPost} = require('./controllers')

route.get('/', getPost)
route.post('/', upload.single('imagePost'), addPost)

module.exports = route