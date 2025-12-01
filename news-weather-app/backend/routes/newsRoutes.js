const express = require('express');
const router = express.Router();
const { getNews } = require('../controllers/newsController');
const { getPersonalizedFeed, updatePreferences, trackBehavior } = require('../controllers/feedController');

router.get('/', getNews);
router.get('/feed', getPersonalizedFeed);
router.post('/user/preferences', updatePreferences);
router.post('/user/track', trackBehavior);

module.exports = router;
