export type Highlight = { label: string; text: string };

export type Project = {
  index: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  summary: string;
  stack: string[];
  background: string;
  highlights: Highlight[];
  metrics?: { value: string; label: string }[];
  source?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Repo = {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  license?: string;
  updated: string;
  url: string;
};

export const profile = {
  name: "许金元",
  initials: "XJY",
  username: "yinshi158",
  title: "AI 应用开发工程师",
  eyebrow: "你好，我是许金元",
  heroTitle: ["把大模型能力，", "做成可用的产品。"],
  heroLead:
    "AI 应用开发工程师，专注 Agent 编排、RAG 检索与人机协同。相信好的工程，是让复杂的技术安静地工作。",
  intro:
    "我做 AI 应用，也写工程。从 RAG 知识库到多 Agent 编排，习惯把模糊的需求拆成可验证的步骤，再一步步落到能跑、能测、能交付的系统里。比起炫技，我更在意稳定性、可观测性和真实的评测结果。",
  location: "河南 · 郑州",
  email: "2116250985@qq.com",
  phone: "178-3824-5210",
  github: "https://github.com/yinshi158",
  avatar: "https://avatars.githubusercontent.com/u/281450012?v=4",
  education: {
    school: "新乡工程学院",
    major: "电子信息工程",
    degree: "本科",
    courses: ["C 语言程序设计", "Python 程序设计", "数据结构", "人工智能导论"],
  },
  status: "开放求职机会",
};

export const stats = [
  { value: "03", label: "核心项目" },
  { value: "23", label: "接入 ERP 工具" },
  { value: "115/115", label: "意图验收通过" },
  { value: "05", label: "公开开源仓库" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Agent 与编排",
    items: [
      "DeepAgent",
      "LangChain",
      "LangGraph",
      "MCP / FastMCP",
      "多 Agent 委派",
      "HITL 中断恢复",
      "任务规划",
      "上下文与记忆管理",
    ],
  },
  {
    title: "RAG 与检索",
    items: [
      "知识库构建",
      "混合检索",
      "Milvus",
      "ChromaDB",
      "MySQL IDF 召回",
      "bge-small-zh-v1.5",
      "Prompt 优化",
      "来源引用",
    ],
  },
  {
    title: "语言与框架",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "FastAPI",
      "Next.js / React",
      "Vue",
      "Node.js / Fastify",
      "Rust / Kotlin（基础）",
    ],
  },
  {
    title: "数据与工程",
    items: [
      "MySQL",
      "MongoDB",
      "SQLite (WAL)",
      "SQLAlchemy",
      "SSE 流式输出",
      "Docker",
      "Linux",
      "阿里云 / 腾讯云",
    ],
  },
  {
    title: "可观测与评测",
    items: [
      "Langfuse",
      "链路观测",
      "规则集评测",
      "检索集评测",
      "指标化验收",
      "Token 追踪",
    ],
  },
];

export const experience = {
  company: "天桥短剧",
  role: "AI 应用开发工程师",
  period: "2026.06 — 2026.09",
  points: [
    {
      label: "需求与开发",
      text: "参与 RAG 剧本创作平台与短剧自动剪辑 Agent 的需求澄清、功能拆解和实施，对接业务负责人明确创作、剪辑与审核边界，运用 AI Coding 工具辅助开发、测试、调试及文档编写。",
    },
    {
      label: "核心交付",
      text: "实现剧本知识库检索、分阶段生成与 SSE 流式输出，以及多模态剪辑、审核修复工作流；参与异常重跑、问题排查与修复，保障流程可恢复与服务可用。",
    },
  ],
};

export const projects: Project[] = [
  {
    index: "01",
    title: "ERP 智能采购助手",
    subtitle: "DeepAgent + LangGraph + MCP",
    year: "2026",
    category: "企业级 Agent",
    summary:
      "面向摩托车零部件采购场景，搭建连接 Java ERP 的 AI Agent，覆盖供应商分析、采购订单审批、库存预警及图表生成，形成 Planning → Executing → Review → Result 的任务闭环。",
    stack: [
      "Python",
      "TypeScript",
      "DeepAgent",
      "LangGraph",
      "FastMCP",
      "DeepSeek API",
      "FastAPI",
      "MongoDB",
      "Docker",
      "Next.js",
      "Langfuse",
    ],
    background:
      "采购流程涉及多个异构系统与大量写操作，需要在自动化与人工审查之间取得平衡。项目用多 Agent 编排把规划、执行、复核拆开，并让每一次写操作都经过可控的审批环节。",
    highlights: [
      {
        label: "Agent 编排",
        text: "基于 DeepAgent + LangGraph 组装主 Agent 与采购分析、订单两个子 Agent，通过 FastMCP 接入 23 个 ERP 工具；以 MongoDB 持久化会话与跨会话记忆，支持任务规划、工具调用和按需审查。",
      },
      {
        label: "上下文工程",
        text: "实现 HOT / WARM / COLD 三层记忆和 Skills 目录 → 正文 → 资源渐进披露，主、子 Agent 均可按需读取；9 个基础技能的提示片段由 10,516 降至 1,476 字符，减少 85.96%。",
      },
      {
        label: "安全审批",
        text: "基于 LangGraph interrupt / resume 实现订单创建、更新的人工审批与缺参追问，写操作评审失败后不重放整轮任务；使用 Docker 只读文件系统、资源限额、Capability 移除及 seccomp 等沙箱隔离配置。",
      },
      {
        label: "全链路交付",
        text: "以 FastAPI + SSE 提供流式对话、阶段状态和中断恢复接口，使用 Next.js + React 实现工具调用展示、审批卡片与信息补充表单；接入 Langfuse 记录模型、工具、Token 和验收指标，且不上传对话正文。",
      },
    ],
    metrics: [
      { value: "23", label: "ERP 工具接入" },
      { value: "85.96%", label: "提示片段缩减" },
    ],
    source: "https://github.com/wodrake/ERP-AGENT-open-source",
  },
  {
    index: "02",
    title: "企业知识库智能客服 Agent",
    subtitle: "RAG + 人工协同",
    year: "2025",
    category: "检索增强问答",
    summary:
      "面向中文企业客服，构建知识库问答与人工协同 MVP，覆盖多轮咨询、租户隔离、来源引用和复杂问题转人工。",
    stack: [
      "TypeScript",
      "Node.js",
      "Fastify",
      "React",
      "MySQL",
      "Milvus",
      "DeepSeek-Harness",
      "SSE",
      "Docker Compose",
    ],
    background:
      "客服场景对准确性与可追溯性要求极高。系统以向量召回融合词面召回，返回 chunk 级来源，并把权限收敛到白名单工具，复杂问题平滑转人工。",
    highlights: [
      {
        label: "RAG 检索与工具控制",
        text: "解析 Markdown、TXT、FAQ JSON，以 Milvus 向量召回融合 MySQL IDF 词面召回并返回 chunk 级来源；仅开放知识搜索与转人工工具，通过白名单、独立令牌和服务端会话上下文收敛权限。",
      },
      {
        label: "会话与数据一致性",
        text: "实现 AI 与人工接管状态机、SSE 回复、消息幂等和会话锁；以 MySQL 事务 + outbox 同步向量索引，支持重试、对账与重建，向量异常时降级为词面检索。",
      },
    ],
    metrics: [
      { value: "115/115", label: "规则意图验收" },
      { value: "21/22", label: "有依据问题命中" },
      { value: "10/10", label: "无依据空结果" },
      { value: "14.2ms", label: "检索 P95" },
    ],
  },
  {
    index: "03",
    title: "短剧智创 · RAG 剧本创作平台",
    subtitle: "分阶段创作与改编隔离",
    year: "2025",
    category: "内容生成平台",
    summary:
      "围绕短剧剧本创作，构建从知识库召回、分阶段生成到断点续作的完整流程，并对改编链路做复述风险检查。",
    stack: [
      "Python",
      "FastAPI",
      "SQLite (WAL)",
      "ChromaDB",
      "bge-small-zh-v1.5",
      "DeepSeek API",
      "SSE",
      "原生 JavaScript",
    ],
    background:
      "剧本创作既需要参考已有素材，又要避免对原作过度复述。项目把「创作」与「改编」拆成两条链路，前者启用 RAG，后者关闭 RAG 并做相似度检查。",
    highlights: [
      {
        label: "RAG 入库与召回",
        text: "按「集 / 场 / 幕」切分并结合短块合并、超长二次切分和滑窗；使用 bge-small-zh-v1.5、cosine 相似度与剧名过滤，Top-8 召回后过滤低于 0.4 的片段，有效证据不足 2 条时不进入生成上下文。",
      },
      {
        label: "分阶段创作与改编隔离",
        text: "编排内容策划 → 人物小传 → 篇章蓝图 → 正文流程，按 5 集一批生成并结合 SSE、SQLite WAL 与阶段持久化支持断点续作；改编链路关闭 RAG，以 12-gram 重合度和剧名相似度检查复述风险。",
      },
    ],
  },
];

export const repos: Repo[] = [
  {
    name: "soup",
    description: "会话与工具实验项目",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
    forks: 0,
    updated: "2026-11-23",
    url: "https://github.com/yinshi158/soup",
  },
  {
    name: "ERP-Agent",
    description: "ERP Agent - standalone repository",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    updated: "2026-11-23",
    url: "https://github.com/yinshi158/ERP-Agent",
  },
  {
    name: "manbo",
    description: "个人项目",
    language: "Rust",
    languageColor: "#dea584",
    stars: 0,
    forks: 0,
    license: "GPL-3.0",
    updated: "2026-11-16",
    url: "https://github.com/yinshi158/manbo",
  },
  {
    name: "Android_Assistant",
    description: "Android 端助手项目",
    language: "Kotlin",
    languageColor: "#A97BFF",
    stars: 0,
    forks: 0,
    updated: "2026-11-12",
    url: "https://github.com/yinshi158/Android_Assistant",
  },
  {
    name: "zhi_chuang_rag",
    description: "智创 RAG 相关项目",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    updated: "2026-08-15",
    url: "https://github.com/yinshi158/zhi_chuang_rag",
  },
];

export const navLinks = [
  { label: "关于", href: "#about" },
  { label: "技能", href: "#skills" },
  { label: "经历", href: "#experience" },
  { label: "项目", href: "#projects" },
  { label: "开源", href: "#opensource" },
];
