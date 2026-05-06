/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Mail, 
  Code2, 
  Cpu, 
  Gamepad2, 
  ChevronRight,
  Download,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          JDI<span className="text-brand-accent">.</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TypingAnimation = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="border-r-2 border-brand-accent pr-1 cursor-pulse">
      {displayText}
    </span>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            Welcome to my portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            I'm <span className="text-gradient">Jose Danielle Inocentes</span>
          </h1>
          <div className="text-xl md:text-2xl text-gray-400 font-medium mb-8 min-h-[3rem]">
            <TypingAnimation text="Aspiring Software Developer | Web Developer | AI Automation Enthusiast" />
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            I build clean, efficient, and scalable digital solutions, focusing on web development and AI-driven automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
            >
              View Projects
            </a>
            <a 
              href="#contact"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-black/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-white/5 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-transparent transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="flex items-center justify-center h-full">
                <Code2 size={120} className="text-white/10 group-hover:text-white/20 transition-colors" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-brand-accent/10 blur-3xl rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                I am a passionate aspiring developer with a strong focus on building practical applications that solve real-world problems. My journey in tech is driven by curiosity and a commitment to continuous learning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <h3 className="text-white font-semibold mb-1">Problem Solver</h3>
                  <p className="text-sm">Driven by complex challenges and logical solutions.</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <h3 className="text-white font-semibold mb-1">Tech Explorer</h3>
                  <p className="text-sm">Always diving into new frameworks and AI tools.</p>
                </div>
              </div>
              <p>
                Whether it's optimizing a web interface or automating a workflow with AI, I aim for clean code and high performance in every project I undertake.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, desc, tags, icon: Icon, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card rounded-2xl p-6 hover:border-brand-accent/30 group"
    >
      <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent/10 transition-colors">
        <Icon size={24} className="text-white group-hover:text-brand-accent transition-colors" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 line-clamp-2">{desc}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 text-xs bg-white/5 text-gray-400 rounded-full border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <a href="#" className="flex items-center text-xs font-semibold text-gray-400 hover:text-white transition-colors">
          <Github size={16} className="mr-1.5" /> Code
        </a>
        <a href="#" className="flex items-center text-xs font-semibold text-gray-400 hover:text-white transition-colors">
          <ExternalLink size={16} className="mr-1.5" /> Demo
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "AI Automation System",
      desc: "An intelligent workflow automation tool utilizing LLMs to streamline repetitive business processes.",
      tags: ["Python", "OpenAI API", "Node.js"],
      icon: Cpu,
    },
    {
      title: "Web Development Project",
      desc: "A scalable full-stack application built with React and modern backend technologies for high performance.",
      tags: ["React", "Tailwind", "Supabase"],
      icon: Code2,
    },
    {
      title: "Horror Game (Unity)",
      desc: "An immersive first-person horror experience focusing on atmospheric design and psychological elements.",
      tags: ["Unity", "C#", "3D Modeling"],
      icon: Gamepad2,
    },
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-gray-500">A selection of my recent work in web, AI, and game development.</p>
          </div>
          <a href="#" className="text-brand-accent font-medium flex items-center hover:underline">
            View Archive <ChevronRight size={18} className="ml-1" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: "Frontend",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "TypeScript"]
    },
    {
      title: "AI & Tools",
      skills: ["Python", "Git", "Power BI", "Prompt Engineering", "LLM Workflows"]
    },
    {
      title: "Other",
      skills: ["Unity", "C#", "Firebase", "Responsive Design"]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">My Skills</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-white/5 rounded-2xl"
            >
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                <span className="h-1 w-4 bg-brand-accent mr-3 inline-block rounded-full" />
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-white/5 text-gray-400 text-sm rounded-lg hover:bg-white/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gradient">Education</h2>
        <div className="relative pl-8 border-l-2 border-white/5 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-0 h-4 w-4 bg-brand-accent rounded-full border-4 border-black box-content" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">2022 — Present</span>
            <h3 className="text-xl font-bold mb-1">Bachelor of Science in Information Technology</h3>
            <p className="text-gray-400">Current Student / Graduating</p>
            <p className="mt-4 text-gray-500 leading-relaxed max-w-2xl">
              Focusing on core computing principles, software engineering, and data analytics. Actively participating in technical seminars and project-based learning.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-black/50 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-brand-accent/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:daniel.inocentes30@gmail.com" className="flex items-center group">
                <div className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center mr-4 group-hover:bg-brand-accent/20 transition-colors">
                  <Mail className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Me</p>
                  <p className="text-gray-200">daniel.inocentes30@gmail.com</p>
                </div>
              </a>
              
              <div className="flex space-x-4 pt-4">
                <a href="#" className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Github size={20} className="text-gray-400 hover:text-white" />
                </a>
                <a href="#" className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Linkedin size={20} className="text-gray-400 hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 glass-card rounded-3xl"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent/50 transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent/50 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Message</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent/50 transition-colors h-32 resize-none" placeholder="How can I help you?"></textarea>
              </div>
              <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center group">
                Send Message
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm">
          © 2026 Jose Danielle Inocentes. Built with precision.
        </p>
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Credits</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="selection:bg-brand-accent/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
