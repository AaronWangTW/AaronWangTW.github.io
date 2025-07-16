'use client';

import Matter from 'matter-js';
import { useState, useEffect, useRef } from 'react';
import RetroScreen from './components/RetroScreen';
import Capsule from './components/Capsule';
import About from './components/content/About';
import Projects from './components/content/Projects';
import Contact from './components/content/Contact';
import { initPhysics, tick, addWalls, addScreen, registerPorts, setOnPluggedCallback } from './lib/physics';
import RackSlot from './components/Racks';

export default function HomePage() {
  const [activeContent, setActiveContent] = useState(null);
  const screenRef = useRef();
  const [quickSelect, setQuickSelect] = useState('');

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setQuickSelect(value);

    switch (value) {
      case 'about':
        setActiveContent(<About />);
        break;
      case 'projects':
        setActiveContent(<Projects />);
        break;
      case 'contact':
        setActiveContent(<Contact />);
        break;
      default:
        setActiveContent(null);
    }
  };

  useEffect(() => {
    initPhysics();
    addWalls();
    addScreen(screenRef.current);
    registerPorts();
    setOnPluggedCallback((plug) => {
      setActiveContent(plug?.content);
    });
    tick();        // start rendering loop
    
  }, []);

  return (
    <main className="relative w-full h-screen bg-[#1e1e1e] overflow-hidden" id='container'>
      {/* Quickselect Dropdown */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <select
          value={quickSelect}
          onChange={handleSelectChange}
          className="bg-gray-700 text-white px-4 py-2 rounded shadow outline-none focus:ring-2 focus:ring-blue-800 select-none"
        >
          <option value="">Quickselect</option>
          <option value="about">About</option>
          <option value="projects">Projects</option>
          <option value="contact">Contact</option>
        </select>
      </div>
      {/* Central retro screen */}
      <div ref={screenRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <RetroScreen content={activeContent} />
      </div>

      <Capsule label="About Me" content={<About/>} x={80} y={150} />
      <Capsule label="Projects" content={<Projects />} x={30} y={550} />
      <Capsule label="Contact" content={<Contact />} x={700} y={700} />

      {/* Capsule racks */}
      <RackSlot x={50} y={200} width={150} height={50} />
      <RackSlot x={50} y={600} width={150} height={50} />
    </main>
  );
}