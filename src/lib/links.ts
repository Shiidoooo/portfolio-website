export function isWebLink(href: string) {
  return href.startsWith("https://") || href.startsWith("http://");
}

// Web links open in a new tab without giving it access to this page; mailto: links stay in place.
export function externalLinkProps(href: string) {
  return isWebLink(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
