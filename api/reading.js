// api/reading.js — Vercel Serverless Function
// Your ANTHROPIC_API_KEY is stored as an Environment Variable in Vercel (never exposed to users)

export default async function handler(req, res) {
  // CORS — allow requests from your domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { tab, lang, name, d, m, y, h, mi, sun, moon, rising, planets, age } = req.body;

    if (!tab || !sun) return res.status(400).json({ error: 'Missing required fields' });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'API key not configured on server.' });

    const langInstr = {
      en: 'Write in warm, flowing English.',
      kn: 'ಕನ್ನಡದಲ್ಲಿ ಬರೆಯಿರಿ. Write entirely in Kannada script.',
      hi: 'हिंदी में लिखें। Write entirely in Hindi.',
      te: 'తెలుగులో రాయండి. Write entirely in Telugu script.',
      ta: 'தமிழில் எழுதுங்கள். Write entirely in Tamil script.',
    }[lang] || 'Write in English.';

    const base = `Name: ${name}. Born: ${d}/${m}/${y} at ${h}:${String(mi).padStart(2,'0')}. Age: ${age}. Sun: ${sun} , Moon: ${moon}, Rising: ${rising}, Mercury in ${planets[0]}, Venus in ${planets[1]}, Mars in ${planets[2]}, Jupiter in ${planets[3]}, Saturn in ${planets[4]}.`;

    const asks = {
      past:    `PAST LIFE & KARMA reading. ${base} Cover karmic patterns carried from past lives, childhood formation by the chart, and Saturn lessons already lived. 3-4 warm personal paragraphs. Address them as ${name}.`,
      present: `PRESENT reading for 2025-2026. ${base} Cover current planetary transits affecting them, what life phase they are in, and dominant energies to work with. 3-4 warm personal paragraphs.`,
      future:  `FUTURE reading for next 3-5 years. ${base} Cover major planetary cycles ahead, windows of opportunity, and what they are building toward. 3-4 hopeful paragraphs.`,
      love:    `LOVE & RELATIONSHIPS reading. ${base} Cover how they love, Venus sign influence, past relationship patterns, and what partner energy complements them. 3-4 warm paragraphs.`,
      career:  `CAREER & PURPOSE reading. ${base} Cover natural gifts, Saturn career lessons, wealth patterns, and their destined work. 3-4 personal paragraphs.`,
    };

    const prompt = `You are a gifted astrologer blending Vedic and Western traditions. ${asks[tab]} Write warm, mystical, grounded. No markdown, no bullet points, no headers. Plain paragraphs only. ${langInstr}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: 'You are a gifted astrologer blending Vedic and Western traditions. Write personal, mystical, grounded readings. Plain paragraphs only — no markdown, no bullets, no headers.',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err.error?.message || 'Anthropic API error' });
    }

    const data = await response.json();
    const text = (data.content || []).map(b => b.text || '').join('').trim();
    return res.status(200).json({ text });

  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
