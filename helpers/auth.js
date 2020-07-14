const jwt = require('jsonwebtoken')

module.exports = {
  auth: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const isTokenValid = jwt.verify(token, "privateKey")
      if (isTokenValid) return next()
    } catch (error) {
      res.status(400).send({
        message: 'error in auth helper',
        error: error.message
      })
    }
  }
}