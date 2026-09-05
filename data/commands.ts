import { links, navSections } from "./portfolio";

export type CommandAction =
  | { type: "navigate"; sectionId: string }
  | { type: "help" }
  | { type: "clear" }
  | { type: "status" }
  | { type: "resume" }
  | { type: "contact-email" }
  | { type: "contact-linkedin" }
  | { type: "contact-github" }
  | { type: "theme" };

export interface CommandDefinition {
  command: string;
  aliases: string[];
  description: string;
  action: CommandAction;
}

const moduleCommands: CommandDefinition[] = navSections.map((section) => ({
  command: section.id,
  aliases: [`open ${section.id}`, `show ${section.id}`, `inspect ${section.id}`, `go ${section.id}`],
  description: `Navigate to the ${section.label} module.`,
  action: { type: "navigate", sectionId: section.id }
}));

export const commands: CommandDefinition[] = [
  ...moduleCommands,
  {
    command: "about",
    aliases: ["open about", "show about", "inspect about"],
    description: "Navigate to the About module.",
    action: { type: "navigate", sectionId: "about" }
  },
  {
    command: "index",
    aliases: ["home", "top"],
    description: "Return to the archive index.",
    action: { type: "navigate", sectionId: "index" }
  },
  {
    command: "help",
    aliases: ["?", "help --commands", "man"],
    description: "List every available command.",
    action: { type: "help" }
  },
  {
    command: "clear",
    aliases: ["cls"],
    description: "Clear the terminal output log.",
    action: { type: "clear" }
  },
  {
    command: "status",
    aliases: ["uptime"],
    description: "Report current system status.",
    action: { type: "status" }
  },
  {
    command: "resume",
    aliases: ["download resume", "get resume", "cv"],
    description: "Download the résumé.",
    action: { type: "resume" }
  },
  {
    command: "contact",
    aliases: ["contact --email"],
    description: "Copy the contact email address.",
    action: { type: "contact-email" }
  },
  {
    command: "contact --linkedin",
    aliases: ["linkedin"],
    description: "Open the LinkedIn profile.",
    action: { type: "contact-linkedin" }
  },
  {
    command: "contact --github",
    aliases: ["github"],
    description: "Open the GitHub profile.",
    action: { type: "contact-github" }
  },
  {
    command: "theme",
    aliases: [],
    description: "System theme is fixed to the DC Archives palette.",
    action: { type: "theme" }
  }
];

export const commandListText = commands
  .filter((c) => !navSections.some((s) => s.id === c.command))
  .map((c) => c.command)
  .concat(navSections.map((s) => s.id));

export const primaryCommandNames = [...new Set(commands.map((c) => c.command))];

export function resolveCommand(raw: string): CommandDefinition | null {
  const normalized = raw.trim().toLowerCase();
  if (!normalized) return null;
  return (
    commands.find((c) => c.command === normalized) ??
    commands.find((c) => c.aliases.includes(normalized)) ??
    null
  );
}

export const resumeUrl = links.resume;
