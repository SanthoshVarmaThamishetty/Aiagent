const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ✅ Add this root route
app.get('/', (req, res) => {
  res.json({ status: 'AI Backend is running ✅', message: 'Use POST /chat to send messages' });
});

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://yourportfolio.netlify.app',
    },
    body: JSON.stringify({
      model: 'google/gemma-3-27b-it:free',
      messages,
    }),
  });

  const data = await response.json();
  res.json(data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
