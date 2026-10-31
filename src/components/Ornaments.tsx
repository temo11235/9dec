import { useId, type CSSProperties } from "react";
import { FilledHeartIcon } from "./Icons";

/* ------------------------------------------------------------------ */
/*  Silk hearts & particles                                            */
/* ------------------------------------------------------------------ */

const HEART_COLORS = ["#C9A7D8", "#F3AFC8", "#DFA8C5", "#B98BCB", "#E8C6B0"];

export function FloatingHearts({ count = 16 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => {
        const size = 7 + ((index * 13) % 17);
        const style: CSSProperties = {
          left: `${(index * 41 + 9) % 94}%`,
          "--h-duration": `${17 + ((index * 7) % 16)}s`,
          "--h-delay": `${-((index * 23) % 260) / 10}s`,
          "--h-opacity": 0.22 + (index % 4) * 0.12,
          "--h-drift": `${((index * 19) % 90) - 45}px`,
          color: HEART_COLORS[index % HEART_COLORS.length],
        } as CSSProperties;
        return (
          <span key={index} className="floating-heart" style={style}>
            <FilledHeartIcon size={size} />
          </span>
        );
      })}
    </div>
  );
}

export function BokehParticles({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => {
        const size = 3 + ((index * 7) % 11);
        return (
          <span
            key={index}
            className="twinkle absolute rounded-full"
            style={
              {
                left: `${(index * 37 + 13) % 97}%`,
                top: `${(index * 29 + 7) % 92}%`,
                width: size,
                height: size,
                background:
                  index % 3 === 0
                    ? "radial-gradient(circle, #FFF9FC 0%, #F8D7E5 55%, transparent 75%)"
                    : "radial-gradient(circle, #FFF9FC 0%, #C9A7D8 60%, transparent 78%)",
                boxShadow: `0 0 ${size * 3}px rgba(255, 240, 247, .9)`,
                "--t-duration": `${4 + ((index * 11) % 7)}s`,
                "--t-delay": `${-((index * 13) % 60) / 10}s`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative typographic ornaments                                   */
/* ------------------------------------------------------------------ */

export function HeartDivider({
  className = "",
  tone = "mauve",
}: {
  className?: string;
  tone?: "mauve" | "light";
}) {
  const line = tone === "light" ? "rgba(255,249,252,.6)" : "rgba(135,84,125,.4)";
  const heart = tone === "light" ? "#FCE4EC" : "#A76D96";
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`} aria-hidden="true">
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(90deg, transparent, ${line})` }} />
      <span className="h-1 w-1 rotate-45" style={{ background: line }} />
      <svg width="18" height="16" viewBox="0 0 18 16" fill={heart}>
        <path d="M9 15S.9 10.2.9 4.9A4 4 0 0 1 9 2.8a4 4 0 0 1 8.1 2.1C17.1 10.2 9 15 9 15Z" opacity=".8" />
      </svg>
      <span className="h-1 w-1 rotate-45" style={{ background: line }} />
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(270deg, transparent, ${line})` }} />
    </div>
  );
}

export function ScriptCrest({ tone = "mauve" }: { tone?: "mauve" | "light" }) {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-1.5 ${
        tone === "light"
          ? "border-white/40 bg-white/10 text-white/90"
          : "border-[#c9a7d8]/45 bg-white/50 text-[#87547d]"
      }`}
    >
      <FilledHeartIcon size={10} className="opacity-70" />
      <span className="text-[0.6rem] tracking-[0.28em] uppercase">M · A</span>
      <FilledHeartIcon size={10} className="opacity-70" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Wax seal                                                           */
/* ------------------------------------------------------------------ */

export function WaxSeal() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 94" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`wax-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B98BCB" />
          <stop offset="42%" stopColor="#87547D" />
          <stop offset="100%" stopColor="#5E3560" />
        </linearGradient>
        <radialGradient id={`waxHighlight-${id}`} cx="34%" cy="24%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".5" />
          <stop offset="42%" stopColor="#FFFFFF" stopOpacity=".08" />
          <stop offset="100%" stopColor="#47233F" stopOpacity=".22" />
        </radialGradient>
        <filter id={`waxShadow-${id}`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#5a2f50" floodOpacity=".38" />
        </filter>
      </defs>
      <g filter={`url(#waxShadow-${id})`}>
        <path
          d="M50 92C29 76 5 56.5 5 31.9 5 14.3 18.2 3 33.2 3 40.7 3 46.7 6.6 50 12.3 53.3 6.6 59.3 3 66.8 3 81.8 3 95 14.3 95 31.9 95 56.5 71 76 50 92Z"
          fill={`url(#wax-${id})`}
          stroke="#E8C6B0"
          strokeOpacity=".6"
          strokeWidth="1.4"
        />
        <path
          d="M50 83.5C33 69.8 13 52.6 13 31.9 13 17.9 23.6 9 35.2 9c6.2 0 11.1 3.2 14.8 9.2C53.7 12.2 58.6 9 64.8 9 76.4 9 87 17.9 87 31.9c0 20.7-20 37.9-37 51.6Z"
          fill="none"
          stroke="#FCE4EC"
          strokeOpacity=".35"
          strokeWidth="1"
          strokeDasharray="2 3.4"
        />
        <circle cx="50" cy="40" r="22" fill="none" stroke="#FCE4EC" strokeOpacity=".28" strokeWidth=".9" />
        <path
          d="M38 34.5c-2.8-2.9-6.8-.8-6.8 2.7 0 4.1 6.8 8.5 6.8 8.5s6.8-4.4 6.8-8.5c0-3.5-4-5.6-6.8-2.7Z"
          fill="none"
          stroke="#FFF9FC"
          strokeWidth="1.6"
          strokeLinejoin="round"
          opacity=".92"
        />
        <path
          d="M52 38.5c-2.5-2.6-6.1-.7-6.1 2.4 0 3.7 6.1 7.6 6.1 7.6s6.1-3.9 6.1-7.6c0-3.1-3.6-5-6.1-2.4Z"
          fill="none"
          stroke="#FFF9FC"
          strokeWidth="1.6"
          strokeLinejoin="round"
          opacity=".92"
        />
        <path
          d="M50 59c-3.1 1.9-5.3 4.5-5.3 7.2M50 59c3.1 1.9 5.3 4.5 5.3 7.2"
          stroke="#FCE4EC"
          strokeOpacity=".5"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="50" cy="58.6" r="1.5" fill="#FCE4EC" opacity=".7" />
      </g>
      <path
        d="M50 92C29 76 5 56.5 5 31.9 5 14.3 18.2 3 33.2 3 40.7 3 46.7 6.6 50 12.3 53.3 6.6 59.3 3 66.8 3 81.8 3 95 14.3 95 31.9 95 56.5 71 76 50 92Z"
        fill={`url(#waxHighlight-${id})`}
        pointerEvents="none"
      />
    </svg>
  );
}

export function IntertwinedHearts({ size = 46, tone = "#87547D" }: { size?: number; tone?: string }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 64 52" fill="none" aria-hidden="true">
      <path
        d="M26 46C15 38 4 28.5 4 16.5 4 8 10.5 2.5 17.5 2.5c4.2 0 7.4 2 9.5 5.2 2.1-3.2 5.3-5.2 9.5-5.2C43.5 2.5 50 8 50 16.5c0 4.4-1.8 8.5-4.6 12.2"
        stroke={tone}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M30 48C41 39.5 56 30 56 17.5c0-8.5-6.5-14-13.5-14-4.2 0-7.4 2-9.5 5.2-2.1-3.2-5.3-5.2-9.5-5.2"
        stroke={tone}
        strokeOpacity=".5"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M27 27s-5-3.1-5-6.3A3.1 3.1 0 0 1 27 18a3.1 3.1 0 0 1 5 2.7c0 3.2-5 6.3-5 6.3Z" fill={tone} fillOpacity=".18" stroke={tone} strokeWidth=".9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hand-drawn floral sprays                                           */
/* ------------------------------------------------------------------ */

export function FloralSpray({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 230 290"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`leaf-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CBD8C5" />
          <stop offset="100%" stopColor="#A3BBA1" />
        </linearGradient>
        <linearGradient id={`roseA-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF5F9" />
          <stop offset="52%" stopColor="#F8D7E5" />
          <stop offset="100%" stopColor="#E6B5CC" />
        </linearGradient>
        <linearGradient id={`roseB-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3E8FA" />
          <stop offset="100%" stopColor="#C9A7D8" />
        </linearGradient>
        <linearGradient id={`stem-${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#A9B9A4" />
          <stop offset="100%" stopColor="#C7C1A9" />
        </linearGradient>
      </defs>

      <g stroke={`url(#stem-${id})`} strokeWidth="1.7" strokeLinecap="round">
        <path d="M18 288C58 244 92 200 104 142c8-39 4-76-16-112" />
        <path d="M30 286c34-29 76-52 101-94 18-30 23-62 18-97" opacity=".8" />
        <path d="M4 274c38-7 74-24 101-53 21-24 30-48 32-78" opacity=".7" />
      </g>

      <g fill={`url(#leaf-${id})`} stroke="#9FB29B" strokeWidth=".7">
        <path d="M58 236c-21-12-41-6-47 11 18 10 36 6 47-11Z" />
        <path d="M83 209c-3-22 10-37 27-40 1 20-10 34-27 40Z" />
        <path d="M103 165c-19-10-23-29-13-44 15 8 21 25 13 44Z" />
        <path d="M120 128c2-20 16-30 31-27-2 17-14 27-31 27Z" />
        <path d="M48 255c-18 1-31-10-32-24 17-2 29 8 32 24Z" opacity=".85" />
        <path d="M70 225c18-3 30 6 33 20-17 3-29-5-33-20Z" opacity=".8" />
        <path d="M150 187c15-2 27 7 29 20-15 2-25-7-29-20Z" opacity=".8" />
        <path d="M129 86c-8-17-3-33 11-40 8 15 4 31-11 40Z" opacity=".8" />
      </g>

      {/* rose cluster top */}
      <g transform="translate(118 52)">
        <circle r="31" fill={`url(#roseA-${id})`} stroke="#D9A9BE" strokeOpacity=".55" />
        <path d="M-24 3c4-17 21-28 38-22S38-1 27 12 4 25-9 18c-9-5-14-10-15-15Z" fill="#FFF8FB" fillOpacity=".55" stroke="#D9A9BE" strokeOpacity=".45" />
        <path d="M-14 1c5-10 18-14 25-7S13 10 4 11-18 10-14 1Z" fill="#F3C9DC" fillOpacity=".75" stroke="#C99BB2" strokeOpacity=".45" />
        <path d="M-4 3c2-5 9-7 12-2s-3 8-8 7-6-3-4-5Z" fill="#E7AEC4" />
        <path d="M-26 15c11 9 31 13 44 4M-20-11c12-7 28-7 39 1" stroke="#D9A9BE" strokeOpacity=".5" />
      </g>

      {/* lavender bloom */}
      <g transform="translate(159 115) rotate(18)">
        <path d="M0 42C8 23 8 5 0-15" stroke="#A9B9A4" strokeWidth="1.5" />
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 30 - i * 6.2;
          const x = i % 2 === 0 ? 4 : -4;
          return <circle key={i} cx={x} cy={y} r={3.2} fill={i % 2 === 0 ? "#C9A7D8" : "#B493C7"} opacity={0.9 - i * 0.04} />;
        })}
        <circle cx="-2" cy="-20" r="3.8" fill="#D9BEE7" />
      </g>

      {/* rose mid-left */}
      <g transform="translate(64 147) scale(.82)">
        <circle r="28" fill={`url(#roseB-${id})`} stroke="#B58BC9" strokeOpacity=".5" />
        <path d="M-21 4c3-14 17-24 31-19s17 18 7 27-28 9-36-1C-22 8-23 6-21 4Z" fill="#FFF8FC" fillOpacity=".5" stroke="#B58BC9" strokeOpacity=".4" />
        <path d="M-12 3c4-8 14-11 20-5s2 13-6 14S-16 9-12 3Z" fill="#DCC3EB" fillOpacity=".9" stroke="#B58BC9" strokeOpacity=".35" />
        <path d="M-3 4c2-4 7-5 9-1s-2 6-6 5-5-2-3-4Z" fill="#C2A0D5" />
      </g>

      {/* rose bottom-left */}
      <g transform="translate(36 222) scale(.66)">
        <circle r="30" fill={`url(#roseA-${id})`} stroke="#D9A9BE" strokeOpacity=".55" />
        <path d="M-22 2c3-15 18-25 32-20s15 20 5 28-30 8-37-3Z" fill="#FFF9FC" fillOpacity=".6" stroke="#D9A9BE" strokeOpacity=".4" />
        <path d="M-12 2c4-9 15-12 21-5s1 13-7 14S-17 8-12 2Z" fill="#F4C7DA" fillOpacity=".85" />
        <path d="M-3 3c2-4 8-5 10-1s-3 7-7 6-5-3-3-5Z" fill="#E7AEC4" />
      </g>

      {/* small buds */}
      <g fill="#F5D2E1" stroke="#D4A5BC" strokeWidth=".7">
        <circle cx="135" cy="222" r="7.5" />
        <circle cx="127" cy="229" r="5" fill="#EBD9F4" stroke="#B58BC9" />
        <circle cx="191" cy="196" r="4.5" />
        <circle cx="198" cy="203" r="3.2" fill="#EBD9F4" stroke="#B58BC9" />
        <circle cx="96" cy="102" r="5" fill="#EBD9F4" stroke="#B58BC9" />
      </g>

      <g stroke={`url(#stem-${id})`} strokeWidth="1.3" strokeLinecap="round">
        <path d="M135 222c9 15 17 32 20 52M191 196c6 13 8 24 7 35M96 102c-5 13-3 24 4 33" />
      </g>

      {/* little gold sparkles */}
      <g fill="#E8C6B0" opacity=".8">
        <circle cx="174" cy="74" r="1.6" />
        <circle cx="88" cy="66" r="1.3" />
        <circle cx="209" cy="138" r="1.4" />
        <circle cx="153" cy="256" r="1.2" />
        <circle cx="24" cy="179" r="1.5" />
      </g>
    </svg>
  );
}

export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path d="M4 62C4 30 30 4 62 4M4 90C4 44 44 4 90 4" stroke="#C9A7D8" strokeOpacity=".5" strokeWidth="1" />
      <path d="M16 62c0-25 21-46 46-46M16 90c0-41 33-74 74-74" stroke="#E8C6B0" strokeOpacity=".75" strokeWidth=".9" />
      <path d="M31 45c8-10 20-12 27-4-8 11-18 13-27 4Z" fill="#CBD8C5" fillOpacity=".65" />
      <path d="M45 31c-1-11 6-18 15-19 1 10-5 17-15 19Z" fill="#F3C9DC" fillOpacity=".8" />
      <path d="M28 58c-8-5-10-14-4-20 7 4 9 12 4 20Z" fill="#F3C9DC" fillOpacity=".7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Satin bow                                                          */
/* ------------------------------------------------------------------ */

export function SatinBow() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 220 130" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`bowL-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3D7EA" />
          <stop offset="34%" stopColor="#D5A7CF" />
          <stop offset="70%" stopColor="#B98BCB" />
          <stop offset="100%" stopColor="#9E6E9B" />
        </linearGradient>
        <linearGradient id={`bowR-${id}`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EED0E5" />
          <stop offset="42%" stopColor="#C99BC7" />
          <stop offset="100%" stopColor="#A4739F" />
        </linearGradient>
        <linearGradient id={`tail-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C89BC3" />
          <stop offset="100%" stopColor="#8F5F8C" />
        </linearGradient>
        <linearGradient id={`knot-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3DCEB" />
          <stop offset="45%" stopColor="#C9A0C6" />
          <stop offset="100%" stopColor="#9B6C99" />
        </linearGradient>
        <filter id={`bowShadow-${id}`} x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.6" floodColor="#6C3F63" floodOpacity=".26" />
        </filter>
      </defs>

      <g filter={`url(#bowShadow-${id})`}>
        {/* tails */}
        <path d="M108 70C103 91 92 110 74 124c9-18 14-33 16-51Z" fill={`url(#tail-${id})`} opacity=".88" />
        <path d="M112 70c5 21 16 40 34 54-9-18-14-33-16-51Z" fill={`url(#tail-${id})`} opacity=".8" />
        <path d="M110 74c-2 17-8 30-16 43M111 74c3 17 9 29 18 41" stroke="#FBEAF3" strokeOpacity=".35" strokeWidth="1" fill="none" />

        {/* left loop */}
        <path
          d="M104 62C86 38 50 22 30 32 10 42 22 71 55 71c19 0 35-4 49-9Z"
          fill={`url(#bowL-${id})`}
          stroke="#8F5F8C"
          strokeOpacity=".45"
        />
        <path d="M96 60C80 43 54 32 36 37c-14 4-14 17 0 23 16 7 38 5 60-1Z" fill="#FFF9FC" fillOpacity=".32" />
        <path d="M92 61C75 49 56 42 42 43" stroke="#FDF2F8" strokeOpacity=".65" strokeWidth="1.3" fill="none" strokeLinecap="round" />

        {/* right loop */}
        <path
          d="M116 62c18-24 54-40 74-30 20 10 8 39-25 39-19 0-35-4-49-9Z"
          fill={`url(#bowR-${id})`}
          stroke="#8F5F8C"
          strokeOpacity=".4"
        />
        <path d="M124 60c16-17 42-28 60-23 14 4 14 17 0 23-16 7-38 5-60-1Z" fill="#FFF9FC" fillOpacity=".3" />
        <path d="M128 61c17-12 36-19 50-18" stroke="#FDF2F8" strokeOpacity=".6" strokeWidth="1.3" fill="none" strokeLinecap="round" />

        {/* knot */}
        <ellipse cx="110" cy="63" rx="15" ry="14" fill={`url(#knot-${id})`} stroke="#A9769F" strokeOpacity=".35" />
        <ellipse cx="106" cy="58" rx="7" ry="5" fill="#FFF9FC" fillOpacity=".45" />
        <path d="M101 63c4 3 9 4 14 3M102 69c5 3 11 4 16 2" stroke="#8E6285" strokeOpacity=".3" strokeWidth=".8" fill="none" />
      </g>
    </svg>
  );
}
