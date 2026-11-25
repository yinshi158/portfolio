"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";

type Probe = {
  state: () => { rotX: number; rotY: number; targetX: number; targetY: number; dragging: boolean; hasInteracted: boolean; idle: boolean };
  seek: (x: number, y: number) => void;
  releaseTo: (x: number, y: number) => void;
};

declare global {
  interface Window { __cube?: Probe }
}

const SENS = 0.55;
const STIFFNESS = 92;
const DAMPING = 13.5;
const IDLE_MS = 2400;
const DEMO_MS = 3600;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const snap90 = (v: number) => Math.round(v / 90) * 90;

type Face = { key: string; className: string; label: string; render: React.ReactNode };

export default function ProfileCube() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const cube = cubeRef.current;
    if (!scene || !cube) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rotX = 12;
    let rotY = -26;
    let targetX = rotX;
    let targetY = rotY;
    let velX = 0;
    let velY = 0;

    let dragging = false;
    let pointerId = -1;
    let lastX = 0;
    let lastY = 0;
    let downX = 0;
    let downY = 0;
    let lastT = 0;

    let hasInteracted = false;
    let lastInput = performance.now();
    let demoRunning = false;
    let demoDone = false;
    let demoOffset = 0;
    let demoVel = 0;

    let raf = 0;
    let prev = performance.now();
    const start = prev;

    const markInput = () => {
      lastInput = performance.now();
      if (dragging || !hasInteracted) {
        if (demoOffset !== 0 || demoVel !== 0) {
          demoOffset = 0;
          demoVel = 0;
        }
      }
    };

    const apply = (now: number) => {
      if (!cube) return;
      const idle = !dragging && now - lastInput > IDLE_MS;
      const t = (now - start) / 1000;
      let bx = 0;
      let by = 0;
      if (!reduced && idle) {
        bx = Math.sin(t * 0.7) * 1.6;
        by = Math.sin(t * 0.43 + 1.2) * 2.4;
      }
      const speed = Math.min(1, (Math.abs(velY) + Math.abs(velX)) / 900);
      const scale = dragging ? 1 + speed * 0.018 : 1;
      const ry = rotY + by + demoOffset;
      cube.style.transform = `scale(${scale.toFixed(4)}) rotateX(${(rotX + bx).toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      cube.dataset.face = String(((Math.round(ry / 90) % 4) + 4) % 4);
    };

    const spring = (cur: number, target: number, vel: number, dt: number) => {
      const acc = (target - cur) * STIFFNESS - vel * DAMPING;
      const nextVel = vel + acc * dt;
      return { value: cur + nextVel * dt, vel: nextVel };
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;

      if (!reduced && demoRunning) {
        const d = spring(demoOffset, 90, demoVel, dt);
        demoOffset = d.value;
        demoVel = d.vel;
        if (demoOffset >= 89.5) {
          rotY += 90;
          targetY += 90;
          demoOffset = 0;
          demoVel = 0;
          demoRunning = false;
          demoDone = true;
          scene.removeAttribute("data-demo");
        }
      }

      if (!dragging) {
        const sx = spring(rotX, targetX, velX, dt);
        rotX = clamp(sx.value, -90, 90);
        velX = sx.vel;
        const sy = spring(rotY, targetY, velY, dt);
        rotY = sy.value;
        velY = sy.vel;
        if (Math.abs(targetX - rotX) < 0.01 && Math.abs(velX) < 0.01) {
          rotX = targetX;
          velX = 0;
        }
        if (Math.abs(targetY - rotY) < 0.01 && Math.abs(velY) < 0.01) {
          rotY = targetY;
          velY = 0;
        }
      }

      if (!hasInteracted && !demoDone && !demoRunning && !reduced && now - lastInput > DEMO_MS) {
        demoRunning = true;
        scene.setAttribute("data-demo", "1");
      }

      apply(now);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      hasInteracted = true;
      markInput();
      demoRunning = false;
      demoDone = true;
      scene.removeAttribute("data-demo");
      dragging = true;
      pointerId = e.pointerId;
      downX = lastX = e.clientX;
      downY = lastY = e.clientY;
      lastT = performance.now();
      velX = 0;
      velY = 0;
      cube.style.willChange = "transform";
      scene.classList.add("is-dragging");
      scene.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const now = performance.now();
      const dt = Math.max(8, now - lastT) / 1000;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const k = Math.min(1, dt * 60);
      const vx = (-dy * SENS) / dt;
      const vy = (dx * SENS) / dt;
      velX += (vx - velX) * k;
      velY += (vy - velY) * k;
      targetX = clamp(targetX - dy * SENS, -90, 90);
      targetY += dx * SENS;
      rotX = targetX;
      rotY = targetY;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      markInput();
    };

    const release = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = -1;
      scene.classList.remove("is-dragging");
      cube.style.willChange = "auto";
      try { scene.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (moved <= 6) {
        targetX = snap90(rotX);
        targetY = snap90(rotY) + 90;
      } else {
        const leadX = clamp(velX * 0.11, -90, 90);
        const leadY = clamp(velY * 0.12, -180, 180);
        targetX = clamp(snap90(rotX + leadX), -90, 90);
        targetY = snap90(rotY + leadY);
      }
      if (reduced) {
        rotX = targetX;
        rotY = targetY;
        velX = 0;
        velY = 0;
      }
      markInput();
    };

    const onCancel = () => {
      dragging = false;
      pointerId = -1;
      scene.classList.remove("is-dragging");
      cube.style.willChange = "auto";
      targetX = snap90(rotX);
      targetY = snap90(rotY);
    };

    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = {
        ArrowLeft: [0, -90],
        ArrowRight: [0, 90],
        ArrowUp: [-90, 0],
        ArrowDown: [90, 0],
      };
      const step = map[e.key];
      if (!step) return;
      e.preventDefault();
      hasInteracted = true;
      demoRunning = false;
      demoDone = true;
      scene.removeAttribute("data-demo");
      targetX = clamp(targetX + step[0], -90, 90);
      targetY += step[1];
      velX = 0;
      velY = 0;
      if (reduced) {
        rotX = targetX;
        rotY = targetY;
      }
      markInput();
    };

    window.__cube = {
      state: () => ({ rotX, rotY, targetX, targetY, dragging, hasInteracted, idle: performance.now() - lastInput > IDLE_MS }),
      seek: (x, y) => { rotX = x; rotY = y; targetX = x; targetY = y; velX = 0; velY = 0; },
      releaseTo: (x, y) => { targetX = x; targetY = y; },
    };

    scene.addEventListener("pointerdown", onDown);
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerup", release);
    scene.addEventListener("pointercancel", onCancel);
    scene.addEventListener("keydown", onKey);
    const onEnter = () => { markInput(); };
    scene.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      delete window.__cube;
      scene.removeEventListener("pointerdown", onDown);
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerup", release);
      scene.removeEventListener("pointercancel", onCancel);
      scene.removeEventListener("keydown", onKey);
      scene.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  const faces: Face[] = [
    {
      key: "front",
      className: "cube-face cube-face-front",
      label: "姓名与职位",
      render: (
        <>
          <span className="cube-face-kicker">AI 应用开发工程师</span>
          <span className="cube-face-mark">XJY</span>
          <strong className="cube-face-name">{profile.name}</strong>
          <span className="cube-face-rule" />
          <span className="cube-face-foot">把大模型能力做成可用的产品</span>
        </>
      ),
    },
    {
      key: "right",
      className: "cube-face cube-face-right",
      label: "技术方向",
      render: (
        <>
          <span className="cube-face-kicker">专注方向</span>
          <span className="cube-face-stack">Agent 编排</span>
          <span className="cube-face-stack">RAG 检索</span>
          <span className="cube-face-stack">人机协同</span>
          <span className="cube-face-foot">DeepAgent · LangGraph · MCP</span>
        </>
      ),
    },
    {
      key: "back",
      className: "cube-face cube-face-back",
      label: "GitHub 与状态",
      render: (
        <>
          <span className="cube-face-kicker">GitHub</span>
          <strong className="cube-face-handle">@{profile.username}</strong>
          <span className="cube-face-rule" />
          <span className="cube-face-status"><i />{profile.status}</span>
          <span className="cube-face-foot">公开仓库 05 · 核心项目 03</span>
        </>
      ),
    },
    {
      key: "left",
      className: "cube-face cube-face-left",
      label: "所在地",
      render: (
        <>
          <span className="cube-face-kicker">坐标</span>
          <strong className="cube-face-place">{profile.location}</strong>
          <span className="cube-face-rule" />
          <span className="cube-face-foot">{profile.education.school} · {profile.education.major}</span>
        </>
      ),
    },
    {
      key: "top",
      className: "cube-face cube-face-top",
      label: "项目数据",
      render: (
        <>
          <span className="cube-face-kicker">在做的</span>
          <span className="cube-face-big">03 <small>项目</small></span>
          <span className="cube-face-big">23 <small>工具</small></span>
          <span className="cube-face-foot">115/115 意图验收</span>
        </>
      ),
    },
    {
      key: "bottom",
      className: "cube-face cube-face-bottom",
      label: "邮箱",
      render: (
        <>
          <span className="cube-face-kicker">联系</span>
          <strong className="cube-face-mail">{profile.email}</strong>
          <span className="cube-face-rule" />
          <span className="cube-face-foot">{profile.phone}</span>
        </>
      ),
    },
  ];

  return (
    <div className="cube-block">
      <div className="cube-stage" ref={sceneRef}>
        <div
          className="cube-scene"
          tabIndex={0}
          role="button"
          aria-label={`个人资料立方体：${profile.name}，${profile.title}。拖动旋转，或按方向键切换六个面。`}
        >
          <div className="cube" ref={cubeRef}>
            {faces.map((face) => (
              <div className={face.className} key={face.key} aria-hidden="true">
                <div className="cube-face-inner">{face.render}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="cube-shadow" aria-hidden="true" />
      </div>
      <div className="cube-caption" aria-hidden="true">
        <span className="cube-drag-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path className="cube-drag-path" d="M4 12a8 8 0 0 1 13.7-5.6M20 12a8 8 0 0 1-13.7 5.6" />
            <path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4" />
          </svg>
          拖动旋转
        </span>
        <span className="cube-index">{profile.username}</span>
      </div>
      <span className="sr-only" aria-live="polite">
        立方体六个面分别展示：姓名与职位、技术方向、GitHub 状态、所在地、项目数据、邮箱。
      </span>
    </div>
  );
}
