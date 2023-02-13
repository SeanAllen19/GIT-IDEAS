const router = require('express').Router();
const { User, Notes, Tags } = require('../models');
// const withAuth = require('../utils/auth');

// render homepage template
router.get('/', async (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in
    });
});

// ! NOT WORKING !
router.post('/', (req, res) => {
    try {
    const items = req.body;

    const newItems = items.map((item) =>
      item.get({ plain: true })
      );

    console.log(newItems)

    res.status(200).render('searchResults', {
        newItems,
        logged_in: req.session.logged_in
    });
} catch (err) {
    res.status(500).json({message: 'no good!'})
};
})

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

// go to http://localhost:3001/tagmanager to see
router.get('/tagmanager', async (req, res) => {
    try {
        const userData = await Tags.findAll();
    
        const tags = userData.map((tag) =>
      tag.get({ plain: true })
      );

        res.render('tagManager', {
            tags,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json({message: 'no good!'})
    };
});

module.exports = router;