// Deterministic 7-character "commit hash" for a journey entry (FNV-1a),
// so the git-log section and the terminal always show the same hash.
export function toCommitHash(text: string) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}
