export const site = {
  name: "Jollie Sahipa",
  initials: "JS",
  role: "Mortgage Support Specialist",
  tagline: "Strategic Consulting & Business Leadership",
  email: "jollie@sahipa.com",
  url: "https://sahipa.com",
  intro:
    "Detail-oriented Mortgage Support Specialist experienced in loan documentation, client communication, and financial reporting, with a strong foundation in accounting and journal entry.",
  disciplines: ["Admin", "Business", "Finance", "Support"],
} as const;

/** Logos for the "Trusted by" band. */
export const trustedBy = [
  {
    name: "Haptech",
    detail: "Medical & Diagnostic Company",
    logo: "/logos/haptech.png",
  },
  {
    name: "Magsige Multipurpose Cooperative",
    detail: "Financial Records",
    logo: "/logos/magsige-coop.png",
  },
  {
    name: "Key Mortgages",
    detail: "New Zealand",
    logo: "/logos/key-mortgages.png",
  },
] as const;

export type Capability = {
  title: string;
  body: string;
  icon: "calculator" | "home" | "message" | "zap" | "calendar";
  span: "third" | "half";
};

export const capabilities: Capability[] = [
  {
    title: "Accounting & Financial Records",
    body: "Reliable bookkeeping and financial record-keeping for cooperatives, medical practices, and hospitals - accurate, organized, and audit-ready.",
    icon: "calculator",
    span: "third",
  },
  {
    title: "Mortgage Loan Processing & Administration",
    body: "End-to-end loan administration support with hands-on experience serving New Zealand-based clients - from documentation to processing, done right the first time.",
    icon: "home",
    span: "third",
  },
  {
    title: "Customer Support",
    body: "Responsive, friendly client communication that keeps borrowers informed and processes moving without delays or dropped balls.",
    icon: "message",
    span: "third",
  },
  {
    title: "AI-Powered Workflow",
    body: "Leverages AI tools to speed up documentation, reporting, and admin tasks - faster turnaround without sacrificing accuracy.",
    icon: "zap",
    span: "half",
  },
  {
    title: "Executive Assistance",
    body: "Dependable administrative and organizational support, keeping schedules, priorities, and day-to-day operations running smoothly.",
    icon: "calendar",
    span: "half",
  },
];
