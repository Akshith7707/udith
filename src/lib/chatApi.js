const PROVIDERS = {
  groq: {
    key: () => import.meta.env.VITE_GROQ_API_KEY,
    keyHint: 'VITE_GROQ_API_KEY',
    url: () =>
      import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions',
    model: () => import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile',
    type: 'openai',
  },
  gemini: {
    key: () => import.meta.env.VITE_GEMINI_API_KEY,
    keyHint: 'VITE_GEMINI_API_KEY',
    model: () => import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash',
    type: 'gemini',
  },
  openrouter: {
    key: () => import.meta.env.VITE_OPENROUTER_API_KEY,
    keyHint: 'VITE_OPENROUTER_API_KEY',
    url: () =>
      import.meta.env.VITE_OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions',
    model: () => import.meta.env.VITE_OPENROUTER_MODEL || 'google/gemma-2-9b-it:free',
    type: 'openai',
  },
};

function getProvider() {
  const name = (import.meta.env.VITE_AI_PROVIDER || 'groq').toLowerCase();
  return PROVIDERS[name] ? { name, ...PROVIDERS[name] } : { name: 'groq', ...PROVIDERS.groq };
}

async function sendOpenAiCompatible({ url, apiKey, model, systemPrompt, userMessage }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 512,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
}

async function sendGemini({ apiKey, model, systemPrompt, userMessage }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
}

export function getChatApiStatus() {
  const provider = getProvider();
  const apiKey = provider.key();
  return {
    configured: Boolean(apiKey),
    provider: provider.name,
    keyHint: provider.keyHint,
  };
}

export async function sendChatMessage({ systemPrompt, userMessage }) {
  const provider = getProvider();
  const apiKey = provider.key();

  if (!apiKey) {
    return { ok: false, reason: 'no_key', keyHint: provider.keyHint, provider: provider.name };
  }

  try {
    let content;
    if (provider.type === 'gemini') {
      content = await sendGemini({
        apiKey,
        model: provider.model(),
        systemPrompt,
        userMessage,
      });
    } else {
      content = await sendOpenAiCompatible({
        url: provider.url(),
        apiKey,
        model: provider.model(),
        systemPrompt,
        userMessage,
      });
    }

    if (!content) {
      return { ok: false, reason: 'empty_response' };
    }

    return { ok: true, content };
  } catch (error) {
    return { ok: false, reason: 'error', message: error.message };
  }
}
