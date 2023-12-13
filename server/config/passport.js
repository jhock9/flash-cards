const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

const localPassport = (passport) => {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'Invalid username' });
        }
        if (!(await user.comparePassword(password))) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

// Export to server.js
module.exports = localPassport;