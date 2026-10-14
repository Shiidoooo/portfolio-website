// Ways to start an email to an address, so visitors pick their own client
// instead of being thrown into whatever mail app their OS defaults to.

export type EmailComposeOption = {
  id: "gmail" | "outlook" | "mail-app";
  label: string;
  href: string;
};

export function buildEmailComposeOptions(address: string, subject: string): EmailComposeOption[] {
  const to = encodeURIComponent(address);
  const encodedSubject = encodeURIComponent(subject);

  return [
    {
      id: "gmail",
      label: "Gmail",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodedSubject}`,
    },
    {
      id: "outlook",
      label: "Outlook.com",
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${encodedSubject}`,
    },
    {
      id: "mail-app",
      label: "Mail app",
      href: `mailto:${address}?subject=${encodedSubject}`,
    },
  ];
}
