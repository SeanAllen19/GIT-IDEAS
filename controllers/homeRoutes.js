const router = require('express').Router();
// const { User, Notes } = require('../models');
// const withAuth = require('../utils/auth');

// render homepage template
router.get('/', async (req, res) => {
    res.render('homepage');
});

module.exports = router;