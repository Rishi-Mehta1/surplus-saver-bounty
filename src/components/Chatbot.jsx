import React, { useState, useRef } from 'react';

const BACKEND_URL = 'http://localhost:4000';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am your Surplus Saver assistant. How can I help you with your shopping today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: 'bot', text: data.reply || 'Sorry, I could not understand that.' }]);
    } catch {
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'Sorry, there was an error. Please try again.' }]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Chatbot"
      >
        <span className="text-3xl">💬</span>
      </button>
      {open && (
        <div className="fixed bottom-28 right-8 z-50 w-[420px] max-w-full bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-green-200 animate-fade-in">
          <div className="flex items-center justify-between bg-green-600 text-white px-6 py-4 font-bold text-lg rounded-t-3xl">
            <span>Surplus Saver Chatbot</span>
            <button
              className="text-white hover:text-green-200 text-2xl font-bold focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Close Chatbot"
            >
              ×
            </button>
          </div>
          <div className="flex-1 px-6 py-4 h-[420px] overflow-y-auto bg-green-50 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-4 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-5 py-3 rounded-2xl max-w-[80%] shadow ${msg.from === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white border border-green-200 text-gray-800 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="flex items-center border-t border-green-100 bg-white px-4 py-4">
            <input
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 bg-green-50 placeholder-gray-400 transition mr-3"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow disabled:opacity-50 text-lg"
              disabled={loading || !input.trim()}
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #bbf7d0; border-radius: 8px; }
      `}</style>
    </>
  );
};

export default Chatbot; 