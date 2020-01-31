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
module.exports = router;
