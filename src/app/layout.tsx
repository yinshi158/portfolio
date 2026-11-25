import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "许金元 · AI 应用开发工程师",
  description:
    "许金元的个人网站 — AI 应用开发工程师，专注 Agent 编排、RAG 检索与人机协同。",
  keywords: ["许金元", "AI 应用开发", "Agent", "RAG", "LangGraph", "个人网站"],
  openGraph: {
    title: "许金元 · AI 应用开发工程师",
    description: "把大模型能力，做成可用的产品。",
    type: "website",
  },
};

const themeScript = `
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
