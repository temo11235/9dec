import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import EnvelopeScene from "./components/EnvelopeScene";
import Invitation from "./components/Invitation";
import Controls from "./components/Controls";
import { FilledHeartIcon, HeartIcon, RestartIcon } from "./components/Icons";
import type { Lang } from "./data/invitation";
import { copy, t } from "./data/invitation";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { useMusic } from "./hooks/useMusic";
import { useReducedMotion } from "./hooks/useReducedMotion";

type Phase = "closed" | "opening" | "open";
type ToastKey = "opened" | "reduced" | "musicUnavailable" | "musicError" | null;

const LANGUAGE_KEY = "mahmoud-aya-invitation-language";

function readStoredLanguage(): Lang {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    if (stored === "ar" || stored === "en") return stored;
  } catch {
    /* Storage can be unavailable in private browsing; Arabic remains the default. */
  }
  return "ar";
}

/** Instantly move the page without inheriting the global smooth scroll. */
function jumpTo(top: number) {
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";
  root.scrollTop = top;
  document.body.scrollTop = top;
  window.requestAnimationFrame(() => {
    root.style.scrollBehavior = "";
  });
}

export default function App() {
  const [lang, setLang] = useState<Lang>(readStoredLanguage);
  const [phase, setPhase] = useState<Phase>("closed");
  const [restartOpen, setRestartOpen] = useState(false);
  const [toastKey, setToastKey] = useState<ToastKey>(null);
  const reducedMotion = useReducedMotion();
  const music = useMusic();
  const pendingAnchorRef = useRef<{ id: string; offset: number } | null>(null);
  const restartButtonRef = useRef<HTMLButtonElement | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  const autoScroll = useAutoScroll({ enabled: phase === "open", reducedMotion });

  /* Document basics: lang, direction, title. */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t(copy.meta.docTitle, lang);
    try {
      window.localStorage.setItem(LANGUAGE_KEY, lang);
    } catch {
      /* Ignore storage failures. */
    }
  }, [lang]);

  /* Lock native scrolling while the envelope is closed or opening. */
  useEffect(() => {
    document.body.dataset.locked = phase === "open" ? "false" : "true";
    return () => {
      document.body.dataset.locked = "false";
    };
  }, [phase]);

  /* Keep the current section in place when the language changes. */
  const handleLanguageChange = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      if (phase === "open") {
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>("#invitation-start section[id]"),
        );
        let current = sections[0];
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= Math.min(180, window.innerHeight * 0.25)) current = section;
        }
        if (current?.id) {
          const top = current.getBoundingClientRect().top + window.scrollY;
          pendingAnchorRef.current = {
            id: current.id,
            offset: window.scrollY - top,
          };
        }
      }
      setLang(next);
    },
    [lang, phase],
  );

  useLayoutEffect(() => {
    const pending = pendingAnchorRef.current;
    if (!pending) return;
    pendingAnchorRef.current = null;
    const section = document.getElementById(pending.id);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY + pending.offset;
    jumpTo(Math.max(0, top));
  }, [lang]);

  /* Start the journey on the visitor's explicit click. */
  const handleOpen = useCallback(() => {
    jumpTo(0);
    setPhase("opening");
    void music.play();
  }, [music]);

  const handleFinished = useCallback(() => {
    setPhase("open");
    window.requestAnimationFrame(() => {
      const main = document.getElementById("invitation-start");
      main?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    if (phase !== "open" || !reducedMotion) return;
    const timer = window.setTimeout(() => setToastKey("reduced"), 1600);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (!toastKey) return;
    const timer = window.setTimeout(() => setToastKey(null), 9000);
    return () => window.clearTimeout(timer);
  }, [toastKey]);

  const handleMusicToggle = useCallback(async () => {
    if (music.status === "unavailable") {
      setToastKey("musicUnavailable");
      return;
    }
    if (music.status === "playing" || music.status === "loading") {
      music.pause();
      return;
    }
    const result = await music.play();
    if (result === "unavailable") setToastKey("musicUnavailable");
    else if (result === "error") setToastKey("musicError");
  }, [music]);

  const requestRestart = useCallback(() => {
    autoScroll.pause();
    setRestartOpen(true);
  }, [autoScroll]);

  const confirmRestart = useCallback(() => {
    setRestartOpen(false);
    autoScroll.reset();
    if (music.status === "playing" || music.status === "loading") music.pause();
    setPhase("closed");
    setToastKey(null);
    jumpTo(0);
  }, [autoScroll, music]);

  useEffect(() => {
    if (!restartOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => cancelButtonRef.current?.focus(), 40);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setRestartOpen(false);
      }
      if (event.key !== "Tab") return;
      const first = cancelButtonRef.current;
      const last = restartButtonRef.current;
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      previousActive?.focus?.({ preventScroll: true });
    };
  }, [restartOpen]);

  const toastText =
    toastKey === "opened"
      ? t(copy.controls.openedNote, lang)
      : toastKey === "reduced"
        ? t(copy.controls.reduceMotionNotice, lang)
        : toastKey === "musicUnavailable"
          ? t(copy.controls.toastMissingAudio, lang)
          : toastKey === "musicError"
            ? t(copy.controls.musicError, lang)
            : "";

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
      <a
        href="#intro"
        className="sr-only z-[70] rounded-full bg-[#fff9fc] px-5 py-3 text-sm text-[#6c3f63] shadow-lg focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t(copy.controls.skipToInvitation, lang)}
      </a>

      {phase !== "closed" && (
        <div
          aria-hidden={phase !== "open"}
          {...(phase !== "open" ? { inert: true } : {})}
          className="min-h-screen"
        >
          <Invitation
            lang={lang}
            reducedMotion={reducedMotion}
            musicStatus={music.status}
            onMusicToggle={handleMusicToggle}
            onRestartRequest={requestRestart}
            onMapInteract={autoScroll.pause}
          />
        </div>
      )}

      {phase === "open" && (
        <Controls
          lang={lang}
          autoStatus={autoScroll.status}
          musicStatus={music.status}
          reducedMotion={reducedMotion}
          onLanguageChange={handleLanguageChange}
          onToggleAuto={autoScroll.toggle}
          onMusicToggle={handleMusicToggle}
          onRestartRequest={requestRestart}
        />
      )}

      {phase !== "open" && (
        <EnvelopeScene
          lang={lang}
          opening={phase === "opening"}
          reducedMotion={reducedMotion}
          musicStatus={music.status}
          onOpen={handleOpen}
          onFinished={handleFinished}
          onLanguageChange={handleLanguageChange}
          onMusicToggle={handleMusicToggle}
        />
      )}

      {restartOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#51314a]/35 px-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="restart-dialog-title"
          aria-describedby="restart-dialog-body"
        >
          <div className="paper-card relative w-full max-w-md rounded-[26px] px-6 py-7 text-center sm:px-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a7d8]/45 bg-gradient-to-br from-[#fce4ec] to-[#e8ddf5] text-[#87547d]">
              <RestartIcon size={20} />
            </div>
            <h2 id="restart-dialog-title" className="section-title mt-3 text-2xl">
              {t(copy.controls.restartTitle, lang)}
            </h2>
            <p id="restart-dialog-body" className="mx-auto mt-2 max-w-sm text-[0.84rem] leading-relaxed text-[#74476b]/80">
              {t(copy.controls.restartBody, lang)}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={() => setRestartOpen(false)}
                className="btn-outline px-5 py-2.5 text-[0.82rem]"
              >
                {t(copy.controls.cancel, lang)}
              </button>
              <button
                ref={restartButtonRef}
                type="button"
                onClick={confirmRestart}
                className="btn-luxe px-5 py-2.5 text-[0.82rem]"
              >
                <HeartIcon size={14} />
                {t(copy.controls.confirmRestart, lang)}
              </button>
            </div>
            <p className="mt-4 text-[0.62rem] tracking-wide text-[#87547d]/50">M &amp; A · 09 . 12 . 2026</p>
          </div>
        </div>
      )}

      {toastKey && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex justify-center px-4 sm:bottom-6">
          <div
            className="glass pointer-events-auto flex w-full max-w-lg items-start gap-3 rounded-2xl border-[#c9a7d8]/45 px-4 py-3 text-start shadow-[0_20px_45px_-20px_rgba(108,63,99,.6)]"
            role="status"
            aria-live="polite"
          >
            <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-[#fce4ec] text-[#b07fa0]">
              <FilledHeartIcon size={13} />
            </span>
            <p className="flex-1 text-[0.78rem] leading-relaxed text-[#6c3f63]">{toastText}</p>
            <button
              type="button"
              onClick={() => setToastKey(null)}
              aria-label={t(copy.controls.close, lang)}
              className="grid h-6 w-6 flex-none place-items-center rounded-full text-[#87547d]/65 transition hover:bg-white/70 hover:text-[#6c3f63]"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="m2 2 8 8M10 2l-8 8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
