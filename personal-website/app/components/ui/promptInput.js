'use client';

import { useState } from 'react';

export default function PromptInput({ onSubmit }) {
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return; // ignore empty
    onSubmit(input.trim());
    setInput('');
  }

  function handleQuickPrompt(prompt) {
    onSubmit(prompt);
    setInput('');
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="prompt" className="text-lg font-semibold text-gray-700">
          Enter a prompt:
        </label>
        <input
          id="prompt"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try: about, portfolio, projects..."
          className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="mt-2 rounded bg-indigo-600 text-white py-2 hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>

      {/* Quick prompt buttons */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Quick prompts:</p>
        <div className="flex flex-wrap gap-2">
          {['about me', 'portfolio', 'projects', 'contact info'].map((prompt) => (
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