export default function PortfolioBlock() {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 text-gray-800 h-full">
      <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Interactive Prompt Website</strong> – This site! Built with Next.js, Tailwind, and Framer Motion.
        </li>
        <li>
          <strong>Networking File Server</strong> – Epoll-based server for file sharing, written in C.
        </li>
        <li>
          <strong>3D Puzzle Game</strong> – Built with Unreal Engine 5 and Blueprints.
        </li>
        {/* Add your real projects here */}
      </ul>
    </div>
  );
}