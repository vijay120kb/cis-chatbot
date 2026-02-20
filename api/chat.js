const fs = require('fs');
const path = require('path');

const CIS_KNOWLEDGE = fs.readFileSync(path.join(process.cwd(), 'cis_knowledge.txt'), 'utf-8');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not set in environment variables.' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format.' });
  }

  const systemPrompt = `You are an expert on the MasterCard Customer Interface Specification (CIS) — a technical document defining ISO 8583 message formats used in card payment systems. You help developers, testers, and analysts understand message types, data elements (DEs), authorization flows, and integration requirements.

Use the following extracted content from the CIS document to answer questions accurately. Always cite the page number when relevant.

CIS DOCUMENT CONTENT:
${CIS_KNOWLEDGE}

Guidelines:
- Be precise and technical. Use correct field names, DE numbers, and MTI codes.
- When listing data elements, clearly state if they are Mandatory (M), Conditional (C), or Optional (O).
- If the answer is not in the provided content, say so and provide general ISO 8583 knowledge.
- Format responses clearly with sections when explaining complex flows.
- Always mention relevant DE numbers and message types (0100, 0110, 0120, 0400, etc.).`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        temperature: 0.3,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Groq API error: ${data.error?.message || JSON.stringify(data)}`
      });
    }

    const text = data.choices?.[0]?.message?.content || 'No response generated.';
    return res.status(200).json({ response: text });

  } catch (err) {
    return res.status(500).json({ error: 'Network error calling Groq API: ' + err.message });
  }
};
