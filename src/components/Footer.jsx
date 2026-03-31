import { Rocket, Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-4 mt-6 bg-gradient-to-t from-[#0f0f1a] to-transparent border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Logo */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="font-orbitron text-xl font-bold gradient-text">NexusCareer</span>
            </div>
            <p className="text-gray-400 mb-4">AI-powered career intelligence platform built for India's next generation of professionals.</p>
            <div className="flex gap-4">
              {[Globe, Mail, Phone].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Platform', links: ['Career Profiler', 'AI Recommendations', 'Skill Analysis', 'Learning Hub'] },
            { title: 'Resources', links: ['Blog', 'Guides', 'Webinars', 'Podcasts'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-orbitron font-bold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#00F5FF] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h4 className="font-orbitron font-bold mb-1">Stay Ahead of the Curve</h4>
              <p className="text-gray-400 text-sm">Get weekly career insights delivered to your inbox</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="ui-input flex-1 sm:w-64"
              />
              <button className="ui-btn ui-btn-primary px-6">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>Made with ❤️ for India's Next Generation</p>
          <p className="mt-2">© 2024 NexusCareer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
