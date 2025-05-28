export default function AboutBlock() {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 text-gray-800 h-full">
      <h2 className="text-2xl font-bold mb-2">About Me</h2>
      <p className="leading-relaxed">
        Hi, I’m Aaron — a sophomore studying Computer Science, planning to graduate in three years.
        I currently lead high-level software development at <strong>Pacbot</strong>, a robotics team that builds
        real-life Pac-Man-playing robots. I’m responsible for the path planning, vision system,
        and communication protocols that drive our bots.
      </p>
      <p className="leading-relaxed mt-4">
        Outside of robotics, I’ve worked on several web development projects using technologies like <strong>React</strong>,
        <strong> Next.js</strong>, and <strong>Express.js</strong>, and I enjoy creating responsive, user-focused experiences.
      </p>
    </div>
  );
}