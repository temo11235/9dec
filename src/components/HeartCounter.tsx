import { useId } from "react";
import type { Lang } from "../data/invitation";
import { t } from "../data/invitation";

type Props = {
  value: number;
  arLabel: string;
  enLabel: string;
  lang: Lang;
};

export function HeartCounter({ value, arLabel, enLabel, lang }: Props) {
  const id = useId().replace(/:/g, "");
  const display = String(Math.max(0, value)).padStart(2, "0");

  return (
    <div className="flex flex-col items-center" role="listitem">
      <div className="heart-counter">
        <svg viewBox="0 0 120 112" aria-hidden="true">
        <defs>
          <linearGradient id={`heartFill-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF9FC" />
            <stop offset="38%" stopColor="#FCE4EC" />
            <stop offset="72%" stopColor="#F2D2E4" />
            <stop offset="100%" stopColor="#E8DDF5" />
          </linearGradient>
          <radialGradient id={`heartGlow-${id}`} cx="35%" cy="24%" r="75%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".92" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity=".12" />
            <stop offset="100%" stopColor="#C9A7D8" stopOpacity=".18" />
          </radialGradient>
          <filter id={`heartShadow-${id}`} x="-25%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#87547D" floodOpacity=".22" />
          </filter>
        </defs>
        <g filter={`url(#heartShadow-${id})`}>
          <path
            d="M60 105C38 87 5 66 5 37.5C5 17.8 20 7 35.5 7 45.9 7 54.6 13 60 22.3 65.4 13 74.1 7 84.5 7 100 7 115 17.8 115 37.5 115 66 82 87 60 105Z"
            fill={`url(#heartFill-${id})`}
            stroke="#C9A7D8"
            strokeOpacity=".75"
            strokeWidth="1.4"
          />
          <path
            d="M60 105C38 87 5 66 5 37.5C5 17.8 20 7 35.5 7 45.9 7 54.6 13 60 22.3 65.4 13 74.1 7 84.5 7 100 7 115 17.8 115 37.5 115 66 82 87 60 105Z"
            fill={`url(#heartGlow-${id})`}
            pointerEvents="none"
          />
          <path
            d="M60 96.5C40.8 80.2 13 60.9 13 37.8 13 22.6 24.4 14 36.5 14c7.7 0 14 4.2 18.1 12 1.2 2.1 3.6 2.1 4.8 0 4.1-7.8 10.4-12 18.1-12C89.6 14 101 22.6 101 37.8c0 23.1-27.8 42.4-47 58.7Z"
            fill="none"
            stroke="#FFF9FC"
            strokeOpacity=".8"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <path
            d="M60 14.5v-5M26 22.5l-3.5-3.5M94 22.5l3.5-3.5"
            stroke="#E8C6B0"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity=".7"
          />
          </g>
        </svg>
        <div className="heart-counter__content">
          <span className="heart-counter__value" aria-hidden="true">
            {display}
          </span>
        </div>
      </div>
      <span className="sr-only">{`${display} ${t({ ar: arLabel, en: enLabel }, lang)}`}</span>
      <div className="heart-counter__caption" aria-hidden="true">
        <span
          className="heart-counter__label-ar"
          style={{ color: lang === "ar" ? "#6C3F63" : "rgba(135,84,125,.62)", fontWeight: lang === "ar" ? 500 : 400 }}
          lang="ar"
        >
          {arLabel}
        </span>
        <span
          className="heart-counter__label-en"
          style={{ color: lang === "en" ? "#6C3F63" : "rgba(135,84,125,.5)" }}
          lang="en"
        >
          {enLabel}
        </span>
      </div>
    </div>
  );
}
