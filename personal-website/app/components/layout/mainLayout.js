'use client';

import { useState } from 'react';
import PromptInput from '../ui/promptInput';

export default function MainLayout({ children }) {
  const [prompt, setPrompt] = useState('');

  function handlePromptSubmit(value) {
    setPrompt(value);
    console.log('Prompt:', value);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left pane */}
      <div className="w-1/3 border-r border-gray-300">
        <PromptInput onSubmit={handlePromptSubmit} />
        <div className="p-4 text-gray-600">
          Current prompt: <strong>{prompt}</strong>
        </div>
      </div>

      {/* Right pane */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}