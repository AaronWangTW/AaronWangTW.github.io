export default function Capsule({ label, onPlug }) {
  return (
    <button
      onClick={onPlug}
      className="w-32 h-16 bg-slate-800 rounded-full text-white flex items-center justify-center shadow-md hover:bg-slate-700 transition"
    >
      {label}
    </button>
  );
}