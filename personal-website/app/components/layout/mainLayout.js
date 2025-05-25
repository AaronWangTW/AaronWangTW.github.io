'use client';

import { useState } from 'react';
import PromptInput from '../ui/promptInput';
import ContentDisplay from '../ui/contentDisplay';

export default function MainLayoutClient() {
  const [prompt, setPrompt] = useState('');

  function handlePromptSubmit(value) {
    setPrompt(value);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left pane */}
      <div className="w-1/3 border-r border-gray-300 p-4">
        <PromptInput onSubmit={handlePromptSubmit} />
      </div>

      {/* Right pane */}
      <div className="flex-1 p-6 overflow-hidden">
        <ContentDisplay prompt={prompt} />
      </div>
    </div>
  );
}