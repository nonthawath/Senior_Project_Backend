var express = require('express');
var router = express.Router();
var Users = require('../models/Users')
var passport = require('passport')

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
      done(err, user)
  });
    passport.use(new GoogleStrategy({
        clientID: '929076668714-b7feubj0vc390btqe3jo6pfultg8bk5k.apps.googleusercontent.com',
        clientSecret: 'OI6jAQMzWOyILngboxfw_teM',
        callbackURL: "http://localhost:3000/users/"
      },
      function(accessToken, refreshToken, profile, done) {
          return done(null, profile);
      }
));
/* GET users listing. */
router.post('/create', async (req, res, next) => {
  try {
    var user = new Users({
      username : req.body.username,
      email : req.body.email,
      password : req.body.password,
      name : req.body.name,
      lastname : req.body.lastname,
      phonenumber : req.body.phonenumber
    })
    await user.save()
    res.status(200).send('Create success');
  } catch (error) {
    console.log(error)
    next(error)
  } 
});

router.get('/', async (req, res, next) => {
  try {
    passport.authenticate('google', { scope: ['profile' , 'email'] })
    console.log('AAAA')
    // passport.authenticate('google', { failureRedirect: '/login' })
      // Successful authentication, redirect home.
  } catch (error) {
    console.log(error)
    next(error)
  } 
});

router.get('/callback', async (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login' })
  res.redirect('http://localhost:8080/abc')
  // res.send('GGGG')
});

module.exports = router;
