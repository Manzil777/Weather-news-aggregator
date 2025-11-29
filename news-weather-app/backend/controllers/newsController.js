const axios = require('axios');
const NodeCache = require('node-cache');
const newsCache = new NodeCache({ stdTTL: 600 }); // 10 minutes

const getNews = async (req, res) => {
    const { category, q } = req.query;
    const cacheKey = `news_${category || 'general'}_${q || 'all'}`;

    if (newsCache.has(cacheKey)) {
        return res.json(newsCache.get(cacheKey));
    }

    try {
        const response = await axios.get(`${process.env.NEWS_API_URL}/top-headlines`, {
            params: {
                country: 'us',
                category,
                q,
                apiKey: process.env.NEWS_API_KEY,
            },
        });

        newsCache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        console.error('News API Error:', error.message);
        res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
};

module.exports = { getNews };
