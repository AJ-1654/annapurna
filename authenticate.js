var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var Ngo = require('./models/ngo');

var config = require('./config');

exports.local = passport.use('user', new LocalStrategy(User.authenticate()));
exports.localngo = passport.use('ngo',new LocalStrategy(Ngo.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.serializeUser(Ngo.serializeUser());
passport.deserializeUser(Ngo.deserializeUser());



exports.verifyUser = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error", "Please login first!");
    res.redirect("/login");
};