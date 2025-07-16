import { useEffect, useRef } from 'react';
import { addCapsule } from '../lib/physics';
export default function Capsule({ label, x = 0, y = 0 ,content}) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      requestAnimationFrame(() => {
        addCapsule(ref.current, { x, y }, content);
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      className="absolute"
      style={{
        willChange: 'transform',
      }}
    >
      {/* Plug connector */}
      <div
        className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-4 h-8 bg-[#333] border border-gray-600 rounded-sm shadow-sm z-0"
      />

      <button
        className="relative z-10 flex items-center px-6 py-3 text-sm font-bold text-white
          bg-gray-800 border border-[#4a4a4a] rounded-full
          shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),_0_3px_6px_rgba(0,0,0,0.3)]
          hover:brightness-110 active:translate-y-[1px] active:brightness-95
          transition-all duration-150"
      >
        {label}
      </button>
    </div>
  );
}
