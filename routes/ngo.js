var express = require('express');
const bodyParser = require('body-parser');
var Ngo = require('../models/ngo');
var passport = require('passport');
var authenticate = require('../authenticate');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var router = express.Router();

router.get('/login', function (req, res, next) {
  res.render('ngoLogin', {
    title: 'Login in'
  })
});

router.get('/signup', (req, res, next) => {
  res.render('ngoSignup', {
    title: 'Sign up'
  })
});


router.post('/signup', (req, res, next) => {
  Ngo.register(new Ngo({
    username: req.body.username
  }),
    req.body.password, (err, ngo) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          err: err
        });
      } else {
        if (req.body.emailId)
          ngo.emailId = req.body.emailId;
        if (req.body.phoneNo)
          ngo.phoneNo = req.body.phoneNo;
        if (req.body.pocName)
          ngo.pocName = req.body.pocName;
        // if (req.body.lat && req.body.lon) {

        //   ngo.geometry = new Schema({
        //     type : "Point",
        //     coordinates: [parseFloat(req.body.lat), parseFloat(req.body.lon)]
        //   })
        //   // ngo.geometry.insert({ coordinates: [parseFloat(req.body.lat), parseFloat(req.body.lon)] })
        // }

        ngo.save((err, ngo) => {
          passport.authenticate('ngo')(req, res, () => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({
                err: err
              });
            }
            res.statusCode = 200;
            res.render('NGOLanding', {
              ngo
            })
          });
        });
      }
    });
});

router.post('/login', passport.authenticate('ngo'), (req, res) => {
  res.statusCode = 200;
  res.render('NGOLanding', {
    ngo: req.ngo
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
