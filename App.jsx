import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Environment, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { Github, Mail, MapPin, ExternalLink, Menu, X, Linkedin } from "lucide-react";

// ----------------------
// Site Data (edit here)
// ----------------------
const PROFILE = {
  name: "Diya Rathor",
  title: "Software Developer | CSE Undergrad",
  location: "Khurpatal, Nainital, Uttarakhand",
  email: "kritidiya357@gmail.com",
  github: "https://github.com/diyarathor3112",
  leetcode: "https://leetcode.com/u/Diya_rathor/",
  about:
    "B.Tech CSE student (Graphic Era Hill University, GPA 9.02) passionate about full‑stack development, interactive 3D web, and applied AI. I love turning ideas into polished, performant experiences.",
};



const EDUCATION = [
  {
    school: "Graphic Era Hill University",
    span: "Jul 2022 – Jul 2026",
    details: "B.Tech in Computer Science | GPA: 9.02",
  },
  {
    school: "Mohan Lal Sah Bal Vidya Mandir",
    span: "Mar 2021 – Mar 2022",
    details: "Intermediate: 87%",
  },
  {
    school: "Mohan Lal Sah Bal Vidya Mandir",
    span: "Mar 2019 – Mar 2020",
    details: "Matriculation: 80.16%",
  },
];

const PROJECTS = [
  {
    name: "Portfolio Website",
    tech: ["React", "HTML/CSS/JS", "Node.js"],
    date: "Jul 2025",
    points: [
      "Responsive personal portfolio with smooth UX and animations.",
      "Node.js backend for contact form; deployed on Vercel.",
      "Showcases 5+ projects and 20+ skills.",
    ],
    link: "https://github.com/diyarathor3112",
  },
  {
    name: "Natural Language Processor (NL2C)",
    tech: ["Python", "Django", "Regex", "Flask"],
    date: "Feb 2025",
    points: [
      "Converts English sentences into mediatory code and output.",
      "Regex rules to extract intent and train model types.",
      "Solved 20+ sentence patterns with legitimate Python outputs.",
    ],
    link: "#",
  },
  {
    name: "To‑Do List",
    tech: ["React", "MongoDB", "Express", "EJS"],
    date: "Jul 2024",
    points: [
      "Responsive UI, local server deployment for testing.",
      "Full CRUD backed by MongoDB.",
      "Optimized readability with ~90% content visibility.",
    ],
    link: "#",
  },
];

const SKILLS = {
  languages: ["Python", "Java", "C/C++", "HTML", "CSS", "JavaScript"],
  frameworks: ["React", "Express", "Linux", "GCP", "AWS"],
  ml: ["NumPy", "Matplotlib", "Seaborn", "Pandas"],
  db: ["MongoDB", "MySQL", "PostgreSQL"],
};

const COURSEWORK = [
  "Prompt Engineering (AWS Skill Builder)",
  "Google Cloud Computing (IIT Kharagpur, NPTEL)",
  "Artificial Intelligence (Udemy)",
  "Data Structures, OOP, Algorithms, OS, CN, AI, Cryptography",
];

const LEADERSHIP = [
  "HackOn With Amazon S4 – Participant",
  "Placement Committee Head – University resume screening & registrations",
  "Art & Craft Club Leader – Team‑led sculpture of Gautama Buddha",
  "Top 15 Performer (2022–23) with GPA 8.86",
  "School Head Girl – led school initiatives",
  "Award‑Winning Speaker – 10+ awards in public speaking & debates",
];

// ----------------------
// 3D Scene
// ----------------------
function TwistingTorus({ speed = 0.4, color = "#6ee7b7" }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = t * speed;
      mesh.current.rotation.y = t * speed * 1.2;
      mesh.current.position.y = Math.sin(t * 0.8) * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={mesh} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 180, 16]} />
        <meshStandardMaterial metalness={0.5} roughness={0.2} color={color} />
      </mesh>
    </Float>
  );
}

function Bubble({ seed = 0 }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + seed;
    if (mesh.current) {
      mesh.current.position.x = Math.sin(t * 0.6) * 3;
      mesh.current.position.y = Math.cos(t * 0.4) * 1.2 + 0.2;
      mesh.current.position.z = Math.cos(t * 0.3) * 2;
    }
  });
  return (
    <Float>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.25, 1]} />
        <meshStandardMaterial transparent opacity={0.6} roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function ThreeHero() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 6, 4]} intensity={1.1} castShadow />
        <TwistingTorus />
        {[...Array(8)].map((_, i) => (
          <Bubble key={i} seed={i * 1.23} />
        ))}
        <Stars radius={50} depth={40} count={1200} factor={2} saturation={0} fade />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}

// ----------------------
// UI Helpers
// ----------------------
const Section = ({ id, title, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>
    <div className="max-w-6xl mx-auto px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-semibold tracking-tight mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {children}
    </div>
  </section>
);

const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-2xl border px-3 py-1 text-sm">
    {children}
  </span>
);

function useScrollLock(open) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
}

// ----------------------
// Main App
// ----------------------
export default function PortfolioApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollLock(menuOpen);

  const nav = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "leadership", label: "Leadership" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen text-neutral-100 bg-neutral-950 selection:bg-emerald-300 selection:text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-bold text-lg">{PROFILE.name}</a>

          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm hover:text-emerald-300 transition">
                {n.label}
              </a>
            ))}
            <a
              href={PROFILE.github}
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-1 text-sm hover:bg-white/5"
              target="_blank" rel="noreferrer"
            >
              <Github size={16} /> GitHub
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl border border-white/10"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Sheet */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="max-w-6xl mx-auto px-4 py-4 grid gap-3">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="text-base py-2 border-b border-white/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {n.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-3 py-1">
                  <Github size={16} /> GitHub
                </a>
                <a href={PROFILE.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-3 py-1">
                  <ExternalLink size={16} /> LeetCode
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
      

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <ThreeHero />
        <div className="max-w-6xl mx-auto px-4 h-[78svh] md:h-[86svh] flex items-center">
          <div className="grid gap-6 md:gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Hi, I'm <span className="text-emerald-300">{PROFILE.name}</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-lg md:text-xl text-neutral-300 max-w-2xl"
            >
              {PROFILE.title} — {PROFILE.about}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:bg-white/5"
              >
                <Mail size={18} /> Contact Me
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:bg-white/5"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href={PROFILE.leetcode}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:bg-white/5"
              >
                <ExternalLink size={18} /> LeetCode
              </a>
            </motion.div>

            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <MapPin size={16} /> {PROFILE.location}
            </div>
          </div>
        </div>
      </section>


      {/* PROJECTS */}
      <Section id="projects" title="Featured Projects">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, idx) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 hover:bg-white/20 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <span className="text-xs text-neutral-400">{p.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <ul className="list-disc pl-5 text-neutral-200 mt-3 space-y-1">
                {p.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-1 text-sm hover:bg-white/5"
                >
                  <ExternalLink size={16} /> View
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 p-5 bg-white/5">
            <h4 className="font-semibold mb-3">Programming Languages</h4>
            <div className="flex flex-wrap gap-2">{SKILLS.languages.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 bg-white/5">
            <h4 className="font-semibold mb-3">Frameworks & Platforms</h4>
            <div className="flex flex-wrap gap-2">{SKILLS.frameworks.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 bg-white/5">
            <h4 className="font-semibold mb-3">ML / Data</h4>
            <div className="flex flex-wrap gap-2">{SKILLS.ml.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 bg-white/5">
            <h4 className="font-semibold mb-3">Databases</h4>
            <div className="flex flex-wrap gap-2">{SKILLS.db.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          </div>
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Education">
        <div className="grid gap-4">
          {EDUCATION.map((e) => (
            <div key={e.school} className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold">{e.school}</h4>
                <p className="text-sm text-neutral-300">{e.details}</p>
              </div>
              <span className="text-xs text-neutral-400 whitespace-nowrap">{e.span}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* LEADERSHIP & ACHIEVEMENTS */}
      <Section id="leadership" title="Leadership & Achievements">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <ul className="grid gap-2 text-neutral-200 list-disc pl-5">
            {LEADERSHIP.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* COURSEWORK */}
      <Section id="coursework" title="Coursework & Certifications" className="pt-0">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <ul className="grid gap-2 text-neutral-200 list-disc pl-5">
            {COURSEWORK.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Get In Touch">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold mb-2">Let's build something.</h4>
            <p className="text-neutral-300 mb-4">
              I'm open to internships, freelance work, and collaborations.
            </p>
            <div className="grid gap-2">
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-white/5 w-fit">
                <Mail size={16} /> {PROFILE.email}
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-white/5 w-fit">
                <Github size={16} /> GitHub
              </a>
              <a href={PROFILE.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-white/5 w-fit">
                <ExternalLink size={16} /> LeetCode
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const subject = encodeURIComponent("Inquiry from Portfolio Site");
                const name = data.get("name");
                const body = encodeURIComponent(`Hi Diya,%0D%0A%0D%0AI'm ${name}. ${data.get("message")} %0D%0A%0D%0ARegards,%0D%0A${name} (${data.get("email")})`);
                window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
                e.currentTarget.reset();
              }}
              className="grid gap-3"
            >
              <label className="grid gap-1">
                <span className="text-sm text-neutral-300">Your Name</span>
                <input name="name" required className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400" />
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-neutral-300">Email</span>
                <input type="email" name="email" required className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400" />
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-neutral-300">Message</span>
                <textarea name="message" required rows={5} className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400" />
              </label>
              <button type="submit" className="inline-flex justify-center rounded-2xl border px-4 py-2 hover:bg-white/5">Send</button>
            </form>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-neutral-400">
          <span>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-emerald-300"><Github size={16} /></a>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-emerald-300"><Mail size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ----------------------
// Tailwind base styles for preview (safe defaults)
// ----------------------
const style = document.createElement("style");
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  :root { color-scheme: dark; }
  html { scroll-behavior: smooth; }
  body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; }
`;
if (typeof document !== 'undefined') document.head.appendChild(style);
