"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Github, Linkedin, Mail, FileText, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-bold text-[#e6f1ff] whitespace-nowrap">
          {children}
        </h2>
        <div className="flex-1 h-px bg-[#1e2d40]" />
      </div>
    </Reveal>
  );
}

// ─── Tag ───────────────────────────────────────────────────────────────────────
function Tag({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <span
      className={`bg-[#64ffda1a] text-[#64ffda] border border-[#64ffda44] rounded font-mono transition-colors hover:bg-[#64ffda33] ${
        small ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      }`}
    >
      {children}
    </span>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["about", "skills", "experience", "projects", "education", "contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-all duration-300 ${
        scrolled ? "bg-[rgba(10,14,26,0.92)] backdrop-blur-md shadow-lg" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <a href="#hero" className="font-mono text-xl font-medium text-[#64ffda] tracking-widest">
          BN
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                className="font-mono text-sm text-[#8892b0] hover:text-[#64ffda] transition-colors capitalize"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#64ffda] transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#64ffda] transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#64ffda] transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-5 px-6 py-5 bg-[rgba(10,14,26,0.97)] border-t border-[#1e2d40] mt-2">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-[#8892b0] hover:text-[#64ffda] transition-colors capitalize"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── HERO (Aurora) ─────────────────────────────────────────────────── */}
      <section id="hero">
        <AuroraBackground className="dark:bg-[#0a0e1a]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
            className="relative flex flex-col gap-5 items-start justify-center px-6 max-w-3xl w-full mx-auto"
          >
            <p className="font-mono text-[#64ffda] text-sm">Hi, I&apos;m</p>
            <h1 className="text-5xl md:text-7xl font-bold text-[#e6f1ff] leading-tight">
              Benjamin Nguyen
            </h1>
            <h2 className="text-xl md:text-2xl font-normal text-[#8892b0]">
              Computer Systems Engineering Student{" "}
              <span className="text-[#64ffda]">@ ASU</span>
            </h2>
            <p className="text-[#8892b0] max-w-lg text-base">
              Building scalable software solutions with a passion for web
              development and systems programming.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <a
                href="https://www.linkedin.com/in/ben-nguyen04/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#64ffda] text-[#0a0e1a] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#4de8c4] transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="https://github.com/ben-nguyen04"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#64ffda] text-[#64ffda] px-5 py-2.5 rounded-lg hover:bg-[#64ffda1a] transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="/Ben_Resume_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#8892b0] text-[#8892b0] px-5 py-2.5 rounded-lg hover:border-[#64ffda] hover:text-[#64ffda] transition-colors"
              >
                <FileText size={16} />
                Resume
              </a>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-10 w-px h-14 bg-gradient-to-b from-[#64ffda] to-transparent animate-pulse" />
        </AuroraBackground>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-[#0a0e1a]">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>About Me</SectionTitle>
          <div className="space-y-4 text-[#8892b0]">
            <Reveal delay={0}>
              <p>
                I&apos;m a Computer Systems Engineering student at{" "}
                <span className="text-[#64ffda]">Arizona State University</span>{" "}
                (GPA: 3.56), graduating May 2027. I have hands-on experience in
                software development, web applications, and autonomous system
                programming.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Skilled in Java, C/C++, Python, JavaScript, and Linux/Unix
                environments with a solid foundation in data structures and
                algorithms. Dean&apos;s List recipient and proud New American
                University Scholarship (Provost Award) holder.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                Outside of code, I&apos;m a team leader and coach — currently a
                Kids Academy Supervisor at LifeTime Fitness, and an active
                member of the ASU PowerLifting Club and Vietnamese Student
                Association.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-6 space-y-3">
                <div className="flex gap-4 text-sm">
                  <span className="font-mono text-[#64ffda] w-24 shrink-0">Languages</span>
                  <span>English &amp; Vietnamese</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="font-mono text-[#64ffda] w-24 shrink-0">Interests</span>
                  <span>Lifting · Golf · Pickleball · Music · Basketball · Traveling · Gaming</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 bg-[#111827]">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>Skills</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                label: "Languages",
                tags: ["Java", "Python", "C / C++", "JavaScript", "HTML", "CSS"],
              },
              {
                label: "Technical",
                tags: ["Data Structures", "Algorithms", "Linux / Unix", "Digital Design", "Circuits", "OOP"],
              },
              {
                label: "Soft Skills",
                tags: ["Team Leadership", "Problem-Solving", "Process Optimization", "Coaching", "Cross-Cultural Comms"],
              },
            ].map((cat, i) => (
              <Reveal key={cat.label} delay={i * 80}>
                <h3 className="font-mono text-xs text-[#64ffda] uppercase tracking-widest mb-4">
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 bg-[#0a0e1a]">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>Experience</SectionTitle>
          <div className="relative pl-8 border-l border-[#1e2d40] space-y-12">
            {[
              {
                title: "Kids Academy Supervisor",
                date: "Mar 2023 – Present",
                company: "LifeTime Fitness · Goodyear, AZ",
                bullets: [
                  "Supervised 8+ employees and automated scheduling systems, reducing administrative overhead by 25%",
                  "Conducted team evaluations and coaching protocols, increasing employee performance by 30% and customer satisfaction by 15%",
                  "Streamlined operations through process automation, enhancing program quality for 150+ families with 98% safety compliance",
                ],
              },
              {
                title: "Kids Academy Instructor",
                date: "May 2022 – Mar 2023",
                company: "LifeTime Fitness · Goodyear, AZ",
                bullets: [
                  "Coached 12+ children using safety protocols and engagement methods, maintaining 100% incident-free record across 200+ sessions",
                  "Designed fitness lesson plans through iterative testing, increasing participant engagement by 40%",
                  "Spearheaded operations through process automation, enhancing program quality for 150+ families with 98% safety compliance",
                ],
              },
            ].map((job, i) => (
              <Reveal key={job.title} delay={i * 100}>
                <div className="relative">
                  <div className="absolute -left-[2.4rem] top-2 w-2.5 h-2.5 rounded-full bg-[#64ffda] shadow-[0_0_8px_#64ffda]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-[#e6f1ff]">{job.title}</h3>
                    <span className="font-mono text-xs text-[#64ffda]">{job.date}</span>
                  </div>
                  <p className="text-sm text-[#8892b0] mb-3">{job.company}</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#8892b0]">
                    {job.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 bg-[#111827]">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Personal Website",
                sub: "Platform for Socials",
                date: "Jun 2025 – Present",
                bullets: [
                  "Built responsive portfolio using JavaScript, HTML, CSS with cross-platform compatibility for 5+ device formats",
                  "Integrated dynamic content and interactive UI elements using algorithmic design patterns",
                  "Deployed scalable web architecture with automated testing, ensuring 99% uptime",
                ],
                tags: ["JavaScript", "HTML", "CSS"],
                href: "https://github.com/ben-nguyen04",
              },
              {
                title: "Python Blackjack Game",
                sub: "Interactive Console Application",
                date: "Oct – Dec 2024",
                bullets: [
                  "Programmed a card-deck system in Python using object-oriented design with randomized gameplay",
                  "Implemented betting mechanics and win/loss tracking reinforcing probability rules",
                  "Enhanced user experience through error handling and iterative debugging",
                ],
                tags: ["Python", "OOP"],
                href: "https://github.com/ben-nguyen04",
              },
            ].map((project, i) => (
              <Reveal key={project.title} delay={i * 100}>
                <div className="flex flex-col h-full bg-[#0a0e1a] border border-[#1e2d40] rounded-lg p-6 gap-3 hover:border-[#64ffda] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h3 className="text-base font-semibold text-[#e6f1ff]">{project.title}</h3>
                    <span className="font-mono text-xs text-[#64ffda]">{project.date}</span>
                  </div>
                  <p className="font-mono text-xs text-[#64ffda]">{project.sub}</p>
                  <ul className="list-disc pl-4 text-sm text-[#8892b0] space-y-1.5 flex-1">
                    {project.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => <Tag key={t} small>{t}</Tag>)}
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-xs text-[#64ffda] hover:tracking-wide transition-all"
                    >
                      <ExternalLink size={12} /> GitHub
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ─────────────────────────────────────────────────────── */}
      <section id="education" className="py-24 bg-[#0a0e1a]">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>Education</SectionTitle>
          <Reveal>
            <div className="border border-[#1e2d40] rounded-lg overflow-hidden">
              <div className="bg-[#111827] px-6 py-5 flex flex-wrap justify-between gap-4 border-b border-[#1e2d40]">
                <div>
                  <h3 className="text-lg font-semibold text-[#e6f1ff] mb-0.5">Arizona State University</h3>
                  <p className="text-sm text-[#8892b0]">B.S. Engineering · Computer Systems Engineering</p>
                  <p className="text-sm mt-0.5">
                    GPA: <span className="text-[#64ffda]">3.56</span>
                  </p>
                </div>
                <span className="font-mono text-xs text-[#64ffda] self-start">Expected May 2027</span>
              </div>
              <div className="px-6 py-5 space-y-5">
                <div>
                  <h4 className="font-mono text-xs text-[#64ffda] uppercase tracking-widest mb-2">Relevant Coursework</h4>
                  <p className="text-sm text-[#8892b0]">
                    Principles of Programming · OOP &amp; Data Structures · Digital Design · C/C++ &amp; Linux/Unix · Discrete Math · Linear Algebra · Software Engineering · Circuits
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-[#64ffda] uppercase tracking-widest mb-2">Honors</h4>
                  <ul className="list-disc pl-4 text-sm text-[#8892b0] space-y-1">
                    <li>Ira A. Fulton School of Engineering Dean&apos;s List (Spring 2024 – Present)</li>
                    <li>New American University Scholarship — Provost Award (Fall 2023)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-[#64ffda] uppercase tracking-widest mb-2">Activities</h4>
                  <ul className="list-disc pl-4 text-sm text-[#8892b0] space-y-1">
                    <li><strong className="text-[#ccd6f6]">ASU PowerLifting Club</strong> — Peer coaching for 20+ members (Oct 2023 – Present)</li>
                    <li><strong className="text-[#ccd6f6]">Vietnamese Student Association (VSA)</strong> — Organized 5+ events raising $1,000+ (Oct 2023 – Present)</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-[#111827]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionTitle>Get In Touch</SectionTitle>
          <Reveal>
            <p className="text-[#8892b0] max-w-md mx-auto mb-10">
              I&apos;m currently open to new opportunities. Whether you have a question or just want to connect — feel free to reach out!
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-col items-center gap-4">
              <a
                href="mailto:ben.nguyennnnn@gmail.com"
                className="flex items-center gap-3 text-[#8892b0] hover:text-[#64ffda] transition-colors"
              >
                <span className="flex items-center justify-center w-9 h-9 border border-[#1e2d40] rounded-md hover:border-[#64ffda] transition-colors">
                  <Mail size={15} />
                </span>
                ben.nguyennnnn@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/ben-nguyen04/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#8892b0] hover:text-[#64ffda] transition-colors"
              >
                <span className="flex items-center justify-center w-9 h-9 border border-[#1e2d40] rounded-md hover:border-[#64ffda] transition-colors">
                  <Linkedin size={15} />
                </span>
                linkedin.com/in/ben-nguyen04
              </a>
              <a
                href="https://github.com/ben-nguyen04"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#8892b0] hover:text-[#64ffda] transition-colors"
              >
                <span className="flex items-center justify-center w-9 h-9 border border-[#1e2d40] rounded-md hover:border-[#64ffda] transition-colors">
                  <Github size={15} />
                </span>
                github.com/ben-nguyen04
              </a>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <a
              href="/Ben_Resume_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 bg-[#64ffda] text-[#0a0e1a] font-semibold px-6 py-3 rounded-lg hover:bg-[#4de8c4] transition-colors"
            >
              <FileText size={16} />
              View Resume
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="text-center py-6 border-t border-[#1e2d40] font-mono text-xs text-[#8892b0]">
        Designed &amp; Built by <span className="text-[#64ffda]">Benjamin Nguyen</span> · 2025
      </footer>
    </>
  );
}
