const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Show the form of signup
router.get('/register', (req, res) => {
    res.render('auth/signup')
})

// Actually want to register a user in my DB
router.post('/register', async (req, res) => {
    try {
        let { email, password, username, role } = req.body;
        const user = new User({ email, username, role })
        const newUser = await User.register(user, password);
        // res.redirect("/login");
        req.login(newUser, function (err) {
            if (err) { return next(err) }
            req.flash('success', 'Welcome, You are registed succesfully');
            return res.redirect('/products')
        })
    }
    catch (e) {
        req.flash('error', e.message);
        return res.redirect('/signup')
    }
})

// To get login form
router.get('/login', (req, res) => {
    res.render('auth/login')
})

// To actually login via the DB
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), (req, res) => {
    req.flash('success', 'Welcome back')
    res.redirect('/products');
})

// Logout
router.get('/logout', (req, res) => {
    () => {
        req.logout();
    }
    req.flash('success', 'Goodbye friend, see you again')
    res.redirect('/login');
})

module.exports = router;