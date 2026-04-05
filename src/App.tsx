import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Mail, 
  ExternalLink, 
  Instagram,
  ChevronRight, 
  MapPin,
  X,
  Send,
  MessageSquare,
  User,
  Briefcase,
  GraduationCap,
  Database,
  Code,
  Cpu,
  Network,
  Globe,
  Shield,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";

const PROJECTS = [
  {
    title: "3x3 UWIKA Sports Day",
    description: "Berpartisipasi dalam kompetisi bola basket 3x3 tingkat universitas, menunjukkan kerja sama tim dan sportivitas yang tinggi.",
    tags: ["Basketball", "Competition", "University"],
    link: "#",
    image: "https://picsum.photos/seed/uwika/600/400"
  },
  {
    title: "FEAST 2024 (BEM FISIP UNAIR)",
    description: "Berpartisipasi dalam kegiatan FEAST yang diselenggarakan oleh BEM FISIP Universitas Airlangga, berkontribusi dalam pengembangan organisasi dan kemahasiswaan.",
    tags: ["FISIP", "Organization", "FEAST"],
    link: "#",
    image: "https://picsum.photos/seed/feast/600/400"
  },
  {
    title: "UPH X SAMATOR 3x3",
    description: "Berhasil meraih Juara 2 dalam kompetisi bola basket 3x3 bergengsi yang menguji strategi dan ketahanan fisik.",
    tags: ["Basketball", "Competition", "Runner Up"],
    link: "#",
    image: "https://picsum.photos/seed/uph-samator/600/400"
  },
  {
    title: "Kejuaraan Taekwondo Piala Walikota",
    description: "Kejuaraan taekwondo tingkat kota yang mengedepankan disiplin dan semangat juang.",
    tags: ["Taekwondo", "Championship", "Martial Arts"],
    link: "#",
    image: "https://picsum.photos/seed/taekwondo1/600/400"
  },
  {
    title: "Kejuaraan Taekwondo Piala KONI",
    description: "Turnamen taekwondo daerah yang diikuti oleh atlet-atlet berbakat dari berbagai klub.",
    tags: ["Taekwondo", "KONI", "Tournament"],
    link: "#",
    image: "https://picsum.photos/seed/taekwondo2/600/400"
  },
  {
    title: "OlimpIT ARA 7.0 (ITS)",
    description: "Berpartisipasi dalam kompetisi teknologi informasi bergengsi yang diselenggarakan oleh Institut Teknologi Sepuluh Nopember (ITS).",
    tags: ["Informatics", "Competition", "ITS"],
    link: "#",
    image: "https://picsum.photos/seed/ara/600/400"
  }
];

const SOCIALS = [
  { icon: <Github className="w-5 h-5" />, href: "https://github.com/Lovelyscode27", label: "GitHub" },
  { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/jejeee_35", label: "Instagram" },
  { icon: <Mail className="w-5 h-5" />, href: "mailto:jessicalovely141@gmail.com", label: "Email" }
];

function Counter({ from, to, duration, delay }: { from: number; to: number; duration: number; delay: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = from;
      const end = to;
      const totalSteps = 100;
      const stepDuration = (duration * 1000) / totalSteps;
      
      const timer = setInterval(() => {
        start += (end - from) / totalSteps;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [from, to, duration, delay]);

  return <>{count}</>;
}

function TypingText({ 
  text, 
  className, 
  delay = 0, 
  speed = 100, 
  showCursor = true,
  loop = false,
  eraseSpeed = 50,
  pauseDuration = 2000
}: { 
  text: string | string[]; 
  className?: string; 
  delay?: number; 
  speed?: number; 
  showCursor?: boolean;
  loop?: boolean;
  eraseSpeed?: number;
  pauseDuration?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const texts = Array.isArray(text) ? text : [text];
  const currentText = texts[currentIndex];

  useEffect(() => {
    if (!isStarted) return;

    let timeoutId: any;
    let intervalId: any;

    const startTyping = () => {
      let i = 0;
      intervalId = setInterval(() => {
        setDisplayText(currentText.slice(0, i + 1));
        i++;
        if (i >= currentText.length) {
          clearInterval(intervalId);
          if (loop || texts.length > 1) {
            timeoutId = setTimeout(startErasing, pauseDuration);
          }
        }
      }, speed);
    };

    const startErasing = () => {
      let i = currentText.length;
      intervalId = setInterval(() => {
        setDisplayText(currentText.slice(0, i - 1));
        i--;
        if (i <= 0) {
          clearInterval(intervalId);
          if (texts.length > 1) {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
          timeoutId = setTimeout(startTyping, 500);
        }
      }, eraseSpeed);
    };

    timeoutId = setTimeout(startTyping, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [currentText, isStarted, delay, speed, loop, eraseSpeed, pauseDuration, texts.length]);

  return (
    <motion.div 
      className={`${className} flex items-center min-h-[1.2em]`}
      onViewportEnter={() => setIsStarted(true)}
      viewport={{ once: true }}
    >
      <span>
        {displayText.split("").map((char, index) => {
          // Special handling for "Me" in "Pieces of Me"
          if (currentText === "Pieces of Me" && index >= currentText.indexOf("Me")) {
            return <span key={index} className="text-sky-500">{char}</span>;
          }
          return <span key={index}>{char}</span>;
        })}
      </span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
          className="inline-block w-[2px] h-[0.8em] bg-sky-500 ml-1"
        />
      )}
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comments, setComments] = useState<{ id: number; name: string; text: string; date: string }[]>([
    { id: 1, name: "Budi Santoso", text: "Portofolionya keren banget! Desainnya sangat modern.", date: "1 April 2026" },
    { id: 2, name: "Siti Aminah", text: "Sangat inspiratif, sukses terus ya!", date: "1 April 2026" }
  ]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    const generatedStars = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 10,
      duration: Math.random() * 4 + 3,
    }));
    setStars(generatedStars);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 selection:bg-sky-500/30 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              filter: "blur(40px)",
              transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] overflow-hidden"
          >
            {/* Gacor Background: Particles & Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Floating Particles */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: Math.random() * 100 + "%",
                    opacity: 0 
                  }}
                  animate={{ 
                    y: ["0%", "-30%", "0%"],
                    opacity: [0, 0.4, 0],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 6, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                  }}
                  className={`absolute w-1 h-1 rounded-full blur-[1px] ${
                    i % 3 === 0 ? "bg-sky-400" : i % 3 === 1 ? "bg-purple-400" : "bg-teal-400"
                  }`}
                />
              ))}

              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                  rotate: [0, 120, 240, 360]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2)_0%,transparent_70%)]"
              />
              
              <motion.div
                animate={{ 
                  x: ["-10%", "10%", "-10%"],
                  y: ["-10%", "10%", "-10%"],
                  opacity: [0.15, 0.3, 0.15]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(192,38,211,0.15)_0%,transparent_50%)]"
              />

              <motion.div
                animate={{ 
                  x: ["10%", "-10%", "10%"],
                  y: ["10%", "-10%", "10%"],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(45,212,191,0.15)_0%,transparent_50%)]"
              />
            </div>

            <div className="relative z-10 w-full max-w-2xl px-10">
              <div className="flex flex-col items-center">
                {/* Top Label with Glow */}
                <div className="overflow-hidden mb-6">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="text-sky-400 font-mono text-[10px] md:text-xs tracking-[0.8em] uppercase drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                  >
                    System Online • 2026
                  </motion.p>
                </div>

                {/* Main Text Reveal with Light Sweep */}
                <div className="relative py-4 flex flex-col items-center">
                  <div className="overflow-hidden">
                    <motion.h1
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight text-center"
                    >
                      Welcome to my
                    </motion.h1>
                  </div>
                  
                  <div className="overflow-hidden mt-2 relative group">
                    <motion.h1
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-sky-300 to-indigo-400 tracking-tighter text-center relative z-10"
                    >
                      Portfolio
                    </motion.h1>
                    
                    {/* Gacor Light Sweep */}
                    <motion.div
                      initial={{ left: "-150%" }}
                      animate={{ left: "150%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                      className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-20 pointer-events-none"
                    />
                    
                    {/* Text Glow Background */}
                    <motion.div
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-sky-500/20 blur-[40px] -z-10"
                    />
                  </div>

                  {/* Dynamic Separator Line */}
                  <div className="relative w-full mt-8">
                    <motion.div 
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 1.2, ease: "circOut" }}
                      className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                    />
                    <motion.div
                      animate={{ left: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 w-8 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_#38bdf8]"
                    />
                  </div>
                </div>

                {/* Percentage Counter with Gacor Style */}
                <div className="mt-12 flex flex-col items-center gap-4">
                  <div className="flex items-baseline gap-2">
                    <motion.span 
                      className="text-sky-400 font-mono text-3xl md:text-5xl font-bold drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      <Counter from={0} to={100} duration={3} delay={1.5} />
                    </motion.span>
                    <span className="text-white/30 font-mono text-lg">%</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <motion.div 
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
                      className="w-32 h-[2px] bg-white/10 relative overflow-hidden rounded-full"
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-indigo-500" />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ duration: 1, delay: 3.5 }}
                      className="text-indigo-400 font-mono tracking-[0.4em] text-[8px] uppercase"
                    >
                      Optimizing
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scanline Overlay for extra Gacor */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Twinkling Stars Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            }}
          />
        ))}
      </div>

      {/* Header / Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, -3, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              x: { duration: 0.6 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="text-white font-bold text-xl tracking-tight cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            JSK<span className="text-sky-500">.</span>
          </motion.div>
          <div className="flex gap-6 text-sm font-medium">
            {["Home", "About", "Certificates", "Contact"].map((item, i) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: i * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Pieces of Me Section (Home) */}
        <section id="home" className="mb-32 relative scroll-mt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <TypingText 
                text="Pieces of Me" 
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter"
                speed={150}
                showCursor={false}
              />
              <TypingText 
                text={["Information System Student", "Student Athlete"]} 
                className="text-lg md:text-xl text-slate-400 font-medium mb-10 tracking-wide"
                delay={2}
                loop={true}
              />
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <motion.a
                  href="#certificates"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-sky-500 text-white rounded-2xl font-bold text-base shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all flex items-center gap-2"
                >
                  View Projects <ChevronRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold text-base border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2"
                >
                  Contact Me <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Modern Digital Ecosystem Animation */}
            <div className="hidden lg:block relative h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Background Glow */}
                <div className="absolute w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[100px] animate-pulse" />
                
                {/* Floating Holographic Panels */}
                {[
                  { icon: Database, color: "text-amber-400", x: -120, y: -80, delay: 0, label: "Database" },
                  { icon: Globe, color: "text-sky-400", x: 120, y: -60, delay: 0.2, label: "Network" },
                  { icon: Shield, color: "text-emerald-400", x: -100, y: 100, delay: 0.4, label: "Security" },
                  { icon: Zap, color: "text-rose-400", x: 110, y: 90, delay: 0.6, label: "Performance" }
                ].map((panel, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: panel.y + Math.sin(Date.now() / 1000 + i) * 15,
                      x: panel.x
                    }}
                    transition={{ 
                      duration: 2,
                      delay: panel.delay,
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute group cursor-pointer"
                  >
                    <div className="relative p-4 rounded-2xl bg-slate-900/40 border border-slate-700/50 backdrop-blur-xl shadow-2xl hover:border-sky-500/50 transition-all duration-500 hover:scale-110">
                      <panel.icon className={`w-8 h-8 ${panel.color}`} />
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">{panel.label}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Central Core Sphere */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative w-40 h-40 flex items-center justify-center"
                >
                  {/* Outer Ring */}
                  <div className="absolute inset-0 border-2 border-dashed border-sky-500/30 rounded-full" />
                  
                  {/* Inner Glowing Core */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-[2px] shadow-[0_0_50px_rgba(14,165,233,0.3)]">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden relative">
                      <motion.div 
                        animate={{ y: [0, -100] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent,rgba(14,165,233,0.5),transparent)]"
                      />
                      <Cpu className="w-10 h-10 text-sky-400 relative z-10" />
                    </div>
                  </div>

                  {/* Orbiting Particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-20px]"
                    >
                      <div className="w-2 h-2 bg-sky-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#0ea5e9]" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Connecting Data Streams */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  <defs>
                    <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(14,165,233,0)" />
                      <stop offset="50%" stopColor="rgba(14,165,233,0.5)" />
                      <stop offset="100%" stopColor="rgba(14,165,233,0)" />
                    </linearGradient>
                  </defs>
                  {[
                    { x1: "50%", y1: "50%", x2: "20%", y2: "30%" },
                    { x1: "50%", y1: "50%", x2: "80%", y2: "35%" },
                    { x1: "50%", y1: "50%", x2: "25%", y2: "75%" },
                    { x1: "50%", y1: "50%", x2: "75%", y2: "70%" }
                  ].map((line, i) => (
                    <motion.line
                      key={i}
                      x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                      stroke="url(#streamGrad)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
          
          {/* Decorative line */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent mt-20"
          />
        </section>

        {/* Hero Section */}
        <section id="about" className="mb-24 relative scroll-mt-32">
          {/* Animated background glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -z-10"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -90, 0],
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] -z-10"
          />

          <div className="flex justify-center mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block text-sky-500 font-mono text-2xl md:text-4xl lg:text-5xl font-black tracking-[0.8em] uppercase drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]"
            >
              About Me
            </motion.span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 md:p-16 rounded-[3.5rem] bg-slate-800/20 border border-slate-800/50 backdrop-blur-md relative overflow-hidden group"
          >
            {/* Decorative inner glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <motion.h1 
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tighter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {["Lovely", "Jessica", "K."].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: i * 0.2 + 0.3,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className={`inline-block mr-4 ${i === 2 ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500" : ""}`}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed mx-auto lg:mx-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Saya berfokus pada pengembangan <span className="text-white font-medium">kemampuan fisik dan mental</span> dalam olahraga, serta selalu berupaya memberikan performa terbaik dalam setiap latihan dan pertandingan yang saya jalani.
                </motion.p>

                {/* Apple-Style Space Cat Animation (RunCat/Touch Bar style) */}
                <div className="relative h-16 w-full overflow-hidden mt-4 pointer-events-none">
                  <motion.div
                    className="absolute bottom-0 flex items-center"
                    animate={{ 
                      left: ["-5%", "105%", "-5%"],
                      scaleX: [1, 1, -1, -1, 1]
                    }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      ease: "linear",
                      times: [0, 0.48, 0.52, 0.98, 1]
                    }}
                  >
                    <motion.div 
                      className="relative w-16 h-12 flex items-end"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {/* The Cat Body (SVG) - More Recognizable Cat Shape */}
                      <svg viewBox="0 0 100 60" className="w-16 h-10 relative z-10 drop-shadow-lg">
                        {/* Tail - Long and Wavy */}
                        <motion.path
                          d="M 20 35 Q 0 15 15 5"
                          fill="none"
                          stroke="#94a3b8"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          animate={{ d: ["M 20 35 Q 0 15 15 5", "M 20 35 Q 5 45 0 25", "M 20 35 Q 0 15 15 5"] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        />
                        
                        {/* Legs - Realistic Cat Walking Motion */}
                        {/* Back Leg (Far) */}
                        <motion.path 
                          d="M 35 40 Q 30 45 32 55" 
                          fill="none" 
                          stroke="#94a3b8" 
                          strokeWidth="4" 
                          strokeLinecap="round" 
                          animate={{ d: ["M 35 40 Q 30 45 32 55", "M 35 40 Q 40 45 42 55", "M 35 40 Q 30 45 32 55"] }} 
                          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} 
                        />
                        {/* Front Leg (Far) */}
                        <motion.path 
                          d="M 75 40 Q 70 45 72 55" 
                          fill="none" 
                          stroke="#94a3b8" 
                          strokeWidth="4" 
                          strokeLinecap="round" 
                          animate={{ d: ["M 75 40 Q 70 45 72 55", "M 75 40 Q 80 45 82 55", "M 75 40 Q 70 45 72 55"] }} 
                          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} 
                        />
                        {/* Back Leg (Near) */}
                        <motion.path 
                          d="M 45 40 Q 40 45 42 55" 
                          fill="none" 
                          stroke="#cbd5e1" 
                          strokeWidth="5" 
                          strokeLinecap="round" 
                          animate={{ d: ["M 45 40 Q 40 45 42 55", "M 45 40 Q 35 45 37 55", "M 45 40 Q 40 45 42 55"] }} 
                          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }} 
                        />
                        {/* Front Leg (Near) */}
                        <motion.path 
                          d="M 65 40 Q 60 45 62 55" 
                          fill="none" 
                          stroke="#cbd5e1" 
                          strokeWidth="5" 
                          strokeLinecap="round" 
                          animate={{ d: ["M 65 40 Q 60 45 62 55", "M 65 40 Q 70 45 72 55", "M 65 40 Q 60 45 62 55"] }} 
                          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }} 
                        />
                        
                        {/* Body - Arched Cat Back */}
                        <path d="M 25 45 Q 25 15 55 25 L 85 25 L 85 45 Z" fill="#cbd5e1" />
                        
                        {/* Head */}
                        <circle cx="82" cy="25" r="15" fill="#cbd5e1" />
                        
                        {/* Ears - Pointy and Distinct */}
                        <path d="M 70 15 L 74 -2 L 82 12 Z" fill="#94a3b8" />
                        <path d="M 85 12 L 93 -2 L 97 15 Z" fill="#94a3b8" />
                        
                        {/* Eyes */}
                        <circle cx="77" cy="23" r="2" fill="#1e293b" />
                        <circle cx="87" cy="23" r="2" fill="#1e293b" />
                        
                        {/* Whiskers - Very Cat-like */}
                        <line x1="92" y1="25" x2="105" y2="22" stroke="#94a3b8" strokeWidth="1" />
                        <line x1="92" y1="28" x2="105" y2="28" stroke="#94a3b8" strokeWidth="1" />
                        <line x1="92" y1="31" x2="105" y2="34" stroke="#94a3b8" strokeWidth="1" />
                        
                        <line x1="72" y1="25" x2="59" y2="22" stroke="#94a3b8" strokeWidth="1" />
                        <line x1="72" y1="28" x2="59" y2="28" stroke="#94a3b8" strokeWidth="1" />
                        <line x1="72" y1="31" x2="59" y2="34" stroke="#94a3b8" strokeWidth="1" />

                        {/* Nose & Mouth */}
                        <path d="M 80 28 L 84 28 L 82 30 Z" fill="#f472b6" />
                        <path d="M 80 32 Q 82 35 84 32" fill="none" stroke="#64748b" strokeWidth="1" />
                      </svg>

                      {/* Apple-Style Glass Helmet - Transparent and centered on head */}
                      <div className="absolute top-[-6px] right-[-4px] w-10 h-10 border border-white/40 rounded-full bg-white/5 backdrop-blur-[0.5px] z-20 shadow-[inset_0_0_8px_rgba(255,255,255,0.3),0_0_15px_rgba(14,165,233,0.15)]">
                        {/* High-End Glass Reflection - Subtle and clear */}
                        <div className="absolute top-1.5 left-2.5 w-3 h-1.5 bg-white/30 rounded-full blur-[0.5px] rotate-[-30deg]" />
                        <div className="absolute bottom-2 right-2.5 w-1 h-1 bg-white/20 rounded-full blur-[0.2px]" />
                      </div>

                      {/* Minimalist Jetpack */}
                      <div className="absolute left-6 top-6 w-8 h-6 bg-slate-800/80 rounded-md border border-slate-700/50 z-0">
                        <motion.div
                          animate={{ 
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                            boxShadow: ["0 0 10px rgba(56,189,248,0.2)", "0 0 20px rgba(56,189,248,0.4)", "0 0 10px rgba(56,189,248,0.2)"]
                          }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-sky-400/30 blur-sm rounded-full"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="relative group/profile"
              >
                <div className="absolute inset-0 bg-sky-500/20 rounded-[3rem] blur-2xl group-hover/profile:bg-sky-500/30 transition-colors" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-2 border-slate-700/50 group-hover/profile:border-sky-500/50 transition-colors shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/lovely-jessica/800/800" 
                    alt="Lovely Jessica K." 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/profile:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Floating badge or accent */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Available for Team</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* About / Info Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:col-span-2 p-8 rounded-[2.5rem] bg-slate-800/20 border border-slate-800/50 backdrop-blur-sm hover:border-sky-500/30 transition-colors group"
          >
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              Pengalaman
            </h2>
            <div className="space-y-8">
              {[
                { title: "3x3 UWIKA Sports Day", type: "Basketball", year: "2023", desc: "Berpartisipasi dalam kompetisi bola basket 3x3 tingkat universitas, menunjukkan kerja sama tim dan sportivitas yang tinggi." },
                { title: "FEAST 2024 (BEM FISIP UNAIR)", type: "FISIP", year: "2024", desc: "Berpartisipasi dalam kegiatan FEAST yang diselenggarakan oleh BEM FISIP Universitas Airlangga, berkontribusi dalam pengembangan organisasi dan kemahasiswaan." },
                { title: "UPH X SAMATOR 3x3", type: "Basketball", year: "2024", desc: "Berkompetisi dalam turnamen basket bergengsi, mengasah ketahanan fisik dan strategi permainan di lapangan." },
                { title: "Kejuaraan Taekwondo Piala Walikota", type: "Taekwondo", year: "2025", desc: "Berkompetisi dalam kejuaraan taekwondo tingkat kota, menunjukkan dedikasi dan semangat juang yang tinggi." },
                { title: "Kejuaraan Taekwondo Piala KONI", type: "Taekwondo", year: "2025", desc: "Berpartisipasi dalam kejuaraan taekwondo tingkat daerah, menunjukkan disiplin dan teknik bela diri yang kuat." },
                { title: "OlimpIT ARA 7.0 (ITS)", type: "Informatics", year: "2026", desc: "Berpartisipasi dalam kompetisi teknologi informasi bergengsi yang diselenggarakan oleh Institut Teknologi Sepuluh Nopember (ITS)." }
              ].map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: i * 0.15,
                    ease: "easeOut"
                  }}
                  className="relative pl-8 border-l-2 border-slate-700/50 hover:border-sky-500/50 transition-colors group/item"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-slate-700 group-hover/item:border-sky-500 transition-colors" 
                  />
                  <h3 className="text-white font-bold text-lg group-hover/item:text-sky-400 transition-colors">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-xs font-medium text-sky-500/70 uppercase tracking-widest mb-3">
                    <span>{exp.type}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span>{exp.year}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="p-8 rounded-[2.5rem] bg-slate-800/20 border border-slate-800/50 backdrop-blur-sm flex flex-col justify-between hover:border-sky-500/30 transition-colors group"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                Lokasi
              </h2>
              <div className="space-y-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 group-hover:border-sky-500/30 transition-colors">
                  <img 
                    src="https://picsum.photos/seed/surabaya-map-dark/600/400?grayscale&blur=1" 
                    alt="Surabaya Map" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-40" />
                  
                  {/* Map Pin Overlay */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-sky-500 rounded-full blur-xl animate-pulse opacity-50" />
                      <MapPin className="w-10 h-10 text-sky-500 relative z-10 drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
                    </div>
                  </motion.div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <p className="text-white font-medium">Surabaya, Indonesia</p>
                  <p className="text-xs text-slate-500 mt-1">GMT+7 • Waktu Indonesia Barat</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                Edukasi
              </h2>
              <div className="space-y-6">
                {[
                  { level: "SD", school: "SD Kristen Petra 7" },
                  { level: "SMP", school: "SMP Kristen Petra 2" },
                  { level: "SMA", school: "SMAS Katolik Frateran" }
                ].map((edu, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="group/edu"
                  >
                    <p className="text-xs font-bold text-sky-500/60 uppercase tracking-tighter mb-1 group-hover/edu:text-sky-500 transition-colors">{edu.level}</p>
                    <p className="text-white font-semibold">{edu.school}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="mb-24 overflow-hidden py-10 scroll-mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12 px-6"
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Certificates</h2>
              <div className="h-1 w-20 bg-sky-500 rounded-full" />
            </div>
            <motion.button 
              onClick={() => setIsViewAllOpen(true)}
              whileHover={{ x: 5 }}
              className="text-sky-500 text-sm font-bold hover:text-sky-400 flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Infinite Marquee Container */}
          <div className="relative flex overflow-hidden group/marquee">
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0f172a] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0f172a] to-transparent z-20 pointer-events-none" />

            <div 
              className="flex gap-8 py-4 px-4 animate-marquee will-change-transform group-hover/marquee:[animation-play-state:paused] group-active/marquee:[animation-play-state:paused]"
              style={{ 
                animationPlayState: isMarqueePaused ? "paused" : "running",
                WebkitAnimationPlayState: isMarqueePaused ? "paused" : "running"
              }}
            >
              {/* Double the items for infinite loop */}
              {[...PROJECTS, ...PROJECTS].map((project, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  }}
                  className="w-[300px] md:w-[400px] flex-shrink-0 group relative bg-slate-800/10 rounded-[2rem] p-4 border border-slate-800/50 hover:border-sky-500/50 transition-all duration-200 overflow-hidden cursor-pointer"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-slate-800 shadow-2xl">
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="px-2 pb-2">
                    <div className="flex gap-2 mb-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-sky-500/10 text-[9px] font-black text-sky-500 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 group-hover:text-slate-300 transition-colors">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="text-center py-20 relative scroll-mt-32">
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-10"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50" />
            
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Contact Me
            </motion.h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
              Jika ingin mengetahui lebih lanjut bisa menghubungi. Saya selalu terbuka untuk diskusi dan kolaborasi baru.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {SOCIALS.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 40px -10px rgba(14, 165, 233, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-slate-800/50 text-white px-6 py-4 rounded-2xl font-bold text-base border border-slate-700 hover:border-sky-500/50 hover:bg-slate-800 transition-all shadow-xl"
                >
                  {social.icon}
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Contact & Comments Grid */}
            <div className="mt-16 grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">
              {/* Message Form */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/50 p-8 md:p-10 rounded-[2.5rem] border border-slate-700/50 backdrop-blur-md h-full"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  Send a Message <Send className="w-5 h-5 text-sky-500" />
                </h3>
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-sky-500/10 border border-sky-500/20 p-8 rounded-3xl text-center h-full flex flex-col justify-center"
                  >
                    <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Pesan Terkirim!</h4>
                    <p className="text-slate-400">Terima kasih {formData.name}, saya akan segera menghubungi Anda kembali.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-sky-500 font-bold hover:text-sky-400 transition-colors"
                    >
                      Kirim pesan lain
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      await new Promise(resolve => setTimeout(resolve, 1500));
                      setIsSubmitting(false);
                      setIsSubmitted(true);
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 ml-2 uppercase tracking-wider">NAMA LENGKAP</label>
                        <input 
                          required
                          type="text"
                          placeholder="Masukkan nama Anda"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 ml-2 uppercase tracking-wider">EMAIL</label>
                        <input 
                          required
                          type="email"
                          placeholder="email@contoh.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 ml-2 uppercase tracking-wider">PESAN ANDA</label>
                        <textarea 
                          required
                          rows={4}
                          placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      type="submit"
                      className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
                        isSubmitting ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-900 hover:bg-sky-500 hover:text-white'
                      }`}
                    >
                      {isSubmitting ? (
                        <>Mengirim... <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /></>
                      ) : (
                        <>Kirim Pesan <Send className="w-5 h-5" /></>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>

              {/* Comments Section */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-slate-900/50 p-8 md:p-10 rounded-[2.5rem] border border-slate-700/50 backdrop-blur-md flex flex-col h-full"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  Comments <MessageSquare className="w-5 h-5 text-sky-500" />
                </h3>

                {/* Comment Input */}
                <div className="mb-8 space-y-4">
                  <input 
                    type="text"
                    placeholder="Nama Anda"
                    value={newComment.name}
                    onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                    className="w-full bg-slate-800/30 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 transition-all"
                  />
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Tulis komentar..."
                      value={newComment.text}
                      onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newComment.name && newComment.text) {
                          setComments([{ id: Date.now(), name: newComment.name, text: newComment.text, date: "Baru saja" }, ...comments]);
                          setNewComment({ name: "", text: "" });
                        }
                      }}
                      className="flex-1 bg-slate-800/30 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 transition-all"
                    />
                    <button 
                      onClick={() => {
                        if (newComment.name && newComment.text) {
                          setComments([{ id: Date.now(), name: newComment.name, text: newComment.text, date: "Baru saja" }, ...comments]);
                          setNewComment({ name: "", text: "" });
                        }
                      }}
                      className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-400 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4 pr-2 custom-scrollbar">
                  <AnimatePresence initial={false}>
                    {comments.map((comment) => (
                      <motion.div 
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-slate-800/30 border border-slate-800/50 group hover:border-sky-500/20 transition-all"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-sky-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{comment.name}</h4>
                            <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{comment.date}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{comment.text}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-800/50 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Lovely Jessica K. Dibuat dengan ❤️
        </p>
      </footer>

      {/* View All Certificates Modal */}
      <AnimatePresence>
        {isViewAllOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsViewAllOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900/50 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <div>
                  <h2 className="text-3xl font-bold text-white">All Certificates</h2>
                  <p className="text-slate-400 text-sm mt-1">Koleksi pencapaian dan sertifikasi</p>
                </div>
                <button 
                  onClick={() => setIsViewAllOpen(false)}
                  className="p-3 rounded-2xl bg-slate-800 text-slate-400 hover:text-white hover:bg-red-500/20 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PROJECTS.map((project, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group bg-slate-800/20 rounded-3xl p-4 border border-slate-800/50 hover:border-sky-500/30 transition-all"
                    >
                      <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-800">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex gap-2 mb-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-sky-500/10 text-[8px] font-black text-sky-500 uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">{project.title}</h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">{project.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
