const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ✅ Root route
app.get('/', (req, res) => {
  res.json({ status: 'AI Backend is running ✅', message: 'Use POST /chat to send messages' });
});

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  // ✅ Detect if any message contains an image
  const hasImage = messages.some(m =>
    Array.isArray(m.content) &&
    m.content.some(c => c.type === 'image_url')
  );

  // ✅ Your text model stays the same, vision model added for images
  const model = hasImage
    ? 'nvidia/nemotron-nano-12b-v2-vl:free'
    : 'nvidia/nemotron-3-nano-30b-a3b:free';

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://yourportfolio.netlify.app',
      },
      body: JSON.stringify({ model, messages }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
