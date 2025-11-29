const Article = require('../models/Article');

const getSavedArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            order: [['savedAt', 'DESC']],
        });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error: error.message });
    }
};

const saveArticle = async (req, res) => {
    const { title, description, url, urlToImage, source, publishedAt } = req.body;

    try {
        // Check if article already exists
        const existingArticle = await Article.findOne({ where: { url } });
        if (existingArticle) {
            return res.status(400).json({ message: 'Article already saved' });
        }

        const article = await Article.create({
            title,
            description,
            url,
            urlToImage,
            sourceName: source?.name || 'Unknown',
            publishedAt,
        });
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: 'Error saving article', error: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (article) {
            await article.destroy();
            res.json({ message: 'Article removed' });
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article' });
    }
};

module.exports = { getSavedArticles, saveArticle, deleteArticle };
