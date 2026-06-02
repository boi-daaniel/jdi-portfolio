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
  Instagram,
  Code2, 
  Cpu, 
  ChevronRight,
  Download,
  Menu,
  X,
  Facebook
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import BlurText from "./components/BlurText";
import BorderGlow from "./components/BorderGlow";
import DarkVeil from "./components/DarkVeil";
import ScrollFloat from "./components/ScrollFloat";
import StartupIntro from "./components/StartupIntro";
import profileImage from "../profile.png";

// --- Components ---

const HOME_PATH = "/";
const PROJECTS_PATH = "/projects";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
  demoUrl?: string;
  codeUrl?: string;
};

const projects: Project[] = [
  {
    title: "HR Automation System",
    desc: "An application automation system that scans incoming emails, extracts resume data, stores applicant details, sends screening links, and follows up after 2 days if there is no response.",
    tags: ["Email Automation", "Resume Parsing", "Follow-up Workflow"],
    icon: Cpu,
    codeUrl: "https://github.com/boi-daaniel/aira-frontend",
    demoUrl: "https://aira-front-end.vercel.app/",
  },
  {
    title: "Personal Allowance & Expense Tracker",
    desc: "A personal allowance and expense tracker with a private dashboard for logging entries and visualizing spending by category.",
    tags: ["React", "Tailwind CSS", "Supabase"],
    icon: Code2,
    codeUrl: "https://github.com/boi-daaniel/off-track",
    demoUrl: "https://off-track-liard.vercel.app/",
  },
];

const scrollToSectionById = (sectionId: string) => {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const headerOffset = 96;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  return window.scrollTo({
    top: Math.max(targetPosition, 0),
    behavior: "smooth",
  });
};

const getSectionFromHash = () => {
  if (!window.location.hash || window.location.hash === "#") {
    return "hero";
  }

  return window.location.hash.slice(1);
};

const HeroVeil = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        <DarkVeil
          hueShift={12}
          noiseIntensity={0.015}
          scanlineIntensity={0.08}
          speed={0.35}
          scanlineFrequency={1.8}
          warpAmount={0.12}
          resolutionScale={0.6}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.72))]" />
    </div>
  );
};

const Navbar = ({
  currentPath,
  onNavigateHome,
  onNavigateProjects,
}: {
  currentPath: string;
  onNavigateHome: (sectionId: string) => void;
  onNavigateProjects: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 50;
      setIsScrolled((current) => (current === nextIsScrolled ? current : nextIsScrolled));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", sectionId: "hero" },
    { name: "About", sectionId: "about" },
    { name: "Projects", path: PROJECTS_PATH },
    { name: "Skills", sectionId: "skills" },
    { name: "Education", sectionId: "education" },
    { name: "Contact", sectionId: "contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href={HOME_PATH}
          onClick={(event) => {
            event.preventDefault();
            setIsMobileMenuOpen(false);
            onNavigateHome("hero");
          }}
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
              href={link.path ?? `${HOME_PATH}#${link.sectionId}`}
              onClick={(event) => {
                event.preventDefault();

                if (link.path) {
                  onNavigateProjects();
                  return;
                }

                onNavigateHome(link.sectionId!);
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-sm font-medium transition-colors ${
                currentPath === link.path ? "text-white" : "text-gray-400 hover:text-white"
              }`}
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
                  href={link.path ?? `${HOME_PATH}#${link.sectionId}`}
                  onClick={(event) => {
                    setIsMobileMenuOpen(false);

                    event.preventDefault();

                    if (link.path) {
                      onNavigateProjects();
                      return;
                    }

                    onNavigateHome(link.sectionId!);
                  }}
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

const TypingAnimation = ({ text, active = true }: { text: string; active?: boolean }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!active) return;
    if (displayText.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayText(text.slice(0, displayText.length + 1));
    }, 50);

    return () => clearTimeout(timeout);
  }, [active, displayText, text]);

  return (
    <span className="border-r-2 border-brand-accent pr-1">
      {displayText}
    </span>
  );
};

const Hero = ({
  onNavigateHome,
  startTyping,
}: {
  onNavigateHome: (sectionId: string) => void;
  startTyping: boolean;
}) => {
  return (
    <section id="hero" className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-20">
      <HeroVeil />
      <div className="max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BlurText
            as="h1"
            text="Jose Danielle Inocentes"
            delay={110}
            animateBy="words"
            direction="top"
            stepDuration={0.45}
            rootMargin="-10% 0px"
            className="mx-auto mb-6 justify-center text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl"
          />
          <div className="mb-8 min-h-[4.5rem] text-base font-medium leading-relaxed text-gray-400 sm:min-h-[3.75rem] sm:text-lg md:text-2xl">
            <TypingAnimation
              text="Aspiring Software Developer | Web Developer | AI Automation"
              active={startTyping}
            />
          </div>

          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <a 
              href={`${HOME_PATH}#projects`}
              onClick={(event) => {
                event.preventDefault();
                onNavigateHome("projects");
              }}
              className="w-full rounded-full bg-white px-8 py-4 text-center font-semibold text-black transition-all hover:bg-gray-200 sm:w-auto"
            >
              View Projects
            </a>
            <a 
              href={`${HOME_PATH}#contact`}
              onClick={(event) => {
                event.preventDefault();
                onNavigateHome("contact");
              }}
              className="w-full rounded-full border border-white/20 bg-transparent px-8 py-4 text-center font-semibold text-white transition-all hover:bg-white/5 sm:w-auto"
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
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!copiedEmail) return;

    const timeout = window.setTimeout(() => {
      setCopiedEmail(false);
    }, 1600);

    return () => window.clearTimeout(timeout);
  }, [copiedEmail]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("daniel.inocentes30@gmail.com");
      setCopiedEmail(true);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <section id="about" className="bg-black/50 px-4 py-20 sm:px-6 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid items-end gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-sm md:max-w-none"
          >
            <BorderGlow
              className="rounded-[28px]"
              edgeSensitivity={26}
              glowColor="210 95 72"
              backgroundColor="#0f172a"
              borderRadius={28}
              glowRadius={34}
              glowIntensity={0.95}
              coneSpread={22}
              animated={true}
              fillOpacity={0.38}
              colors={["#38bdf8", "#3b82f6", "#93c5fd"]}
            >
              <div className="aspect-[2229/2505] overflow-hidden rounded-[28px] bg-gray-900 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <img
                  src={profileImage}
                  alt="Profile"
                  width={2229}
                  height={2505}
                  decoding="async"
                  fetchPriority="high"
                  sizes="(min-width: 768px) 448px, min(384px, 100vw)"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </BorderGlow>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-brand-accent/10 blur-3xl rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex h-full"
          >
            <div className="flex flex-1 flex-col">
              <div className="space-y-6 text-base leading-relaxed text-gray-400 sm:text-lg">
                <ScrollFloat
                  containerClassName="text-left"
                  textClassName="!text-3xl text-white md:!text-4xl"
                  scrollStart="top bottom-=10%"
                  scrollEnd="bottom center"
                  stagger={0.02}
                >
                  About Me
                </ScrollFloat>
                <p>
                  I am a passionate aspiring developer with a strong focus on building practical applications that solve real-world problems. My journey in tech is driven by curiosity and a commitment to continuous learning. Whether it's optimizing a web interface or automating a workflow with AI, I aim for clean code and high performance in every project I undertake.
                </p>
              </div>
              <div className="h-8 shrink-0 md:h-10" />
              <div className="mt-auto p-4 bg-white/5 border border-white/5 rounded-xl space-y-4">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex w-full items-start gap-3 text-left transition-colors hover:text-white"
                >
                  <Mail size={18} className="mt-1 text-white/80" />
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="break-all text-sm">daniel.inocentes30@gmail.com</p>
                    <AnimatePresence>
                      {copiedEmail ? (
                        <motion.span
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="shrink-0 whitespace-nowrap text-xs font-semibold text-brand-accent"
                        >
                          Copied!
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </button>
                <a
                  href="https://www.facebook.com/daanieboi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 break-all transition-colors hover:text-white"
                >
                  <Facebook size={18} className="mt-1 text-white/80" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Facebook</h3>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/daanie_boi/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 break-all transition-colors hover:text-white"
                >
                  <Instagram size={18} className="mt-1 text-white/80" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Instagram</h3>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

type ProjectCardProps = Project & {
  delay: number;
  key?: string;
};

const ProjectCard = (props: ProjectCardProps) => {
  const {
    title,
    desc,
    tags,
    icon: Icon,
    delay,
    demoUrl,
    codeUrl,
  } = props;

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
        <a
          href={codeUrl ?? "#"}
          target={codeUrl ? "_blank" : undefined}
          rel={codeUrl ? "noreferrer" : undefined}
          className="flex items-center text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <Github size={16} className="mr-1.5" /> Code
        </a>
        <a
          href={demoUrl ?? "#"}
          target={demoUrl ? "_blank" : undefined}
          rel={demoUrl ? "noreferrer" : undefined}
          className="flex items-center text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ExternalLink size={16} className="mr-1.5" /> Demo
        </a>
      </div>
    </motion.div>
  );
};

const Projects = ({ onNavigateProjects }: { onNavigateProjects: () => void }) => {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <ScrollFloat
              containerClassName="mb-2 text-left"
              textClassName="!text-3xl md:!text-4xl"
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center"
              stagger={0.02}
            >
              Featured Projects
            </ScrollFloat>
            <p className="text-gray-500 sm:text-base">A selection of my recent work in web, AI, and game development.</p>
          </div>
          <a
            href={PROJECTS_PATH}
            onClick={(event) => {
              event.preventDefault();
              onNavigateProjects();
            }}
            className="text-brand-accent font-medium flex items-center hover:underline"
          >
            View Archive <ChevronRight size={18} className="ml-1" />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              desc={project.desc}
              tags={project.tags}
              icon={project.icon}
              codeUrl={project.codeUrl}
              demoUrl={project.demoUrl}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsPage = ({ onNavigateHome }: { onNavigateHome: (sectionId: string) => void }) => {
  return (
    <main className="min-h-screen px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <section className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <span className="text-brand-accent mb-4 block text-xs font-semibold uppercase tracking-[0.22em] sm:text-sm sm:tracking-[0.3em]">
              Project Archive
            </span>
            <ScrollFloat
              as="h1"
              containerClassName="mb-4 text-left"
              textClassName="!text-4xl md:!text-6xl"
              scrollStart="top bottom-=5%"
              scrollEnd="bottom center"
              stagger={0.02}
            >
              All Projects
            </ScrollFloat>
            <p className="text-base leading-relaxed text-gray-400 sm:text-lg">
              A complete list of portfolio work across automation, web applications, and product-focused builds.
            </p>
          </div>
          <a
            href={`${HOME_PATH}#contact`}
            onClick={(event) => {
              event.preventDefault();
              onNavigateHome("contact");
            }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
          >
            Start a Conversation
          </a>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              desc={project.desc}
              tags={project.tags}
              icon={project.icon}
              codeUrl={project.codeUrl}
              demoUrl={project.demoUrl}
              delay={index * 0.08}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: "Programming",
      skills: ["Java", "TypeScript", "PHP", "Python"]
    },
    {
      title: "Technical Tools",
      skills: ["MySQL", "Figma", "Canva", "Adobe", "AI Workflow Automation"]
    },
    {
      title: "Soft Skills",
      skills: ["Project Management", "Great Leadership", "Good Work Ethic", "Adaptability"]
    }
  ];

  return (
    <section id="skills" className="bg-black/30 px-4 py-20 sm:px-6 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <ScrollFloat
          containerClassName="mb-12 text-center"
          textClassName="!text-3xl md:!text-4xl"
          scrollStart="top bottom-=10%"
          scrollEnd="bottom center"
          stagger={0.02}
        >
          My Skills
        </ScrollFloat>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 p-6 sm:p-8"
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
  const educationItems = [
    {
      period: "2022 - Present",
      level: "Tertiary",
      title: "Bachelor of Science in Information Technology",
      school: "University of Cebu Lapu-Lapu and Mandaue",
      description:
        "Currently pursuing a BSIT degree with focus areas in software development, database management, AI workflow automation, and project-based systems."
    },
    {
      period: "2020 - 2022",
      level: "Secondary",
      title: "TechVoc - ICT (Information and Communication Technology)",
      school: "University of Cebu Lapu-Lapu and Mandaue",
      description:
        "Completed ICT-focused senior high school training covering foundational computing, technical skills, and applied technology concepts."
    },
    {
      period: "2016 - 2020",
      level: "Junior High School",
      title: "Junior High School",
      school: "University of Cebu Lapu-Lapu and Mandaue",
      description:
        "Built core academic foundations while developing an early interest in technology and practical problem solving."
    },
    {
      period: "2010 - 2016",
      level: "Primary",
      title: "Basic Education",
      school: "Pusok Elementary School",
      description:
        "Completed primary education and developed the learning foundations that support continued academic growth."
    }
  ];

  return (
    <section id="education" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.35em] text-brand-accent">
            Education
          </span>
          <h2 className="text-gradient text-3xl font-bold tracking-tight md:text-4xl">
            Academic Background
          </h2>
        </motion.div>
        <div className="relative space-y-12 border-l-2 border-white/5 pl-6 sm:pl-8">
          {educationItems.map((item, index) => (
            <motion.div
              key={`${item.period}-${item.title}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative"
            >
              <div className="absolute -left-[33px] top-0 h-4 w-4 rounded-full border-4 border-black bg-brand-accent box-content sm:-left-[41px]" />
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">
                {item.period} - {item.level}
              </span>
              <h3 className="mb-1 text-xl font-bold text-white">{item.title}</h3>
              <p className="text-gray-400">{item.school}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-gray-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-black/50 px-4 py-20 sm:px-6 sm:py-24">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/5 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <ScrollFloat
              containerClassName="mb-6 text-left"
              textClassName="!text-4xl md:!text-5xl"
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center"
              stagger={0.02}
            >
              Let's Connect
            </ScrollFloat>
            <p className="mb-10 max-w-md text-base text-gray-400 sm:text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:daniel.inocentes30@gmail.com" className="group flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-brand-accent/20">
                  <Mail className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Me</p>
                  <p className="break-all text-gray-200">daniel.inocentes30@gmail.com</p>
                </div>
              </a>
              
              <div className="flex space-x-4 pt-4">
                <a
                  href="https://github.com/boi-daaniel"
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Github size={20} className="text-gray-400 hover:text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jose-danielle-inocentes-6ab887357"
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Linkedin size={20} className="text-gray-400 hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 sm:p-8"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
    <footer className="border-t border-white/5 bg-black px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <p className="text-sm text-gray-500">
          Copyright 2026 Jose Danielle Inocentes. Built with precision.
        </p>
        <div className="flex flex-col items-center gap-3 text-sm text-gray-500 sm:flex-row sm:gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Credits</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [pendingSectionId, setPendingSectionId] = useState<string | null>(null);
  const [showStartupIntro, setShowStartupIntro] = useState(true);
  const [startHeroTyping, setStartHeroTyping] = useState(false);

  useEffect(() => {
    const syncRoute = () => {
      setCurrentPath(window.location.pathname);
      setPendingSectionId(window.location.pathname === HOME_PATH ? getSectionFromHash() : null);
    };

    syncRoute();
    window.addEventListener("popstate", syncRoute);

    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showStartupIntro ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showStartupIntro]);

  useEffect(() => {
    if (currentPath !== HOME_PATH || !pendingSectionId) return;

    const frame = window.requestAnimationFrame(() => {
      scrollToSectionById(pendingSectionId);
      setPendingSectionId(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentPath, pendingSectionId]);

  const navigateToProjects = () => {
    window.history.pushState({}, "", PROJECTS_PATH);
    setCurrentPath(PROJECTS_PATH);
    setPendingSectionId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateHome = (sectionId: string) => {
    const nextUrl = sectionId === "hero" ? HOME_PATH : `${HOME_PATH}#${sectionId}`;
    window.history.pushState({}, "", nextUrl);
    setCurrentPath(HOME_PATH);
    setPendingSectionId(sectionId);
  };

  const isProjectsPage = currentPath === PROJECTS_PATH;

  return (
    <div className="selection:bg-brand-accent/30 selection:text-white">
      <StartupIntro
        active={showStartupIntro}
        onComplete={() => setShowStartupIntro(false)}
        onExitComplete={() => setStartHeroTyping(true)}
      />
      <Navbar
        currentPath={currentPath}
        onNavigateHome={navigateHome}
        onNavigateProjects={navigateToProjects}
      />
      {isProjectsPage ? (
        <ProjectsPage onNavigateHome={navigateHome} />
      ) : (
        <main>
          <Hero onNavigateHome={navigateHome} startTyping={startHeroTyping} />
          <About />
          <Projects onNavigateProjects={navigateToProjects} />
          <Skills />
          <Education />
          <Contact />
        </main>
      )}
      <Footer />
    </div>
  );
}
