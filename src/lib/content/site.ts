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
  title: "S. Sathish Kumar — Technology Strategist, Software Engineer & Founder",
  statementLines: ["I Build Technology", "That Creates", "Real-World Impact."],
  statementHighlight: "Real-World Impact.",
  subline: `${person.role}, Queen Touch Technology`,
  subline2: "Technology Strategy · Digital Transformation · Software Engineering",
  supporting:
    "Building scalable digital products, enterprise systems and technology solutions for organizations ready to move forward.",
  tag: person.globalTag,
  ctaPrimary: { label: "Let's Build Together", href: "/contact" },
  ctaSecondary: { label: "Explore My Work", href: "/work" },
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
  text: "Intelligent systems, automation and modern AI are changing how organizations build, operate and grow.",
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
  cta: { label: "Let's Work Together", href: "/contact" },
} as const;

export const contact = {
  eyebrow: "Contact",
  headline: ["Have a Difficult", "Technology Problem?"],
  headline2: "Let's Build the Solution.",
  cta: { label: "Start a Conversation", href: `mailto:${person.email}` },
  linkedin: person.linkedin,
} as const;

// Home is reached via the logo (see Navbar), so it isn't repeated in the
// visible nav — keeps 7 real routes from crowding the lg breakpoint.
export const nav = [
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "AI", href: "/ai" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "AI", href: "/ai" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
  { label: "Queen Touch Technology", href: person.qttUrl },
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
  /** Optional deeper copy — rendered on the dedicated /work page, not the home teaser. */
  approach?: string;
  outcome?: string;
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
      approach:
        "Requirements and constraints are mapped before any framework decision — data model, integration points, security boundaries and expected load all shape the architecture first.",
      outcome:
        "A platform that holds up under real production traffic and change requests, instead of one that only worked in the demo.",
    },
    {
      domain: "Mobile Applications",
      description:
        "User-centric mobile products engineered for reliability across devices and networks.",
      technologies: ["Cross-Platform", "Performance Engineering", "UX Systems"],
      approach:
        "Interfaces are designed around how people actually use a phone — inconsistent networks, interruptions, low-end devices — not just the happy path on a fast simulator.",
      outcome: "A mobile product that stays fast and predictable outside ideal test conditions.",
    },
    {
      domain: "Cloud & DevOps Infrastructure",
      description:
        "CI/CD pipelines and infrastructure designed for high availability and operational confidence.",
      technologies: ["CI/CD", "Multi-Cloud", "Infrastructure as Code"],
      approach:
        "Infrastructure is defined as code and deployments are automated end-to-end, so releases are repeatable events rather than manual, risky ones.",
      outcome: "Teams ship changes with confidence and recover quickly when something does go wrong.",
    },
    {
      domain: "Digital Transformation Programs",
      description:
        "End-to-end modernization — from legacy systems to connected, secure digital operations.",
      technologies: ["Systems Integration", "Change Management", "Security & Compliance"],
      approach:
        "Legacy systems are mapped and modernized incrementally — integration first, replacement only where it earns its cost — so the organization keeps operating throughout.",
      outcome: "A digital operation that is more connected, more secure and easier to change going forward.",
    },
  ] satisfies WorkShowcase[],
} as const;

// ---------------------------------------------------------------------------
// Deep-page content. Home keeps its existing teaser sections (techJourney,
// aiReady, selectedWork, about, qtt, contact) exactly as they are — the
// exports below back the dedicated routes and expand on the same, already
// -verified facts rather than introducing new ones.
// ---------------------------------------------------------------------------

export type CapabilityGroup = {
  key: string;
  heading: string;
  description: string;
  items: string[];
};

// The same six domains as techJourney's four stages, regrouped one level
// deeper (Cybersecurity and AI split out on their own, Digital Transformation
// pulled together from pieces of Strategy/Protect/selectedWork) — no new
// capability is introduced that isn't already represented on the home page.
export const capabilities = {
  eyebrow: "Capabilities",
  heading: ["Technology Strategy &", "Software Engineering"],
  intro:
    "Six areas of technology work, each one a discipline in its own right rather than a line item — strategy, engineering, infrastructure, intelligent systems, security and transformation, applied together on real systems.",
  groups: [
    {
      key: "strategy",
      heading: "Technology Strategy",
      description:
        "Every engagement starts here — before architecture, before code. Technology decisions get mapped to business outcomes: what to build, what to buy, what to defer, and how a system needs to be shaped to hold up as the organization scales.",
      items: ["Technology strategy", "IT advisory", "Architecture planning"],
    },
    {
      key: "engineering",
      heading: "Software Engineering",
      description:
        "Systems assembled with discipline, from the foundation up — web and mobile applications, enterprise systems and custom software built to the constraints of the problem rather than to a generic template.",
      items: ["Web applications", "Mobile applications", "Enterprise systems", "Custom software"],
    },
    {
      key: "cloud-devops",
      heading: "Cloud & DevOps",
      description:
        "Infrastructure and delivery pipelines designed so systems can multiply, connect and hold under real-world load — CI/CD, cloud infrastructure and operational tooling that make releases routine instead of risky.",
      items: ["Cloud", "DevOps", "CI/CD", "Infrastructure"],
    },
    {
      key: "ai",
      heading: "AI & Intelligent Systems",
      description:
        "Intelligent systems and automation applied as part of the broader engineering discipline — moving from raw data to intelligence, automation and systems that act on it, rather than AI treated as a bolt-on feature.",
      items: ["Intelligent systems", "Automation", "AI-assisted software", "Data-driven systems"],
    },
    {
      key: "cybersecurity",
      heading: "Cybersecurity",
      description:
        "Security designed in from the start, not added afterward — information security, structured testing and QA, and compliance considered alongside every architecture decision.",
      items: ["Cybersecurity", "Information security", "Testing & QA", "Compliance"],
    },
    {
      key: "digital-transformation",
      heading: "Digital Transformation",
      description:
        "End-to-end modernization programs — systems integration and change management that move an organization from legacy operations to connected, secure digital ones, with sustainability considered alongside cost and performance.",
      items: [
        "Systems integration",
        "Change management",
        "Security & compliance",
        "Sustainability & Green IT",
      ],
    },
  ] satisfies CapabilityGroup[],
  cta: { label: "Discuss a Project", href: "/contact" },
} as const;

export type Service = {
  key: string;
  name: string;
  problem: string;
  approach: string;
  outcome: string;
  relatedCapabilities: string[];
};

export const services = {
  eyebrow: "Services",
  heading: ["Technology Consulting,", "Software Development & Cloud/DevOps Services"],
  intro:
    "Technology consulting and software development for organizations that need a strategist and a builder in the same engagement — not a hand-off between the two.",
  items: [
    {
      key: "technology-consulting",
      name: "Technology Consulting",
      problem:
        "A technology decision — build vs. buy, platform choice, architecture direction — needs to be made correctly the first time, because reversing it later is expensive.",
      approach:
        "Independent assessment of the current systems and business goals, followed by a clear, opinionated recommendation grounded in technology strategy and IT advisory experience.",
      outcome: "A decision made with confidence, backed by reasoning the team can act on immediately.",
      relatedCapabilities: ["Technology strategy", "IT advisory", "Architecture planning"],
    },
    {
      key: "custom-software",
      name: "Custom Software Development",
      problem:
        "Off-the-shelf software doesn't fit the actual workflow, forcing the organization to work around the tool instead of the tool working for them.",
      approach:
        "Custom software built around the real process — from architecture planning through to a working, maintainable system.",
      outcome: "Software that fits the business instead of the business adapting to the software.",
      relatedCapabilities: ["Custom software", "Enterprise systems", "Architecture planning"],
    },
    {
      key: "enterprise-applications",
      name: "Enterprise Application Development",
      problem:
        "Growing organizations outgrow spreadsheets and disconnected tools, and need systems that hold shared data, roles and process consistently across teams.",
      approach:
        "Enterprise systems designed with security and performance in mind from the first architecture decision, on cloud-native foundations.",
      outcome: "A single, reliable system of record that scales with the organization instead of against it.",
      relatedCapabilities: ["Enterprise systems", "Cloud", "Cybersecurity"],
    },
    {
      key: "web-applications",
      name: "Web Application Development",
      problem:
        "A web product needs to be fast, accessible and reliable across a wide range of browsers, devices and network conditions — not just on a developer's laptop.",
      approach:
        "Web applications engineered for real-world performance and accessibility, built on modern, cloud-native foundations.",
      outcome: "A web product that performs and holds up in production, not just in a demo.",
      relatedCapabilities: ["Web applications", "Cloud", "Testing & QA"],
    },
    {
      key: "mobile-applications",
      name: "Mobile Application Development",
      problem:
        "Mobile users are unforgiving of slow, unreliable apps, and cross-platform consistency is hard to get right without dedicated performance engineering.",
      approach:
        "Cross-platform mobile applications engineered for reliability across devices and networks, with performance treated as a first-class requirement.",
      outcome: "A mobile product users can depend on, on the devices and networks they actually have.",
      relatedCapabilities: ["Mobile applications", "Testing & QA"],
    },
    {
      key: "cloud-devops",
      name: "Cloud & DevOps",
      problem:
        "Manual deployments and ad-hoc infrastructure slow teams down and turn every release into a risk.",
      approach:
        "CI/CD pipelines and infrastructure-as-code designed for high availability and operational confidence, across cloud and multi-cloud environments.",
      outcome: "Releases become routine, and the infrastructure scales with demand instead of against it.",
      relatedCapabilities: ["Cloud", "DevOps", "CI/CD", "Infrastructure"],
    },
    {
      key: "ai-automation",
      name: "AI & Automation",
      problem:
        "Manual, repetitive processes limit how much an organization can do with the people it has, and raw data often goes unused.",
      approach:
        "Intelligent systems and automation applied where they genuinely reduce manual work — moving from data to intelligence to automated action as part of the wider system, not as an isolated experiment.",
      outcome: "Fewer manual bottlenecks, and data put to active use instead of sitting unused.",
      relatedCapabilities: ["Intelligent systems", "Automation", "AI-assisted software"],
    },
    {
      key: "digital-transformation",
      name: "Digital Transformation",
      problem:
        "Legacy systems and disconnected processes slow an organization down and put security and compliance at risk.",
      approach:
        "End-to-end modernization — systems integration and change management that move legacy operations to connected, secure digital ones, incrementally rather than in one disruptive cut-over.",
      outcome: "A digital operation that is more connected, more secure, and easier to change going forward.",
      relatedCapabilities: ["Systems integration", "Change management", "Security & compliance"],
    },
  ] satisfies Service[],
  cta: { label: "Start a Conversation", href: "/contact" },
} as const;

export const aiPage = {
  eyebrow: "AI & Intelligent Systems",
  heading: ["AI Software Development", "& Intelligent Automation"],
  intro:
    "AI, automation and intelligent systems approached as part of the broader technology engineering discipline — not as a separate practice bolted onto existing systems.",
  paragraphs: [
    "Intelligent systems, automation and modern AI are changing how organizations build, operate and grow — but the value only shows up when they're engineered into a system properly, with the same discipline applied to strategy, architecture, security and operations elsewhere.",
    "The way I think about this work follows a simple flow: data first, then intelligence drawn from it, then automation that acts on that intelligence, then systems that run it reliably at scale. Skipping straight to 'add AI' without the data and systems foundation underneath it is where most AI initiatives stall.",
    "This is presented as applied engineering, not research. The goal is AI-assisted software and automation that measurably reduces manual work or improves a decision — built, tested and operated with the same rigor as any other production system.",
  ],
  flow: aiReady.flow,
  cta: { label: "Discuss an AI or Automation Project", href: "/contact" },
} as const;

export const aboutPage = {
  eyebrow: "About",
  heading: ["Technology Consultant,", "Strategist & Builder"],
  intro:
    "I am S. Sathish Kumar, Founder & CEO of Queen Touch Technology, a technology consultant and strategist based in Thoothukudi, Tamil Nadu, India, working with organizations globally.",
  sections: [
    {
      heading: "Background",
      paragraphs: [
        "With over a decade of experience across IT projects, enterprise software and digital transformation, I work at the intersection of technology strategy and hands-on engineering — planning a system and then building it, rather than handing that gap to someone else.",
      ],
    },
    {
      heading: "Founder & Technology Leadership",
      paragraphs: [
        "As Founder & CEO of Queen Touch Technology, I lead a technology company focused on delivering IT services and digital solutions to clients globally — enterprise web and mobile applications, cloud and DevOps, cybersecurity, custom software, digital transformation, and sustainability-minded IT.",
        "That dual role — business leadership and technical execution — shapes how I approach every engagement: decisions get evaluated for both technical soundness and business impact, not one at the expense of the other.",
      ],
    },
    {
      heading: "Philosophy",
      paragraphs: [
        "Technology is only valuable when it creates real impact. Strategy without execution stays a slide deck; execution without strategy drifts. Every engagement is treated as a system — strategy, build, scale and protect — engineered as a whole rather than as disconnected phases.",
      ],
    },
    {
      heading: "India → Global",
      paragraphs: [
        "Built in India, working with the world. I collaborate with organizations and teams internationally, on a fully global and remote basis, bringing the same standard of technology leadership regardless of where a client is based.",
      ],
    },
    {
      heading: "Queen Touch Technology",
      paragraphs: [
        "Queen Touch Technology (QTT) is the company I founded and lead — the vehicle through which the strategy, engineering, cloud/DevOps, cybersecurity and digital transformation work described on this site is delivered for clients.",
      ],
    },
  ],
  cta: { label: "Visit Queen Touch Technology", href: person.qttUrl },
} as const;

export const contactPage = {
  eyebrow: "Contact",
  heading: ["Technology Strategist &", "Consultant — Available Globally"],
  intro:
    "Based in India, working globally and remotely with startup founders, CTOs, engineering leaders and organizations planning software, cloud, DevOps, AI or digital transformation work.",
  guidance: {
    heading: "What to include in your message",
    items: [
      "A short description of the problem or project",
      "Rough timeline or urgency",
      "Any existing systems, constraints or technology already in place",
      "Whether you're looking for strategy/consulting, hands-on build, or both",
    ],
  },
  cta: { label: "Start a Conversation", href: `mailto:${person.email}` },
} as const;

export type ArticleCategory =
  | "AI"
  | "Software Engineering"
  | "Cloud"
  | "DevOps"
  | "Cybersecurity"
  | "Digital Transformation"
  | "Technology Strategy";

export const articleCategories: ArticleCategory[] = [
  "Technology Strategy",
  "Software Engineering",
  "AI",
  "Cloud",
  "DevOps",
  "Cybersecurity",
  "Digital Transformation",
];

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  datePublished: string;
};

// Intentionally empty — no fabricated posts. Populate this array with real
// articles as they're written; /articles and /articles/[slug] are already
// wired to render and index whatever lands here.
export const articles: Article[] = [];

export const articlesPage = {
  eyebrow: "Articles",
  heading: ["Technical Writing on", "Software, Cloud & Strategy"],
  intro:
    "Long-form technical articles on software engineering, cloud, DevOps, cybersecurity, AI and digital transformation — published here as they're written.",
  emptyState:
    "Articles are in progress and will be published here as they're ready. The topics below are the areas this space will cover.",
} as const;
