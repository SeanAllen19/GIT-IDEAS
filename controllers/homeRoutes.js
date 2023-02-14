const router = require('express').Router();
const { User, Notes, Tags } = require('../models');
const axios = require('axios');
// const withAuth = require('../utils/auth');
var resultObject = [];
// render homepage template
router.get('/', async (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in
    });
});

router.get('/search/:query', async (req, res) => {
try {
    const searchTerm = req.params.query;

    resultObject = [];
    const queryStr = `https://api.github.com/search/repositories?q=${searchTerm}&per_page=8`;

    const results = await axios.get(queryStr);

    results.data.items.forEach((item) => {
        resultObject.push(
            {
            name: item.name, 
            id: item.id,
            link: item.html_url,
            description: item.description
            
            }
        );
    });
    console.log(resultObject)

    res.redirect('/results');
} catch (err) {
    res.status(500).json({message: '/search/:query no good'})
}
})

router.get('/results', async (req, res) => {
    res.render('searchResults', {
        resultObject,
        logged_in: req.session.logged_in
    });
});

// render newNote template from search result id
router.get('/results/:id', async (req, res) => {
    try{
        const objectOne = resultObject[0];
        console.log('ObjectOne', objectOne);

        const userTags = await Tags.findAll({
            where: {
                user_id: 2
            }
        })

        const tags = userTags.map((tag) =>tag.get({ plain: true }));

        res.render('notableResult', {
            tags,
            objectOne,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json({message: '/results/:id no good!'})
    }
});

// render login template
router.get('/login', async (req, res) => {
    res.render('login');
});

// go to http://localhost:3001/tagmanager to see
router.get('/tagmanager', async (req, res) => {
    try {
        const userData = await Tags.findAll();
    
        const tags = userData.map((tag) =>tag.get({ plain: true }));

        res.render('tagManager', {
            tags,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json({message: '/tagmanager no good!'})
    };
});

router.get('/saved', async (req, res) => {
    try{
        const userNotes = await Notes.findAll({
            include: [{ model: Tags }],
            where: {
                user_id: req.session.user_id
            },
        });

        const notes = userNotes.map((note) =>note.get({ plain: true }));

        const userTags = await Tags.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const tags = userTags.map((tag) =>tag.get({ plain: true }));

        res.render('savedNotes', {
            tags,
            notes,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json({message: '/saved no good!'});
    }
});

module.exports = router;