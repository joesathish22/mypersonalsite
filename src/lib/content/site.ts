// Centralized site content. No fabricated data — every claim here traces back
// to information provided directly for this project.

export const person = {
  name: "S. Sathish Kumar",
  shortName: "Sathish Kumar",
  role: "Founder & CEO",
  company: "Queen Touch Technology",
  companyShort: "QTT",
  eyebrow: "Founder · Technology Strategist · Builder",
  location: "Thoothukudi, Tamil Nadu, India",
  locationShort: "India",
  globalTag: "India → Global",
  availability: "Global / Remote",
  experience: "10+ years",
  email: "hello@sathishkumar.pro",
  phone: "+919487200764",
  phoneDisplay: "+91 94872 00764",
  linkedin: "https://www.linkedin.com/in/joesathish/",
  qttUrl: "https://www.queentouchtech.com",
  portrait: {
    src: "/images/sathish-kumar.png",
    alt: "S. Sathish Kumar, Founder & CEO of Queen Touch Technology",
  },
} as const;

export const hero = {
  eyebrow: "Founder · Technology Strategist · Builder",
  title: "S. Sathish Kumar",
  statementLines: ["I Build Technology", "That Creates", "Real-World Impact."],
  statementHighlight: "Real-World Impact.",
  subline: `${person.role}, Queen Touch Technology`,
  subline2: "Technology Strategy · Digital Transformation · Software Engineering",
  supporting:
    "Building scalable digital products, enterprise systems and technology solutions for organizations ready to move forward.",
  tag: person.globalTag,
  ctaPrimary: { label: "Let's Build Together", href: "#contact" },
  ctaSecondary: { label: "Explore My Work", href: "#work" },
} as const;

export const metrics = [
  { value: "10+", label: "Years of Experience", numeric: 10, suffix: "+" },
  { value: "Global", label: "Client Network" },
  { value: "Successful", label: "Projects Delivered" },
  { value: "End-to-End", label: "IT Solutions" },
  { value: "Secure", label: "& Future Ready" },
] as const;

// The cinematic Strategy -> Build -> Scale -> Protect sequence. Each stage
// drives both the pinned 3D morph and its on-screen caption.
export const techJourney = {
  eyebrow: "My Technology",
  heading: ["A System, Engineered", "in Four Movements"],
  stages: [
    {
      key: "strategy",
      index: "01",
      label: "Strategy",
      description: "Abstract architecture — mapped before a line of code is written.",
      items: [
        "Technology strategy",
        "Digital transformation",
        "IT advisory",
        "Architecture planning",
      ],
    },
    {
      key: "build",
      index: "02",
      label: "Build",
      description: "Systems assembled with discipline, from foundation up.",
      items: [
        "Web applications",
        "Mobile applications",
        "Enterprise systems",
        "Custom software",
      ],
    },
    {
      key: "scale",
      index: "03",
      label: "Scale",
      description: "Nodes multiply, connect and hold under real-world load.",
      items: ["Cloud", "DevOps", "CI/CD", "Infrastructure"],
    },
    {
      key: "protect",
      index: "04",
      label: "Protect",
      description: "The network, secured by design — not bolted on after.",
      items: [
        "Cybersecurity",
        "Information security",
        "Testing & QA",
        "Compliance",
        "Sustainability & Green IT",
      ],
    },
  ],
} as const;

export const aiReady = {
  eyebrow: "AI-Ready Technology",
  heading: "Exploring What Intelligent Systems Make Possible",
  text: "Exploring how intelligent systems, automation and modern AI can transform the way organizations build, operate and grow.",
  flow: ["Data", "Intelligence", "Automation", "Systems"],
} as const;

export const about = {
  eyebrow: "About",
  heading: [
    "Technology Is Only Valuable",
    "When It Creates Real Impact.",
  ],
  paragraphs: [
    "I am S. Sathish Kumar, Founder & CEO of Queen Touch Technology, an IT and digital solutions company based in India.",
    "With over a decade of experience in IT projects, enterprise software and digital transformation, I combine strategic thinking with hands-on technology leadership.",
  ],
} as const;

export const qtt = {
  eyebrow: "Vision",
  heading: "Queen Touch Technology",
  subheading: "Technology Solutions Company",
  description:
    "QTT is a technology company focused on delivering high-quality IT services and digital solutions to clients globally.",
  areas: [
    "Enterprise Web & Mobile Applications",
    "Cloud & DevOps",
    "Cybersecurity",
    "Custom Software Development",
    "Digital Transformation",
    "Sustainability & Green IT",
  ],
  cta: { label: "Visit Queen Touch Technology", href: person.qttUrl },
} as const;

export const globalCollaboration = {
  eyebrow: "Open to Global Collaboration",
  heading: ["Built in India.", "Connected to the World."],
  text: "I work with organizations and teams looking for thoughtful technology leadership, digital transformation and reliable software solutions.",
  cta: { label: "Let's Work Together", href: "#contact" },
} as const;

export const contact = {
  eyebrow: "Contact",
  headline: ["Have a Difficult", "Technology Problem?"],
  headline2: "Let's Build the Solution.",
  cta: { label: "Start a Conversation", href: `mailto:${person.email}` },
  linkedin: person.linkedin,
} as const;

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "QTT", href: "#qtt" },
  { label: "Contact", href: "#contact" },
] as const;

export const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "QTT", href: "#qtt" },
  { label: "Contact", href: "#contact" },
  { label: "LinkedIn", href: person.linkedin },
] as const;

// Domain-based showcase of the kind of systems built through QTT — presented
// honestly as technology domains, not as invented named client case studies.
// Structured so real, verified case studies can replace these the moment
// they exist.
export type WorkShowcase = {
  domain: string;
  description: string;
  technologies: string[];
};

export const selectedWork = {
  eyebrow: "Selected Work",
  heading: "Selected Technology Work",
  subheading:
    "Products, platforms and digital systems built through technology, strategy and execution.",
  showcases: [
    {
      domain: "Enterprise Web Platforms",
      description:
        "Architecture, security and performance engineered for scale — built on modern, cloud-native foundations.",
      technologies: ["Enterprise Architecture", "Cloud-Native", "Security by Design"],
    },
    {
      domain: "Mobile Applications",
      description:
        "User-centric mobile products engineered for reliability across devices and networks.",
      technologies: ["Cross-Platform", "Performance Engineering", "UX Systems"],
    },
    {
      domain: "Cloud & DevOps Infrastructure",
      description:
        "CI/CD pipelines and infrastructure designed for high availability and operational confidence.",
      technologies: ["CI/CD", "Multi-Cloud", "Infrastructure as Code"],
    },
    {
      domain: "Digital Transformation Programs",
      description:
        "End-to-end modernization — from legacy systems to connected, secure digital operations.",
      technologies: ["Systems Integration", "Change Management", "Security & Compliance"],
    },
  ] satisfies WorkShowcase[],
} as const;
