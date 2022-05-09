const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Joueur = require("../models/joueur");
const config = require("../middleware/config.json");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  //checking if user email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    res.status(400).send("Email already exists");
    return;
  }

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //on process of adding new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    avatar: req.file.path
  });
  const saveUser = await user.save();
  res.status(201).send({ message :"user created" ,saveUser});

}

//signIn

exports.signIn = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;

    if (!user) {

      Joueur.findOne({
        email: req.body.email
      }, function (err, user) {
        if (err) throw err;

        if (!user) {
          res.send({
            success: false,
            msg: 'Authentication failed. User not found.',
          });
          //  console.log(msg);

        } else {
          // check if password matches
          bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign({ _id: user._id, role: user.role }, config.secret,
                {
                  expiresIn: '1h',
                });
              // return the information including token as JSON
              res.json({
                success: true,
                token: token,
                role: 'joueur',
                user: user
              });
            } else {
              res.send({
                success: false,
                msg: 'Authentication failed. Wrong password.'
              });
            }
          });
        }
      })






    } else {
      // check if password matches
      bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign({ _id: user._id, role: user.role }, config.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: token,
            role: "admin",
            user: user
          });
        } else {
          res.send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
}
