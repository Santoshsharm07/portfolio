import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiArrowUp, FiGithub, FiLinkedin, FiMail, FiCode, FiDatabase, FiCpu, FiMonitor, FiBriefcase, FiBook, FiMapPin, FiClock, FiAlertTriangle, FiImage, FiFileText, FiMessageSquare, FiBarChart2 } from 'react-icons/fi';
import { useForm, FieldErrors } from 'react-hook-form';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Skills data based on Santosh's profile
const skills = {
  languages: [
    { name: 'Java' },
    { name: 'Python' },
    { name: 'SQL'},
  ],
  frameworks: [
    { name: 'React JS', level: 90 },
    { name: 'Node JS', level: 85 },
    { name: 'Express JS', level: 85 },
  ],
  tools: [
    { name: 'MongoDB', level: 85 },
    { name: 'Power BI', level: 80 },
    { name: 'MS Excel', level: 90 },
    { name: 'Git', level: 90 },
  ],
  domains: [
    { name: 'Machine Learning', level: 80 },
    { name: 'Data Analytics', level: 85 },
    { name: 'Web Development', level: 90 },
  ]
};

// Projects data
const projects = [
  {
    title: 'Road-Accident-Detection-Alert-System',
    description: 'Designed a real-time Python video processing pipeline using OpenCV for efficient and reliable road accident detection. Implemented an event-driven alert system integrating Twilio API to trigger automated emergency notifications with minimal latency. Optimized detection accuracy by evaluating models using precision, recall, and F1-score metrics on test datasets.',
    tech: ['Python', 'OpenCV', 'Machine Learning', 'Twilio API'],
    github: 'https://github.com/Santoshsharm07/Road-Accident-Detection-Alert-System'
  },
  {
    title: 'Imagify-AI Image Generator',
    description: 'Developed a full-stack MERN application with scalable RESTful APIs for secure AI-based image generation. Executed JWT authentication, structured API routing, centralized error handling, and optimized MongoDB database schemas. Configured Gemini API with asynchronous request handling to support stable real-time image generation workflows.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'TailwindCSS', 'Gemini API','JWT'],
    demo: 'https://imagify-nn52-git-main-santosh-sharmas-projects-81e4a1b5.vercel.app/',
    github: 'https://github.com/Santoshsharm07/imagify'
  },
  {
    title: 'Open Library with AI Book Suggestion',
    description: 'Built a full-stack library management platform with secure Firebase authentication and a complete book borrowing workflow. Established RESTful APIs using Node.js and Express for book, category, and user management with MongoDB. Integrated Google Generative AI to provide intelligent, prompt-based book recommendations and deployed a responsive UI with Tailwind CSS.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Gemini API', 'Docker','JWT','TailwindCSS'],
    demo: 'https://open-library-with-ai-book-suggestio-blue.vercel.app/',
    github: 'https://github.com/Santoshsharm07/Open-Library-with-Ai-Book-Suggestion'
  },
  {
    title: 'Legal Document Analyzer',
    description: 'Designed an NLP pipeline using transformer-based models to summarize legal documents and extract named entities. Integrated OCR with text preprocessing to enable analysis of scanned PDFs and unstructured legal documents.',
    tech: ['Python', 'NLP', 'Hugging Face', 'OCR'],
    github: 'https://github.com/Santoshsharm07/Legal_Document_Analyzer'
  },
  {
    title: 'AI-Powered Chatbot',
    description: 'Developed a conversational AI application using Gemini API to handle natural language user queries. Deployed the chatbot on Streamlit Cloud with prompt handling and real-time response generation.',
    tech: ['Python', 'Streamlit', 'Google Gemini API'],
    demo: 'https://ai-chatbot-odywqhsszvv73zz6dvhede.streamlit.app/',
    github: 'https://github.com/Santoshsharm07/Ai-Chatbot'
  },
  {
    title: 'Power BI Olympic Dashboard',
    description: 'Analyzed 120+ years of Olympic datasets using Power BI, DAX, and data modeling techniques. Delivered insights on athlete performance, medal trends, and country-wise participation patterns.',
    tech: ['Power BI', 'DAX', 'Data Analysis'],
    github: 'https://github.com/Santoshsharm07/Olympic-Dashboard'
  }
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  // Toggle dark mode - Tailwind CSS v4 approach
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--background', '#0a0a0a');
      root.style.setProperty('--foreground', '#ededed');
      root.classList.add('dark'); // Keep for compatibility with any legacy dark mode styles
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#171717');
      root.classList.remove('dark'); // Keep for compatibility with any legacy dark mode styles
    }
  }, [darkMode]);

  // Show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form handling
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setFormStatus('sending');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      setFormStatus('success');
      reset();
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Santosh
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#skills" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</a>
            <a href="#projects" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
            <a href="#resume" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resume</a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-3 space-y-3">
              <a href="#about" className="block py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#skills" className="block py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Skills</a>
              <a href="#projects" className="block py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Projects</a>
              <a href="#resume" className="block py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Resume</a>
              <a href="#contact" className="block py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 min-h-screen flex items-center relative overflow-hidden">
        {/* Enhanced animated background with multiple gradients and parallax effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 opacity-30 dark:opacity-15">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6],
                x: [-20, 20, -20],
                y: [-20, 20, -20]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 0.9, 0.6],
                x: [20, -20, 20],
                y: [20, -20, 20]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div 
              className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
                x: [0, 30, 0],
                y: [0, -30, 0]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </div>
        </div>
        
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Animated name with enhanced text glow and gradient */}
            <motion.h1 
              className="text-5xl md:text-8xl font-extrabold mb-4 tracking-tight"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
                Santosh Sharma
              </span>
            </motion.h1>
            
            {/* Role with enhanced animation and text shadow */}
            <motion.p 
              className="text-2xl md:text-3xl font-semibold text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">Computer Science Graduate & Software Engineer</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 h-2 bg-blue-400 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                ></motion.span>
              </span>
            </motion.p>
            
            {/* Tagline with enhanced animation */}
            <motion.div 
              className="mb-16 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              <motion.p 
                className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 font-semibold leading-relaxed text-center"
                animate={{ 
                  opacity: [1, 0.8, 1],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Passionate about building scalable applications, data-driven solutions, and contributing to impactful projects
              </motion.p>
            </motion.div>
            
            {/* CTA Buttons with enhanced hover effects and animations */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-8 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              <motion.a
                href="#projects"
                className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.08, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  View Projects
                  <motion.svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </span>
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400"></span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1, repeat: Infinity }}
                ></motion.span>
              </motion.a>
              
              <motion.a
                href="#resume"
                className="group relative px-12 py-5 bg-white text-gray-900 font-semibold rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden"
                whileHover={{ scale: 1.08, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  Download Resume
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400"
                ></motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Hi 👋, I'm Santosh Sharma</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Computer Science Engineering graduate from Vellore Institute of Technology, Bhopal, with a strong foundation in programming, problem-solving, and modern technologies. I'm a passionate software engineer and data enthusiast who loves building scalable applications and working on data-driven solutions.
                </p>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">What I Do</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  I'm actively seeking opportunities to apply my skills, learn continuously, and grow as a software professional. I'm eager to contribute to innovative projects that make a difference and solve real-world problems.
                </p>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Get In Touch</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  <a href="mailto:07santoshsharma2004@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 font-medium">
                    <FiMail size={18} />
                    <span>07santoshsharma2004@gmail.com</span>
                  </a>
                </p>
              </div>
              
              {/* Right Side - Image */}
              <div className="order-1 md:order-2 flex justify-center items-center">
                <motion.div 
                  className="relative w-72 h-72"
                  initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                >
                  {/* Background Glow Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.2, scale: 1.1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  ></motion.div>
                  
                  {/* Inner Glow */}
                  <motion.div 
                    className="absolute inset-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  ></motion.div>
                  
                  {/* Circular Cutout */}
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-md">
                    <img 
                      src="/Image/profile.jpg" 
                      alt="Santosh Sharma" 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Subtle Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-50"></div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <motion.div
  className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full opacity-60"
  initial={{ scale: 0, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 0.6 }}
  viewport={{ once: true }}
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.6, 0.8, 0.6]
  }}
  transition={{
    duration: 2.5,
    delay: 1,
    repeat: Infinity
  }}
></motion.div>
                  <motion.div 
                    className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-500 rounded-full opacity-60"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6] 
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 1.5
                    }}
                  ></motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"></div>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Programming Languages */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-8">
                  <FiCpu className="text-3xl text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-semibold">Programming Languages</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Java', 'Python','SQL'].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-5 py-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Frameworks & Libraries */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-8">
                  <FiCode className="text-3xl text-purple-600 dark:text-purple-400" />
                  <h3 className="text-2xl font-semibold">Frameworks & Libraries</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['React JS', 'Node JS', 'Express JS', 'Api'].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-5 py-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Databases */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-8">
                  <FiDatabase className="text-3xl text-green-600 dark:text-green-400" />
                  <h3 className="text-2xl font-semibold">Databases</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['MongoDB', 'MySQL', 'PostgreSQL'].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-5 py-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tools & Platforms */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-8">
                  <FiMonitor className="text-3xl text-orange-600 dark:text-orange-400" />
                  <h3 className="text-2xl font-semibold">Tools & Platforms</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Git', 'Docker', 'VS Code',' REST APIs','SuperBase', 'Postman','Streamlit'].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-5 py-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              {/* Data Science & Analytics */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-8">
                  <FiDatabase className="text-3xl text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-semibold">Data Science & Analytics</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Power BI', 'MS Excel', 'AI/ML', 'Data Visualization', 'Predictive Modeling'].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-5 py-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Domain Expertise */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-8">
                  <FiCpu className="text-3xl text-purple-600 dark:text-purple-400" />
                  <h3 className="text-2xl font-semibold">Domain Expertise</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Data Analytics','Data Science', 'Software Engineer', 'Backend Development'].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-5 py-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"></div>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-blue-300/50 dark:hover:border-blue-500/50"
                >
                  {/* Project Header with Enhanced Gradient */}
                  <div className={`h-48 bg-gradient-to-r ${index % 3 === 0 ? 'from-blue-600 via-purple-600 to-pink-600' : index % 3 === 1 ? 'from-green-600 via-teal-600 to-blue-600' : 'from-yellow-600 via-orange-600 to-red-600'} flex items-center justify-center relative overflow-hidden`}>
                    {/* Animated Background Elements */}
                    <motion.div 
                      className="absolute inset-0 bg-white/10"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    ></motion.div>
                    <motion.div 
                      className="absolute w-32 h-32 bg-white/20 rounded-full blur-3xl"
                      animate={{ 
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                      }}
                      transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    ></motion.div>
                    
                    {/* Animated Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-grid-pattern [mask-image:radial-gradient(circle,rgba(0,0,0,1)_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    </div>
                    
                    {/* Project Icon */}
                    <div className="z-10 flex flex-col items-center gap-3">
                      <motion.div 
                        className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 5, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                      >
                        {/* Dynamic Icon based on Project Title */}
                        {project.title.includes('Road-Accident') && <FiAlertTriangle size={40} className="text-white" />}
                        {project.title.includes('Imagify') && <FiImage size={40} className="text-white" />}
                        {project.title.includes('Open Library') && <FiBook size={40} className="text-white" />}
                        {project.title.includes('Legal Document') && <FiFileText size={40} className="text-white" />}
                        {project.title.includes('AI-Powered Chatbot') && <FiMessageSquare size={40} className="text-white" />}
                        {project.title.includes('Power BI') && <FiBarChart2 size={40} className="text-white" />}
                      </motion.div>
                      <motion.h3 
                        className="text-white font-bold text-xl md:text-2xl tracking-tight text-center px-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        {project.title}
                      </motion.h3>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-8">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-4">{project.description}</p>
                    
                    {/* Tech Stack with Enhanced Badges */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 + techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgb(59, 130, 246)' }}
                          className="px-4 py-2 text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all duration-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      {project.demo && (
                        <motion.a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Demo</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiGithub size={16} />
                          <span>GitHub</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>



      {/* Resume Section */}
      <section id="resume" className="py-20 px-4 relative overflow-hidden">
        {/* Enhanced gradient background with subtle patterns */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern [mask-image:radial-gradient(circle,rgba(0,0,0,1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
        </div>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Resume</h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Santosh Sharma - Resume</h3>
                <motion.a
                  href="/Santosh_Sharma_Resume.pdf"
                  download
                  whileHover={{ scale: 1.08, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Resume</span>
                </motion.a>
              </div>
              <div className="w-full h-[700px] bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md">
                <embed
                  src="/Santosh_Sharma_Resume.pdf"
                  type="application/pdf"
                  className="w-full h-full"
                  title="Santosh Sharma Resume Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-850">
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern [mask-image:radial-gradient(circle,rgba(0,0,0,1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience</h2>
            
            {/* Timeline Container */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/4 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-500 opacity-30 mx-4 md:mx-0"></div>
              
              <div className="space-y-12">
                {/* Experience 1 */}
                <motion.div 
                  className="relative flex flex-col md:flex-row gap-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/4 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800 mx-4 md:mx-0 transform -translate-x-1/2 md:-translate-x-1/2 z-10"></div>
                  
                  <div className="md:w-1/4"></div>
                  <div className="flex-1">
                    <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">Jaquar and Company Pvt. Ltd.</div>
                          <div className="text-gray-600 dark:text-gray-400">May 2024 – July 2024</div>
                          <div className="text-gray-500 dark:text-gray-400">Manesar, Gurgaon, Haryana</div>
                        </div>
                        <div className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">Data Analyst Intern</div>
                      </div>
                      <ul className="space-y-3">
                        {[
                          'Prepared, cleaned, and transformed 50K+ production records using SQL and Excel to ensure high-quality analytical datasets.',
                          'Performed exploratory data analysis to identify bottlenecks and anomalies, contributing to a 15% improvement in operational efficiency.',
                          'Developed and automated 5+ Power BI dashboards for real-time KPI tracking, reducing manual reporting effort by 30%.'
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start gap-3 text-gray-800 dark:text-gray-200"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                          >
                            <div className="mt-1.5 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Experience 2 */}
                <motion.div 
                  className="relative flex flex-col md:flex-row gap-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/4 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800 mx-4 md:mx-0 transform -translate-x-1/2 md:-translate-x-1/2 z-10"></div>
                  
                  <div className="md:w-1/4"></div>
                  <div className="flex-1">
                    <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">Govshop India Private Limited</div>
                          <div className="text-gray-600 dark:text-gray-400">Sept 2025 - Jan 2026</div>
                          <div className="text-gray-500 dark:text-gray-400">Saket, Delhi</div>
                        </div>
                        <div className="px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">Research and Data Science Trainee</div>
                      </div>
                      <ul className="space-y-3">
                        {[
                          'Processed and transformed large research datasets using Python and SQL to build scalable analytical data models.',
                          'Integrated structured datasets into existing LLM-based workflows using Python, improving feature extraction accuracy and automation.',
                          'Performed pattern detection and anomaly analysis using Python, SQL, and Excel to generate actionable analytical insights.'
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start gap-3 text-gray-800 dark:text-gray-200"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                          >
                            <div className="mt-1.5 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0"></div>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative overflow-hidden">
        {/* Enhanced gradient background with subtle patterns */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern [mask-image:radial-gradient(circle,rgba(0,0,0,1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
        </div>
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: { 
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email format'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="Your email"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Subject"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', { required: 'Message is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === 'sending' ? (
                      <span>...Sending</span>
                    ) : formStatus === 'success' ? (
                      <span>✓ Message Sent</span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                  {formStatus === 'error' && (
                    <p className="mt-2 text-sm text-red-500 text-center">
                      Failed to send message. Please try again later.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 md:mb-0">
              Santosh Sharma
            </div>
            <div className="flex gap-6 mb-6 md:mb-0">
              <a href="https://github.com/Santoshsharm07" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110">
                <FiGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/santosh-sharma-a57026220/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110">
                <FiLinkedin size={20} />
              </a>
              <a href="https://leetcode.com/u/santosh_07sharma/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 flex items-center justify-center">
                <img src="/Image/leetcode-svgrepo-com.svg" alt="LeetCode" className="w-5 h-5 text-white" />
              </a>
              <a href="mailto:07santoshsharma2004@gmail.com" className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110">
                <FiMail size={20} />
              </a>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Santosh Sharma. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        onClick={scrollToTop}
        whileHover={{ 
          scale: 1.15,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <FiArrowUp size={24} />
      </motion.button>
    </div>
  );
}