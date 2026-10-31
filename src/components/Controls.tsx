import { useEffect, useRef } from "react";
import type { Lang } from "../data/invitation";
import { copy, t } from "../data/invitation";
import type { AutoScrollStatus } from "../hooks/useAutoScroll";
import type { MusicStatus } from "../hooks/useMusic";
import {
  CheckIcon,
  FilledHeartIcon,
  MusicIcon,
  MusicOffIcon,
  PauseIcon,
  PlayIcon,
  RestartIcon,
} from "./Icons";

type Props = {
  lang: Lang;
  autoStatus: AutoScrollStatus;
  musicStatus: MusicStatus;
  reducedMotion: boolean;
  onLanguageChange: (lang: Lang) => void;
  onToggleAuto: () => void;
  onMusicToggle: () => void;
  onRestartRequest: () => void;
};

export default function Controls({
  lang,
  autoStatus,
  musicStatus,
  reducedMotion,
  onLanguageChange,
  onToggleAuto,
  onMusicToggle,
  onRestartRequest,
}: Props) {
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = progressRef.current;
      if (!element) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      element.style.transform = `scaleX(${ratio})`;
    };
    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  const musicPlaying = musicStatus === "playing";
  const musicUnavailable = musicStatus === "unavailable";
  const autoRunning = autoStatus === "running" || autoStatus === "waiting";
  const autoFinished = autoStatus === "finished";
  const autoLabel = autoFinished
    ? lang === "ar"
      ? "ختام"
      : "The end"
    : autoRunning
      ? t(copy.controls.pause, lang)
      : t(copy.controls.resume, lang);
  const autoAria = autoFinished
    ? t(copy.controls.finished, lang)
    : autoRunning
      ? t(copy.controls.pause, lang)
      : t(copy.controls.resume, lang);

  const musicAria = musicUnavailable
    ? t(copy.controls.musicUnavailable, lang)
    : musicPlaying
      ? t(copy.controls.pauseMusic, lang)
      : t(copy.controls.playMusic, lang);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-[#f8d7e5]/60">
        <span
          ref={progressRef}
          className="block h-full w-full origin-left bg-gradient-to-r from-[#c9a7d8] via-[#87547d] to-[#e8c6b0] shadow-[0_0_12px_rgba(135,84,125,.45)]"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 px-2 pt-2 sm:px-5 sm:pt-3">
        <nav
          className="glass mx-auto flex max-w-[1180px] items-center justify-between gap-1.5 rounded-[16px] px-2 py-1.5 sm:rounded-full sm:px-3 sm:py-2"
          aria-label={t(copy.controls.ariaLabel, lang)}
        >
          <a
            href="#invitation-start"
            className="flex min-w-0 items-center gap-1.5 rounded-full px-0.5 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87547d]"
            aria-label={t(copy.final.namesAria, lang)}
          >
            <span className="relative grid h-8 w-8 flex-none place-items-center rounded-full border border-[#c9a7d8]/60 bg-gradient-to-br from-white/95 to-[#f8d7e5]/85 text-[#87547d] shadow-[inset_0_1px_0_#fff]">
              <FilledHeartIcon size={13} />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#c9a7d8]" aria-hidden="true" />
            </span>
            <span className="hidden min-w-0 flex-col leading-tight min-[390px]:flex">
              <span className="truncate font-ar-display text-[0.88rem] text-[#6c3f63]">
                {lang === "ar" ? "محمود & آية" : "Mahmoud & Aya"}
              </span>
              <span className="truncate font-display text-[0.52rem] tracking-[0.16em] text-[#87547d]/65 uppercase">
                {lang === "ar" ? "Engagement" : "09 · 12 · 2026"}
              </span>
            </span>
          </a>

          <div className="flex flex-none items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={onToggleAuto}
              disabled={autoFinished}
              data-autoscroll-ignore="true"
              className="control-pill justify-center gap-1 px-2 py-1.5 text-[0.62rem] disabled:cursor-default disabled:opacity-80 sm:px-3 sm:text-[0.7rem]"
              data-active={autoRunning}
              aria-label={autoAria}
              title={reducedMotion ? t(copy.controls.reduceMotionNotice, lang) : autoAria}
            >
              {autoFinished ? (
                <CheckIcon size={13} />
              ) : autoRunning ? (
                <PauseIcon size={10} />
              ) : (
                <PlayIcon size={10} />
              )}
              <span className="whitespace-nowrap">{autoLabel}</span>
              {autoStatus === "waiting" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" aria-hidden="true" />}
            </button>

            <div
              className="flex items-center rounded-full border border-[#87547d]/20 bg-white/55 p-0.5"
              role="group"
              aria-label={t(copy.controls.language, lang)}
            >
              <button
                type="button"
                onClick={() => onLanguageChange("ar")}
                aria-pressed={lang === "ar"}
                aria-label="عربي"
                className={`rounded-full px-1.5 py-1 text-[0.63rem] leading-none transition sm:px-2 ${
                  lang === "ar" ? "bg-[#87547d] text-white shadow-sm" : "text-[#87547d]/80 hover:bg-white/80"
                }`}
                lang="ar"
              >
                عربي
              </button>
              <span className="mx-0.5 h-3 w-px bg-[#87547d]/20" aria-hidden="true" />
              <button
                type="button"
                onClick={() => onLanguageChange("en")}
                aria-pressed={lang === "en"}
                aria-label="English"
                className={`rounded-full px-1.5 py-1 text-[0.61rem] leading-none tracking-wide transition sm:px-2 ${
                  lang === "en" ? "bg-[#87547d] text-white shadow-sm" : "text-[#87547d]/80 hover:bg-white/80"
                }`}
                lang="en"
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={onMusicToggle}
              className="control-pill h-8 w-8 justify-center p-0"
              data-active={musicPlaying}
              aria-pressed={musicPlaying}
              aria-label={musicAria}
              title={musicAria}
            >
              {musicUnavailable ? (
                <MusicOffIcon size={16} strokeWidth={1.8} />
              ) : musicPlaying ? (
                <PauseIcon size={11} />
              ) : musicStatus === "loading" ? (
                <MusicIcon size={16} strokeWidth={1.8} className="animate-pulse" />
              ) : (
                <MusicIcon size={16} strokeWidth={1.8} />
              )}
            </button>

            <button
              type="button"
              onClick={onRestartRequest}
              className="control-pill h-8 w-8 justify-center p-0"
              aria-label={t(copy.controls.restart, lang)}
              title={t(copy.controls.restart, lang)}
            >
              <RestartIcon size={15} strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
