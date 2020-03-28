const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const database = require('../db');

// Create a passport middleware to handle user registration
passport.use('signup', new localStrategy( {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = { email, password };

      database('cards').insert(user).into('card');

    } catch (error) {
      done(error);
    }
  }
));

// Create a passport middleware to handle User login
passport.use('login', new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        knex('user')
          .where('email', email)
          .then(rows => {
              return rows[0];
          });

        if( !user ){
          // If the user isn't found in the database, return a message
          return done(null, false, { message : 'User not found'});
        }
        // Validate password and make sure it matches with the corresponding hash stored in the database
        // If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if( !validate ){
          return done(null, false, { message : 'Wrong Password'});
        }
        // Send the user information to the next middleware
        return done(null, user, { message : 'Logged in Successfully'});
      } catch (error) {
        return done(error);
      }
    }
));
