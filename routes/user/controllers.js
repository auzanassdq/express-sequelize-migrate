const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const db = require("../../src/db/models");
const { user } = db;

module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if ((!name || !email, !password)) {
      return res.status(400).send({
        message: `body can't be empty`,
      });
    }

    const existedUser = await user.findOne({ where: { email }});
    if (existedUser) {
      return res.status(400).send({
        message: `user already exist, please login`
      });
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (!err) {
            user
              .create({ name, email, password: hash })
              .then(result => {
                return res.status(200).send({
                  message: `user created`,
                  result
                });
              })
              .catch(error => {
                return res.status(400).send({
                  message: `create user is failed`,
                  error: error.message
                });
              });
          } else {
            return res.status(400).send({
              message: `hashing password is failed`,
              error: error.message
            });
          }
        });
      });
    }
  },

  login: async (req, res) => {
    const {email, password} = req.body
    const existedUser = await user.findOne({ where: { email }});

    if (existedUser) {
      const valid = bcrypt.compareSync(password, existedUser.password);

      if (valid) {
        jwt.sign({existedUser}, "privateKey", { algorithm: 'HS256', expiresIn: "1h" }, function(err, token) {
          if (!err) {
            return res.status(200).send({
              message: `success login`,
              user: {
                id: existedUser.id,
                email: existedUser.email
              },
              token
            });
          } else {
            return res.status(200).send({
              message: `token invalid`,
            });
          }
        });
      } else {
        return res.status(400).send("password invalid")
      }
    } else {
      return res.status(400).send("user not found, you must register")
    }
  },

  getAllUser: (req, res) => {},

  getUserById: (req, res) => {},

  deleteUser: (req, res) => {},

  updateUser: (req, res) => {}
};
