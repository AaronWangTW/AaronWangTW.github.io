export default function RetroScreen({ content }) {
  return (
    <div className="relative w-[90vw] max-w-5xl h-[60vh] bg-[#111827] rounded-xl border-[10px] border-gray-700 shadow-[inset_0_0_60px_#000000aa,_0_8px_30px_#00000088] p-6 overflow-hidden font-mono screen-container">
      
      {/* Glass Reflection */}
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-transparent via-transparent to-[#ffffff10] z-5" />

      {/* Scanlines */}
      <div className="screen-scanlines" />
      
      {/* Flicker Glow */}
      <div className="screen-glow-overlay" />

      {/* Content */}
      <div className="relative z-30 text-green-200 text-sm h-full overflow-y-auto p-4">
        {content || <p className="text-center opacity-40 mt-24">Awaiting input…</p>}
      </div>
    </div>
  );
}