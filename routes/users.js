var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();

router.get('/login', function (req, res, next) {
  res.render('userLogin', {
    title: 'Login in'
  })
});

router.get('/signup', (req, res, next) => {
  res.render('userSignup', {
    title: 'Sign up'
  })
});


router.post('/signup', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          err: err
        });
      } else {
        if (req.body.emailId)
          user.emailId = req.body.emailId;
        if (req.body.phoneNo)
          user.phoneNo = req.body.phoneNo;
        user.save((err, user) => {
          passport.authenticate('user')(req, res, () => {
            if (err) {
              res.render('error', {
                err
              })
            }
            res.statusCode = 200;
            res.render('UserLanding', {
              user
            })
          });
        });
      }
    });
});

router.post('/login',passport.authenticate('user'), (req, res) => {
  res.statusCode = 200;
  res.render('UserLanding',{
    user : req.user
  })
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
