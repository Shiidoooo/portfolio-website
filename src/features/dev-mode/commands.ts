// Dev Mode terminal: a pure command interpreter. It only returns data
// (lines to print + an optional effect); the Terminal component renders it.

import {
  about,
  aiIntro,
  aiPillars,
  freelance,
  journey,
  profile,
  projects,
  publication,
  skillGroups,
  socialLinks,
} from "@/content/profile";
import { toCommitHash } from "@/lib/commitHash";
import { buildEmailComposeOptions } from "@/lib/emailCompose";

export type LineTone = "default" | "muted" | "accent" | "error";

export type TerminalLine =
  | { kind: "input"; text: string }
  | { kind: "text"; text: string; tone: LineTone }
  | { kind: "pre"; text: string; tone: LineTone }
  | { kind: "link"; label: string; href: string }
  | { kind: "commit"; hash: string; date: string; message: string; isHead: boolean }
  | { kind: "blank" };

export type CommandEffect =
  | { type: "clear" }
  | { type: "exit" }
  | { type: "open-url"; href: string }
  | { type: "copy"; text: string };

export type CommandResult = {
  lines: TerminalLine[];
  effect: CommandEffect | null;
};

export type CommandContext = {
  history: string[];
  now: Date;
};

type CommandDefinition = {
  name: string;
  usage: string;
  description: string;
  isSecret: boolean;
  run: (args: string[], context: CommandContext) => CommandResult;
};

const text = (value: string, tone: LineTone = "default"): TerminalLine => ({ kind: "text", text: value, tone });
const pre = (value: string, tone: LineTone = "default"): TerminalLine => ({ kind: "pre", text: value, tone });
const link = (label: string, href: string): TerminalLine => ({ kind: "link", label, href });
const blank = (): TerminalLine => ({ kind: "blank" });
const output = (lines: TerminalLine[], effect: CommandEffect | null = null): CommandResult => ({ lines, effect });

export const BANNER = String.raw`
     ██╗ ██████╗ ███████╗██╗  ██╗
     ██║██╔═══██╗██╔════╝██║  ██║
     ██║██║   ██║███████╗███████║
██   ██║██║   ██║╚════██║██╔══██║
╚█████╔╝╚██████╔╝███████║██║  ██║
 ╚════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝`;

const GOURD_ART = String.raw`
        \ | /
         (_)
        /   \
       (     )
        \   /
      /       \
     (         )
      \       /
        '---'`;

// Email never auto-opens a mail app (visitors may not have one set up): copy the
// address and let them pick how to write.
function emailOptions(): TerminalLine[] {
  return [
    text(profile.email, "accent"),
    ...buildEmailComposeOptions(profile.email, profile.emailSubject).map((option) =>
      link(`Write with ${option.label}`, option.href),
    ),
  ];
}

const FILES = ["about.md", "projects/", "experience.log", "research.md", "skills.json", "contact.txt", "resume.pdf"];

function findProject(name: string | undefined) {
  if (!name) return null;
  const slug = name.toLowerCase().replace(/^projects\//, "").replace(/\/$/, "");
  return projects.find((project) => project.slug === slug) ?? null;
}

function projectList(): TerminalLine[] {
  return projects.map((project) => pre(`  ${project.slug.padEnd(26)}${project.context} · ${project.period}`));
}

function aboutLines(): TerminalLine[] {
  return about.flatMap((paragraph, index) => (index === 0 ? [text(paragraph)] : [blank(), text(paragraph)]));
}

function experienceLines(): TerminalLine[] {
  return journey.flatMap((commit, index) => [
    {
      kind: "commit" as const,
      hash: toCommitHash(commit.message),
      date: commit.date,
      message: commit.message,
      isHead: index === 0,
    },
    ...commit.details.map((detail) => text(`      - ${detail}`, "muted")),
  ]);
}

function skillsLines(): TerminalLine[] {
  const skills = Object.fromEntries(skillGroups.map((group) => [group.label.toLowerCase(), group.items]));
  return [pre(JSON.stringify(skills, null, 2))];
}

function researchLines(): TerminalLine[] {
  return [
    text(publication.title, "accent"),
    text(`${publication.role} · ${publication.venue} · ${publication.date}`, "muted"),
    blank(),
    text(publication.summary),
    blank(),
    ...publication.findings.map((finding) => pre(`  + ${finding}`)),
    blank(),
    ...publication.links.map((paperLink) => link(paperLink.label, paperLink.href)),
  ];
}

function aiLines(): TerminalLine[] {
  return [
    text(aiIntro),
    ...aiPillars.flatMap((pillar) => [
      blank(),
      text(pillar.title, "accent"),
      text(pillar.description),
      pre(`  tools: ${pillar.tools.join(", ")}`, "muted"),
    ]),
  ];
}

function freelanceLines(): TerminalLine[] {
  if (!freelance.isOpen) return [text("Not taking freelance work right now, but feel free to say hi.", "muted")];
  return [
    text(freelance.label, "accent"),
    text(freelance.pitch),
    pre(`  services: ${freelance.services.join(", ")}`, "muted"),
    blank(),
    ...emailOptions(),
  ];
}

function contactLines(): TerminalLine[] {
  return [
    text("The best way to reach me is email."),
    blank(),
    link(profile.email, socialLinks.email.href),
    link("github.com/Shiidoooo", socialLinks.github.href),
    link("github.com/Shiido09 (older account)", socialLinks.githubOld.href),
    link("linkedin.com/in/tan-josh-ziemenn", socialLinks.linkedin.href),
    link("resume", socialLinks.resume.href),
  ];
}

function projectLines(name: string | undefined): TerminalLine[] {
  const project = findProject(name);
  if (!project) {
    return [
      text(name ? `open: no project called '${name}'` : "usage: open <project>", "error"),
      text("Projects you can open:", "muted"),
      ...projectList(),
    ];
  }
  return [
    text(project.title, "accent"),
    text(`${project.context} · ${project.period}`, "muted"),
    blank(),
    text(project.description),
    blank(),
    pre(`stack: ${project.stack.join(", ")}`, "muted"),
    ...(project.links.length > 0
      ? project.links.map((projectLink) => link(projectLink.label, projectLink.href))
      : [text("No public link for this one yet.", "muted")]),
  ];
}

const COMMANDS: CommandDefinition[] = [
  {
    name: "help",
    usage: "help",
    description: "show this list",
    isSecret: false,
    run: () =>
      output([
        text("Here's what you can do:", "accent"),
        ...COMMANDS.filter((command) => !command.isSecret).map((command) =>
          pre(`  ${command.usage.padEnd(20)}${command.description}`),
        ),
        blank(),
        text("There are also a few secret commands. ↑/↓ for history, Tab to autocomplete.", "muted"),
      ]),
  },
  {
    name: "whoami",
    usage: "whoami",
    description: "the short version",
    isSecret: false,
    run: () =>
      output([
        text(profile.fullName, "accent"),
        text(`${profile.role} · ${profile.location}`),
        text(`Currently ${profile.currentRole} at ${profile.currentCompany}`, "muted"),
        ...(freelance.isOpen ? [text(`${freelance.label}. Type \`freelance\` for details.`, "accent")] : []),
        blank(),
        text(profile.intro),
      ]),
  },
  {
    name: "about",
    usage: "about",
    description: "the longer version",
    isSecret: false,
    run: () => output(aboutLines()),
  },
  {
    name: "ls",
    usage: "ls [projects]",
    description: "list files",
    isSecret: false,
    run: ([directory]) => {
      if (!directory || directory === "." || directory === "~") return output([pre(FILES.join("    "))]);
      if (directory.replace(/\/$/, "") === "projects") {
        return output([...projectList(), blank(), text("Type `open <name>` to look at one.", "muted")]);
      }
      return output([text(`ls: cannot access '${directory}': No such file or directory`, "error")]);
    },
  },
  {
    name: "open",
    usage: "open <project>",
    description: "show a project's details",
    isSecret: false,
    run: ([name]) => output(projectLines(name)),
  },
  {
    name: "cat",
    usage: "cat <file>",
    description: "read a file",
    isSecret: false,
    run: ([file]) => {
      switch (file) {
        case "about.md":
          return output(aboutLines());
        case "experience.log":
          return output(experienceLines());
        case "skills.json":
          return output(skillsLines());
        case "contact.txt":
          return output(contactLines());
        case "research.md":
          return output(researchLines());
        case "resume.pdf":
          return output([text("Opening my resume…", "muted")], { type: "open-url", href: socialLinks.resume.href });
        default:
          if (findProject(file)) return output(projectLines(file));
          return output([text(`cat: ${file ?? ""}: No such file or directory`, "error")]);
      }
    },
  },
  {
    name: "git",
    usage: "git log",
    description: "how I got here",
    isSecret: false,
    run: ([subcommand]) =>
      subcommand === "log"
        ? output(experienceLines())
        : output([text("git: only `git log` is wired up in here.", "error")]),
  },
  {
    name: "ai",
    usage: "ai",
    description: "how I build with AI",
    isSecret: false,
    run: () => output(aiLines()),
  },
  {
    name: "freelance",
    usage: "freelance",
    description: "hire me for a project",
    isSecret: false,
    run: () => output(freelanceLines(), freelance.isOpen ? { type: "copy", text: profile.email } : null),
  },
  {
    name: "research",
    usage: "research",
    description: "my published paper",
    isSecret: false,
    run: () => output(researchLines()),
  },
  {
    name: "skills",
    usage: "skills",
    description: "what I work with",
    isSecret: false,
    run: () => output(skillsLines()),
  },
  {
    name: "contact",
    usage: "contact",
    description: "how to reach me",
    isSecret: false,
    run: () => output(contactLines()),
  },
  {
    name: "github",
    usage: "github",
    description: "open my GitHub",
    isSecret: false,
    run: () => output([text("Opening GitHub…", "muted")], { type: "open-url", href: socialLinks.github.href }),
  },
  {
    name: "linkedin",
    usage: "linkedin",
    description: "open my LinkedIn",
    isSecret: false,
    run: () => output([text("Opening LinkedIn…", "muted")], { type: "open-url", href: socialLinks.linkedin.href }),
  },
  {
    name: "email",
    usage: "email",
    description: "write me an email",
    isSecret: false,
    run: () => output(emailOptions(), { type: "copy", text: profile.email }),
  },
  {
    name: "resume",
    usage: "resume",
    description: "open my resume",
    isSecret: false,
    run: () => output([text("Opening my resume…", "muted")], { type: "open-url", href: socialLinks.resume.href }),
  },
  {
    name: "clear",
    usage: "clear",
    description: "clear the screen",
    isSecret: false,
    run: () => output([], { type: "clear" }),
  },
  {
    name: "exit",
    usage: "exit",
    description: "back to the normal site",
    isSecret: false,
    run: () => output([text("Recompiling the normal view…", "muted")], { type: "exit" }),
  },
  {
    name: "sudo",
    usage: "sudo",
    description: "",
    isSecret: true,
    run: (args) => {
      const request = args.join(" ").toLowerCase();
      if (request === "hire josh" || request === "hire-josh" || request === "hire") {
        return output(
          [
            text("[sudo] password for visitor: ********", "muted"),
            text("Access granted. Excellent decision.", "accent"),
            blank(),
            ...emailOptions(),
          ],
          { type: "copy", text: profile.email },
        );
      }
      return output([
        text("visitor is not in the sudoers file. This incident will be reported.", "error"),
        text("(psst: try `sudo hire josh`)", "muted"),
      ]);
    },
  },
  {
    name: "gourd",
    usage: "gourd",
    description: "",
    isSecret: true,
    run: () =>
      output([
        pre(GOURD_ART, "accent"),
        blank(),
        text("The plant that started our thesis. Type `open gourdvision` for the story."),
      ]),
  },
  {
    name: "rm",
    usage: "rm",
    description: "",
    isSecret: true,
    run: (args) =>
      output([
        text(args.includes("-rf") ? "Nice try. I worked hard on this." : "rm: permission denied", "error"),
      ]),
  },
  {
    name: "date",
    usage: "date",
    description: "",
    isSecret: true,
    run: (_, { now }) =>
      output([
        text(
          `Manila: ${new Intl.DateTimeFormat("en-PH", {
            timeZone: profile.timeZone,
            dateStyle: "full",
            timeStyle: "short",
          }).format(now)}`,
        ),
      ]),
  },
  {
    name: "echo",
    usage: "echo",
    description: "",
    isSecret: true,
    run: (args) => output([text(args.join(" "))]),
  },
  {
    name: "history",
    usage: "history",
    description: "",
    isSecret: true,
    run: (_, { history }) =>
      output(history.map((entry, index) => pre(`  ${String(index + 1).padStart(3)}  ${entry}`))),
  },
];

const ALIASES: Record<string, string> = {
  experience: "git",
  quit: "exit",
  gui: "exit",
  hi: "hello",
  hey: "hello",
  "?": "help",
  hire: "freelance",
};

const ALIAS_ARGS: Record<string, string[]> = {
  experience: ["log"],
};

const GREETING: CommandDefinition = {
  name: "hello",
  usage: "hello",
  description: "",
  isSecret: true,
  run: () => output([text("Hey! Type `help` to see what you can do in here.")]),
};

const COMMAND_INDEX = new Map([...COMMANDS, GREETING].map((command) => [command.name, command]));

export const SUGGESTED_COMMANDS = ["help", "whoami", "ls projects", "ai", "freelance", "git log", "research", "skills", "contact", "sudo hire josh", "exit"];

export function getBootLines(): TerminalLine[] {
  return [
    pre(BANNER, "accent"),
    blank(),
    text("Dev mode on. This is my portfolio the way I see it all day: a terminal."),
    text("Type `help` to get started, or tap one of the commands below.", "muted"),
    blank(),
  ];
}

export function runCommand(input: string, context: CommandContext): CommandResult {
  const [rawName, ...rawArgs] = input.trim().split(/\s+/);
  if (!rawName) return output([]);

  const name = rawName.toLowerCase();
  const resolvedName = ALIASES[name] ?? name;
  const args = ALIAS_ARGS[name] ?? rawArgs;
  const command = COMMAND_INDEX.get(resolvedName);

  if (!command) {
    return output([text(`command not found: ${rawName}. Type \`help\` to see what's available.`, "error")]);
  }
  return command.run(args, context);
}

function commonPrefix(values: string[]) {
  return values.reduce((prefix, value) => {
    let length = 0;
    while (length < prefix.length && prefix[length] === value[length]) length++;
    return prefix.slice(0, length);
  });
}

// Tab completion for command names, project names and file names.
export function completeInput(input: string): { completed: string; options: string[] } {
  const [command, ...rest] = input.split(" ");
  const isCompletingArgument = rest.length > 0;

  const candidates = isCompletingArgument
    ? command === "open"
      ? projects.map((project) => project.slug)
      : command === "cat"
        ? [...FILES.filter((file) => !file.endsWith("/")), ...projects.map((project) => `projects/${project.slug}`)]
        : command === "ls"
          ? ["projects"]
          : []
    : COMMANDS.filter((definition) => !definition.isSecret).map((definition) => definition.name);

  const partial = isCompletingArgument ? rest.join(" ") : command;
  const matches = candidates.filter((candidate) => candidate.startsWith(partial.toLowerCase()));
  if (matches.length === 0) return { completed: input, options: [] };

  const completion = matches.length === 1 ? `${matches[0]}${isCompletingArgument ? "" : " "}` : commonPrefix(matches);
  return {
    completed: isCompletingArgument ? `${command} ${completion}` : completion,
    options: matches.length > 1 ? matches : [],
  };
}
