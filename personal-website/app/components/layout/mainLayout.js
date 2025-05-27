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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left pane */}
      <div className="w-1/3 border-r border-gray-300 p-4 bg-[url('/arches.png')] 
          bg-repeat 
          bg-auto
          bg-center 
          bg-fixed
          bg-[#ad9272]
          text-[#4b3b1a]
          min-h-screen">
        <PromptInput onSubmit={handlePromptSubmit} />
      </div>

      {/* Right pane */}
      <div className="flex-1 p-6 overflow-hidden bg-[url('/cartographer.png')] 
          bg-repeat 
          bg-auto
          bg-center 
          bg-fixed
          bg-[#615540]">
        <ContentDisplay prompt={prompt} />
      </div>
    </div>
  );
}