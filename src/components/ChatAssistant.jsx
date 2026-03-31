import { useState } from 'react';
import { MessageCircle, X, Send, Brain } from 'lucide-react';
import { CHAT_RESPONSES } from '../data';

export default function ChatAssistant() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'bot', content: CHAT_RESPONSES.default }]);
  const [chatInput, setChatInput] = useState('');

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.toLowerCase();
    setChatMessages((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');

    // Add typing indicator
    setChatMessages((prev) => [...prev, { role: 'bot', content: '...', typing: true }]);

    try {
      // Call the AI API
      const response = await fetch('https://api.featherless.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer rc_8cad9e3f8bfc3ff04770f0c6889e3c4af225d4b6aa2dfba34e8fd9b3e21adf4a',
        },
        body: JSON.stringify({
          model: 'Qwen/Qwen2.5-7B-Instruct',
          max_tokens: 512,
          messages: [
            { 
              role: 'system', 
              content: 'You are NexusAI, a helpful career advisor for Indian professionals and students. Provide concise, actionable career advice focused on the Indian job market. Keep responses under 150 words.' 
            },
            { role: 'user', content: chatInput }
          ],
        }),
      });

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || 'I apologize, I couldn\'t process that. Please try asking about careers, skills, or salaries.';
      
      // Remove typing indicator and add response
      setChatMessages((prev) => [...prev.slice(0, -1), { role: 'bot', content: botResponse }]);
    } catch {
      // Fallback to hardcoded responses
      let response = CHAT_RESPONSES.default;
      if (userMessage.includes('career') || userMessage.includes('job')) response = CHAT_RESPONSES.career;
      else if (userMessage.includes('salary') || userMessage.includes('pay')) response = CHAT_RESPONSES.salary;
      else if (userMessage.includes('skill') || userMessage.includes('learn')) response = CHAT_RESPONSES.skills;
      
      setChatMessages((prev) => [...prev.slice(0, -1), { role: 'bot', content: response }]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center z-40 hover:scale-110 transition-all pulse-glow"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 glass rounded-2xl z-50 overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-white" />
              <span className="font-orbitron font-bold text-white">NexusAI</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] text-white'
                      : 'bg-white/10 text-gray-300'
                  } ${msg.typing ? 'animate-pulse' : ''}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Ask about careers..."
                className="ui-input flex-1 py-2"
              />
              <button
                onClick={handleChatSend}
                className="ui-btn ui-btn-primary min-h-0 p-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
