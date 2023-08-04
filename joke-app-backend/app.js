const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
const port = process.env.port; // Choose any available port number

// Replace 'YOUR_CHATGPT_API_KEY' with your actual ChatGPT API key
const chatGptApiKey = process.env.open_api_key;

app.use(express.json());

app.get0("/",(req,res)=>{
  res.send("Welcome to joke APP...");
})

app.post('/get-joke', async (req, res) => {
  try {
    const { keyword } = req.body;

    // Fetch joke using ChatGPT API
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Tell me a joke about ${keyword}`,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatGptApiKey}`,
        },
      }
    );

    const joke = response.data.choices[0].text.trim();
    res.json({ joke });
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
