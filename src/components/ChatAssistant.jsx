import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { CHAT_RESPONSES } from '../data';
import { useProfile } from '../lib/useProfile';
import { buildChatContext } from '../lib/buildChatContext';
import { getChatApiStatus, sendChatMessage } from '../lib/chatApi';

function pickFallbackReply(userMessage) {
  if (userMessage.includes('career') || userMessage.includes('job')) return CHAT_RESPONSES.career;
  if (userMessage.includes('salary') || userMessage.includes('pay')) return CHAT_RESPONSES.salary;
  if (userMessage.includes('skill') || userMessage.includes('learn')) return CHAT_RESPONSES.skills;
  return CHAT_RESPONSES.default;
}

export default function ChatAssistant() {
  const { profile, selectedCareerId, completedSkills } = useProfile();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', content: CHAT_RESPONSES.default },
  ]);
  const [chatInput, setChatInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chatMessages, chatOpen]);

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.toLowerCase();
    const outgoing = chatInput;
    setChatMessages((prev) => [...prev, { role: 'user', content: outgoing }]);
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'bot', content: '…', typing: true }]);

    const { configured, keyHint, provider } = getChatApiStatus();
    const systemPrompt = `You are NexusAI, a helpful career advisor for Indian professionals and students. ${buildChatContext(profile, selectedCareerId, completedSkills)}`;

    if (!configured) {
      setChatMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'bot',
          content: `${pickFallbackReply(userMessage)}\n\n(Live AI off — add ${keyHint} to .env; see .env.example. Try Groq — free at console.groq.com.)`,
        },
      ]);
      return;
    }

    const result = await sendChatMessage({ systemPrompt, userMessage: outgoing });

    if (result.ok) {
      setChatMessages((prev) => [...prev.slice(0, -1), { role: 'bot', content: result.content }]);
      return;
    }

    const errNote = result.message ? `\n\n(${provider}: ${result.message})` : '';
    setChatMessages((prev) => [
      ...prev.slice(0, -1),
      { role: 'bot', content: `${pickFallbackReply(userMessage)}${errNote}` },
    ]);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setChatOpen((o) => !o)}
        aria-label={chatOpen ? 'Close chat' : 'Open chat'}
        className="focus-ring fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-40 transition-transform active:scale-95"
        style={{
          background: 'var(--accent)',
          color: '#fff',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {chatOpen ? <X size={18} /> : <MessageCircle size={20} />}
      </button>

      {chatOpen && (
        <div
          className="fixed bottom-24 right-6 w-[92vw] sm:w-96 z-50 overflow-hidden flex flex-col"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: '70vh',
            animation: 'pageEnter 260ms var(--ease-apple)',
          }}
        >
          <div
            className="p-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <div
                  className="text-sm font-semibold leading-none"
                  style={{ color: 'var(--text)' }}
                >
                  NexusAI
                </div>
                <div
                  className="text-[11px] mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Career advisor
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              aria-label="Close"
              className="focus-ring w-8 h-8 rounded-full inline-flex items-center justify-center"
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ background: 'var(--bg-subtle)' }}
          >
            {chatMessages.map((msg, i) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={i}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[82%] px-3.5 py-2 text-sm leading-relaxed"
                    style={{
                      borderRadius: '16px',
                      background: isUser ? 'var(--accent)' : 'var(--bg)',
                      color: isUser ? '#fff' : 'var(--text)',
                      border: isUser ? 'none' : '1px solid var(--border)',
                      opacity: msg.typing ? 0.55 : 1,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Ask about careers…"
                className="ui-input"
                style={{ padding: '0.55rem 0.85rem', fontSize: '0.875rem' }}
              />
              <button
                type="button"
                onClick={handleChatSend}
                aria-label="Send"
                className="ui-btn ui-btn-primary"
                style={{ padding: '0 0.85rem', minHeight: 0, height: '38px' }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
