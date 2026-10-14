// Single source of truth for everything personal on the site.
// Both the normal page and Dev Mode's terminal read from here, so edit text in one place.

export type ExternalLink = {
  label: string;
  href: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

// Illustrated cover for projects without a screenshot (drawn in ProjectCover).
export type CoverArt =
  | "gourd-phone"
  | "farm-map"
  | "mobile-shop"
  | "web-shop"
  | "wireframe-house"
  | "house-booking"
  | "face-scan";

// Primary language, from each repo on GitHub. Drives the file icon in the project explorer.
export type ProjectLanguage = "TypeScript" | "JavaScript" | "Python" | "PHP";

export type Project = {
  slug: string; // used by the terminal: `open <slug>`
  title: string;
  context: string;
  period: string;
  description: string;
  language: ProjectLanguage;
  stack: string[];
  links: ExternalLink[];
  image: ProjectImage | null;
  art: CoverArt | null; // used when there's no image
  isFeatured: boolean;
};

export type Commit = {
  date: string;
  message: string;
  tag: "work" | "school" | "side-project" | "learning";
  details: string[];
};

export type AiPillar = {
  title: string;
  description: string;
  tools: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Education = {
  level: string;
  school: string;
  period: string;
};

export type Role = {
  title: string;
  employmentType: "Full-time" | "Contract" | "Internship";
  period: string;
  highlights: string[];
};

// One company with its roles, newest first (how LinkedIn groups promotions).
export type Employer = {
  company: string;
  location: string;
  roles: Role[];
};

export type Publication = {
  title: string;
  authors: string[];
  role: string;
  venue: string;
  date: string;
  summary: string;
  findings: string[];
  links: ExternalLink[];
};

export const profile = {
  firstName: "Josh",
  shortName: "Josh Tan",
  fullName: "Josh Ziemenn Tan",
  role: "Web developer",
  location: "Makati, Philippines",
  timeZone: "Asia/Manila",
  email: "joshziemenntan998@gmail.com",
  emailSubject: "Saw your portfolio", // prefilled when visitors write from the site
  currentRole: "Junior Developer",
  currentCompany: "PhilFirst Non-Life",
  intro:
    "I build web apps and internal tools, currently as a junior developer at PhilFirst, and I work hand in hand with AI to ship faster. I started college without ever writing a line of code, and I've been building things ever since.",
} as const;

export const socialLinks = {
  github: { label: "GitHub", href: "https://github.com/Shiidoooo" },
  // Older account, no longer active, but some school projects live there.
  githubOld: { label: "Older GitHub", href: "https://github.com/Shiido09" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/tan-josh-ziemenn-074772399/" },
  email: { label: "Email", href: `mailto:${profile.email}` },
  // Cloudinary serves this as an image of the one-page CV (raw PDF delivery is disabled on the account).
  resume: { label: "Resume", href: "https://res.cloudinary.com/dcfhfo3ol/image/upload/f_auto/q_auto/TAN_CV_uaxlpn.pdf" },
} satisfies Record<string, ExternalLink>;

export const portrait = {
  src: "/images/josh.jpg",
  alt: "Josh Ziemenn Tan in a dark suit, seated and leaning forward",
};

export const about = [
  "I walked into my first year of college with zero programming experience. My first languages were C and C++, and the learning curve was steep. But somewhere along the way I got hooked on the logic of it: taking a problem apart until a computer can follow it step by step. There was always something new to figure out, and that feeling never really went away.",
  "Most of what I know came from school projects, because each one pushed me into something I hadn't touched before. VB.NET and PHP early on, then Laravel for a house tour booking site, the MERN stack for an online marketplace and a 3D model generator, and finally React Native and machine learning for our thesis, GourdVision. Along the way I picked up the things that make an app feel real, like Google sign-in, Firebase, live maps and background jobs that keep data clean on their own.",
  "Now I'm a junior developer at PhilFirst, where most of my days go into PHP systems and SQL, moving data between MySQL, Oracle and SQL Server. Outside work I still build small side projects, mostly as an excuse to learn something new. I started from zero and I'm still learning, and honestly, that's my favorite part.",
];

// Newest first.
export const education: Education[] = [
  {
    level: "BS Information Technology",
    school: "Technological University of the Philippines – Taguig",
    period: "2022 – 2026",
  },
  {
    level: "Senior High School · STEM",
    school: "Philippine Christian University",
    period: "2020 – 2022",
  },
];

export const publication: Publication = {
  title: "Impact Analysis of CNN-Based Machine Vision and Soft Robotic Grippers on Labor Efficiency in Automated Berry Harvesting",
  authors: [
    "Josh Ziemenn Tan",
    "Gwyn S. Barte",
    "Ernesto T. Balignasay III",
    "Diana Marie N. Carreon",
    "Romel Jan C. Diaz",
    "Joan C. Mag-isa",
  ],
  role: "First author",
  venue: "Cognizance Journal of Multidisciplinary Studies, Vol. 5, Issue 10, pp. 263–269",
  date: "Oct 2025",
  summary:
    "Picking berries by hand is slow, expensive and hard to staff. We reviewed published data on harvesting robots that pair CNN-based machine vision with soft grippers, to see how much manual work they can actually take over.",
  findings: ["90%+ fruit detection accuracy", "under 5% fruit damage", "4–10 seconds per berry", "replaces 2–5 human pickers"],
  links: [
    { label: "Read the paper (PDF)", href: "https://cognizancejournal.com/vol5issue10/V5I1026.pdf" },
    {
      label: "ResearchGate",
      href: "https://www.researchgate.net/publication/397062228_Impact_Analysis_of_CNN-Based_Machine_Vision_and_Soft_Robotic_Grippers_on_Labor_Efficiency_in_Automated_Berry_Harvesting",
    },
    { label: "DOI", href: "https://doi.org/10.47760/cognizance.2025.v05i10.024" },
  ],
};

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "PHP", "Python", "C#", "Java", "HTML/CSS"] },
  { label: "Frameworks", items: ["React", "Next.js", "React Native", "Node.js", "Express", "Laravel", "Flask", "Tailwind CSS", "Bootstrap"] },
  { label: "Databases", items: ["MySQL", "Oracle", "SQL Server", "MongoDB", "SQLite", "Firebase"] },
  { label: "Cloud & auth", items: ["Cloudinary", "Firebase Auth", "Google Sign-In"] },
  { label: "Tools", items: ["Git", "Postman", "Insomnia", "TOAD for Oracle", "SSMS", "MySQL Workbench"] },
  { label: "AI", items: ["Claude Code", "OpenAI Codex", "Gemini", "OpenCode", "Subagents", "Agent skills", "MCP", "Gemini API", "TensorFlow Lite"] },
];

// Shown in the hero, the contact section and the terminal. Set isOpen to false to hide it everywhere.
export const freelance = {
  isOpen: true,
  label: "Open for freelance projects",
  pitch:
    "I take on freelance work alongside my full-time job. If you need a website, a web app, an internal tool or an AI feature built, let's talk.",
  services: ["Websites", "Web apps", "Internal tools", "AI integrations"],
};

export const aiIntro =
  "AI is part of how I build, not just a buzzword on my resume. I use coding agents every day and set them up properly with subagents, skills and rules. I've also put AI inside real products, and our team trained and shipped our own machine learning model.";

export const aiPillars: AiPillar[] = [
  {
    title: "Coding with AI agents",
    description:
      "Claude Code, Codex, Gemini and OpenCode are part of my daily workflow for planning features, refactoring, writing tests and reviewing code. They help me move faster, and I still read and understand every line that ships.",
    tools: ["Claude", "Claude Code", "OpenAI Codex", "Gemini", "OpenCode"],
  },
  {
    title: "Setting up AI agents",
    description:
      "I don't just chat with AI, I configure it. I write project rules so agents follow my coding standards, build custom skills that act as specialist reviewers for security, QA, databases and frontend, split big tasks across subagents, and connect tools through MCP servers.",
    tools: ["Subagents", "Agent skills", "Rules & CLAUDE.md", "MCP servers", "Multi-agent workflows"],
  },
  {
    title: "AI inside products",
    description:
      "I've built AI into real apps, like the Gemini API in GourdVision, which works alongside our own model to analyze photos farmers take in the field. I know how to prompt these models well and where they fall short.",
    tools: ["Gemini API", "Prompt engineering", "REST APIs"],
  },
  {
    title: "Machine learning",
    description:
      "For our thesis, our team trained a custom model and ran it on-device with TensorFlow Lite. I'm also the first author of a published paper on CNN-based machine vision.",
    tools: ["TensorFlow Lite", "Teachable Machine", "CNNs", "Python"],
  },
];

const juniorDeveloperRole: Role = {
  title: "Junior Developer",
  employmentType: "Full-time",
  period: "Sep 2026 – Present",
  highlights: [
    "Maintain, build and improve PhilFirst's web platforms, from internal systems to public-facing websites.",
    "Develop new APIs and improve existing ones.",
  ],
};

const webDeveloperRole: Role = {
  title: "Web Developer",
  employmentType: "Contract",
  period: "Jun 2026 – Aug 2026",
  highlights: [
    "Built internal tools and web apps in PHP, connecting the frontend pages to backend APIs.",
    "Wrote the SQL and mapping workflows that keep MySQL, Oracle and SQL Server in sync.",
  ],
};

const internRole: Role = {
  title: "Web Developer Intern",
  employmentType: "Internship",
  period: "Feb 2026 – Jun 2026",
  highlights: [
    "Built a C# Windows Forms app that moves data between MySQL and Oracle, plus PHP APIs that map records into the system.",
    "Made a vanilla PHP tool with PHPMailer that splits PDFs automatically and emails them out.",
    "Helped build an online service request system, where requests are filed, tracked and resolved in one place.",
  ],
};

export const experience: Employer[] = [
  {
    company: profile.currentCompany,
    location: "Makati, Metro Manila",
    roles: [juniorDeveloperRole, webDeveloperRole, internRole],
  },
];

// Milestones only, newest first like `git log`. Shown by Dev Mode's `git log`. Keep it short.
export const journey: Commit[] = [
  {
    date: "Oct 2026",
    message: "Build Git History Visualizer, a personal project",
    tag: "side-project",
    details: ["Paste in a public GitHub repo and see its commit activity, releases and top contributors. Built it to finally learn D3 properly."],
  },
  {
    date: "Sep 2026",
    message: "Build Picture Print Layout Editor, a personal project",
    tag: "side-project",
    details: ["A browser tool for mixing different photo sizes on one print sheet, with cropping, spacing controls and cut guides."],
  },
  {
    date: "Sep 2026",
    message: "Join PhilFirst full-time as a Junior Developer",
    tag: "work",
    details: juniorDeveloperRole.highlights,
  },
  {
    date: "Jun 2026",
    message: "Start a contract as Web Developer at PhilFirst",
    tag: "work",
    details: webDeveloperRole.highlights,
  },
  {
    // Confirm: exact graduation month.
    date: "2026",
    message: "Graduate with a BS in Information Technology from TUP Taguig",
    tag: "school",
    details: ["Four years that started with C and ended with GourdVision, our AI-powered thesis for gourd farmers."],
  },
  {
    date: "Feb 2026",
    message: "Start my internship at PhilFirst Non-Life",
    tag: "work",
    details: internRole.highlights,
  },
  {
    date: "Oct 2025",
    message: "Publish my first research paper, as first author, in the Cognizance Journal",
    tag: "school",
    details: ["A peer-reviewed study, written with four classmates and our instructor, on how CNN-based machine vision and soft robotic grippers can take over manual berry harvesting."],
  },
  {
    date: "2022",
    message: "Initial commit: start first year at TUP Taguig with zero coding experience",
    tag: "learning",
    details: ["Came in from the STEM strand at Philippine Christian University. My first languages were C and C++, and I got hooked on the logic."],
  },
];

// Order matters: the first project is featured.
export const projects: Project[] = [
  {
    slug: "gourdvision",
    title: "GourdVision",
    context: "Thesis",
    period: "2025 – 2026",
    description:
      "Our thesis: an AI toolkit for gourd farmers. The Android app scans gourd flowers and leaves, identifies the species and flower gender right on the phone, and tracks planting and pollination so farmers know when their gourds will be ready to harvest. It also has a community forum and news feed, plus a web dashboard for admins and data analytics.",
    language: "JavaScript",
    stack: ["React Native", "Expo", "TensorFlow Lite", "Gemini API", "Node.js", "MongoDB", "React"],
    links: [
      { label: "Website", href: "https://e-gourd.vercel.app/" },
      { label: "Get the Android app", href: "https://e-gourd.vercel.app/#download-app" },
      { label: "Source code", href: "https://github.com/CocoMeme/EGourd" },
    ],
    image: null,
    art: "gourd-phone",
    isFeatured: true,
  },
  {
    slug: "git-history-visualizer",
    title: "Git History Visualizer",
    context: "Side project",
    period: "2026",
    description:
      "Paste in a public GitHub repo and see how it grew: commit activity over time, release markers, top contributors, and commits grouped by Conventional Commit type, with bots and CI noise filtered out.",
    language: "TypeScript",
    stack: ["Next.js", "TypeScript", "React", "D3"],
    links: [{ label: "Live site", href: "https://git-history-visualizer-psi.vercel.app/" }],
    image: {
      src: "/projects/git-history-visualizer.png",
      alt: "Git History Visualizer showing commit activity and contributor stats for facebook/react",
    },
    art: null,
    isFeatured: false,
  },
  {
    slug: "picture-print",
    title: "Picture Print Layout Editor",
    context: "Side project",
    period: "2026",
    description:
      "Mix different photo sizes on one print sheet, crop and position each photo, and add cut guides. Everything runs in the browser, so your photos never get uploaded.",
    // Confirm: language guessed (repo is not public).
    language: "JavaScript",
    stack: ["React"],
    links: [{ label: "Live site", href: "https://picture-project-hazel.vercel.app/" }],
    image: {
      src: "/projects/picture-print-layout-editor.png",
      alt: "Picture Print Layout Editor with an image sidebar and a blank print sheet preview",
    },
    art: null,
    isFeatured: false,
  },
  {
    slug: "harvestconnect",
    title: "HarvestConnect",
    context: "School project",
    period: "2025",
    description:
      "A marketplace that connects local farmers with buyers. Scheduled jobs find and remove expired listings on their own, riders' deliveries show up live on a map, and buyers get an in-app wallet.",
    language: "TypeScript",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Python", "Leaflet"],
    links: [{ label: "Source code", href: "https://github.com/Shiidoooo/farmconnect" }],
    image: null,
    art: "farm-map",
    isFeatured: false,
  },
  {
    slug: "teknorigrealm",
    title: "TeknoRigRealm",
    context: "Mobile e-commerce",
    period: "2025",
    description:
      "A mobile shop for gaming PCs, laptops and parts. Sign in with Google, browse by category, leave reviews and ratings, check out, and get notified as your order moves along. Admins manage products, orders, users and reviews from inside the app.",
    language: "JavaScript",
    stack: ["React Native", "Expo", "Redux", "Node.js", "Express", "MongoDB", "Firebase"],
    links: [{ label: "Source code", href: "https://github.com/Shiido09/TeknoRigRealm-Main" }],
    image: null,
    art: "mobile-shop",
    isFeatured: false,
  },
  {
    slug: "hab-appliances",
    title: "HAB Appliances",
    context: "Web e-commerce",
    period: "2025",
    description:
      "An online appliance store. Shoppers sign in with Google or email, fill a cart, check out and track their orders. Admins get a dashboard for products, brands, blog posts, orders and users.",
    language: "JavaScript",
    stack: ["React", "Redux", "Material UI", "Node.js", "Express", "MongoDB", "Firebase"],
    links: [{ label: "Source code", href: "https://github.com/Shiido09/HAB_APPLIANCES" }],
    image: null,
    art: "web-shop",
    isFeatured: false,
  },
  {
    slug: "civimodeler",
    title: "Civimodeler",
    context: "School project",
    period: "2025",
    description:
      "Describe a structure and set a budget, and it generates a 3D model you can look around in the browser. Python handles the material and structural math, and the Sloyd API builds the model.",
    language: "JavaScript",
    stack: ["MERN", "Three.js", "Python", "Sloyd API"],
    links: [{ label: "Source code", href: "https://github.com/CocoMeme/CiviModeler-SIA2" }],
    image: null,
    art: "wireframe-house",
    isFeatured: false,
  },
  {
    slug: "affordihomes",
    title: "Affordihomes",
    context: "School project",
    period: "2024",
    description:
      "A property viewing site where buyers can book house tours, with accounts, booking management and a dashboard showing which agents are free.",
    language: "PHP",
    stack: ["Laravel", "Blade", "MySQL", "Tailwind CSS"],
    // Confirm: assumed AffordiTechHomes is the Affordihomes repo.
    links: [{ label: "Source code", href: "https://github.com/LacaoProtatooo/AffordiTechHomes" }],
    image: null,
    art: "house-booking",
    isFeatured: false,
  },
  {
    slug: "python-attendance",
    title: "Face Recognition Attendance",
    context: "Contributor",
    period: "2025",
    description:
      "A desktop app that takes attendance by recognizing faces through the webcam. It registers each person with a quick burst of face samples, marks them present when it sees them again, and keeps records in separate admin and student dashboards.",
    language: "Python",
    stack: ["Python", "OpenCV", "Tkinter", "SQLite"],
    links: [{ label: "Source code", href: "https://github.com/LacaoProtatooo/Python-Attendance" }],
    image: null,
    art: "face-scan",
    isFeatured: false,
  },
];
