const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const User  = require('../mongoose/user'); // Add this line to import the User model

const router = express.Router(); // Fix Router initialization

// Helper function to compare passwords
const comparePassword = (plain, hashed) => bcrypt.compareSync(plain, hashed);

// Passport serialize/deserialize logic
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const findUser = await User.findById(id);
		if (!findUser) return done(null, false);
		done(null, findUser);
	} catch (err) {
		done(err, null);
	}
});

// Passport local strategy
passport.use(
	new Strategy(async (username, password, done) => {
		try {
			const findUser = await User.findOne({ username });
			if (!findUser) return done(null, false, { message: 'Incorrect username.' });
			if (!comparePassword(password, findUser.password))
				return done(null, false, { message: 'Incorrect password.' });
			done(null, findUser);
		} catch (err) {
			done(err, null);
		}
	})
);

// Authentication route
router.post('/api/auth', (req, res, next) => {
  console.log(req.body.username)
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			console.log('Server error:', err);
			return res.status(500).send('Internal Server Error');
		}
		if (!user) {
			return res.status(403).send(info.message || 'Bad Credentials');
		}
		req.logIn(user, (err) => {
			if (err) {
				console.log('Error logging in:', err);
				return res.status(403).send('Bad Credentials');
			}
			// Set cookie and send success response
      /*
			res.cookie('hello', 'world', {
				signed: true,
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24, // 1 day
				path: '/',
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production', // Secure in production
			});*/
			console.log('Cookie set:', res.getHeader('Set-Cookie'));
			return res.status(200).json({ success: true, message: "Request was successful" });
		});
	})(req, res, next); // Call passport.authenticate as middleware
});

// Auth status route
router.get('/api/auth/status', (req, res) => {
	console.log(req.user);
	return req.user ? res.send(req.user) : res.sendStatus(401);
});

// Logout route
router.post('/api/auth/logout', (req, res) => {
	if (!req.user) return res.sendStatus(401);
	req.logout(err => {
		if (err) return res.sendStatus(400);
		res.clearCookie('hello'); // Clear the cookie on logout
		res.sendStatus(200);
	});
});

module.exports = router; // Use module.exports for CommonJS
