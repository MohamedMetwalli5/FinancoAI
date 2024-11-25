import express from 'express';
import Parser from 'rss-parser';

const router = express.Router();
const parser = new Parser();
const RSS_URL = 'https://www.economist.com/finance-and-economics/rss.xml';

// Firching and serving RSS feed
router.get('/', async (req, res) => {
  try {
    const feed = await parser.parseURL(RSS_URL);

    // Extracting only the first 20 articles
    const news = feed.items.slice(0, 30).map((item) => ({
      title: item.title,
      link: item.link,
      description: item.contentSnippet || item.description,
    }));

    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;
