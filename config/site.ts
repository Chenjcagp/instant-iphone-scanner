import { SiteConfig } from "@/types/siteConfig";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

// 这是一个空链接，防止模板报错，但不会再被使用了
export const SOURCE_CODE_URL = "#";
export const PRO_VERSION = "#";

export const siteConfig: SiteConfig = {
  name: "Instant iPhone Scanner",
  tagLine: 'Scan documents to PDF directly on iPhone without apps.',
  description:
    "Turn your iPhone into a document scanner instantly. No app download required. 100% free and private. Save photos as PDF in seconds.",
  url: BASE_URL,
  authors: [
    {
      name: "Admin",
      url: BASE_URL,
    }
  ],
  creator: '@admin',
  // 关键：清空所有社交链接，防止显示别人的 Twitter/Github
  socialLinks: {
    discord: "",
    twitter: "",
    github: "",
    bluesky: "",
    email: ""
  },
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  defaultNextTheme: 'system',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}