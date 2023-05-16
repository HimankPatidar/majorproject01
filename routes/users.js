const express = require('express');
const router = express.Router();
const passport = require('passport');
// const catchAsync = require('../utils/CatchAsync');
const User = require('../models/users');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async(req,res,next)=>{
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            res.redirect('/posts')
        })
    } catch (error) {
        res.send(error)
        res.redirect('register')     
    }
})

router.get("/login", (req,res)=>{
    res.render("users/login")
})

// router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
//     res.redirect('/posts');
//   });
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const redirectUrl = req.session.returnTo || '/posts';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/posts');
    });
}); 



module.exports = router;