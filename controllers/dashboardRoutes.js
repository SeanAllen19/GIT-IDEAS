const router = require('express').Router();
const { User, Notes } = require('../models');
const withAuth = require('../utils/auth');

// Replace res.status(200)s with renders when ready to test with handlebars layouts
  
// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/notes/:id', withAuth, async (req, res) => {
    try {
        const projectData = await Notes.findByPk({
            where: {
                user_id: req.session.user_id,
            }
        });

        const project = projectData.get({ plain: true });

        res.render('project', {
        ...project,
        logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
  
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
    //   res.redirect('/');
        res.status(200).json("user loggged in: redirects to homepage");
        return;
    }

    // res.render('login');
    res.status(200).json("user not logged in: renders 'login' page");
});
  
module.exports = router;
  