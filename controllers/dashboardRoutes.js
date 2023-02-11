const router = require('express').Router();
const { User, Notes } = require('../models');
// Use withAuth middleware to limit route access to only users who've logged in
const withAuth = require('../utils/auth');

// Replace res.status(200)s with renders when ready to test with handlebars layouts

// Gets a users notes by id to render to dashboard by id
  // Allows for users to see eachother's dashboards
  // Dashboard link on homepage nav will use session.user_id in its link to get current users dashboard
router.get('/:id', withAuth, async (req, res) => {
    try {
        const notesData = await Notes.findAll({
            where: {
                user_id: req.params.id,
            }
        });

        if (!notesData.length) {
          res.status(404).json({ message: 'No notes found for this user!' });
          return;
        }

        const notes = notesData.map((notes) => notes.get({ plain: true }));

        // res.render('dashboard', {
        // notes,
        // logged_in: req.session.logged_in
        // });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err);
    }
});
  
module.exports = router;
  