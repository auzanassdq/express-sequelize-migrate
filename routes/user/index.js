var express = require('express');
var router = express.Router();

var {register, login} = require('./controllers')
var {auth} = require('../../helpers/auth')

/* GET users listing. */
router.get('/', auth, (req, res) => {
  res.send('hallo user')
})
router.post('/register', register);
router.post('/login', login);

module.exports = router;
