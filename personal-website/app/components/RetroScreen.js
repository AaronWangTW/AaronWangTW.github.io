export default function RetroScreen({ content }) {
  return (

    <div className="relative w-[90vw] max-w-5xl h-[60vh] bg-[#111827] rounded-xl border-[10px] border-gray-700 shadow-[inset_0_0_60px_#000000aa,_0_8px_30px_#00000088] p-6 font-mono screen-container">

      {/* Scanlines */}
      <div className="screen-scanlines" />

      {/* Flicker Glow */}
      <div className="screen-glow-overlay" />

      {/* DUST SPOTS */}
      <div className="dust-spot w-16 h-10 top-4 left-8 z-30" />
      <div className="dust-spot w-8 h-6 top-12 right-12 z-30" />
      <div className="dust-spot w-12 h-8 bottom-10 left-50 z-30" />

      {/* Example port sticking out from the RIGHT edge */}
      <div
        className="absolute trapezoid-port"
        style={{
          top: '50%',
          right: '-55px',  // protrudes outside the screen
          transform: 'translateY(-50%) rotate(-90deg)' // no rotation, just horizontal
        }}
        data-port-id="port1"
      />

      <div
        className="absolute trapezoid-port"
        style={{
          top: '50%',
          left: '-55px',  // protrudes outside the screen
          transform: 'translateY(50%) rotate(90deg)' // no rotation, just horizontal
        }}
        data-port-id="port3"
      />

      {/* Example port sticking out from the BOTTOM edge */}
      <div
        className="absolute trapezoid-port"
        style={{
          left: '50%',
          bottom: '-20px',
          transform: 'translateX(-50%) rotate(0deg)' // rotate so it points downward
        }}
        data-port-id="port2"
      />

      {/* Content */}
      <div className="relative z-30 text-green-200 text-md h-full overflow-y-auto p-4">
        {content || <p className="text-center opacity-40 mt-30">Awaiting input…</p>}
      </div>
    </div>
  );
}