export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

// The visitor's saved choice, else their system setting. Must stay in sync with THEME_INIT_SCRIPT.
export function resolveTheme(): Theme {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {
    // Storage can be blocked (private windows, strict settings); fall back to the system setting.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Not saved, but the theme still applies for this visit.
  }
}

// Runs in <head> before the first paint so a light-mode visitor never sees a dark flash.
export const THEME_INIT_SCRIPT = `(function(){var t;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.setAttribute("data-theme",t)})()`;
