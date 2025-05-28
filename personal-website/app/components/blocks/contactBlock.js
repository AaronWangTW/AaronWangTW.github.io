import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactBlock() {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 text-gray-800 h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <div className="flex gap-6">
        {/* Email */}
        <a
          href="mailto:honglin2023@gmail.com"
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          aria-label="Email"
        >
          <Mail className="w-6 h-6 text-gray-800" />
        </a>

        {/* LinkedIn */}
        <a
          href="http://www.linkedin.com/in/hong-lin-wang"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6 text-gray-800" />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/AaronWangTW"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6 text-gray-800" />
        </a>
      </div>
    </div>
  );
}
