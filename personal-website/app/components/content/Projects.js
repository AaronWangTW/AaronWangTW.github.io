import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mhworld from "../../../public/mhworld.png"

export default function Projects() {
  const totalPages = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // for animation direction

  const pages = [
    <div className="w-full h-full p-3">
      <h1 className='text-2xl font-bold'>Projects</h1>
    </div>,
    <div className="w-full h-full p-4 overflow-y-scroll scrollbar">
      <h1 className='text-2xl font-bold'>Monster Hunter: World Weapon Tree</h1>
      <ul className='list-disc'>
        <li>Created a Next.js single page application that displays all weapons in the game Monster Hunter: World in tree
          structures using React Flow and stylized using Tailwind CSS</li>
        <li>Users can inspect weapon details and compare selected
          weapons using an interactive interface.</li>
        <li>All weapon data are scraped from the web using the Python Playwright library.</li>
        <li>Deployed using GitHub Pages, GitHub Actions, and Cloudflare Registrar and available at <a href='https://www.mhworldweaponstree.com' target='_blank'>mhworldweaponstree.com</a></li>
      </ul>
      <div className="w-full flex items-center justify-center p-5">
        <a href='https://www.mhworldweaponstree.com' target='_blank' className='bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-700 rounded m-auto'>Visit the website!</a>
      </div>
      <img src={mhworld.src}></img>

    </div>,
    <div className="w-full h-full p-3">
      <h1 className='text-2xl font-bold'>Pacbot</h1>
    </div>,
    <div className="w-full h-full p-3">
      <h1 className='text-2xl font-bold'>Totally Accurate Course Ratings</h1>
    </div>,
  ];

  const goPrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goNext = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Framer Motion slide variants
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      position: 'absolute',
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      position: 'absolute',
    }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Page slider */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 25 },
            opacity: { duration: 0.2 },
          }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-between p-3 bg-black/40 backdrop-blur-sm">
        {/* Left Arrow */}
        <button
          onClick={goPrev}
          className="p-2 rounded hover:bg-white/10 transition"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Indicator */}
        <span className="text-sm text-gray-200 font-mono">
          {currentPage + 1} / {totalPages}
        </span>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          className="p-2 rounded hover:bg-white/10 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}