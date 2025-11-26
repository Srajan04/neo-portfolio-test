import React, { useState, useEffect, useRef, useId } from 'react';
import Lenis from 'lenis';
import { 
  Terminal, 
  Code, 
  Save, 
  Coffee, 
  Github, 
  Linkedin, 
  Layout, 
  Box, 
  Briefcase, 
  ExternalLink, 
  X, 
  ArrowRight, 
  Mail
} from 'lucide-react';

// --- CUSTOM ICONS (To prevent import errors) ---

const BrainIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
);

const DatabaseIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
);

const ServerIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
);

const CloudIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19"/><path d="M17.5 19h-11A3.5 3.5 0 0 1 3 15.5c0-1.598 1.066-2.953 2.5-3.332A6.503 6.503 0 0 1 12 6c3.14 0 5.76 2.24 6.33 5.222 2.055.42 3.67 2.132 3.67 4.278A4.5 4.5 0 0 1 17.5 19z"/></svg>
);

const BotIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);

// --- CONFIGURATION & DATA ---

const COLORS = {
  primary: "#FFD90F",    // Yellow
  secondary: "#8FD0F5",  // Blue
  accent1: "#F9A8D4",    // Pink
  accent2: "#bbf7d0",    // Light Green
  white: "#ffffff",
  black: "#000000"
};

const PERSONAL_INFO = {
  name: "Srajan Solanki",
  role: "AI & Full Stack Engineer",
  location: "Mumbai, India",
  linkedin: "https://www.linkedin.com/in/srajan-solanki-08s10s666/",
  github: "https://github.com/Srajan04",
  email: "srajansolanki04@gmail.com",
  about: [
    "Dual-degree student in Artificial Intelligence, pursuing an MBA to translate deep technical expertise into business leadership.",
    "Specialized knowledge in Generative AI and LLMs, with hands-on experience building full-stack and mobile AI applications.",
    "Seeking to bridge the gap between pioneering AI technology and viable product strategy."
  ]
};

const SKILLS = {
  languages: [
    { name: "Java", icon: <Coffee size={16} /> },
    { name: "Python", icon: <Code size={16} /> },
    { name: "C++", icon: <Code size={16} /> },
    { name: "SQL", icon: <DatabaseIcon size={16} /> },
  ],
  frameworks: [
    { name: "SpringBoot", icon: <ServerIcon size={16} /> },
    { name: "FastAPI", icon: <Layout size={16} /> },
    { name: "TensorFlow", icon: <BrainIcon size={16} /> },
    { name: "React", icon: <Layout size={16} /> },
  ],
  tools: [
    { name: "AWS / GCP", icon: <CloudIcon size={16} /> },
    { name: "Docker", icon: <Box size={16} /> },
    { name: "Git", icon: <Code size={16} /> },
    { name: "GenAI / LLMs", icon: <BotIcon size={16} /> },
  ]
};

const EXPERIENCE = [
  {
    id: 1,
    role: "AI Product Developer (Intern)",
    company: "CoRover P. Limited",
    period: "May '25 - July '25",
    description: "Led development of 'AskSarkar' smart search and custom speech models for BharatGPT. Re-architected AI pipelines to reduce technical debt.",
    tags: ["GenAI", "NLP", "System Design"]
  },
  {
    id: 2,
    role: "DevOps Engineer (Intern)",
    company: "Prashraya Welfare Foundation",
    period: "May '23 - June '23",
    description: "Streamlined admission process for 900+ students via efficient data management. Resolved DevOps pipeline issues.",
    tags: ["DevOps", "Data Mgmt"]
  },
  {
    id: 3,
    role: "Full Stack Java Developer",
    company: "Training / Certification",
    period: "Aug '23 - Nov '23",
    description: "Developed dynamic web apps using JSP, Servlets, Spring Boot, and RESTful APIs.",
    tags: ["Java", "Spring Boot"]
  }
];

const PROJECTS = [
  {
    title: "SignEase",
    desc: "AI-powered platform for mastering Indian Sign Language with real-time accuracy analysis.",
    tech: ["AI/ML", "Computer Vision", "Web"]
  },
  {
    title: "PDF Summarization",
    desc: "High-performance transformer model improving summarization accuracy by 70% over baseline.",
    tech: ["Transformers", "NLP", "Python"]
  },
  {
    title: "NFTrade",
    desc: "NFT Marketplace eliminating external wallets like MetaMask for enhanced security.",
    tech: ["Blockchain", "Security", "Web3"]
  }
];

// --- UTILITY COMPONENTS ---

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScroll(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-2 bg-[#FFD90F] z-50 transition-all duration-100 ease-out border-b-2 border-black" style={{ width: `${scroll}%` }} />
  );
};

function GridPattern({ width, height, x, y, squares, strokeDasharray, className, ...props }) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
            stroke="currentColor"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

const RevealOnScroll = ({ children, direction = 'up', delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getTranslate = () => {
    if (!isVisible) {
      if (direction === 'left') return 'translateX(-20px)';
      if (direction === 'right') return 'translateX(20px)';
      if (direction === 'up') return 'translateY(20px)';
    }
    return 'translate(0,0)';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTranslate(),
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const SwipeHighlight = ({ children, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5, rootMargin: "-50px" } 
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <span 
      ref={ref} 
      className="relative inline-block px-1 mx-1 overflow-hidden align-bottom"
      style={{ verticalAlign: 'bottom' }}
    >
      <span 
        className={`absolute top-0 left-0 h-full ${color} transition-all duration-700 ease-out`}
        style={{ width: isVisible ? '100%' : '0%' }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
};

// --- MAIN SECTIONS ---

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400); 
          return 100;
        }
        return prev + 2; 
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFD90F] border-[3px] border-black m-1 md:m-0 overflow-hidden">
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-[5%] md:left-[20%] animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="bg-[#8FD0F5] border-[3px] border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -rotate-12 scale-75 md:scale-100">
          <Code size={32} strokeWidth={2.5} />
        </div>
      </div>

      <div className="absolute top-40 right-[5%] md:right-[20%] animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <div className="bg-[#FFFFFF] border-[3px] border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rotate-12 scale-75 md:scale-100">
          <Terminal size={32} strokeWidth={2.5} />
        </div>
      </div>

      <div className="absolute bottom-32 left-[5%] md:left-[25%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
        <div className="bg-[#bbf7d0] border-[3px] border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -rotate-6 scale-75 md:scale-100">
          <Save size={32} strokeWidth={2.5} />
        </div>
      </div>

      <div className="z-10 flex flex-col items-center gap-6">
        <div className="flex gap-2 text-6xl font-black tracking-tighter font-libre">
          <div className="bg-[#8FD0F5] border-[3px] border-black p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-bounce">S</div>
          <div className="bg-[#F9A8D4] border-[3px] border-black p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-bounce" style={{ animationDelay: '0.1s' }}>S</div>
        </div>
        <div className="w-48 h-6 bg-white border-[3px] border-black relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div 
            className="h-full bg-[#FFD90F] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ toggleTerminal }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  return (
    <nav className={`fixed top-4 left-0 right-0 mx-auto max-w-5xl z-40 bg-[#FFD90F] border-[3px] border-black py-2 px-4 md:px-8 flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-[200%]'}`}>
      <div className="bg-[#8FD0F5] border-[2px] border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-lg font-raleway cursor-pointer hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
        ./S
      </div>
      
      <div className="hidden md:flex gap-6 font-bold font-raleway text-sm uppercase tracking-wide">
        <a href="#home" className="hover:underline decoration-2 underline-offset-4">Home</a>
        <a href="#about" className="hover:underline decoration-2 underline-offset-4">About</a>
        <a href="#journey" className="hover:underline decoration-2 underline-offset-4">Journey</a>
        <a href="#skills" className="hover:underline decoration-2 underline-offset-4">Skills</a>
      </div>

      <div className="flex gap-3">
        <button onClick={toggleTerminal} className="bg-white border-[2px] border-black p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
          <Terminal size={18} />
        </button>
        <button 
          onClick={() => document.getElementById('contact').scrollIntoView()}
          className="bg-[#8FD0F5] border-[2px] border-black px-3 py-1.5 font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all font-raleway uppercase"
        >
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

const TerminalModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Srajan-OS v1.0.0' },
    { type: 'system', content: 'Type "help" for commands.' }
  ]);
  const scrollRef = useRef(null);

  const commands = {
    help: "Try: about, skills, projects, contact, clear, exit",
    about: "Student @ NMIMS | AI & Full Stack Dev",
    skills: "Java, Python, React, AWS, Docker...",
    projects: "SignEase, PDF Summarizer, NFTrade",
    contact: "srajansolanki04@gmail.com",
    clear: "CLEAR_SCREEN",
    exit: "CLOSING_TERMINAL..."
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      const response = commands[cmd] || `Unknown: ${cmd}`;
      
      if (response === "CLEAR_SCREEN") {
        setHistory([]);
      } else if (response === "CLOSING_TERMINAL...") {
        onClose();
        setHistory([]);
      } else {
        setHistory([...history, { type: 'user', content: input }, { type: 'system', content: response }]);
      }
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-mono">
      <div className="w-full max-w-2xl bg-[#1a1b26] border-[3px] border-black shadow-[8px_8px_0px_0px_#000] text-gray-300 rounded-sm overflow-hidden flex flex-col h-[500px]">
        <div className="bg-[#2e3440] p-2 flex justify-between items-center border-b-[2px] border-black">
          <span className="font-bold text-xs pl-2">terminal@srajan</span>
          <button onClick={onClose} className="hover:text-white"><X size={16} /></button>
        </div>
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto text-sm">
          {history.map((line, i) => (
            <div key={i} className={`mb-1 ${line.type === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
              <span className="opacity-50 mr-2">{line.type === 'user' ? '>' : '$'}</span>
              {line.content}
            </div>
          ))}
          <div className="flex items-center text-blue-400">
            <span className="mr-2">{'>'}</span>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none flex-1 focus:ring-0"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PAGE SECTIONS ---

const Hero = () => (
  <section id="home" className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-8 max-w-6xl mx-auto">
    
    <RevealOnScroll direction="left" className="flex-1 max-w-lg space-y-5 relative z-10">
      <div className="inline-block bg-[#8FD0F5] border-[2px] border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold text-sm transform -rotate-2 font-raleway">
        👋 Hello World!
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black leading-tight font-libre text-black">
        I'm {PERSONAL_INFO.name.split(' ')[0]}.
      </h1>
      
      <p className="text-lg font-medium text-gray-800 border-l-[3px] border-black pl-4 font-raleway bg-white/50 backdrop-blur-sm">
        B.Tech. + MBA student specializing in Generative AI, LLMs, and Product Strategy. 
        Based in {PERSONAL_INFO.location}.
      </p>
      
      <div className="flex gap-3 pt-2">
        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer">
           <button className="bg-white border-[2px] border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <Github size={20} />
           </button>
        </a>
        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer">
           <button className="bg-white border-[2px] border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <Linkedin size={20} />
           </button>
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 font-raleway">
        {["GenAI", "Python", "Java", "React", "AWS", "Docker"].map((tech, i) => (
          <div key={i} className="bg-white border-[2px] border-black px-3 py-1 font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
             {tech}
          </div>
        ))}
      </div>
    </RevealOnScroll>

    <RevealOnScroll direction="right" className="flex-1 flex justify-center z-10">
      <div className="relative w-full max-w-[21rem] aspect-square md:w-[26rem] md:h-[26rem]">
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 bg-[#F9A8D4] border-[2px] border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-bounce z-20">
          <BrainIcon size={24} />
        </div>
        <div className="absolute -bottom-2 -left-6 bg-[#FFD90F] border-[2px] border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-20 font-bold text-xs font-raleway">
          Full Stack
        </div>
        
        {/* Image Frame */}
        <div className="w-full h-full bg-[#8FD0F5] border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <img 
            src="/some-dp-far-bg-moustache.png" 
            alt="Srajan" 
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(0%) contrast(1.3)' }} 
          />
        </div>
      </div>
    </RevealOnScroll>
  </section>
);

const About = () => (
  <section id="about" className="py-20 px-6 border-y-[3px] border-black">
    <div className="max-w-4xl mx-auto">
      <RevealOnScroll>
        <div className="bg-[#FFD90F] inline-block border-[3px] border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-10">
          <h2 className="text-3xl font-black uppercase font-libre">About Me</h2>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-lg leading-relaxed font-medium font-raleway relative">
          <p className="mb-6">
            Highly experienced and dynamic software engineer with a rich professional background. 
            Throughout my career, I've held positions in <SwipeHighlight color="bg-[#FFD90F]">renowned tech companies</SwipeHighlight>.
          </p>
          <p className="mb-6">
             My contributions have been pivotal in designing and constructing 
             <SwipeHighlight color="bg-[#8FD0F5]">microservices for distributed systems</SwipeHighlight>, 
             implementing data pipelines on Google Cloud, and engaging in 
             <SwipeHighlight color="bg-[#F9A8D4]">full-stack development</SwipeHighlight>.
          </p>
          
          <div className="mt-8 pt-6 border-t-[3px] border-black grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
            <div>
                <h3 className="font-black text-xl mb-2 font-libre">Education</h3>
                <div className="bg-gray-50 border-[2px] border-black p-3">
                    <div className="font-bold">MBA Tech. (AI)</div>
                    <div className="text-sm font-mono text-gray-600">MPSTME, NMIMS (2022-2027)</div>
                    <div className="mt-2 text-xs bg-[#bbf7d0] inline-block px-2 py-0.5 border border-black font-bold">CGPA: 3.60/4</div>
                </div>
            </div>
            <div>
                <h3 className="font-black text-xl mb-2 font-libre">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                    {["HarvardX CS50", "IBM AI", "AWS Cloud", "Python Bootcamp"].map(c => (
                        <span key={c} className="text-xs font-bold border border-black px-2 py-1 bg-white hover:bg-black hover:text-white transition-colors">{c}</span>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

const Journey = () => (
  <section id="journey" className="py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <RevealOnScroll>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black bg-white inline-block px-8 py-3 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-libre">
            EXPERIENCE
          </h2>
        </div>
      </RevealOnScroll>

      <div className="relative px-2">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-black transform md:-translate-x-1/2 hidden md:block border-l-2 border-black border-dashed"></div>
        
        <div className="flex flex-col gap-10">
          {EXPERIENCE.map((exp, index) => (
            <RevealOnScroll key={exp.id} direction={index % 2 === 0 ? 'left' : 'right'}>
              <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} gap-6`}>
                
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#FFD90F] border-[2px] border-black rounded-full transform md:-translate-x-1/2 z-10 hidden md:block shadow-sm"></div>

                <div className="w-full md:w-[45%] bg-white border-[3px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group relative">
                  <div className={`absolute top-0 left-0 w-full h-2 border-b-[3px] border-black ${index % 2 === 0 ? 'bg-[#8FD0F5]' : 'bg-[#F9A8D4]'}`}></div>
                  
                  <div className="mt-3 flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-black font-libre leading-tight">{exp.role}</h3>
                      <div className="flex items-center gap-2 font-bold text-sm text-gray-600 mt-1 font-raleway">
                        <Briefcase size={14} /> {exp.company}
                      </div>
                    </div>
                    <div className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold whitespace-nowrap">
                      {exp.period}
                    </div>
                  </div>
                  
                  <p className="font-medium text-sm mb-3 font-raleway">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold border border-black px-1.5 py-0.5 bg-gray-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const SkillCard = ({ title, skills, color }) => (
  <div className="bg-white border-[3px] border-black h-full shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
    <div className={`h-10 border-b-[3px] border-black flex items-center px-4 font-black text-lg uppercase ${color} font-libre`}>
      {title}
    </div>
    <div className="p-4 grid grid-cols-2 gap-3">
      {skills.map((skill, i) => (
        <div key={i} className="flex items-center gap-2 font-bold text-sm border-[2px] border-black p-2 bg-white hover:bg-gray-50 transition-colors font-raleway">
          {skill.icon}
          <span>{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const SkillsAndProjects = () => (
  <section id="skills" className="py-20 px-6 border-t-[3px] border-black">
    <div className="max-w-5xl mx-auto">
      <RevealOnScroll>
        <h2 className="text-3xl font-black mb-10 inline-block bg-[#F9A8D4] border-[3px] border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-libre uppercase">
          Skills & Projects
        </h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <RevealOnScroll delay={50}>
          <SkillCard title="Languages" skills={SKILLS.languages} color="bg-[#8FD0F5]" />
        </RevealOnScroll>
        <RevealOnScroll delay={100}>
          <SkillCard title="Frameworks" skills={SKILLS.frameworks} color="bg-[#FFD90F]" />
        </RevealOnScroll>
        <RevealOnScroll delay={150}>
          <SkillCard title="Tools" skills={SKILLS.tools} color="bg-[#F9A8D4]" />
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((proj, i) => (
               <RevealOnScroll key={i} delay={i * 100}>
                   <div className="bg-white border-[3px] border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col group hover:-translate-y-1 transition-transform relative overflow-hidden">
                        {/* Decoration */}
                        <div className="absolute -right-6 -top-6 w-12 h-12 bg-black rotate-45"></div>

                        <div className="flex justify-between items-start mb-3">
                             <h3 className="font-black text-lg bg-black text-white px-2 py-0.5 font-libre">{proj.title}</h3>
                             <ExternalLink size={18} className="text-black" />
                        </div>
                        <p className="font-medium text-sm flex-grow mb-4 font-raleway leading-snug">{proj.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                            {proj.tech.map(t => (
                                <span key={t} className="text-[10px] font-bold border border-black px-1.5 bg-gray-100 uppercase">{t}</span>
                            ))}
                        </div>
                   </div>
               </RevealOnScroll>
          ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 px-6 border-t-[3px] border-black bg-[#FFD90F] relative overflow-hidden">
    {/* Background Pattern Overlay */}
    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

    <div className="max-w-3xl mx-auto text-center relative z-10">
      <RevealOnScroll>
        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-libre leading-none">
            LET'S BUILD<br/>SOMETHING COOL.
          </h2>
          <p className="text-lg font-bold mb-8 text-gray-800 font-raleway max-w-xl mx-auto">
            Open for roles in AI/ML, Full Stack Development, or Product Strategy.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
             <a 
               href={`mailto:${PERSONAL_INFO.email}`}
               className="flex items-center gap-2 bg-black text-white px-6 py-3 font-bold border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors"
             >
               <Mail size={20} /> Email Me
             </a>
             <a 
               href={PERSONAL_INFO.linkedin}
               target="_blank"
               rel="noreferrer"
               className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold border-2 border-black hover:bg-[#8FD0F5] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
             >
               <Linkedin size={20} /> LinkedIn
             </a>
          </div>
        </div>
      </RevealOnScroll>

      <div className="flex flex-col md:flex-row justify-between items-center font-black text-xs font-mono border-t-2 border-black pt-6 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <div>© 2025 SRAJAN SOLANKI</div>
            <div className="hidden md:block text-gray-500">/</div>
            <div>INSPIRED BY MARJO BALLABANI</div>
        </div>
        <div className="flex gap-4">
           <a href={PERSONAL_INFO.github} className="hover:underline">GITHUB</a>
           <a href="#" className="hover:underline">TWITTER</a>
        </div>
      </div>
    </div>
  </section>
);

// --- APP COMPONENT ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#FFD90F] selection:text-black font-sans overflow-x-hidden relative">
      <ScrollProgress />
      
      {/* GRID PATTERN BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)' }}>
        <GridPattern 
          width={20} 
          height={20} 
          className="text-gray-300/50" 
        />
      </div>
      
      {/* SVG Filters */}
      <svg className="hidden">
        <filter id="vectorize">
          <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
          <feComponentTransfer>
             <feFuncR type="discrete" tableValues="0 1" />
             <feFuncG type="discrete" tableValues="0 1" />
             <feFuncB type="discrete" tableValues="0 1" />
          </feComponentTransfer>
        </filter>
      </svg>
      
      <Navbar toggleTerminal={() => setIsTerminalOpen(true)} />
      
      <div className="w-full mx-auto mt-28">
        <main>
          <Hero />
          <About />
          <Journey />
          <SkillsAndProjects />
          <Contact />
        </main>
      </div>

      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors md:hidden"
      >
        <Terminal size={24} />
      </button>

      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  );
}
