# 许金元 · 个人网站

基于 Next.js 16（App Router）的个人作品集网站，采用「北欧柔和风」设计规范，内容来自 `个人信息参考.md`（GitHub 主页 + 简历）。

## 本地运行

```bash
npm install
npm run dev
```

打开 <http://localhost:3000>。

生产构建：

```bash
npm run build
npm start
```

## 技术栈

- Next.js 16 App Router + React 19 + TypeScript
- 纯 CSS 设计系统（无 UI 框架），色值 / 圆角 / 断点与 `personal-site/设计规范.html` 一致
- 深浅色主题切换（记忆到 localStorage，跟随系统偏好）
- IntersectionObserver 滚动显现 + 导航高亮
- 尊重 `prefers-reduced-motion`

## 目录结构

```
src/
├── app/
│   ├── layout.tsx      # 元数据、主题初始化脚本
│   ├── page.tsx        # 页面组合
│   └── globals.css     # 设计系统与全部样式
├── components/
│   ├── Sections.tsx    # 各页面区块
│   ├── Motion.tsx      # 滚动显现与导航高亮（客户端）
│   ├── ThemeToggle.tsx # 主题切换（客户端）
│   └── CopyButton.tsx  # 一键复制联系方式（客户端）
└── data/
    └── profile.ts      # 全部个人信息（单一数据源）
```

## 修改内容

所有个人信息集中在 `src/data/profile.ts`：
- `profile` — 姓名、联系方式、简介、教育背景
- `stats` — 首页数据概览
- `skillGroups` — 技能分组
- `experience` — 工作经历
- `projects` — 三个项目（含技术栈、亮点、指标、源码链接）
- `repos` — GitHub 公开仓库
- `navLinks` — 导航项

修改数据文件后页面自动更新，无需改动组件。
