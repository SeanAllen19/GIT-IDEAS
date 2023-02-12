const router = require('express').Router();
const { User, Notes } = require('../models');
// const withAuth = require('../utils/auth');

// render homepage template
router.get('/', async (req, res) => {
    try{
        const notesData = await Notes.findAll({
            limit: 10,
            order: [
                ['date_created', 'DESC']
            ]
        });

        const notes = notesData.map((notes) => notes.get({ plain: true }));

        res.render('homepage', {
            notes,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/login', async (req, res) => {
    res.render('login');
});

module.exports = router;