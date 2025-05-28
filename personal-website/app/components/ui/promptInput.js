'use client';

import { useState, useEffect, useRef } from 'react';

const cannedResponses = {
  'about me': "I'm a passionate developer who loves crafting interactive, thoughtful experiences.",
  'portfolio': "Sure! Here's my portfolio with web apps, design systems, and creative experiments.",
  'projects': "I've built a networking server, filesystem tools, and more. Ask me about any!",
  'contact info': "Reach me via LinkedIn, GitHub, or email — check the Contact section.",
  'resume': "Here's my resume!"
};

export default function PromptInput({ onSubmit }) {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const chatEndRef = useRef(null);

  const handlePromptSubmit = (prompt) => {
    const response =
      cannedResponses[prompt.toLowerCase()] || "Oh no, I don't have a good answer for that!";
    setChatLog((prev) => [
      ...prev,
      { type: 'user', text: prompt },
      { type: 'bot', text: response },
    ]);
    onSubmit(prompt);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handlePromptSubmit(input.trim());
    setInput('');
  };

  const handleQuickPrompt = (prompt) => {
    handlePromptSubmit(prompt);
    setInput('');
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog]);

  return (
    <div className="flex flex-col h-full overflow-hidden p-4">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 px-1">
        {chatLog.map((entry, index) => (
          <div
            key={index}
            className={`w-full flex ${entry.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg text-sm transition-all duration-300 ease-out ${entry.type === 'user'
                  ? 'bg-gray-600 text-white animate-fade-in'
                  : 'bg-gray-100 text-gray-800 animate-fade-in'
                }`}
            >
              {entry.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="prompt" className="text-lg text-gray-600">
          Enter a prompt:
        </label>
        <input
          id="prompt"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try: about, portfolio, projects..."
          className="rounded border-2 border-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
        <button
          type="submit"
          className="mt-1 rounded bg-gray-600 text-white py-2 hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>

      {/* Quick Prompts */}
      <div className="mt-4">
        <p className="text-lg text-gray-600 mb-2">Quick prompts:</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(cannedResponses).map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleQuickPrompt(prompt)}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
            >
              {prompt.charAt(0).toUpperCase() + prompt.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}