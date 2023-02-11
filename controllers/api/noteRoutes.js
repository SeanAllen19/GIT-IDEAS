const router = require('express').Router();
const { Notes } = require('../../models');
const withAuth = require('../../utils/auth');

// Inserts new note into database by session user_id
router.post('/', withAuth, async (req, res) => {
  try {
    const newNote = await Notes.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newNote);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates note by id in database, specifies user_id must match session 
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedNote = await Notes.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!updatedNote) {
            res.status(404).json({ message: 'No note found with this id!' });
            return;
        };

        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json(err);
    };
});

// Deletes note from database, specifies user_id must match session
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const noteData = await Notes.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!noteData) {
      res.status(404).json({ message: 'No note found with this id!' });
      return;
    }

    res.status(200).json(noteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;