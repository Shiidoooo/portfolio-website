"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { externalLinkProps, isWebLink } from "@/lib/links";
import {
  SUGGESTED_COMMANDS,
  completeInput,
  getBootLines,
  runCommand,
  type CommandEffect,
  type LineTone,
  type TerminalLine,
} from "./commands";
import { useDevMode } from "./DevModeProvider";

const EXIT_DELAY_MS = 450;

const TONE_CLASS: Record<LineTone, string> = {
  default: "text-paper/90",
  muted: "text-muted",
  accent: "phosphor",
  error: "text-[#ff6b6b]",
};

function Prompt() {
  return (
    <span className="mr-2 shrink-0 select-none" aria-hidden="true">
      <span className="text-teal">josh@portfolio</span>
      <span className="text-muted">:</span>
      <span className="text-accent">~</span>
      <span className="text-muted">$</span>
    </span>
  );
}

function OutputLine({ line }: { line: TerminalLine }) {
  switch (line.kind) {
    case "input":
      return (
        <p className="flex flex-wrap">
          <Prompt />
          <span className="sr-only">Command: </span>
          <span className="text-paper">{line.text}</span>
        </p>
      );
    case "text":
      return <p className={cn("whitespace-pre-wrap", TONE_CLASS[line.tone])}>{line.text}</p>;
    case "pre":
      return <pre className={cn("overflow-x-auto leading-tight", TONE_CLASS[line.tone])}>{line.text}</pre>;
    case "link":
      return (
        <p>
          <span className="text-muted">→ </span>
          <a
            href={line.href}
            {...externalLinkProps(line.href)}
            className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
          >
            {line.label}
          </a>
        </p>
      );
    case "commit":
      return (
        <p className="whitespace-pre-wrap">
          <span className="text-[#e5c07b]">{line.hash}</span>
          {line.isHead && <span className="text-teal"> (HEAD -&gt; main)</span>}
          <span className="text-muted"> {line.date.padEnd(8)} </span>
          <span className="text-paper/90">{line.message}</span>
        </p>
      );
    case "blank":
      return <div className="h-3" />;
  }
}

export function Terminal() {
  const { exitDevMode } = useDevMode();
  const [lines, setLines] = useState<TerminalLine[]>(getBootLines);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
    return () => {
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [lines]);

  function applyEffect(effect: CommandEffect | null) {
    if (!effect) return;
    if (effect.type === "clear") setLines([]);
    if (effect.type === "exit") exitTimerRef.current = window.setTimeout(exitDevMode, EXIT_DELAY_MS);
    if (effect.type === "open-url" && isWebLink(effect.href)) {
      window.open(effect.href, "_blank", "noopener,noreferrer");
    }
    if (effect.type === "copy") {
      const appendNote = (note: string) =>
        setLines((current) => [...current, { kind: "text", text: note, tone: "muted" }, { kind: "blank" }]);
      // Clipboard can be blocked (permissions, insecure context); the address is printed either way.
      navigator.clipboard
        .writeText(effect.text)
        .then(() => appendNote("✓ Copied to your clipboard."))
        .catch(() => appendNote("Couldn't copy automatically, but the address is right above."));
    }
  }

  function submit(commandText: string) {
    const trimmed = commandText.trim();
    const inputLine: TerminalLine = { kind: "input", text: trimmed };
    setInput("");
    setHistoryIndex(null);
    if (!trimmed) {
      setLines((current) => [...current, inputLine]);
      return;
    }

    const nextHistory = [...history, trimmed];
    const result = runCommand(trimmed, { history: nextHistory, now: new Date() });
    setHistory(nextHistory);
    setLines((current) =>
      result.effect?.type === "clear" ? [] : [...current, inputLine, ...result.lines, { kind: "blank" }],
    );
    applyEffect(result.effect);
    inputRef.current?.focus({ preventScroll: true });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        submit(input);
        break;
      case "Escape":
        event.preventDefault();
        exitDevMode();
        break;
      case "Tab": {
        if (event.shiftKey) return;
        event.preventDefault();
        const { completed, options } = completeInput(input);
        setInput(completed);
        if (options.length > 0) {
          setLines((current) => [...current, { kind: "input", text: input }, { kind: "pre", text: options.join("    "), tone: "muted" }]);
        }
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        if (history.length === 0) return;
        const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        if (historyIndex === null) return;
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(null);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
        break;
      }
      case "l":
        if (event.ctrlKey) {
          event.preventDefault();
          setLines([]);
        }
        break;
      case "c":
        if (event.ctrlKey && input) {
          event.preventDefault();
          setLines((current) => [...current, { kind: "input", text: `${input}^C` }]);
          setInput("");
        }
        break;
    }
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Dev mode terminal"
      className="fixed inset-0 z-(--z-terminal) flex flex-col bg-terminal font-mono text-[13px] md:text-sm"
      initial={{ scaleY: 0.004, scaleX: 0.7, opacity: 0, filter: "brightness(4)" }}
      animate={{ scaleY: 1, scaleX: 1, opacity: 1, filter: "brightness(1)" }}
      exit={{
        scaleY: [1, 0.004, 0.004],
        scaleX: [1, 1, 0],
        filter: ["brightness(1)", "brightness(4)", "brightness(6)"],
        opacity: [1, 1, 0],
        transition: { duration: 0.5, times: [0, 0.55, 1], ease: "easeIn" },
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="crt-flicker relative flex min-h-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-accent/15 px-4 py-2.5 md:px-6">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </span>
            <p className="text-muted">
              josh@portfolio <span className="hidden sm:inline">— dev mode</span>
            </p>
          </div>
          <button
            type="button"
            onClick={exitDevMode}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-muted transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <kbd className="hidden rounded border border-line-strong px-1.5 text-[11px] sm:inline">esc</kbd>
            Exit dev mode
            <X aria-hidden="true" className="size-4" />
          </button>
        </header>

        <div
          ref={outputRef}
          role="log"
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 leading-relaxed md:px-6"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-0.5">
            {lines.map((line, index) => (
              <OutputLine key={index} line={line} />
            ))}
            <label className="flex items-center">
              <Prompt />
              <span className="sr-only">Type a command</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="send"
                className="min-w-0 flex-1 bg-transparent text-base text-paper caret-accent outline-none md:text-sm"
              />
            </label>
          </div>
        </div>

        <nav aria-label="Suggested commands" className="border-t border-accent/15 px-4 py-3 md:px-6">
          <ul className="mx-auto flex max-w-4xl gap-2 overflow-x-auto">
            {SUGGESTED_COMMANDS.map((command) => (
              <li key={command} className="shrink-0">
                <button
                  type="button"
                  onClick={() => submit(command)}
                  className="min-h-9 rounded-full border border-accent/25 px-3 text-accent/90 transition-colors hover:border-accent hover:bg-accent/10"
                >
                  {command}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div aria-hidden="true" className="crt-scanlines absolute inset-0" />
        <div aria-hidden="true" className="crt-vignette absolute inset-0" />
      </div>
    </motion.div>
  );
}
