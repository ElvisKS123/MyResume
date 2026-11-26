// All résumé content lives here. Text is kept exactly as written on the
// original site (apart from obvious spelling fixes), so every screen reads
// from one source of truth.

export type Status = "current" | "in-progress" | "completed" | "prototype" | "group" | "live"

export const profile = {
  name: "Elvis SHIMWA",
  initials: "ES",
  title: "Software Developer",
  tagline: "Creative Coder, Consistent Builder.",
  roles: "Web Designer and Programmer",
  intro:
    "As a Software developer, I create responsive and scalable web applications using modern frameworks and clean design principles.",
  closing: "Let’s build something impactful together.",
  summary:
    "A driven and detail-oriented aspiring software engineer with a strong passion for building innovative, user-friendly web development. Eager to apply technical skills and contribute meaningfully to impactful and challenging projects.",
  contactTagline: "Looking forward to hearing from you",
  availability: "collaborations, job opportunities, or any inquiries",
}

export const journey = {
  paragraphs: [
    "My journey into technology wasn't something I originally planned. Growing up, I dreamed of becoming a Chemical Engineer, fascinated by science and the idea of creating solutions through engineering. However, as I explored different fields and discovered the power of technology, my interests began to change.",
    "Today, I am pursuing Software Engineering at African Leadership University, where I am developing my skills in software development, problem-solving, and building digital solutions.",
    "Although my career direction changed, my ambition remained the same: to use engineering and innovation to solve real-world problems. My goal is to build technology that creates meaningful impact in Rwanda and across Africa, while growing into a software engineer, entrepreneur, and technology founder.",
  ],
  closing:
    "I believe that changing direction does not mean losing your original dream. Sometimes, it means discovering a new way to achieve an even bigger one.",
}

export const contact = {
  phoneDisplay: "+(250)-787-932-359",
  phoneShort: "+250 787 932 359",
  phoneHref: "tel:+250787932359",
  email: "e.shimwa2@alustudent.com",
  whatsappHref: "https://wa.me/250787932359",
  github: { handle: "ElvisKS123", href: "https://github.com/ElvisKS123" },
  linkedin: { handle: "in/ElvisShimwa", href: "https://www.linkedin.com/in/ElvisShimwa/" },
  instagram: { handle: "@_____elviss_", href: "https://www.instagram.com/_____elviss_" },
}

export type Experience = {
  role: string
  org: string
  start: string
  end: string
  status: Status
  description: string
  highlights: string[]
}

export const experience: Experience[] = [
  {
    role: "Full-Stack Developer",
    org: "EXMACO LTD CO",
    start: "2023",
    end: "Present",
    status: "current",
    description:
      "Built and maintained full-stack web features to support daily operations and enhance user satisfaction.",
    highlights: [
      "Managed sales and inventory data through accurate backend integration.",
      "Developed and optimized web applications using HTML, CSS, JavaScript, and Python.",
      "Assisted with data analysis and reporting to improve business performance.",
    ],
  },
  {
    role: "Software Developer",
    org: "ViandFOUR Bakery",
    start: "2021",
    end: "2024",
    status: "completed",
    description:
      "Developed and maintained the bakery's website, enhancing user experience and increasing online orders and sales.",
    highlights: [
      "Designed and implemented responsive web pages using HTML, CSS, and JavaScript.",
      "Integrated payment gateways and optimized the website for better performance.",
      "Collaborated with the marketing team to improve online visibility and customer engagement.",
    ],
  },
]

export type Education = {
  degree: string
  school: string
  start: string
  end: string
  status: Status
  description: string
  gpa?: { value: string; scale: string }
  highlights: string[]
}

export const education: Education[] = [
  {
    degree: "Bachelor’s Degree",
    school: "African Leadership University",
    start: "2024",
    end: "Present",
    status: "in-progress",
    description: "Pursuing a degree in software engineering.",
    gpa: { value: "3.2", scale: "4.0" },
    highlights: [
      "Relevant Coursework: Data Structures and Algorithms, Frontend Web Development, Database Management, Linux and Python Programming.",
    ],
  },
  {
    degree: "High School Diploma",
    school: "Blues International School",
    start: "2020",
    end: "2023",
    status: "completed",
    description:
      "Majored in Physics, Chemistry, and Mathematics, and took part in various extracurricular activities.",
    highlights: [
      "Graduated with high grades in all subjects.",
      "Participated in the school's sports team, including basketball, soccer, and track and field.",
      "Engaged in extracurricular activities such as Club.",
    ],
  },
]

// Original skills plus the technologies used in the projects below.
export const skillGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "SQL", "Dart"] },
  {
    label: "Frameworks & Libraries",
    items: ["React", "Node.js", "Express", "Tailwind CSS", "shadcn/ui", "Prisma", "Flutter"],
  },
  { label: "Databases & Backend Services", items: ["PostgreSQL", "MongoDB", "Firebase", "Stripe"] },
  { label: "Tools & Platforms", items: ["Linux", "Git", "GitHub", "Vite", "Vercel", "Render", "Railway"] },
  {
    label: "Practice",
    items: [
      "Web Development",
      "Responsive Design",
      "REST APIs",
      "Authentication (JWT, Google Sign-In)",
      "Role-Based Access Control",
      "Mobile App Development",
    ],
  },
]

export const allSkills = skillGroups.flatMap((g) => g.items)

export type ProjectLink = { label: string; href: string; type: "live" | "code" }

export type Project = {
  slug: string
  name: string
  kind: "Web app" | "Mobile app" | "Game" | "Prototype"
  status: Status
  summary: string
  details: string[]
  tags: string[]
  links: ProjectLink[]
}

const gh = (repo: string, label = "View code"): ProjectLink => ({
  label,
  href: `https://github.com/${repo}`,
  type: "code",
})
const live = (href: string, label = "Open live app"): ProjectLink => ({ label, href, type: "live" })

export const projects: Project[] = [
  {
    slug: "vouchify",
    name: "Vouchify",
    kind: "Web app",
    status: "live",
    summary:
      "Journal voucher and payment application for companies: create balanced vouchers, turn an Excel file of transactions into separate PDF vouchers, run an approval workflow, and export PDFs and Excel registers.",
    details: [
      "Journal voucher and payment application for companies: create balanced vouchers, turn an Excel file of transactions into separate PDF vouchers, run an approval workflow, and export PDFs and Excel registers. Each company has its own private workspace.",
      "Role-based access: Administrator, Accountant, Approver and Viewer. Sign-in with email and password, Sign in with Google, and password reset by email.",
      "Built with React 19, TypeScript, Vite, Tailwind CSS and shadcn/ui on the front end, and Node.js, Express and PostgreSQL with Prisma on the back end.",
    ],
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    links: [live("https://vouchify-8tbo.onrender.com/")],
  },
  {
    slug: "chars",
    name: "Community Health Access & Records System",
    kind: "Web app",
    status: "live",
    summary:
      "CHARS is a full-stack clinic management platform for community health centers that replaces paper-based workflows with secure digital records.",
    details: [
      "CHARS is a full-stack clinic management platform for community health centers. It replaces paper-based workflows with secure digital records, triage, doctor assignment, clinical history, lab tracking, medication/allergy/immunization management, patient file storage, and audit visibility.",
      "Health center registration with multi-tenant clinic separation, and role-based access for admins, doctors and receptionists.",
      "Patient registration and profiles, receptionist-led triage and doctor assignment, doctor-facing medical records review, secure document upload, and audit logging for important data changes.",
      "Built with React, Vite and Tailwind on the front end (Vercel), and Node.js, Express and PostgreSQL with JWT authentication on the back end (Railway).",
    ],
    tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    links: [
      live("https://community-health-access-and-records.vercel.app"),
      gh("ElvisKS123/community-health-access-and-records-system-web-app"),
    ],
  },
  {
    slug: "smart-file-convert",
    name: "Smart File Convert",
    kind: "Web app",
    status: "live",
    summary:
      "A modern, all-in-one file management web application built with React, TypeScript, and Tailwind CSS.",
    details: [
      "A modern, all-in-one file management web application built with React, TypeScript, and Tailwind CSS.",
      "Convert between PDF, Word, Excel, PowerPoint, and image formats; merge multiple documents into a single file; split documents into separate files; and compress files while maintaining quality.",
      "Includes drag-and-drop uploads and a light/dark theme toggle.",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS"],
    links: [live("https://smart-file-convert.vercel.app"), gh("ElvisKS123/Smart-File-Convert")],
  },
  {
    slug: "sokopop",
    name: "Sokopop",
    kind: "Mobile app",
    status: "group",
    summary: "Sokopop is a Flutter + Firebase marketplace app for ALU students.",
    details: [
      "Sokopop is a Flutter + Firebase marketplace app for ALU students.",
      "Includes the app UI, an authentication flow (email/password, Google Sign-In and password reset), and Firestore-backed listing features.",
      "Built as a team project, with tests and code-quality checks set up for the submission.",
    ],
    tags: ["Flutter", "Dart", "Firebase"],
    links: [gh("ElvisKS123/sokopop_flutter_app")],
  },
  {
    slug: "food-del",
    name: "Food Delivery App",
    kind: "Web app",
    status: "completed",
    summary:
      "Full-stack food delivery app with a customer storefront, an admin panel, and an Express + MongoDB API.",
    details: [
      "Customer storefront: browse the menu, add items to a cart, place orders with Stripe checkout, and track them under My Orders.",
      "Admin panel: add food items, list the menu, and manage incoming orders.",
      "Back end: Node.js and Express with MongoDB (Mongoose), JWT sign-in and image uploads.",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    links: [gh("ElvisKS123/food-del")],
  },
  {
    slug: "e-wallet",
    name: "E-Wallet App",
    kind: "Web app",
    status: "group",
    summary:
      "Team-built digital wallet for storing cards and documents by category, with sign-up, login and a backend API.",
    details: [
      "A dashboard that groups saved items into categories (bank cards, IDs, licences, Tap & Go and documents), with colour-coded cards, filters, and dialogs to add and view card details.",
      "Authentication and card management connected to a backend API.",
      "Built with React and TypeScript as a group project.",
    ],
    tags: ["React", "TypeScript", "Group Project"],
    links: [gh("enock04/E_Wallet_App")],
  },
  {
    slug: "snake-game",
    name: "Snake Game",
    kind: "Game",
    status: "live",
    summary:
      "A modern implementation of the classic Snake game with advanced game mechanics, particle effects, a sound system, and mobile support.",
    details: [
      "A modern, professional implementation of the classic Snake game with advanced game mechanics, particle effects, a sound system, and mobile support.",
      "Plays directly in the browser on desktop and mobile, with no downloads required.",
    ],
    tags: ["JavaScript"],
    links: [live("https://snake-one-iota.vercel.app", "Play now"), gh("ElvisKS123/snake-game")],
  },
  {
    slug: "grade-calculator",
    name: "Grade Calculator",
    kind: "Web app",
    status: "group",
    summary:
      "This is a web app that I built to help students calculate their GPA based on their grades and credits.",
    details: [
      "This is a web app that I built to help students calculate their GPA based on their grades and credits.",
      "It allows users to input their grades and credits, and it calculates the GPA automatically.",
    ],
    tags: ["JavaScript", "Group Project"],
    links: [gh("hirwakelly869/JavaScript-GPA-Calculator---Group-Project", "View Code on GitHub")],
  },
  {
    slug: "submission-reminder-app",
    name: "Submission Reminder App",
    kind: "Prototype",
    status: "prototype",
    summary:
      "This is a prototype of a web app that I built to help students keep track of their assignments and deadlines.",
    details: [
      "This is a prototype of a web app that I built to help students keep track of their assignments and deadlines.",
    ],
    tags: ["Prototype"],
    links: [gh("ElvisKS123/submission_reminder_app_Kagaba123", "View Prototype Code")],
  },
]
