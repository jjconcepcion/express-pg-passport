const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findByUsername(username)
        .then(results => results.rows[0])
        .then((user) => {
          if (!user) {
            return Promise.resolve([user, false]);
          } else {
            return Promise.all([
              Promise.resolve(user),
              User.verifyPassword(password, user.password_hash),
            ]);
          }
        })
        .then(([user, isValidPassword]) => {
          if (!user || !isValidPassword) {
            return done(null, false);
          } else {
            const sessionUser = {
              id: user.id,
              username: user.username,
            }
            return done(null, sessionUser);
          }
        })
        .catch(err => console.log(err));
    }
  ));
}

