'use client';

import { motion, AnimatePresence } from 'framer-motion';
import AboutBlock from '../blocks/aboutBlock';
import PortfolioBlock from '../blocks/portfolioBlock';
import OhNoBlock from '../blocks/ohnoBlock';
import IntroductionBlock from '../blocks/introBlock';
import ResumeBlock from '../blocks/resumeBlock';

export default function ContentDisplay({ prompt }) {
  const getContentBlock = () => {
    const lower = prompt.toLowerCase();

    if (!prompt || prompt.trim() === '') {
        return <IntroductionBlock />;
    }

    if (lower.includes('about') || lower.includes('who are you')) {
      return <AboutBlock />;
    }

    if (
      lower.includes('portfolio') ||
      lower.includes('projects') ||
      lower.includes('work') ||
      lower.includes('showcase')
    ) {
      return <PortfolioBlock />;
    }

    if (lower.includes('resume')) {
      return <ResumeBlock />;
    }

    return <OhNoBlock/>;
  };

  const block = getContentBlock();

  return (
    <AnimatePresence mode="wait">
      {block && (
        <motion.div
          key={prompt}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <div className="w-full h-full p-6">
            {block}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}