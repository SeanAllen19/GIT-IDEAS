const router = require('express').Router();
// const { User, Notes } = require('../models');
// const withAuth = require('../utils/auth');

// render homepage template
router.get('/', async (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in
    });
});

// render login template
router.get('/login', async (req, res) => {
    res.render('login');
});

// render newNote template from search result id
router.get('/search/:id', async (req, res) => {
    res.render('newNote', {
        user_id: req.session.user_id,
        logged_in: req.session.logged_in
    });
});

module.exports = router;