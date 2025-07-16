import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mhworld from "../../../public/mhworld.png"
import pacbot from "../../../public/pacbot.jpg"

export default function Projects() {
  const totalPages = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // for animation direction

  const pages = [
    <div key={1} className="w-full h-full pl-8">
      <h1 className='text-2xl font-bold'>Projects</h1>
      <h1 className='text-lg'>Project list by page number</h1>
      <ol className='list-decimal' start={2}>
        <li>Pacbot</li>
        <li>Monster Hunter: World Weapon Tree</li>
        <li>Totally Accurate Course Ratings</li>
        <li>UIUC CS124 Honors - Intro to Computer Science I</li>
        <li>First Robotics Competition</li>
        <li>Artemis - a carbon footprint app</li>
        <li>Flowchart Builder</li>
      </ol>
    </div>,
    <div key={2} className="w-full h-full p-4 overflow-y-scroll scrollbar">
      <h1 className='text-2xl font-bold'>Pacbot</h1>
      <h1 className='text-lg'>High Level Software Lead</h1>
      <h1 className='text-md'>2023.9 - 2025.5</h1>
      <ul className='list-disc'>
        <li>Develop the high-level planning program for a robot that navigates a real-life replica of the classic videogame Pacman, which goes through a maze collecting pellets, running from ghosts, and maximizing score gain</li>
        <li>Develop an OpenCV computer vision system that locates the robot. The optimized vision pipeline was faster than the previously employed system and allowed robots to move at a faster speed while consistently tracked</li>
        <li>Organize the team&apos;s work distribution, work timeline, project planning, and other management tasks such as onboarding and documentation.</li>
        <li>Attended the Pacbot Competition at Harvard in 2024 and got first place</li>
      </ul>
      <img className='mt-4' src={pacbot.src}></img>
    </div>,
    <div key={3} className="w-full h-full p-4 overflow-y-scroll scrollbar">
      <h1 className='text-2xl font-bold'>Monster Hunter: World Weapon Tree</h1>
      <h1 className='text-md'>2025.6</h1>
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
    <div key={4} className="w-full h-full p-4">
      <h1 className='text-2xl font-bold'>Totally Accurate Course Ratings</h1>
      <h1 className='text-md'>2024.8 - 2024.12</h1>
      <ul className='list-disc'>
        <li>A web application that uses sentiment analysis to compute ratings for courses by analyzing comments collected from users. It also includes a crawler that scrapes websites like Reddit for comments on courses</li>
        <li>Used Next.js frontend, Bootstrap components library, Selenium crawler, Python NLTK library, Flask backend, PostgreSQL database, containerized via Docker and deployed to Kubernetes</li>
        <li>Unfortunately the repo is private and not formally hosted</li>
      </ul>
    </div>,
    <div key={5} className="w-full h-full p-4">
      <h1 className='text-2xl font-bold'>UIUC CS124 Honors - Intro to Computer Science I</h1>
      <h1 className='text-lg'>Project Manager</h1>
      <h1 className='text-md'>2024.1 - 2024.12</h1>
      <ul className='list-disc'>
        <li>Provide technical guidance and assistance to a team of students learning web development for the first time</li>
        <li>Plan and organize project timelines, work distribution, and goal adjustment</li>
        <li>Give tutorials on relevant technologies such as ReactJS, Bootstrap, Next.js, and other development tools</li>
        <li>Communicate with team members to adjust the project and workload according to their needs</li>
        <li>Projects I led: <a href='https://github.com/CS196Illinois/FA24-Group1' target='_blank'>https://github.com/CS196Illinois/FA24-Group1</a> and <a href='https://github.com/CS196Illinois/Group12-SP24' target='_blank'>https://github.com/CS196Illinois/Group12-SP24</a></li>
        <li>Project I made before becoming a PM: <a href='https://github.com/CS196Illinois/Group33-FA23' target='_blank'>https://github.com/CS196Illinois/Group33-FA23</a></li>
      </ul>
    </div>,
    <div key={6} className="w-full h-full p-4 ">
      <h1 className='text-2xl font-bold'>First Robotics Competition</h1>
      <h1 className='text-lg'>Programming Advisor</h1>
      <h1 className='text-md'>2022.6 - 2023.6</h1>
      <ul className='list-disc'>
        <li>Provided basic Java programming language training to the programming group members of the school FRC team through tiny lectures and discussion meetings, instructing up to 20 members</li>
        <li>Conducted additional skill workshops for members to learn about advanced topics in the robot’s programming library</li>
        <li>GitHub page: <a href='https://github.com/FutureShock7130/2022-RapidReact-Robot-Code' target='_blank'>https://github.com/FutureShock7130/2022-RapidReact-Robot-Code</a></li>
      </ul>
    </div>,
    <div key={7} className="w-full h-full p-4">
      <h1 className='text-2xl font-bold'>Artemis - a carbon footprint app</h1>
      <h1 className='text-md'>2024.8 - 2024.12</h1>
      <ul className='list-disc'>
        <li>Created a web application using ReactJS front end with Python Django backend that allows the user to record their carbon footprint and generates analytics according to the user’s past data</li>
        <li>Achieved first place in web app development in the 2021 Taiwan Hackathon Jr.</li>
        <li>GitHub page: <a href='https://github.com/Alb33rt/artemis' target='_blank'>https://github.com/Alb33rt/artemis</a></li>
      </ul>
    </div>,
    <div key={8} className="w-full h-full p-4">
      <h1 className='text-2xl font-bold'>Flowchart Builder</h1>
      <h1 className='text-md'>2022.9 - 2023.2</h1>
      <ul className='list-disc'>
        <li>Created a desktop application using the Python Tkinter library that allows the user to create runnable programming flowcharts with a customized in-built console and variable/execution tracking tool.</li>
        <li>Developed to suit the IB official flowchart format for peers to practice the IB flowchart structure</li>
        <li>GitHub page: <a href='https://github.com/AaronWangTW/FlowChartBuilder' target='_blank'>https://github.com/AaronWangTW/FlowChartBuilder</a></li>
      </ul>
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