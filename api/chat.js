const fs = require('fs');
const path = require('path');

const CIS_KNOWLEDGE = fs.readFileSync(path.join(process.cwd(), 'cis_knowledge.txt'), 'utf-8');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server.' });
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
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const text = data.content?.map(b => b.text || '').join('') || 'No response generated.';
    res.json({ response: text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach Claude API: ' + err.message });
  }
}
