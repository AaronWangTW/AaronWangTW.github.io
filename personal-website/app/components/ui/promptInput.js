'use client';

import { useState } from 'react';

export default function PromptInput({ onSubmit }) {
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;  // ignore empty
    onSubmit(input.trim());
    setInput('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
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
  );
}