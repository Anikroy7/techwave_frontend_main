export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Techwave",
  description: `The "Tech Tips & Tricks" project is a dynamic full-stack web application designed to help tech enthusiasts navigate and master the ever-evolving world of technology.`,
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
    {
      label: "Dashbaord",
      href: "/dashboard",
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
