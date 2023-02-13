const router = require('express').Router();
const { Tags } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all Tags for logged in user by session user_id

router.get('/', withAuth, async (req, res) => {
  try {
    const tagsData = await Tags.findAll({
        where: {
            user_id: req.session.user_id,
        }
    });

    if (!tagsData.length) {
      res.status(404).json({ message: 'No tags found for this user!' });
      return;
    }

    const tags = tagsData.map((tags) => tags.get({ plain: true }));

    
    res.status(200).json(tags);
} catch (err) {
    res.status(500).json(err);
}
})


// Inserts new tag into database by session user_id
router.post('/', withAuth, async (req, res) => {
  try {
    const newTag = await Tags.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates tags by id in database, specifies user_id must match session 
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedTag = await Tags.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!updatedTag) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        };

        res.status(200).json(updatedTag);
    } catch (err) {
        res.status(500).json(err);
    };
});

// Deletes tag from database, specifies user_id must match session
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const tagData = await Tags.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      
    }); console.log(tagData);

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;