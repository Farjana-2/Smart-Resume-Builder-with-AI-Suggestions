const express = require('express');
const router = express.Router();
const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  const { section, text } = req.body;

  try {
    const prompt = `Improve the following ${section} of a resume:\n\n"${text}"`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a professional resume editor.' },
        { role: 'user', content: prompt },
      ],
    });

    const suggestion = completion.data.choices[0].message.content.trim();
    res.json({ suggestion });
  } catch (error) {
    console.error('GPT error:', error.message);
    res.status(500).json({ error: 'Failed to generate suggestion' });
  }
});

module.exports = router;
