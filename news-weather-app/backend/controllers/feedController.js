const axios = require('axios');
const User = require('../models/User');
const NodeCache = require('node-cache');
const feedCache = new NodeCache({ stdTTL: 300 }); // 5 minutes

const getPersonalizedFeed = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // 1. Fetch User Preferences
        let user = await User.findByPk(userId);
        if (!user) {
            user = await User.create({ userId });
        }

        const { categories, sources, keywords } = user.preferences;
        const behavior = user.behavior || { clicks: {} };

        // Check cache first (cache key might need to be more sophisticated with multiple requests)
        // For now, let's keep a simple cache key based on user ID and a simplified representation of preferences
        const cacheKey = `feed_${userId}_${categories.join(',')}_${keywords.join(',')}`;
        if (feedCache.has(cacheKey)) {
            return res.json(feedCache.get(cacheKey));
        }

        // 2. Fetch Candidate Articles
        const requests = [];

        // Request A: Fetch by Keywords (Global search)
        if (keywords.length > 0) {
            requests.push(
                axios.get(`${process.env.NEWS_API_URL}/top-headlines`, {
                    params: {
                        apiKey: process.env.NEWS_API_KEY,
                        language: 'en',
                        q: keywords.join(' OR '),
                        pageSize: 20
                    }
                }).then(res => res.data.articles).catch(err => [])
            );
        }

        // Request B: Fetch by Categories (Top headlines for each category)
        // Limit to top 3 categories to avoid hitting rate limits too hard
        const topCategories = categories.slice(0, 3);

        topCategories.forEach(cat => {
            requests.push(
                axios.get(`${process.env.NEWS_API_URL}/top-headlines`, {
                    params: {
                        apiKey: process.env.NEWS_API_KEY,
                        language: 'en',
                        category: cat,
                        pageSize: 20
                    }
                }).then(res => res.data.articles).catch(err => [])
            );
        });

        // If no preferences, fetch general top headlines
        if (requests.length === 0) {
            requests.push(
                axios.get(`${process.env.NEWS_API_URL}/top-headlines`, {
                    params: {
                        apiKey: process.env.NEWS_API_KEY,
                        language: 'en',
                        category: 'general',
                        pageSize: 20
                    }
                }).then(res => res.data.articles).catch(err => [])
            );
        }

        const results = await Promise.all(requests);

        // Merge and Deduplicate
        const allArticles = results.flat();
        const seenUrls = new Set();
        let uniqueArticles = [];

        for (const article of allArticles) {
            if (article.url && !seenUrls.has(article.url)) { // Ensure article.url exists before adding
                seenUrls.add(article.url);
                uniqueArticles.push(article);
            }
        }

        // 3. Scoring Algorithm
        let articles = uniqueArticles.map(article => {
            let score = 1.0;

            // Keyword Match (+0.5)
            if (keywords.some(k => article.title && article.title.toLowerCase().includes(k.toLowerCase()))) {
                score += 0.5;
            }

            // Category Match (+0.3)
            // NewsAPI doesn't always return category in article object, but we can infer or just skip

            // Freshness Decay (-0.1 per hour)
            const hoursOld = (new Date() - new Date(article.publishedAt)) / (1000 * 60 * 60);
            score -= hoursOld * 0.1;

            // Diversity Penalty / Source Boost
            const sourceName = article.source && article.source.name;
            if (sourceName && behavior.clicks[sourceName]) {
                score += Math.min(behavior.clicks[sourceName] * 0.1, 1.0);
            }

            return { ...article, score };
        });

        // Sort by score
        articles.sort((a, b) => b.score - a.score);

        const result = { articles };
        feedCache.set(cacheKey, result);
        res.json(result);

    } catch (error) {
        console.error('Feed Error:', error.message);
        res.status(500).json({ message: 'Error generating feed', error: error.message });
    }
};

const updatePreferences = async (req, res) => {
    const { userId, preferences } = req.body;
    try {
        let user = await User.findByPk(userId);
        if (!user) {
            user = await User.create({ userId });
        }
        await user.update({ preferences });
        res.json({ message: 'Preferences updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating preferences', error: error.message });
    }
};

const trackBehavior = async (req, res) => {
    const { userId, action } = req.body; // action: { type: 'click', source: 'CNN' }
    try {
        let user = await User.findByPk(userId);
        if (!user) {
            user = await User.create({ userId });
        }

        const behavior = { ...user.behavior };

        if (action.type === 'click' && action.source) {
            behavior.clicks = behavior.clicks || {};
            behavior.clicks[action.source] = (behavior.clicks[action.source] || 0) + 1;
        }

        await user.update({ behavior });
        res.json({ message: 'Behavior tracked' });
    } catch (error) {
        res.status(500).json({ message: 'Error tracking behavior', error: error.message });
    }
};

module.exports = { getPersonalizedFeed, updatePreferences, trackBehavior };
