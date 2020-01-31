var express = require('express');
const bodyParser = require('body-parser');
var Ngo = require('../models/ngo');
var passport = require('passport');
var authenticate = require('../authenticate');
var Events = require('../models/event');


var router = express.Router();

router.get('/addevent', function (req, res, next) {
    res.render('addEvent', {
        title: 'Add Event'
    })
});

router.post('/addevent', authenticate.verifyUser, (req, res, next) => {
    Events.create(req.body)
        .then((event) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(event);
        }, (err) => next(err))
        .catch((err) => next(err));
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
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            success: true,
                            status: 'Registration Successful!'
                        });
                    });
                });
            }
        });
});

router.post('/login', passport.authenticate('ngo'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        success: true,
        status: 'You are successfully logged in!'
    });
});

router.get('/logout', (req, res) => {
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
