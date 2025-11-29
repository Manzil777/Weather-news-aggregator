const express = require('express');
const router = express.Router();
const { getSavedArticles, saveArticle, deleteArticle } = require('../controllers/articleController');

router.route('/').get(getSavedArticles).post(saveArticle);
router.route('/:id').delete(deleteArticle);

module.exports = router;
