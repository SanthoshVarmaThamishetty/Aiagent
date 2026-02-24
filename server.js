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

// ✅ Vision models — tried in order until one works
const VISION_MODELS = [
  'nvidia/nemotron-nano-12b-v2-vl:free',
  'nvidia/nemotron-3-nano-30b-a3b:free',
  'mistralai/mistral-small-3.1-24b-instruct:free',
  'google/gemma-3-27b-it:free',
  'google/gemma-3-12b-it:free',
  'google/gemma-3-4b-it:free',
];

// ✅ Text models — tried in order until one works
const TEXT_MODELS = [
  'arcee-ai/trinity-large-preview:free',
  'openai/gpt-oss-120b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'nvidia/nemotron-nano-9b-v2:free',
  'nvidia/nemotron-nano-12b-v2-vl:free',
  'google/gemma-3-27b-it:free',
  'google/gemma-3-12b-it:free',
];

// ✅ Helper — try a single model, return data or throw
async function tryModel(model, messages) {
  console.log(`Trying model: ${model}`);
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

  // If OpenRouter returns an error object, treat it as a failure
  if (data.error) {
    throw new Error(data.error.message || 'Model returned error');
  }

  // If no choices returned, treat as failure
  if (!data.choices || data.choices.length === 0) {
    throw new Error('No choices returned');
  }

  return data;
}

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  // Detect if any message contains an image
  const hasImage = messages.some(m =>
    Array.isArray(m.content) &&
    m.content.some(c => c.type === 'image_url')
  );

  const modelsToTry = hasImage ? VISION_MODELS : TEXT_MODELS;
  const mode = hasImage ? 'VISION' : 'TEXT';

  console.log(`\n--- New ${mode} request ---`);

  for (const model of modelsToTry) {
    try {
      const data = await tryModel(model, messages);
      console.log(`✅ Success with model: ${model}`);
      return res.json(data);
    } catch (error) {
      console.log(`❌ Failed: ${model} — ${error.message}`);
      // Continue to next model
    }
  }

  // All models failed
  console.log('❌ All models failed');
  res.status(500).json({
    error: 'All models are currently unavailable. Please try again in a moment.',
    choices: [{
      message: {
        content: '⚠️ All AI models are currently busy or unavailable. Please try again in a moment.'
      }
    }]
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
