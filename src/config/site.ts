export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "News Feed",
      href: "/",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },

    {
      label: "About us",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "News Feed",
      href: "/",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
    {
      label: "About us",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
