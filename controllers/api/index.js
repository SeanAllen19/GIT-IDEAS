const router = require('express').Router();

const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');
const tagsRoutes = require('./tagsRoutes')

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/tags', tagsRoutes);

module.exports = router;