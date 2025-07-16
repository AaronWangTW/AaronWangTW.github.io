'use client';
import { useState, useEffect, useRef } from 'react';
import RetroScreen from './components/RetroScreen';
import Capsule from './components/Capsule';
import About from './components/content/About';
import Projects from './components/content/Projects';
import Contact from './components/content/Contact';
import { initPhysics, tick, addWalls, addScreen, registerPorts, setOnPluggedCallback } from './lib/physics';
import RackSlot from './components/Racks';
import bgImg from '../public/gplay.png'

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(null);
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
    const mobile = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(mobile);
    if (!mobile) {
      initPhysics();
      addWalls();
      requestAnimationFrame(() => {
      if (screenRef.current) {
        addScreen(screenRef.current);
        registerPorts();
      }
    });
      setOnPluggedCallback((plug) => {
        setActiveContent(plug?.content);
      });
      tick();        // start rendering loop
    }
  }, []);

  if (isMobile === null) return null;

  return (
    <main className="relative w-full h-screen overflow-hidden" id='container' style={{
      backgroundImage: `url(${bgImg.src})`,
      backgroundColor: "#01020d"
    }}>
      <div 
    id="physics-overlay" 
    className="absolute inset-0 z-0"
    style={{ pointerEvents: "auto" }} 
  />
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

      {!isMobile && (
        <>
          <Capsule label="About Me" content={<About />} x={80} y={150} />
          <Capsule label="Projects" content={<Projects />} x={30} y={550} />
          <Capsule label="Contact" content={<Contact />} x={700} y={700} />
          <Capsule label="DO NOT" content={
            <iframe className='w-full h-full' src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1?si=j8-78-f6kRtrl4mr&amp;controls=0&mute=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
          } x={850} y={100} />

          {/* Capsule racks */}
          <RackSlot x={50} y={200} width={150} height={50} />
          <RackSlot x={50} y={600} width={150} height={50} />
        </>
      )}
    </main>
  );
}