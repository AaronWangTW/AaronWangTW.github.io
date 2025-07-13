'use client';

import { useState } from 'react';
import RetroScreen from './components/RetroScreen';
import Capsule from './components/Capsule';
import About from './components/content/About';
import Projects from './components/content/Projects';
import Contact from './components/content/Contact';

export default function HomePage() {
  const [activeContent, setActiveContent] = useState(null);

  return (
    <main className="relative w-full h-screen bg-[#1e1e1e] overflow-hidden font-mono">
      {/* Central retro screen */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <RetroScreen content={activeContent} />
      </div>

      {/* Capsules */}
      <div className="absolute top-8 left-8 z-20 space-y-4">
        <Capsule label="About Me" onPlug={() => setActiveContent(<About />)} />
        <Capsule label="Projects" onPlug={() => setActiveContent(<Projects />)} />
        <Capsule label="Contact" onPlug={() => setActiveContent(<Contact />)} />
      </div>
    </main>
  );
}