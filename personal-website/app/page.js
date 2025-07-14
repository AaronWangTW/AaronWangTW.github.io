'use client';

import Matter from 'matter-js';
import { useState, useEffect, useRef } from 'react';
import RetroScreen from './components/RetroScreen';
import Capsule from './components/Capsule';
import About from './components/content/About';
import Projects from './components/content/Projects';
import Contact from './components/content/Contact';
import { initPhysics, tick, addWalls, addScreen } from './lib/physics';

export default function HomePage() {
  const [activeContent, setActiveContent] = useState(null);
  const screenRef = useRef();

  useEffect(() => {
    initPhysics();
    addWalls();
    addScreen(screenRef.current);
    tick();        // start rendering loop
  }, []);

  return (
    <main className="relative w-full h-screen bg-[#1e1e1e] overflow-hidden font-mono" id='container'>
      {/* Central retro screen */}
      <div ref={screenRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <RetroScreen content={activeContent} />
      </div>

      <Capsule label="About Me" onPlug={() => setActiveContent(<About />)} x={220} y={100} />
      <Capsule label="Projects" onPlug={() => setActiveContent(<Projects />)} x={120} y={100}/>
      <Capsule label="Contact" onPlug={() => setActiveContent(<Contact />)} x={20} y={100}/>
    </main>
  );
}