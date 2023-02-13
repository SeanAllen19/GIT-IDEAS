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
    console.log(searchTerm);

    resultObject = [];
    const queryStr = `https://api.github.com/search/repositories?q=${searchTerm}&per_page=10`;
    console.log(queryStr)

    const results = await axios.get(queryStr);


    results.data.items.forEach((item) => {
        resultObject.push({name: item.name, id: item.id});
    });
    console.log(resultObject)

    res.redirect('/results');
} catch (err) {
    res.status(500).json({message: 'No good'})
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
    
    const objectOne = resultObject[0];
    console.log('ObjectOne', objectOne);

    res.render('newNote', {
        objectOne,
        user_id: req.session.user_id,
        logged_in: req.session.logged_in
    });
});

// render login template
router.get('/login', async (req, res) => {
    res.render('login');
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