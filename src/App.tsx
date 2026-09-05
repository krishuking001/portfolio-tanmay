import { useEffect, useState, useRef } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Download,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  X,
  Send,
  Sun,
  Moon,
  Home,
  StickyNote,
  Award,
  Wrench,
  Trophy,
} from 'lucide-react';

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  result: string;
  tags: string[];
};

type ChatMessage = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

const projects: Project[] = [
  {
    number: '01',
    title: 'Vibetee — T-Shirt E-Commerce Project',
    category: 'May 2026 – Jun 2026 · Brand strategy & E-commerce',
    description: 'Built and promoted Vibetee, a trendy T-shirt e-commerce brand, focusing on branding, product positioning, and online sales journey.',
    result: 'Created digital marketing campaigns and promotional creatives to improve brand visibility and customer engagement.',
    tags: ['Digital Marketing', 'E-commerce', 'Branding', 'Social Media Marketing', 'Content Creation'],
  },
  {
    number: '02',
    title: 'Dehaat Startup Valuation | LPU',
    category: 'Nov 2025 – Dec 2025 · Business analysis & Excel',
    description: 'Analyzed revenue drivers, unit economics, supply-chain logistics, and operating margins across farmer- and buyer-facing business verticals.',
    result: 'Conducted scenario and sensitivity analyses on key valuation assumptions, including GMV growth rates.',
    tags: ['Excel', 'Financial Modelling', 'Research', 'Strategy'],
  },
  {
    number: '03',
    title: 'August Bioscience Product | LPU',
    category: 'Nov 2025 – Dec 2025 · Campus Ambassador',
    description: 'Drove skincare sales and brand awareness as a Campus Ambassador by executing targeted product outreach strategies and leveraging the official dashboard to track leads.',
    result: 'Generated 10 orders and ₹5,333 in sales from 167 clicks at a 6% conversion rate.',
    tags: ['Selling', 'Meta Ads', 'Google Ads', 'SEO'],
  },
  {
    number: '04',
    title: 'Velora Brand | LPU',
    category: 'Aug 2025 – Sep 2025 · Branding & Social media',
    description: 'Led the launch and branding of a soft toy and jewellery line targeting students through market research.',
    result: 'Executed on-ground promotions and Instagram engagement to build brand awareness and drive product inquiries.',
    tags: ['Selling', 'Communication', 'Leadership', 'Market Research'],
  },
];

const experience = [
  {
    date: 'JUN 2026 — JUL 2026',
    role: 'Sales and Marketing Intern',
    company: 'The Times of India',
    copy: 'Achieved 55+ subscription sales through effective customer engagement and targeted sales strategies. Executed lead generation and customer acquisition activities to expand the customer base.',
    skills: ['Sales', 'Communication', 'Negotiation']
  },
];

const toolsAndPlatforms = [
  'MS-Excel',
  'Power Point',
  'Google Sheets',
  'Canva',
  'WordPress',
  'Shopify',
  'SEMrush',
  'Tableau',
  'IBM SPSS',
  'Google Ads',
  'Google Analytics',
];

const powerSkills = [
  'Selling',
  'Confidence and Assertiveness',
  'Leadership',
  'Team Coordination',
  'Time Management',
  'Planning',
];

const marketingSkills = [
  'Market Research',
  'Consumer Insights',
  'Brand Positioning',
  'Social Media Strategy',
];

const credentials = [
  { title: 'Keyword Research Essentials — SEMrush Academy', date: 'Jun 2025 – Jul 2025' },
];

const extraCurriculars = [
  {
    title: 'Vision Vista 2026 Winner | Professional Enhancement Event | LPU',
    date: 'Feb 2026',
    desc: 'Won 1st place by demonstrating excellence in professional communication, problem-solving, teamwork, and presentation skills.'
  },
  {
    title: 'Visionary Voices Club | LPU',
    date: 'Dec 2025',
    desc: 'Actively participated in the Visionary Voices Club at Lovely Professional University (LPU), taking part in "Pitch My Persona" and Group Discussion events to enhance communication, confidence, public speaking, and professional presentation skills.'
  }
];

const education = [
  {
    year: 'Aug 2025 — Present',
    school: 'Lovely Professional University',
    course: 'Master of Business Administration — Digital Marketing and Entrepreneurship',
    place: 'Phagwara, Punjab'
  },
  {
    year: 'Oct 2022 — Aug 2025',
    school: 'Kalinga Institute of Industrial Technology',
    course: 'Bachelor of Arts — Sociology Hons · Percentage: 89.30%',
    place: 'Bhubaneswar, Odisha'
  },
];

const ROLES = ['Digital Marketer', 'Brand Strategist', 'Growth Specialist', 'Business Analyst'];

const QUICK_QUESTIONS = [
  { label: 'About Tanmay', key: 'about', question: 'Tell me about Tanmay', answer: 'Tanmay Bighnesh Das is an MBA student specializing in Digital Marketing & Entrepreneurship at Lovely Professional University (+91-7847001821, tanmaybd153@gmail.com). He combines sociological insight with performance marketing, sales execution, and business strategy.' },
  { label: 'Projects', key: 'projects', question: 'What projects has Tanmay worked on?', answer: 'Tanmay has built projects across Vibetee (T-Shirt E-Commerce), Dehaat Startup Valuation (Financial Modelling), August Bioscience (Skincare Campus Sales — ₹5,333 generated), and Velora Brand (Soft toys & Jewellery launch).' },
  { label: 'Internship', key: 'internship', question: 'Tell me about Tanmay’s internship', answer: 'Tanmay worked as a Sales and Marketing Intern at The Times of India (Jun 2026 - Jul 2026), achieving 55+ subscription sales through targeted customer engagement and lead generation.' },
  { label: 'Skills', key: 'skills', question: 'What are Tanmay’s key skills & tools?', answer: 'Tools: MS-Excel, Power Point, Google Sheets, Canva, WordPress, Shopify, SEMrush. Power Skills: Selling, Leadership, Planning. Marketing: Market Research, Consumer Insights, Brand Positioning, Social Media Strategy.' },
  { label: 'Certifications', key: 'certifications', question: 'What certifications does Tanmay hold?', answer: 'Tanmay holds the Keyword Research Essentials certification from SEMrush Academy (Jun 2025 – Jul 2025) and won 1st place in Vision Vista 2026 at LPU.' },
  { label: 'Contact', key: 'contact', question: 'How can I get in touch with Tanmay?', answer: 'Email: tanmaybd153@gmail.com | Phone: +91-7847001821 | LinkedIn: linkedin.com/in/tanmay-bighnesh-das' }
];

function Portrait({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`portrait-fallback ${className}`} aria-label="Tanmay Bighnesh Das">TBD</div>
  ) : (
    <img className={className} src="/images/download.png" alt="Tanmay Bighnesh Das in a suit" onError={() => setFailed(true)} />
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showLittleNote, setShowLittleNote] = useState(true);

  // Animated Typing Role Subtitle
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 90);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 50);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  // Scroll listener for header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer for Aesthetic Scroll Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello! I'm Tanmay's AI Assistant. How can I help you today? Choose a quick question below or ask anything!",
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  const handleSendQuestion = (userQ?: string, botA?: string) => {
    const qText = userQ || inputQuestion.trim();
    if (!qText) return;

    const newMsgId = Date.now().toString();
    const userMsg: ChatMessage = { id: newMsgId, sender: 'user', text: qText };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!userQ) setInputQuestion('');

    setTimeout(() => {
      let responseText = botA;
      if (!responseText) {
        const lower = qText.toLowerCase();
        if (lower.includes('about') || lower.includes('who')) {
          responseText = QUICK_QUESTIONS[0].answer;
        } else if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('vibetee')) {
          responseText = QUICK_QUESTIONS[1].answer;
        } else if (lower.includes('intern') || lower.includes('times') || lower.includes('job')) {
          responseText = QUICK_QUESTIONS[2].answer;
        } else if (lower.includes('skill') || lower.includes('tool') || lower.includes('excel')) {
          responseText = QUICK_QUESTIONS[3].answer;
        } else if (lower.includes('certif') || lower.includes('semrush') || lower.includes('winner') || lower.includes('vision')) {
          responseText = QUICK_QUESTIONS[4].answer;
        } else if (lower.includes('contact') || lower.includes('email') || lower.includes('linkedin') || lower.includes('phone') || lower.includes('reach')) {
          responseText = QUICK_QUESTIONS[5].answer;
        } else if (lower.includes('education') || lower.includes('lpu') || lower.includes('kiit') || lower.includes('mba')) {
          responseText = 'Tanmay is pursuing MBA (Digital Marketing & Entrepreneurship) at LPU (Aug 2025-Present) and completed BA Sociology Hons at KIIT with 89.30% (Oct 2022-Aug 2025).';
        } else {
          responseText = "I'd be glad to tell you more! Tanmay specializes in Digital Marketing, Sales, and Growth Strategy. Contact him directly at tanmaybd153@gmail.com or +91-7847001821.";
        }
      }
      setChatMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: responseText }]);
    }, 350);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`site-shell ${theme === 'light' ? 'light-mode' : ''}`}>
      <div className="grain" />
      <div className="stars stars-one" />
      <div className="stars stars-two" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* Floating Little Note */}
      {showLittleNote && (
        <aside className="little-note-card reveal">
          <div className="little-note-header">
            <span>LITTLE NOTE</span>
            <button className="note-close-btn" aria-label="Close note" onClick={() => setShowLittleNote(false)}>
              <X size={14} />
            </button>
          </div>
          <p className="little-note-body">CONFIDENCE GROWS WHEN PREPARATION MEETS OPPORTUNITY.</p>
        </aside>
      )}

      {/* TOP RIGHT FLOATING CONTROLS (Note, Theme, Home) */}
      <div className="top-right-controls">
        <button
          className="control-btn"
          aria-label="Toggle Little Note"
          title="Toggle Note"
          onClick={() => setShowLittleNote((prev) => !prev)}
        >
          <StickyNote size={16} />
        </button>
        <button
          className="control-btn"
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <a href="#home" className="control-btn" aria-label="Go to Top" title="Home">
          <Home size={16} />
        </a>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#home" onClick={closeMenu}>
          TANMAY<span>.</span>
        </a>
        <button className="mobile-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? 'nav-open' : ''}>
          {['home', 'about', 'work', 'internship', 'skills', 'credentials', 'education', 'contact'].map((item) => (
            <a href={`#${item}`} key={item} onClick={closeMenu}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <aside className="side-note">
        <span>CURRENTLY</span>
        <strong>MBA · DM</strong>
        <small>Building skills across<br />marketing & business.</small>
      </aside>

      <div className="social-rail">
        <a href="https://www.linkedin.com/in/tanmay-bighnesh-das" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={16} />
        </a>
        <a href="mailto:tanmaybd153@gmail.com" aria-label="Email">
          <Mail size={16} />
        </a>
      </div>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy reveal">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> MBA · DIGITAL MARKETING · ENTREPRENEURSHIP
            </p>
            <h1>
              Hello.<br />
              <em>I’m Tanmay.</em>
            </h1>
            
            {/* Typing Role Animation */}
            <div className="typing-role-wrapper">
              <span className="typing-prefix">A passionate </span>
              <span className="typing-highlight">{displayedText}</span>
              <span className="typing-cursor">|</span>
            </div>

            <p className="hero-intro">
              I turn ideas into clear stories, thoughtful strategies, and measurable outcomes — with a curious mind and a bias toward action.
            </p>
            <div className="hero-actions">
              <a className="button button-solid" href="#work">
                Explore my work <ArrowUpRight size={16} />
              </a>
              <a className="button button-ghost" href="#contact">
                Let’s connect <ChevronRight size={16} />
              </a>
            </div>
          </div>

          <div className="hero-card-wrap reveal delay-one">
            <div className="floating-label label-top">
              analytical <span>+</span> expressive
            </div>
            <div className="floating-label label-repositioned">
              ideas meet <span>action</span> <Sparkles size={13} />
            </div>

            <div className="profile-card">
              <div className="card-line" />
              <Portrait className="hero-portrait" />
              <div className="profile-details">
                <h2>Tanmay Bighnesh Das</h2>
                <p>Marketing · Sales · Strategy</p>
                <div className="chip-row">
                  <span>Marketing</span>
                  <span>Analytics</span>
                  <span>Growth</span>
                </div>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDownRight size={18} />
          </a>
        </section>

        {/* Ticker Banner */}
        <div className="ticker-banner">
          <div className="ticker-track">
            <span>DIGITAL MARKETING</span> ✦ <span>BRAND STRATEGY</span> ✦ <span>PERFORMANCE ADS</span> ✦ <span>BUSINESS ANALYTICS</span> ✦ <span>CAMPUS GROWTH</span> ✦ <span>MARKET RESEARCH</span> ✦ <span>DIGITAL MARKETING</span> ✦ <span>BRAND STRATEGY</span> ✦ <span>PERFORMANCE ADS</span> ✦ <span>BUSINESS ANALYTICS</span> ✦
          </div>
        </div>

        {/* SECTION 01: About */}
        <section className="about section-wrap" id="about">
          <div className="section-heading scroll-reveal">
            <span className="section-index">01</span>
            <h2>A little<br /><em>about me.</em></h2>
          </div>
          <div className="about-grid">
            <div className="about-image-frame scroll-reveal-left">
              <Portrait className="about-portrait" />
              <span className="image-caption">Curious by nature.<br />Intentional by choice.</span>
            </div>
            <div className="about-copy scroll-reveal-right">
              <p className="large-copy">
                I’m currently pursuing an <strong>MBA in Digital Marketing and Entrepreneurship</strong> at Lovely Professional University, where I’m building the bridge between creative thinking and business outcomes.
              </p>
              <p>
                My experience spans sales, marketing campaigns, brand positioning, market research, and campus growth. I enjoy understanding what makes people pay attention — then shaping that insight into work that feels useful, clear, and memorable.
              </p>
              <p>
                From building a product concept to analysing a growth funnel, I bring energy, structure, and a willingness to learn quickly.
              </p>
              <div className="skill-cloud">
                <span>Digital marketing</span>
                <span>Sales</span>
                <span>Market research</span>
                <span>Brand strategy</span>
                <span>Business analytics</span>
                <span>Social media</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: Projects */}
        <section className="work section-wrap" id="work">
          <div className="work-intro scroll-reveal">
            <div className="section-heading">
              <span className="section-index">02</span>
              <h2>Things I’ve<br /><em>created.</em></h2>
            </div>
            <p>
              A curated collection of projects across digital marketing, business analysis, branding, and growth. Click a card to explore the thinking behind the work.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, idx) => (
              <button
                className={`project-folder scroll-reveal-scale stagger-delay-${idx + 1}`}
                key={project.number}
                onClick={() => setActiveProject(project)}
              >
                <div className="folder-tab" />
                <div className="project-top">
                  <span>{project.number}</span>
                  <span>
                    OPEN PROJECT <ArrowUpRight size={14} />
                  </span>
                </div>
                <div className="project-bottom">
                  <span>{project.category}</span>
                  <strong>{project.title}</strong>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 03: Internships */}
        <section className="experience section-wrap" id="internship">
          <div className="section-heading scroll-reveal">
            <span className="section-index">03</span>
            <h2>Where I’ve<br /><em>been learning.</em></h2>
          </div>
          <div className="timeline">
            {experience.map((item, idx) => (
              <article className={`timeline-item scroll-reveal-left stagger-delay-${idx + 1}`} key={item.company}>
                <span className="timeline-dot" />
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-content">
                  <p className="eyebrow">{item.company}</p>
                  <h3>{item.role}</h3>
                  <p>{item.copy}</p>
                  <div className="chip-row" style={{ marginTop: '14px' }}>
                    {item.skills.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 04: Skills & Tools */}
        <section className="skills-section section-wrap" id="skills">
          <div className="section-heading scroll-reveal">
            <span className="section-index">04</span>
            <h2>What I<br /><em>bring.</em></h2>
          </div>
          <p className="section-intro-copy scroll-reveal">
            A practical toolkit combining digital platforms, data analysis, business communication, and structured problem-solving.
          </p>

          <div className="skills-container-grid">
            {/* Card 1: Tools & Platforms */}
            <div className="skills-card scroll-reveal-left">
              <div className="skills-card-header">
                <Wrench size={22} className="text-mint" />
                <h3>Tools & Platforms</h3>
              </div>
              <div className="skills-pills-row">
                {toolsAndPlatforms.map((tool) => (
                  <span className="skill-pill" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2: Power Skills */}
            <div className="skills-card scroll-reveal-right">
              <div className="skills-card-header">
                <Sparkles size={22} className="text-mint" />
                <h3>Power Skills</h3>
              </div>
              <div className="skills-pills-row">
                {powerSkills.map((skill) => (
                  <span className="skill-pill pill-highlight" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Marketing Skills Row */}
          <div className="skills-card scroll-reveal-scale" style={{ marginTop: '24px' }}>
            <div className="skills-card-header">
              <Sparkles size={22} className="text-mint" />
              <h3>Marketing Skills</h3>
            </div>
            <div className="skills-pills-row">
              {marketingSkills.map((mSkill) => (
                <span className="skill-pill" key={mSkill}>
                  {mSkill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 05: Credentials & Extra-Curriculars */}
        <section className="credentials-section section-wrap" id="credentials">
          <div className="section-heading scroll-reveal">
            <span className="section-index">05</span>
            <h2>Credentials<br /><em>& Achievements.</em></h2>
          </div>
          <p className="section-intro-copy scroll-reveal">
            Certifications, awards, and learning milestones supporting my analytical, marketing, and business toolkit.
          </p>

          <div className="credentials-list">
            {credentials.map((cred) => (
              <div className="credential-card scroll-reveal-scale" key={cred.title}>
                <div className="credential-left">
                  <Award size={20} className="text-mint cred-icon" />
                  <h4>{cred.title}</h4>
                </div>
                <span className="credential-date">{cred.date}</span>
              </div>
            ))}

            {extraCurriculars.map((ec) => (
              <div className="credential-card scroll-reveal-scale" key={ec.title} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div className="credential-left" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Trophy size={20} className="text-mint cred-icon" />
                    <h4>{ec.title}</h4>
                  </div>
                  <span className="credential-date">{ec.date}</span>
                </div>
                <p style={{ margin: '10px 0 0 36px', color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6' }}>
                  {ec.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 06: Education */}
        <section className="education section-wrap" id="education">
          <div className="education-top scroll-reveal">
            <div className="section-heading">
              <span className="section-index">06</span>
              <h2>The path<br /><em>so far.</em></h2>
            </div>
            <p>
              Every chapter adds a different lens — from understanding people and culture to shaping business ideas for the real world.
            </p>
          </div>
          <div className="education-list">
            {education.map((item, idx) => (
              <div className={`education-item scroll-reveal stagger-delay-${idx + 1}`} key={item.school}>
                <span>{item.year}</span>
                <div>
                  <p className="eyebrow">{item.place}</p>
                  <h3>{item.school}</h3>
                  <p>{item.course}</p>
                </div>
                <ArrowUpRight size={19} />
              </div>
            ))}
          </div>
          <div className="resume-strip scroll-reveal-scale">
            <div>
              <p className="eyebrow">WANT THE FULL STORY?</p>
              <h3>Take a closer look at my resume.</h3>
            </div>
            <a className="button button-solid" href="/TANMAY_(SPECIALISED_CV).pdf" download>
              Download CV <Download size={16} />
            </a>
          </div>
        </section>

        {/* SECTION 07: Contact */}
        <section className="contact section-wrap" id="contact">
          <div className="contact-orbit" />
          <div className="scroll-reveal-scale">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> HAVE A GOOD IDEA?
            </p>
            <h2>
              Let’s make<br />
              <em>something count.</em>
            </h2>
            <p className="contact-copy">
              Whether you’re looking to discuss a project, an opportunity, or simply connect professionally, I’d be happy to hear from you.
            </p>
            <a className="contact-email" href="mailto:tanmaybd153@gmail.com">
              tanmaybd153@gmail.com <ArrowUpRight size={21} />
            </a>
            <p style={{ margin: '14px 0 0', color: 'var(--mint)', font: "500 13px 'DM Mono', monospace" }}>
              Mobile: +91-7847001821
            </p>
          </div>
          <div className="contact-footer">
            <span>Tanmay Bighnesh Das</span>
            <span>© 2026 · Built with intent</span>
            <a href="https://www.linkedin.com/in/tanmay-bighnesh-das" target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </section>
      </main>

      {/* Project Modal */}
      {activeProject && (
        <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="project-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" aria-label="Close project" onClick={() => setActiveProject(null)}>
              <X size={19} />
            </button>
            <span className="section-index">{activeProject.number}</span>
            <p className="eyebrow">{activeProject.category}</p>
            <h2>{activeProject.title}</h2>
            <p>{activeProject.description}</p>
            <div className="result-box">
              <span>THE OUTCOME</span>
              <strong>{activeProject.result}</strong>
            </div>
            <div className="chip-row">
              {activeProject.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Button & Drawer ("ASK TANMAY") */}
      <button
        className="chatbot-trigger-btn"
        aria-label="Ask Tanmay"
        onClick={() => setChatOpen((prev) => !prev)}
      >
        <Sparkles size={16} />
        <span>Ask Tanmay</span>
      </button>

      {chatOpen && (
        <div className="chatbot-drawer">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Sparkles size={16} className="text-mint" />
              <h3>ASK TANMAY</h3>
            </div>
            <button className="chatbot-close-btn" aria-label="Close Chat" onClick={() => setChatOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-body">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prebuilt Questions */}
          <div className="chatbot-quick-pills">
            {QUICK_QUESTIONS.map((item) => (
              <button
                key={item.key}
                className="quick-pill-btn"
                onClick={() => handleSendQuestion(item.question, item.answer)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <form
            className="chatbot-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion();
            }}
          >
            <input
              type="text"
              placeholder="Ask something..."
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
            />
            <button type="submit" className="chatbot-send-btn" aria-label="Send message">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
