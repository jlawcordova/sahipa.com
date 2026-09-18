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

/** Wordmarks for the "Trusted by" band. Swap these for real logo files any time. */
export const trustedBy = [
  { name: "Haptech", detail: "Medical & Diagnostic Company" },
  { name: "Multi-Purpose Cooperative", detail: "Financial Records" },
  { name: "Key Mortgages", detail: "New Zealand" },
] as const;

export type CapabilityTone = "deep" | "red" | "teal";

export type Capability = {
  title: string;
  body: string;
  icon: "calculator" | "home" | "message" | "zap" | "calendar";
  tone: CapabilityTone;
  span: "third" | "half";
};

export const capabilities: Capability[] = [
  {
    title: "Accounting & Financial Records",
    body: "Reliable bookkeeping and financial record-keeping for cooperatives, medical practices, and hospitals - accurate, organized, and audit-ready.",
    icon: "calculator",
    tone: "deep",
    span: "third",
  },
  {
    title: "Mortgage Loan Processing & Administration",
    body: "End-to-end loan administration support with hands-on experience serving New Zealand-based clients - from documentation to processing, done right the first time.",
    icon: "home",
    tone: "red",
    span: "third",
  },
  {
    title: "Customer Support",
    body: "Responsive, friendly client communication that keeps borrowers informed and processes moving without delays or dropped balls.",
    icon: "message",
    tone: "teal",
    span: "third",
  },
  {
    title: "AI-Powered Workflow",
    body: "Leverages AI tools to speed up documentation, reporting, and admin tasks - faster turnaround without sacrificing accuracy.",
    icon: "zap",
    tone: "teal",
    span: "half",
  },
  {
    title: "Executive Assistance",
    body: "Dependable administrative and organizational support, keeping schedules, priorities, and day-to-day operations running smoothly.",
    icon: "calendar",
    tone: "red",
    span: "half",
  },
];
