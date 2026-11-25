import {
  experience,
  navLinks,
  profile,
  projects,
  repos,
  skillGroups,
} from "@/data/profile";
import CopyButton from "./CopyButton";
import ProfileCube from "./ProfileCube";
import ThemeToggle from "./ThemeToggle";

function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="section-head reveal">
      <span className="section-watermark" aria-hidden="true">{index}</span>
      <p className="section-label"><span className="label-dash" aria-hidden="true" />{index} / {label}</p>
      <h2 data-scroll-skew>{title}</h2>
    </div>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top">许金元<span>.</span></a>
        <nav className="nav" aria-label="主导航">
          {navLinks.map((link) => (
            <a key={link.href} className="nav-link" href={link.href}>{link.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="header-cta" href="#contact">联系我 <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero container" id="top">
      <div className="hero-decor" aria-hidden="true">
        <span className="decor-ring" />
        <span className="decor-dot" />
        <span className="decor-plus" />
        <span className="decor-line" />
      </div>

      <div className="hero-copy">
        <p className="eyebrow hero-line"><span className="status-dot" aria-hidden="true" />{profile.eyebrow}</p>
        <h1 className="hero-title">
          <span className="hero-line"><span>{profile.heroTitle[0]}</span></span>
          <span className="hero-line"><span>{profile.heroTitle[1]}</span></span>
        </h1>
        <p className="hero-lead hero-line">{profile.heroLead}</p>
        <div className="hero-meta hero-line">
          <span>{profile.title}</span>
          <span className="meta-sep" aria-hidden="true" />
          <span>{profile.location}</span>
        </div>
        <div className="hero-actions hero-line">
          <a className="btn btn-primary" href="#projects">看看作品 <span aria-hidden="true">→</span></a>
          <a className="btn btn-quiet" href="#about">多了解我</a>
        </div>
      </div>

      <div className="hero-figure">
        <ProfileCube />
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section container" id="about">
      <SectionHeading index="01" label="关于" title="一点点背景" />
      <div className="about-grid reveal">
        <p className="about-text">{profile.intro}</p>
        <div className="about-meta">
          <div><span>现在</span><strong>{profile.title}</strong></div>
          <div><span>坐标</span><strong>{profile.location}</strong></div>
          <div><span>教育</span><strong>{profile.education.school} · {profile.education.major}</strong></div>
          <div><span>关注</span><strong>Agent 编排 / RAG / 人机协同</strong></div>
        </div>
      </div>

      <div className="education reveal">
        <span className="notes-ornament" aria-hidden="true" />
        <div>
          <h3>教育背景</h3>
          <p className="education-line">
            <strong>{profile.education.school}</strong> ｜ {profile.education.major} ｜ {profile.education.degree}
          </p>
          <p className="education-courses">主修课程：{profile.education.courses.join("、")}</p>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section container" id="skills">
      <SectionHeading index="02" label="技能" title="手里的工具" />
      <div className="skill-list">
        {skillGroups.map((group, i) => (
          <div className="skill-group reveal reveal-rise" key={group.title} style={{ transitionDelay: `${i * 70}ms` }}>
            <h3>{group.title}</h3>
            <div className="skill-tags">
              {group.items.map((item) => <span className="skill-tag" key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="section container" id="experience">
      <SectionHeading index="03" label="经历" title="走过的路" />
      <div className="timeline">
        <article className="timeline-item">
          <div className="timeline-marker" aria-hidden="true" />
          <div className="timeline-head">
            <div>
              <h3>{experience.role}</h3>
              <p className="timeline-org">{experience.company}</p>
            </div>
            <span className="timeline-date">{experience.period}</span>
          </div>
          <div className="timeline-body">
            {experience.points.map((point) => (
              <p key={point.label}><strong>{point.label}：</strong>{point.text}</p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="section container" id="projects">
      <SectionHeading index="04" label="项目" title="最近做的一些事" />
      <div className="project-grid">
        {projects.map((project, i) => (
          <article className="project-card reveal reveal-rise" key={project.title} style={{ transitionDelay: `${i * 80}ms` }}>
            <div className={`project-visual visual-${i + 1}`} aria-hidden="true">
              <span className="project-visual-shape" />
              <span className="visual-tick" />
              <span className="project-visual-index">{project.index}</span>
            </div>
            <div className="project-top">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h3>{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="project-summary">{project.summary}</p>
            <div className="project-stack">
              {project.stack.slice(0, 8).map((tech) => <span key={tech}>{tech}</span>)}
              {project.stack.length > 8 && <span>+{project.stack.length - 8}</span>}
            </div>

            {project.metrics && (
              <div className="project-metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            )}

            <details className="project-details">
              <summary>查看项目细节 <span aria-hidden="true">＋</span></summary>
              <div className="project-details-inner">
                <p className="detail-lead">{project.background}</p>
                {project.highlights.map((h) => (
                  <div className="detail-point" key={h.label}>
                    <strong>{h.label}</strong>
                    <p>{h.text}</p>
                  </div>
                ))}
                {project.source && (
                  <a className="detail-link" href={project.source} target="_blank" rel="noreferrer">
                    查看项目源码 <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}

export function OpenSource() {
  return (
    <section className="section container" id="opensource">
      <SectionHeading index="05" label="开源" title="GitHub 上的痕迹" />
      <div className="repo-list">
        {repos.map((repo) => (
          <a className="repo-row" href={repo.url} target="_blank" rel="noreferrer" key={repo.name}>
            <span className="repo-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 22.29 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" /></svg>
            </span>
            <span className="repo-main">
              <span className="repo-name">{repo.name}</span>
              <span className="repo-desc">{repo.description}</span>
            </span>
            <span className="repo-lang"><i style={{ background: repo.languageColor }} />{repo.language}</span>
            {repo.license && <span className="repo-license">{repo.license}</span>}
            <span className="repo-meta">{repo.updated}</span>
            <span className="repo-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
        <a className="repo-more" href={profile.github} target="_blank" rel="noreferrer">
          在 GitHub 上查看更多 <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="section container" id="contact">
      <div className="contact-card reveal">
        <span className="contact-orbit" aria-hidden="true" />
        <span className="contact-star" aria-hidden="true" />
        <p className="section-label"><span className="label-dash" aria-hidden="true" />06 / 联系</p>
        <h2>有个想法？<br />我们可以聊聊。</h2>
        <p>无论是合作、交流，还是单纯想打个招呼，都欢迎联系我。</p>

        <div className="contact-grid">
          <div className="contact-item">
            <span className="contact-item-label">邮箱</span>
            <span className="contact-item-value">{profile.email}</span>
            <CopyButton value={profile.email} label="复制" />
          </div>
          <div className="contact-item">
            <span className="contact-item-label">电话</span>
            <span className="contact-item-value">{profile.phone}</span>
            <CopyButton value={profile.phone} label="复制" />
          </div>
        </div>

        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>发邮件 <span aria-hidden="true">↗</span></a>
          <a className="btn btn-quiet" href={profile.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer container">
      <span>© 2026 {profile.name}</span>
      <a href="#top">回到顶部 ↑</a>
    </footer>
  );
}
