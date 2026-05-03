/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║  ŌRÏA — Motion Design Cinématique · 45 Secondes                      ║
 * ║  src/Composition.tsx                                                  ║
 * ║                                                                       ║
 * ║  Format : 1080 × 1920 px (TikTok/Reels) · 30 fps · 1350 frames      ║
 * ║  Architecture : 8 Actes · Spring Physics · Typographie Cinétique      ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  Easing,
} from "remotion";

// ═══════════════════════════════════════
// ❶  DESIGN TOKENS
// ═══════════════════════════════════════
const C = {
  gold: "#C9A84C", gold2: "#E8D098", gold3: "#F5E8B8",
  goldDk: "#8A5F1C", goldDk2: "#5A3A0A",
  black: "#060605", black2: "#0C0B08", black3: "#151209",
  fg: "rgba(255,255,255,0.88)", fg2: "rgba(255,255,255,0.55)",
  fg3: "rgba(255,255,255,0.25)", mink: "rgba(201,168,76,0.55)",
  green: "#22C55E", red: "#FF4444",
};

// ═══════════════════════════════════════
// ❷  TIMELINE (frames @30fps)
// ═══════════════════════════════════════
const T = {
  INTRO: 0,         // 0s
  TAGLINE: 120,     // 4s
  MARIAGE: 240,     // 8s
  SERVICES: 450,    // 15s
  DEMO: 660,        // 22s
  HERMANE: 870,     // 29s
  PRICING: 1080,    // 36s
  CTA: 1260,        // 42s
  TOTAL: 1350,      // 45s
};
const FPS = 30;

// ═══════════════════════════════════════
// ❸  ANIMATION HELPERS
// ═══════════════════════════════════════
function sp(f: number, from = 0, to = 1, cfg = { damping: 14, stiffness: 120, mass: 0.8 }) {
  return spring({ fps: FPS, frame: f, config: cfg, from, to });
}

function lerp(f: number, f0: number, f1: number, v0: number, v1: number,
  ease: (t: number) => number = Easing.out(Easing.cubic)) {
  return interpolate(f, [f0, f1], [v0, v1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease,
  });
}

function pulse(f: number, spd = 0.05, lo = 0.4, hi = 1) {
  return lo + (hi - lo) * (Math.sin(f * spd) * 0.5 + 0.5);
}

// ═══════════════════════════════════════
// ❹  MICRO-COMPOSANTS
// ═══════════════════════════════════════
const GoldLine: React.FC<{ width?: number; opacity?: number; glow?: boolean }> = ({
  width = 200, opacity = 1, glow = false,
}) => (
  <div style={{
    width, height: 1,
    background: `linear-gradient(90deg,transparent,${C.gold},${C.gold2},${C.gold},transparent)`,
    opacity, boxShadow: glow ? `0 0 14px rgba(201,168,76,0.85)` : "none",
  }} />
);

const Diamond: React.FC<{ size?: number; opacity?: number }> = ({ size = 6, opacity = 1 }) => (
  <div style={{
    width: size, height: size, background: C.gold, transform: "rotate(45deg)",
    opacity, flexShrink: 0, boxShadow: `0 0 ${size * 2}px rgba(201,168,76,0.7)`,
  }} />
);

const SectionLabel: React.FC<{ text: string; opacity?: number }> = ({ text, opacity = 1 }) => (
  <div style={{
    fontSize: 20, letterSpacing: 8, textTransform: "uppercase" as const,
    color: C.gold, fontFamily: "Montserrat, sans-serif", opacity,
    display: "flex", alignItems: "center", gap: 16,
  }}>
    <Diamond size={5} opacity={opacity} />
    {text}
    <Diamond size={5} opacity={opacity} />
  </div>
);

const GoldGradient = (deg = "135deg") =>
  `linear-gradient(${deg}, ${C.goldDk} 0%, ${C.gold} 35%, ${C.gold2} 55%, ${C.gold3} 70%, ${C.gold} 85%, ${C.goldDk} 100%)`;

// ═══════════════════════════════════════
// ❺  SCÈNE 1 — INTRO CINÉMATIQUE (0–4s)
// ═══════════════════════════════════════
const SceneIntro: React.FC<{ frame: number }> = ({ frame: f }) => {
  const bgOp     = lerp(f, 0, 15, 0, 1);
  const logoSc   = sp(Math.max(0, f - 8), 0, 1, { damping: 9, stiffness: 55, mass: 1.3 });
  const logoOp   = lerp(f, 8, 30, 0, 1);
  const glow     = pulse(f, 0.06, 0.25, 0.9) * Math.min(1, (f - 20) / 30);
  const tagOp    = lerp(f, 55, 80, 0, 1);
  const tagY     = lerp(f, 55, 80, 40, 0);
  const lineW    = lerp(f, 62, 95, 0, 340, Easing.out(Easing.cubic));

  // Spark particles
  const SPARKS = Array.from({ length: 20 }, (_, i) => ({
    angle: (i / 20) * 360, dist: 110 + (i % 4) * 55, size: 2 + (i % 3), delay: i * 3,
  }));
  const sparkP = lerp(f, 10, 65, 0, 1, Easing.out(Easing.exp));

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 100% 80% at 50% 40%, #1A0A04, #060605)`, opacity: bgOp }} />
      <AbsoluteFill style={{
        backgroundImage: `repeating-linear-gradient(0deg,rgba(201,168,76,0.018) 0,transparent 1px,transparent 85px),repeating-linear-gradient(90deg,rgba(201,168,76,0.018) 0,transparent 1px,transparent 85px)`,
        opacity: bgOp,
      }} />
      <AbsoluteFill style={{
        backgroundImage: `repeating-linear-gradient(105deg,transparent 0,transparent 165px,rgba(201,168,76,0.012) 166px,rgba(201,168,76,0.012) 167px)`,
      }} />

      {/* Sparks */}
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {SPARKS.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          return (
            <div key={i} style={{
              position: "absolute",
              width: s.size, height: s.size, borderRadius: "50%",
              background: i % 3 === 0 ? C.gold3 : C.gold,
              transform: `translate(${Math.cos(rad) * s.dist * sparkP}px,${Math.sin(rad) * s.dist * sparkP}px)`,
              opacity: lerp(f, s.delay + 10, s.delay + 55, 0.9, 0),
              boxShadow: `0 0 ${s.size * 4}px ${C.gold}`,
            }} />
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 60px" }}>
        {/* Logo */}
        <div style={{ transform: `scale(${logoSc})`, opacity: logoOp, textAlign: "center", marginBottom: 8 }}>
          <div style={{
            fontSize: 162, fontStyle: "italic", fontWeight: "bold", fontFamily: "Georgia, serif",
            letterSpacing: 22,
            background: GoldGradient("145deg"),
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 ${80 * glow}px rgba(201,168,76,${glow * 0.9})) drop-shadow(0 0 ${170 * glow}px rgba(201,168,76,${glow * 0.45}))`,
            lineHeight: 0.88,
          }}>ŌRÏA</div>
        </div>

        {/* Ligne */}
        <GoldLine width={lineW} glow opacity={lerp(f, 62, 95, 0, 1)} />
        <div style={{ height: 28 }} />

        {/* Tagline */}
        <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, textAlign: "center" }}>
          <div style={{ fontSize: 34, letterSpacing: 10, textTransform: "uppercase" as const, color: "rgba(201,168,76,0.6)", fontFamily: "Montserrat, sans-serif", marginBottom: 12 }}>
            Digital Events Experience
          </div>
          <div style={{ fontSize: 28, letterSpacing: 6, color: C.fg3, fontFamily: "Montserrat, sans-serif" }}>
            🇬🇦 LIBREVILLE · GABON
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 90% at 50% 50%, transparent 38%, rgba(6,6,5,0.88) 100%)` }} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════
// ❻  SCÈNE 2 — TAGLINE KINÉTIQUE (4–8s)
// ═══════════════════════════════════════
const SceneTagline: React.FC<{ frame: number }> = ({ frame: f }) => {
  const lf = f - T.TAGLINE;
  const WORDS = [
    { text: "L'invitation", color: C.fg,   size: 88,  italic: true,  delay: 0  },
    { text: "qui",          color: C.fg2,  size: 62,  italic: false, delay: 8  },
    { text: "devient",      color: C.gold, size: 80,  italic: true,  delay: 16 },
    { text: "une",          color: C.fg2,  size: 62,  italic: false, delay: 24 },
    { text: "expérience",   color: C.fg,   size: 92,  italic: true,  delay: 32 },
  ];
  const subOp = lerp(lf, 80, 100, 0, 1);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(160deg,#1A0D04,#080806)` }} />
      <AbsoluteFill style={{ backgroundImage: `repeating-linear-gradient(105deg,transparent 0,transparent 155px,rgba(201,168,76,0.015) 156px,rgba(201,168,76,0.015) 157px)` }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 80px", gap: 4 }}>
        {WORDS.map((w, i) => {
          const wf = Math.max(0, lf - w.delay);
          return (
            <div key={i} style={{
              fontSize: w.size,
              fontStyle: w.italic ? "italic" : "normal",
              fontFamily: "Georgia, serif",
              color: w.color,
              transform: `translateX(${lerp(wf, 0, 18, i % 2 === 0 ? -80 : 80, 0, Easing.out(Easing.back(1.1)))}px) scale(${0.65 + sp(wf, 0, 1, { damping: 12, stiffness: 90, mass: 0.7 }) * 0.35})`,
              opacity: lerp(wf, 0, 12, 0, 1),
              letterSpacing: w.italic ? 4 : 2,
              lineHeight: 1.15,
              textShadow: w.color === C.gold ? `0 0 42px rgba(201,168,76,0.75),0 4px 20px rgba(0,0,0,0.8)` : `0 4px 20px rgba(0,0,0,0.8)`,
            }}>{w.text}</div>
          );
        })}
        <div style={{ height: 22 }} />
        <GoldLine width={lerp(lf, 58, 92, 0, 290)} glow opacity={lerp(lf, 58, 92, 0, 1)} />
        <div style={{ height: 14 }} />
        <div style={{ fontSize: 26, letterSpacing: 7, color: "rgba(201,168,76,0.5)", fontFamily: "Montserrat,sans-serif", opacity: subOp, textTransform: "uppercase" as const }}>
          Ce que les autres ne font pas
        </div>
        <div style={{ fontSize: 22, letterSpacing: 5, color: C.fg3, fontFamily: "Montserrat,sans-serif", opacity: subOp }}>
          Nous le créons.
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 90% at 50% 50%, transparent 38%, rgba(6,6,5,0.72) 100%)` }} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════
// ❼  SCÈNE 3 — MARIAGE SHOWCASE (8–15s)
// ═══════════════════════════════════════
const SceneMariage: React.FC<{ frame: number }> = ({ frame: f }) => {
  const lf = f - T.MARIAGE;
  const slideX  = lerp(lf, 0, 28, 1080, 0, Easing.out(Easing.cubic));
  const titleOp = lerp(lf, 12, 32, 0, 1);
  const titleY  = lerp(lf, 12, 32, 50, 0);
  const statP   = lerp(lf, 55, 120, 0, 1, Easing.out(Easing.cubic));

  const EVENTS = [
    { icon: "💍", name: "Mariage Civil" }, { icon: "🌿", name: "Mariage Coutumier" },
    { icon: "💒", name: "Fiançailles" },   { icon: "👶", name: "Baptême" },
    { icon: "🎂", name: "Anniversaire" },  { icon: "🏢", name: "Entreprise" },
  ];
  const STATS = [
    { val: 48, unit: "h", label: "Livraison" },
    { val: 9, unit: "+", label: "Services" },
    { val: 3, unit: "x", label: "Formats" },
  ];

  return (
    <AbsoluteFill style={{ transform: `translateX(${slideX}px)` }}>
      <AbsoluteFill style={{ background: `linear-gradient(170deg,#0D0A06,#060605,#0A0804)` }} />
      <AbsoluteFill style={{ backgroundImage: `repeating-linear-gradient(0deg,rgba(201,168,76,0.014) 0,transparent 1px,transparent 72px),repeating-linear-gradient(90deg,rgba(201,168,76,0.014) 0,transparent 1px,transparent 72px)` }} />
      {/* Bande or gauche */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom,transparent,${C.gold},${C.gold2},${C.gold},transparent)`, opacity: 0.65 }} />

      <AbsoluteFill style={{ padding: "150px 60px 170px" }}>
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 28 }}>
          <SectionLabel text="Nos Événements" />
        </div>
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 40 }}>
          <div style={{ fontSize: 88, fontStyle: "italic", fontFamily: "Georgia,serif", color: C.fg, lineHeight: 1.05 }}>Chaque</div>
          <div style={{ fontSize: 88, fontStyle: "italic", fontFamily: "Georgia,serif", lineHeight: 1.05, background: GoldGradient(), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 28px rgba(201,168,76,0.55))` }}>événement</div>
          <div style={{ fontSize: 88, fontStyle: "italic", fontFamily: "Georgia,serif", color: C.fg, lineHeight: 1.05 }}>mérite ŌRÏA</div>
        </div>

        {/* Grille événements */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 40 }}>
          {EVENTS.map((ev, i) => {
            const evd = 40 + i * 10;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.16)",
                opacity: lerp(lf, evd, evd + 14, 0, 1),
                transform: `translateX(${lerp(lf, evd, evd + 14, i % 2 === 0 ? -38 : 38, 0)}px)`,
              }}>
                <span style={{ fontSize: 28 }}>{ev.icon}</span>
                <span style={{ fontSize: 22, color: C.fg, fontFamily: "Georgia,serif", fontStyle: "italic" }}>{ev.name}</span>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div style={{ display: "flex" }}>
          {STATS.map((st, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: "20px 0",
              borderLeft: i > 0 ? "1px solid rgba(201,168,76,0.14)" : "none",
              opacity: lerp(lf, 55 + i * 8, 75 + i * 8, 0, 1),
            }}>
              <div style={{ fontSize: 68, fontFamily: "Georgia,serif", fontStyle: "italic", background: GoldGradient(), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
                {Math.round(statP * st.val)}{st.unit}
              </div>
              <div style={{ fontSize: 18, color: C.fg3, fontFamily: "Montserrat,sans-serif", letterSpacing: 2, marginTop: 5 }}>{st.label}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════
// ❽  SCÈNE 4 — SERVICES CASCADE (15–22s)
// ═══════════════════════════════════════
const SceneServices: React.FC<{ frame: number }> = ({ frame: f }) => {
  const lf = f - T.SERVICES;
  const SVCS = [
    { n:"01",ic:"💻",t:"Site Mariage",     d:"Civil & Coutumier · IA 24h/24", delay:10,  hi:false },
    { n:"02",ic:"💍",t:"Site Fiançailles", d:"Galerie · Countdown · RSVP",    delay:18,  hi:false },
    { n:"03",ic:"👶",t:"Site Baptême",     d:"Photos bébé · Cadeaux",          delay:26,  hi:true  },
    { n:"04",ic:"📲",t:"QR Check-in",      d:"QR unique · Placement auto",     delay:34,  hi:false },
    { n:"05",ic:"📱",t:"Mobile Money",     d:"Airtel · Moov · Traçable",       delay:42,  hi:true  },
    { n:"06",ic:"📖",t:"Livre d'Or",       d:"Texte · Photo · Vidéo",          delay:50,  hi:false },
    { n:"07",ic:"🖼️",t:"Mur Photo Live",   d:"Grand écran · Temps réel",       delay:58,  hi:true  },
    { n:"08",ic:"🎂",t:"Site Événement",   d:"Anniv · Entreprise · Cérém.",    delay:66,  hi:false },
    { n:"09",ic:"👑",t:"Pack Royal",       d:"Tout inclus · Illimité",          delay:74,  hi:true  },
  ];
  const tOp = lerp(lf, 0, 20, 0, 1);
  const tY  = lerp(lf, 0, 20, 40, 0);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(160deg,#0C0A06,#060605)` }} />
      <AbsoluteFill style={{ backgroundImage: `repeating-linear-gradient(105deg,transparent 0,transparent 170px,rgba(201,168,76,0.01) 171px,rgba(201,168,76,0.01) 172px)` }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom,transparent,${C.gold},${C.gold2},${C.gold},transparent)`, opacity: 0.6 }} />

      <AbsoluteFill style={{ padding: "150px 52px 170px", overflow: "hidden" }}>
        <div style={{ opacity: tOp, transform: `translateY(${tY}px)`, marginBottom: 20 }}>
          <SectionLabel text="Tous nos services" />
        </div>
        <div style={{ opacity: tOp, transform: `translateY(${tY}px)`, marginBottom: 28 }}>
          <div style={{ fontSize: 74, fontStyle: "italic", fontFamily: "Georgia,serif", lineHeight: 1.1 }}>
            <span style={{ color: C.fg }}>La palette </span>
            <span style={{ background: GoldGradient(), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 22px rgba(201,168,76,0.6))` }}>complète</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          {SVCS.map((s, i) => {
            const pf = Math.max(0, lf - s.delay);
            const sc = sp(pf, 0, 1, { damping: 16, stiffness: 100, mass: 0.9 });
            return (
              <div key={i} style={{
                transform: `scale(${sc}) translateY(${lerp(pf, 0, 20, 28, 0)}px)`,
                opacity: lerp(pf, 0, 14, 0, 1),
                background: s.hi ? "rgba(201,168,76,0.08)" : "rgba(12,11,9,0.9)",
                border: `1px solid ${s.hi ? "rgba(201,168,76,0.42)" : "rgba(201,168,76,0.14)"}`,
                padding: "22px 20px", position: "relative", overflow: "hidden",
              }}>
                {s.hi && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${C.gold},${C.gold2},${C.gold},transparent)`, boxShadow: `0 0 10px rgba(201,168,76,0.85)` }} />}
                <div style={{ fontSize: 36, fontStyle: "italic", color: "rgba(201,168,76,0.07)", fontFamily: "Georgia,serif", lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
                <div style={{ fontSize: 28, marginBottom: 7 }}>{s.ic}</div>
                <div style={{ fontSize: 24, color: C.fg, fontFamily: "Georgia,serif", fontStyle: "italic", marginBottom: 5, lineHeight: 1.2 }}>{s.t}</div>
                <div style={{ fontSize: 17, color: C.fg2, fontFamily: "Georgia,serif", fontStyle: "italic", lineHeight: 1.5 }}>{s.d}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════
// ❾  SCÈNE 5 — DEMO APP IPHONE (22–29s)
// ═══════════════════════════════════════
const SceneDemo: React.FC<{ frame: number }> = ({ frame: f }) => {
  const lf = f - T.DEMO;
  const dur = T.HERMANE - T.DEMO;
  const slideX = lerp(lf, 0, 28, -1080, 0, Easing.out(Easing.cubic));
  const phoneOp = lerp(lf, 12, 34, 0, 1);
  const phoneGlow = lerp(lf, 30, 60, 0, 1);
  const SH = 420;
  const scrollY = lerp(lf, 22, dur - 22, 0, SH * 3, Easing.inOut(Easing.cubic));
  const tOp = lerp(lf, 0, 18, 0, 1);

  const SCREENS = [
    <div style={{ padding: "14px 16px", color: "#fff" }}>
      <div style={{ fontSize: 13, letterSpacing: 4, color: C.gold, fontFamily: "Montserrat,sans-serif", marginBottom: 8 }}>INVITATION</div>
      <div style={{ fontSize: 36, fontStyle: "italic", fontFamily: "Georgia,serif", color: C.gold, letterSpacing: 2, marginBottom: 5 }}>Lia & Junior</div>
      <div style={{ fontSize: 13, color: C.fg3, fontFamily: "Montserrat,sans-serif", marginBottom: 12 }}>15 · 06 · 2026 · Libreville</div>
      <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, marginBottom: 12 }} />
      <div style={{ fontSize: 16, color: C.fg2, fontStyle: "italic", fontFamily: "Georgia,serif" }}>Mariage Civil & Coutumier</div>
    </div>,
    <div style={{ padding: "12px 14px", color: "#fff" }}>
      <div style={{ fontSize: 11, letterSpacing: 3, color: C.gold, fontFamily: "Montserrat,sans-serif", marginBottom: 9 }}>MENU & SERVICES</div>
      {[["🍽️","Mon menu"],["🥂","Ma boisson"],["💌","Message"],["📍","GPS"],["📱","Payer"]].map(([ic, tx]) => (
        <div key={tx as string} style={{ display: "flex", gap: 9, alignItems: "center", padding: "7px 9px", border: "1px solid rgba(201,168,76,0.15)", marginBottom: 4, background: "rgba(201,168,76,0.05)" }}>
          <span style={{ fontSize: 16 }}>{ic}</span>
          <span style={{ fontSize: 13, fontStyle: "italic", fontFamily: "Georgia,serif", color: C.fg }}>{tx}</span>
        </div>
      ))}
    </div>,
    <div style={{ padding: "12px 14px" }}>
      <div style={{ fontSize: 11, letterSpacing: 3, color: C.gold, fontFamily: "Montserrat,sans-serif", marginBottom: 9 }}>MOBILE MONEY</div>
      {[["📱","Airtel Money","Cotisation"],["💚","Moov Money","Paiement"]].map(([ic, name, sub]) => (
        <div key={name as string} style={{ padding: "9px 11px", border: "1px solid rgba(201,168,76,0.2)", marginBottom: 5 }}>
          <div style={{ fontSize: 14, color: C.gold, fontFamily: "Montserrat,sans-serif", marginBottom: 2 }}>{ic} {name}</div>
          <div style={{ fontSize: 12, color: C.fg2, fontStyle: "italic", fontFamily: "Georgia,serif" }}>{sub}</div>
        </div>
      ))}
      <div style={{ background: `linear-gradient(135deg,${C.gold},${C.goldDk})`, padding: "9px", textAlign: "center", marginTop: 7 }}>
        <div style={{ fontSize: 12, color: "#000", fontFamily: "Montserrat,sans-serif", fontWeight: "bold", letterSpacing: 3 }}>CONFIRMER</div>
      </div>
    </div>,
    <div style={{ padding: "12px 14px" }}>
      <div style={{ fontSize: 11, letterSpacing: 3, color: C.gold, fontFamily: "Montserrat,sans-serif", marginBottom: 9 }}>LIVRE D'OR</div>
      <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", padding: "9px 12px", marginBottom: 7, borderRadius: "0 12px 12px 12px" }}>
        <div style={{ fontSize: 14, fontStyle: "italic", fontFamily: "Georgia,serif", color: C.fg2 }}>Belle cérémonie ! Merci ❤️</div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
        {["📸 Photo","🎥 Vidéo","💬 Texte"].map(t => (
          <div key={t} style={{ border: "1px solid rgba(201,168,76,0.25)", padding: "3px 9px", fontSize: 10, color: C.mink, fontFamily: "Montserrat,sans-serif" }}>{t}</div>
        ))}
      </div>
    </div>,
  ];

  return (
    <AbsoluteFill style={{ transform: `translateX(${slideX}px)` }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 100% 70% at 50% 30%,#1A0D04,#060605)` }} />
      <AbsoluteFill style={{ backgroundImage: `repeating-linear-gradient(105deg,transparent 0,transparent 155px,rgba(201,168,76,0.014) 156px,rgba(201,168,76,0.014) 157px)` }} />

      <AbsoluteFill style={{ padding: "150px 58px 170px" }}>
        <div style={{ opacity: tOp, marginBottom: 36 }}>
          <SectionLabel text="L'Expérience Invité" />
          <div style={{ marginTop: 16, fontSize: 70, fontStyle: "italic", fontFamily: "Georgia,serif", lineHeight: 1.1 }}>
            <span style={{ color: C.fg }}>Dans leur </span>
            <span style={{ background: GoldGradient(), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 22px rgba(201,168,76,0.7))` }}>téléphone</span>
          </div>
        </div>

        {/* iPhone */}
        <div style={{ display: "flex", justifyContent: "center", opacity: phoneOp }}>
          <div style={{ filter: `drop-shadow(0 40px 80px rgba(0,0,0,0.88)) drop-shadow(0 0 ${38 * phoneGlow}px rgba(201,168,76,0.3))` }}>
            <div style={{ width: 310, background: "linear-gradient(145deg,#2D2D2D,#1A1A1A)", borderRadius: 50, padding: 11, boxShadow: `0 50px 110px rgba(0,0,0,0.9),0 0 0 1.5px #3A3A3A,inset 0 1px 0 rgba(255,255,255,0.07)` }}>
              <div style={{ background: "#080808", borderRadius: 40, overflow: "hidden" }}>
                <div style={{ background: "#000", width: 92, height: 30, borderRadius: 16, margin: "9px auto 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 18px", color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "Montserrat,sans-serif" }}>
                  <span>9:41</span><span>●●●</span>
                </div>
                <div style={{ textAlign: "center", padding: "5px 0 9px", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                  <div style={{ fontSize: 20, fontStyle: "italic", fontFamily: "Georgia,serif", color: C.gold, letterSpacing: 5 }}>ŌRÏA</div>
                  <div style={{ fontSize: 8, letterSpacing: 2, color: C.fg3, fontFamily: "Montserrat,sans-serif" }}>DIGITAL WEDDING</div>
                </div>
                <div style={{ height: SH, overflow: "hidden", position: "relative" }}>
                  <div style={{ transform: `translateY(-${scrollY}px)` }}>
                    {SCREENS.map((sc, i) => <div key={i} style={{ minHeight: SH }}>{sc}</div>)}
                  </div>
                </div>
                <div style={{ height: 26, display: "flex", alignItems: "center", justifyContent: "center", background: "#050505" }}>
                  <div style={{ width: 90, height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 3 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature badges */}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" as const, marginTop: 26, justifyContent: "center" }}>
          {["✅ Menu","📍 GPS","💌 Livre d'or","📱 Mobile Money","🤖 IA 24h/24"].map((feat, i) => (
            <div key={feat} style={{
              border: "1px solid rgba(201,168,76,0.3)", padding: "7px 16px",
              fontSize: 18, color: C.gold, fontFamily: "Montserrat,sans-serif", letterSpacing: 1,
              opacity: lerp(lf, 48 + i * 6, 62 + i * 6, 0, 1),
              background: "rgba(201,168,76,0.05)",
            }}>{feat}</div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════
// ❿  SCÈNE 6 — HERMANE IA LIVE (29–36s)
// ═══════════════════════════════════════
const SceneHermane: React.FC<{ frame: number }> = ({ frame: f }) => {
  const lf = f - T.HERMANE;
  const glowV = pulse(lf, 0.05, 0.35, 0.85);
  const hOp  = lerp(lf, 0, 18, 0, 1);
  const hY   = lerp(lf, 0, 18, 40, 0);
  const cWOp = lerp(lf, 14, 32, 0, 1);
  const cWSc = sp(Math.max(0, lf - 14), 0, 1, { damping: 15, stiffness: 95, mass: 0.8 });

  const MSGS = [
    { from: "ai",   text: "Bonjour ! Je suis Hermane ✨ Comment puis-je vous aider ?",         delay: 14  },
    { from: "user", text: "Quels sont vos tarifs ?",                                            delay: 42  },
    { from: "ai",   text: "Pack Essentiel : 75 000 FCFA\nPrestige : 150 000 FCFA\nRoyal : 250 000 FCFA", delay: 60 },
    { from: "user", text: "Livraison en combien de temps ?",                                    delay: 98  },
    { from: "ai",   text: "48h garantis ! Votre site prêt avant le Jour J 🚀",                 delay: 118 },
    { from: "user", text: "Vous faites le mobile money ?",                                      delay: 148 },
    { from: "ai",   text: "Oui ! Airtel & Moov Money intégrés directement dans l'invitation 📱", delay: 166 },
  ];

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 100% 70% at 30% 40%,#150A04,#080605)` }} />
      <AbsoluteFill style={{ backgroundImage: `repeating-linear-gradient(0deg,rgba(201,168,76,0.013) 0,transparent 1px,transparent 82px),repeating-linear-gradient(90deg,rgba(201,168,76,0.013) 0,transparent 1px,transparent 82px)` }} />

      <AbsoluteFill style={{ padding: "150px 52px 170px" }}>
        <div style={{ opacity: hOp, transform: `translateY(${hY}px)`, marginBottom: 28 }}>
          <SectionLabel text="Concierge IA" />
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 82, fontStyle: "italic", fontFamily: "Georgia,serif", color: C.fg, lineHeight: 1.1 }}>Hermane,</div>
            <div style={{ fontSize: 74, fontStyle: "italic", fontFamily: "Georgia,serif", background: GoldGradient(), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 32px rgba(201,168,76,${glowV * 0.7}))`, lineHeight: 1.1 }}>
              disponible 24h/24
            </div>
          </div>
        </div>

        {/* Fenêtre chat */}
        <div style={{ opacity: cWOp, transform: `scale(${cWSc})`, border: "1px solid rgba(201,168,76,0.3)", borderRadius: 8, overflow: "hidden", boxShadow: `0 38px 95px rgba(0,0,0,0.72),0 0 ${48 * glowV}px rgba(201,168,76,${0.12 * glowV})` }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(90deg,#120800,#1A0D03)", padding: "15px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldDk})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `2px solid rgba(201,168,76,0.5)`, boxShadow: `0 0 18px rgba(201,168,76,0.4)`, flexShrink: 0 }}>✨</div>
            <div>
              <div style={{ fontSize: 20, color: C.fg, fontFamily: "Georgia,serif", fontWeight: 600 }}>Hermane</div>
              <div style={{ fontSize: 11, color: "rgba(201,168,76,0.6)", fontFamily: "Montserrat,sans-serif", letterSpacing: 2 }}>CONCIERGE IA EXCLUSIF · ŌRÏA</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, boxShadow: `0 0 10px ${C.green}` }} />
              <span style={{ fontSize: 12, color: C.green, fontFamily: "Montserrat,sans-serif" }}>En ligne</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ background: "rgba(8,7,4,0.8)", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 12, minHeight: 340 }}>
            {MSGS.map((msg, i) => {
              const mOp = lerp(lf, msg.delay, msg.delay + 11, 0, 1);
              const mY  = lerp(lf, msg.delay, msg.delay + 11, 14, 0);
              if (mOp < 0.01) return null;
              return (
                <div key={i} style={{ display: "flex", flexDirection: msg.from === "user" ? "row-reverse" : "row", gap: 9, alignItems: "flex-start", opacity: mOp, transform: `translateY(${mY}px)` }}>
                  {msg.from === "ai" && (
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldDk})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>✨</div>
                  )}
                  <div style={{
                    maxWidth: "75%", padding: "11px 15px", fontSize: 17, fontStyle: "italic", fontFamily: "Georgia,serif", lineHeight: 1.6,
                    background: msg.from === "ai" ? "rgba(201,168,76,0.09)" : "linear-gradient(135deg,rgba(90,55,12,0.7),rgba(40,25,5,0.85))",
                    border: msg.from === "ai" ? "1px solid rgba(201,168,76,0.2)" : "none",
                    borderRadius: msg.from === "ai" ? "0 13px 13px 13px" : "13px 0 13px 13px",
                    color: msg.from === "ai" ? C.fg : "rgba(240,208,128,0.9)",
                    whiteSpace: "pre-line" as const,
                  }}>{msg.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════
// ⓫  SCÈNE 7 — PRICING (36–42s)
// ═══════════════════════════════════════
const ScenePricing: React.FC<{ frame: number }> = ({ frame: f }) => {
  const lf = f - T.PRICING;
  const tOp = lerp(lf, 0, 18, 0, 1);
  const tY  = lerp(lf, 0, 18, 40, 0);

  const PACKS = [
    { name: "Essentiel", price: "75 000",  sub: "Livraison 72h",      hi: false, delay: 22, feats: ["Site 1 page","Programme","RSVP","GPS","Galerie"] },
    { name: "Prestige",  price: "150 000", sub: "⭐ Le + populaire",   hi: true,  delay: 5,  feats: ["Site multi-pages","✨ Hermane IA 24h/24","QR Check-in","📱 Mobile Money","Livre d'or"] },
    { name: "Royal",     price: "250 000", sub: "Livraison 48h",      hi: false, delay: 38, feats: ["Tout Prestige","👑 Mur photo live","Modif. illimitées","Support prioritaire","Héberg. 24 mois"] },
  ];

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(170deg,#0A0806,#060605,#0D0A06)` }} />
      <AbsoluteFill style={{ backgroundImage: `repeating-linear-gradient(0deg,rgba(201,168,76,0.012) 0,transparent 1px,transparent 78px),repeating-linear-gradient(90deg,rgba(201,168,76,0.012) 0,transparent 1px,transparent 78px)` }} />

      <AbsoluteFill style={{ padding: "150px 48px 170px" }}>
        <div style={{ opacity: tOp, transform: `translateY(${tY}px)`, marginBottom: 30 }}>
          <SectionLabel text="Investissement" />
          <div style={{ marginTop: 14, fontSize: 82, fontStyle: "italic", fontFamily: "Georgia,serif", lineHeight: 1.1 }}>
            <span style={{ color: C.fg }}>Nos </span>
            <span style={{ background: GoldGradient(), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 26px rgba(201,168,76,0.6))` }}>Offres</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {PACKS.map((pk, i) => {
            const pf = Math.max(0, lf - pk.delay);
            const sc = sp(pf, 0, 1, { damping: 14, stiffness: 98, mass: 0.8 });
            return (
              <div key={i} style={{
                opacity: lerp(pf, 0, 18, 0, 1),
                transform: `translateX(${lerp(pf, 0, 18, i % 2 === 0 ? -95 : 95, 0)}px) scale(${pk.hi ? 1 : 0.97 + sc * 0.03})`,
                background: pk.hi ? "rgba(201,168,76,0.08)" : "rgba(12,11,9,0.9)",
                border: `1px solid ${pk.hi ? "rgba(201,168,76,0.44)" : "rgba(201,168,76,0.14)"}`,
                padding: "20px 26px", position: "relative", overflow: "hidden",
                boxShadow: pk.hi ? `0 18px 55px rgba(0,0,0,0.5),0 0 38px rgba(201,168,76,0.12)` : "0 10px 36px rgba(0,0,0,0.4)",
              }}>
                {pk.hi && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${C.gold},${C.gold2},${C.gold},transparent)`, boxShadow: `0 0 12px rgba(201,168,76,0.9)` }} />}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 12, letterSpacing: 5, color: C.gold, fontFamily: "Montserrat,sans-serif", marginBottom: 5, textTransform: "uppercase" as const }}>{pk.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 13, color: C.fg3, fontFamily: "Montserrat,sans-serif" }}>FCFA</span>
                      <span style={{ fontSize: 50, fontFamily: "Georgia,serif", fontStyle: "italic", color: pk.hi ? C.gold : C.fg, textShadow: pk.hi ? `0 0 28px rgba(201,168,76,0.65)` : "none" }}>{pk.price}</span>
                    </div>
                    <div style={{ fontSize: 15, color: C.fg3, fontStyle: "italic", fontFamily: "Georgia,serif" }}>{pk.sub}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end", maxWidth: "52%" }}>
                    {pk.feats.map((feat, fi) => (
                      <div key={fi} style={{ fontSize: 15, color: C.fg2, fontStyle: "italic", fontFamily: "Georgia,serif", display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 9, color: C.gold }}>●</span>{feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 18, textAlign: "center", opacity: lerp(lf, 78, 98, 0, 1), fontSize: 17, fontStyle: "italic", color: C.fg3, fontFamily: "Georgia,serif" }}>
          Hébergement 12 mois · Devis gratuit · Mobile Money accepté
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════
// ⓬  SCÈNE 8 — CTA FINAL GLOW (42–45s)
// ═══════════════════════════════════════
const SceneCTA: React.FC<{ frame: number }> = ({ frame: f }) => {
  const lf = f - T.CTA;
  const bgOp    = lerp(lf, 0, 18, 0, 1);
  const logoSc  = sp(Math.max(0, lf - 5), 0, 1, { damping: 9, stiffness: 55, mass: 1.3 });
  const logoOp  = lerp(lf, 5, 28, 0, 1);
  const gP      = Math.min(1, Math.max(0, (lf - 14) / 24));
  const glowV   = gP * pulse(lf, 0.07, 0.4, 1.0);
  const lineW   = lerp(lf, 24, 48, 0, 360);
  const ctaOp   = lerp(lf, 38, 62, 0, 1);
  const ctaY    = lerp(lf, 38, 62, 48, 0);
  const btnSc   = sp(Math.max(0, lf - 58), 0, 1, { damping: 13, stiffness: 175, mass: 0.7 });

  const PARTS = Array.from({ length: 28 }, (_, i) => ({
    x: (i * 39 + 50) % 1080, y: (i * 71 + 80) % 1920,
    sz: 1.5 + (i % 3) * 0.8, spd: 0.03 + (i % 5) * 0.014, ph: i * 0.85,
  }));

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 100% 100% at 50% 40%,#1A0D04,#050505)`, opacity: bgOp }} />
      <AbsoluteFill style={{ backgroundImage: `repeating-linear-gradient(105deg,transparent 0,transparent 152px,rgba(201,168,76,0.018) 153px,rgba(201,168,76,0.018) 154px)` }} />

      {PARTS.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: p.x, top: p.y + Math.sin(lf * p.spd + p.ph) * 22, width: p.sz, height: p.sz, borderRadius: "50%", background: C.gold, opacity: glowV * (0.18 + Math.sin(lf * p.spd * 2 + p.ph) * 0.22), boxShadow: `0 0 ${p.sz * 5}px ${C.gold}` }} />
      ))}

      <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%,transparent 28%,rgba(0,0,0,0.72) 100%)` }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 58px", gap: 0 }}>
        {/* Logo */}
        <div style={{ transform: `scale(${logoSc})`, opacity: logoOp, textAlign: "center", marginBottom: 10 }}>
          <div style={{
            fontSize: 156, fontStyle: "italic", fontWeight: "bold", fontFamily: "Georgia,serif",
            letterSpacing: 22, background: GoldGradient("145deg"),
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 ${58 * glowV}px rgba(201,168,76,${glowV * 0.95})) drop-shadow(0 0 ${135 * glowV}px rgba(201,168,76,${glowV * 0.52})) drop-shadow(0 0 ${240 * glowV}px rgba(201,168,76,${glowV * 0.24}))`,
            lineHeight: 0.87,
          }}>ŌRÏA</div>
        </div>

        <GoldLine width={lineW} glow opacity={lerp(lf, 24, 48, 0, 1)} />
        <div style={{ height: 16 }} />

        <div style={{ fontSize: 23, letterSpacing: 10, textTransform: "uppercase" as const, color: `rgba(201,168,76,${0.48 * gP + 0.1})`, fontFamily: "Montserrat,sans-serif", marginBottom: 48, opacity: logoOp }}>
          Digital Wedding Experience
        </div>

        {/* CTA texte */}
        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, textAlign: "center", marginBottom: 38 }}>
          <div style={{ fontSize: 52, fontStyle: "italic", fontFamily: "Georgia,serif", color: C.fg2, lineHeight: 1.35 }}>
            Votre événement mérite
          </div>
          <div style={{ fontSize: 60, fontWeight: "bold", fontFamily: "Montserrat,sans-serif", letterSpacing: 4, background: GoldGradient(), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 32px rgba(201,168,76,${0.85 * glowV}))` }}>
            ŌRÏA
          </div>
        </div>

        {/* Bouton WhatsApp */}
        <div style={{ transform: `scale(${btnSc})`, textAlign: "center" }}>
          <div style={{
            background: `linear-gradient(135deg,${C.gold},${C.goldDk})`,
            padding: "24px 68px", fontSize: 32, fontFamily: "Montserrat,sans-serif",
            fontWeight: "bold", letterSpacing: 5, color: "#000",
            textTransform: "uppercase" as const,
            boxShadow: `0 14px 48px rgba(201,168,76,${0.55 * glowV}),inset 0 1px 0 rgba(255,255,255,0.2)`,
            marginBottom: 18,
          }}>📞 074 71 04 41</div>
          <div style={{ fontSize: 22, letterSpacing: 7, color: "rgba(201,168,76,0.52)", fontFamily: "Montserrat,sans-serif", marginBottom: 8 }}>
            WhatsApp · Gabon 🇬🇦
          </div>
          <div style={{ fontSize: 18, color: C.fg3, fontStyle: "italic", fontFamily: "Georgia,serif" }}>
            Devis gratuit · Réponse en 2h
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════
// ⓭  COMPOSITION PRINCIPALE
// ═══════════════════════════════════════
export const OriaVideo45s: React.FC = () => {
  const frame = useCurrentFrame();

  /** Fondu cross entre scènes (4 frames) */
  function sceneOp(start: number, end: number) {
    return interpolate(frame, [start, start + 4, end - 4, end], [0, 1, 1, 0], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
  }

  return (
    <AbsoluteFill style={{ backgroundColor: C.black }}>
      {/*
       * ─ SAFE ZONES TikTok/Reels ──────────────────────────
       *   Chaque scène padde ses contenus :
       *   • top    : 150 px  (encoche iPhone + barre app)
       *   • bottom : 170 px  (barre de nav TikTok)
       *   • left / right : 50–60 px
       * ────────────────────────────────────────────────────
       */}

      <Sequence from={T.INTRO} durationInFrames={T.TAGLINE + 8}>
        <AbsoluteFill style={{ opacity: sceneOp(T.INTRO, T.TAGLINE + 8) }}>
          <SceneIntro frame={frame} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={T.TAGLINE - 4} durationInFrames={T.MARIAGE - T.TAGLINE + 12}>
        <AbsoluteFill style={{ opacity: sceneOp(T.TAGLINE, T.MARIAGE) }}>
          <SceneTagline frame={frame} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={T.MARIAGE - 4} durationInFrames={T.SERVICES - T.MARIAGE + 12}>
        <AbsoluteFill style={{ opacity: sceneOp(T.MARIAGE, T.SERVICES) }}>
          <SceneMariage frame={frame} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={T.SERVICES - 4} durationInFrames={T.DEMO - T.SERVICES + 12}>
        <AbsoluteFill style={{ opacity: sceneOp(T.SERVICES, T.DEMO) }}>
          <SceneServices frame={frame} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={T.DEMO - 4} durationInFrames={T.HERMANE - T.DEMO + 12}>
        <AbsoluteFill style={{ opacity: sceneOp(T.DEMO, T.HERMANE) }}>
          <SceneDemo frame={frame} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={T.HERMANE - 4} durationInFrames={T.PRICING - T.HERMANE + 12}>
        <AbsoluteFill style={{ opacity: sceneOp(T.HERMANE, T.PRICING) }}>
          <SceneHermane frame={frame} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={T.PRICING - 4} durationInFrames={T.CTA - T.PRICING + 12}>
        <AbsoluteFill style={{ opacity: sceneOp(T.PRICING, T.CTA) }}>
          <ScenePricing frame={frame} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={T.CTA - 4} durationInFrames={T.TOTAL - T.CTA + 8}>
        <AbsoluteFill style={{ opacity: sceneOp(T.CTA, T.TOTAL - 4) }}>
          <SceneCTA frame={frame} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export default OriaVideo45s;

/*
 ══════════════════════════════════════════════════════════
  SETUP COMPLET SUR MAC — Une seule fois
 ══════════════════════════════════════════════════════════

  # 1. Créer le projet Remotion
  npx create-video@latest oria-video --yes
  cd oria-video

  # 2. Remplacer src/Composition.tsx par ce fichier
  # 3. Mettre à jour src/Root.tsx :

    import { Composition } from "remotion";
    import { OriaVideo45s } from "./Composition";
    export const RemotionRoot = () => (
      <Composition
        id="OriaVideo45s"
        component={OriaVideo45s}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    );

  # 4. Mettre à jour src/index.ts :
    import { registerRoot } from "remotion";
    import { RemotionRoot } from "./Root";
    registerRoot(RemotionRoot);

 ══════════════════════════════════════════════════════════
  COMMANDES TERMINALE
 ══════════════════════════════════════════════════════════

  # Ouvrir le studio (preview live)
  npx remotion studio

  # Render MP4 H.264 (TikTok / Reels)
  npx remotion render OriaVideo45s out/oria_45s.mp4 --codec=h264 --crf=16

  # Render ProRes 4444 (qualité MAX pour montage)
  npx remotion render OriaVideo45s out/oria_45s.mov --codec=prores --prores-profile=4444

  # Preview 10 premières secondes
  npx remotion render OriaVideo45s out/test10s.mp4 --frames=0-300

  # Screenshot d'une frame spécifique (ex: frame 360 = 12s)
  npx remotion still OriaVideo45s out/frame12s.png --frame=360

 ══════════════════════════════════════════════════════════
  AJOUTER VOS PHOTOS (optionnel, recommandé)
 ══════════════════════════════════════════════════════════

  # Placer les images dans public/
  public/
  ├── bride_crown.jpg      ← mariée couronne coutumière
  ├── couple_throne.jpg    ← couple trônes rotin
  ├── venue.jpg            ← salle fleurs blanches
  └── groom_teal.jpg       ← marié costume teal

  # Dans SceneMariage, remplacer les blocs CSS par :
  import { Img, staticFile } from "remotion";
  <Img src={staticFile("bride_crown.jpg")} style={{ width:"100%", height:"100%", objectFit:"cover" }} />

 ══════════════════════════════════════════════════════════
*/
