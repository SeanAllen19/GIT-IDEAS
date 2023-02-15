const router = require('express').Router();
const { User, Notes, Tags } = require('../models');
const axios = require('axios');
const withAuth = require('../utils/auth');
var resultObject = [];


// render homepage template
router.get('/', async (req, res) => {
    res.render('homepage', {
        homepage: true,
        user_id: req.session.user_id,
        logged_in: req.session.logged_in
    });
});

// makes a search query to github and pushes desired results into global variable before taking the user to the /results page
router.get('/search/:query', async (req, res) => {
try {
    resultObject = [];
    const searchTerm = req.params.query;
    const queryStr = `https://api.github.com/search/repositories?q=${searchTerm}&per_page=10`;

    const results = await axios.get(queryStr);

    results.data.items.forEach((item) => {
        if (item.license) {
        resultObject.push(
            {
                id: item.id,
                fullName: item.full_name,
                link: item.html_url,
                description: item.description,
                language: item.language,
                license: item.license.name,
                stargazers_count: item.stargazers_count,
                repoInfo: JSON.stringify({
                    fullName: item.full_name,
                    link: item.html_url,
                    description: item.description,
                    language: item.language,
                    license: item.license.name,
                    stargazers_count: item.stargazers_count})
            }
        );
        } else {
            resultObject.push(
                {
                    id: item.id,
                    fullName: item.full_name,
                    link: item.html_url,
                    description: item.description,
                    language: item.language,
                    stargazers_count: item.stargazers_count,
                    repoInfo: JSON.stringify({
                        fullName: item.full_name,
                        link: item.html_url,
                        description: item.description,
                        language: item.language,
                        stargazers_count: item.stargazers_count})
                }
            );
        }
    });

    res.redirect('/results');
} catch (err) {
    res.status(500).json({message: '/search/:query no good'})
}
})

// renders search results within the global resultObject onto searchResults page
router.get('/results', async (req, res) => {
    try{
        const renderObject = {
            resultObject, 
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        };

        if (req.session.logged_in) {
            const userTags = await Tags.findAll({
                where: {
                    user_id: req.session.user_id
                }
            });

            // const tags = userTags.map((tag) =>tag.get({ plain: true }));
            renderObject.tags = userTags.map((tag) =>tag.get({ plain: true }));
        }

        res.render('searchResults', renderObject);
    } catch (err) {
        res.status(500).json({message: '/results no good'})
    }
});

// render login template
router.get('/login', async (req, res) => {
    res.render('login');
});

// displays all of the current user's tags
router.get('/tagmanager', withAuth, async (req, res) => {
    console.log(req.session.logged_in)
    try {
        
        const userData = await Tags.findAll({
            where: {user_id: req.session.user_id}
        });
    
        const tags = userData.map((tag) =>tag.get({ plain: true }));

        res.render('tagManager', {
            tags,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(req.session.logged_in)
        res.status(500).json({message: '/tagmanager no good!'})
    };
});

// displays all of the current user's notes and makes all of the user's tags available for note editing
router.get('/saved', withAuth, async (req, res) => {
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