import { useEffect, useRef } from "react";
import type { Lang } from "../data/invitation";
import { copy, t } from "../data/invitation";
import type { MusicStatus } from "../hooks/useMusic";
import {
  BokehParticles,
  FloatingHearts,
  HeartDivider,
  IntertwinedHearts,
  SatinBow,
  ScriptCrest,
  WaxSeal,
} from "./Ornaments";
import { EnvelopeIcon, GlobeIcon, MusicIcon, MusicOffIcon, PlayIcon, PauseIcon, ArrowDownIcon } from "./Icons";

type Props = {
  lang: Lang;
  opening: boolean;
  reducedMotion: boolean;
  musicStatus: MusicStatus;
  onOpen: () => void;
  onFinished: () => void;
  onLanguageChange: (lang: Lang) => void;
  onMusicToggle: () => void;
};

export default function EnvelopeScene({
  lang,
  opening,
  reducedMotion,
  musicStatus,
  onOpen,
  onFinished,
  onLanguageChange,
  onMusicToggle,
}: Props) {
  const triggeredRef = useRef(false);
  const finishedRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const direction = lang === "ar" ? "rtl" : "ltr";
  const musicPlaying = musicStatus === "playing";

  useEffect(() => {
    const focusTimer = window.setTimeout(() => buttonRef.current?.focus({ preventScroll: true }), 550);
    return () => window.clearTimeout(focusTimer);
  }, []);

  useEffect(() => {
    if (!opening) return;
    const total = reducedMotion ? 750 : 3550;
    const timer = window.setTimeout(() => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onFinished();
    }, total);
    return () => window.clearTimeout(timer);
  }, [opening, onFinished, reducedMotion]);

  const handleOpen = () => {
    if (triggeredRef.current || opening) return;
    triggeredRef.current = true;
    onOpen();
  };

  return (
    <section
      className={`envelope-scene ${opening ? "is-opening is-finishing" : ""}`}
      aria-label={t(copy.envelope.eyebrow, lang)}
      dir={direction}
    >
      <div className="envelope-scene__bg" aria-hidden="true" />
      <div className="envelope-scene__veil" aria-hidden="true" />
      <span className="envelope-scene__bloom" aria-hidden="true" />
      <BokehParticles count={22} />
      <FloatingHearts count={14} />

      <div className="relative z-10 flex min-h-svh flex-col overflow-x-hidden">
        {/* Corner controls */}
        <header className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-7 sm:pt-6">
          <div className="flex flex-col items-start gap-1.5">
            <button
              type="button"
              onClick={onMusicToggle}
              className="control-pill text-[0.68rem] sm:text-[0.76rem]"
              aria-label={
                musicPlaying
                  ? t(copy.controls.pauseMusic, lang)
                  : musicStatus === "unavailable"
                    ? t(copy.controls.musicUnavailable, lang)
                    : t(copy.controls.playMusic, lang)
              }
              aria-pressed={musicPlaying}
              title={musicStatus === "unavailable" ? t(copy.controls.musicUnavailable, lang) : undefined}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border border-white/60 ${
                  musicPlaying ? "bg-mauve text-white" : "bg-white/55 text-mauve"
                }`}
              >
                {musicStatus === "unavailable" ? (
                  <MusicOffIcon size={13} />
                ) : musicPlaying ? (
                  <PauseIcon size={9} />
                ) : (
                  <PlayIcon size={10} />
                )}
              </span>
              <span className="hidden sm:inline">{t(copy.controls.music, lang)}</span>
              <span className="sr-only">
                {musicStatus === "unavailable"
                  ? t(copy.controls.musicUnavailable, lang)
                  : musicPlaying
                    ? t(copy.controls.pauseMusic, lang)
                    : t(copy.controls.playMusic, lang)}
              </span>
            </button>
            {musicStatus === "loading" && (
              <span className="ms-2 flex items-center gap-1 text-[0.6rem] text-mauve/70">
                <MusicIcon size={10} className="animate-pulse" />
                {t(copy.controls.musicLoading, lang)}
              </span>
            )}
            {musicStatus === "unavailable" && (
              <span className="ms-2 text-[0.58rem] tracking-wide text-mauve/60">
                {lang === "ar" ? "بدون موسيقى" : "No soundtrack"}
              </span>
            )}
          </div>

          <div
            className="glass flex items-center gap-0.5 rounded-full p-1"
            role="group"
            aria-label={t(copy.controls.language, lang)}
          >
            <GlobeIcon size={13} className="mx-1.5 text-mauve/70" aria-hidden="true" />
            <button
              type="button"
              onClick={() => onLanguageChange("ar")}
              aria-pressed={lang === "ar"}
              className={`rounded-full px-2.5 py-1 text-[0.7rem] transition ${
                lang === "ar" ? "bg-mauve text-white shadow-sm" : "text-mauve/75 hover:bg-white/60"
              }`}
              lang="ar"
            >
              عربي
            </button>
            <span className="text-[0.62rem] text-mauve/35" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              aria-pressed={lang === "en"}
              className={`rounded-full px-2.5 py-1 text-[0.7rem] transition ${
                lang === "en" ? "bg-mauve text-white shadow-sm" : "text-mauve/75 hover:bg-white/60"
              }`}
              lang="en"
            >
              English
            </button>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-4 pb-3 pt-3 sm:px-7 sm:pb-5">
          <div className="relative flex w-full max-w-6xl flex-col items-center justify-center">
            <div className="mb-3 flex flex-col items-center text-center sm:mb-5">
              <ScriptCrest />
              <p className="mt-2.5 font-ar-display text-[0.95rem] text-mauve/85 sm:text-base">
                {t(copy.envelope.eyebrow, lang)}
              </p>
            </div>

            <div className="relative flex w-full items-center justify-center">
              {/* Side invitation note */}
              <div className="pointer-events-none absolute start-0 top-1/2 hidden w-[218px] -translate-y-1/2 xl:block">
                <div className="rounded-[22px] border border-white/60 bg-[rgba(255,249,252,0.62)] p-4 text-center shadow-[0_18px_50px_-30px_rgba(81,49,74,.6)] backdrop-blur-md">
                  <IntertwinedHearts size={32} tone="#9c6b90" />
                  <h1 className="mt-2 font-ar-display text-[1.28rem] leading-[1.7] text-[#6c3f63]">
                    {copy.envelope.cordial.ar}
                  </h1>
                  <HeartDivider className="my-2 scale-90" />
                  <p className="secondary-copy text-[0.88rem] leading-relaxed" dir="ltr">
                    {copy.envelope.cordial.en}
                  </p>
                  <p className="mt-2 text-[0.66rem] leading-loose text-[#74476b]/80">
                    {lang === "ar" ? "التفاصيل الكاملة تنتظركم خلف المغلّف" : "The full invitation is waiting inside"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className={`envelope-wrap ${opening ? "is-opening" : ""}`}>
                  <span className="envelope-glow glow-pulse" aria-hidden="true" />
                  <span className="env-floor" aria-hidden="true" />
                  <span className="env-back" aria-hidden="true" />
                  <span className="env-liner" aria-hidden="true" />

                  {/* The invitation card sits behind the front pocket until it is drawn out. */}
                  <div className="env-card" aria-hidden={!opening}>
                    <span className="env-card__glow" aria-hidden="true" />
                    <span className="env-card__corner env-card__corner--tl" aria-hidden="true" />
                    <span className="env-card__corner env-card__corner--tr" aria-hidden="true" />
                    <span className="env-card__corner env-card__corner--bl" aria-hidden="true" />
                    <span className="env-card__corner env-card__corner--br" aria-hidden="true" />
                    <div className="env-card__inner">
                      <span className="env-card__crest">
                        <IntertwinedHearts size={30} tone="#A47398" />
                      </span>
                      <p className="env-card__eyebrow">
                        {lang === "ar" ? copy.envelope.cardEyebrow.ar : copy.envelope.cardEyebrow.en}
                      </p>
                      <p className="env-card__names">{copy.common.namesAr.ar}</p>
                      <p className="env-card__names-en">Mahmoud &amp; Aya</p>
                      <span className="env-card__rule" aria-hidden="true">
                        <i />
                        <b />
                        <i />
                      </span>
                      <p className="env-card__invite">
                        {lang === "ar" ? copy.envelope.cardInvite.ar : copy.envelope.cardInvite.en}
                      </p>
                      <p className="env-card__date" dir="ltr">
                        {copy.common.dateDay.en} · 09 . 12 . 2026
                      </p>
                    </div>
                  </div>

                  {/* Front pocket: two side folds and a bottom fold, as on a real envelope. */}
                  <div className="env-pocket" aria-hidden="true">
                    <span className="env-pocket__side env-pocket__side--left" />
                    <span className="env-pocket__side env-pocket__side--right" />
                    <span className="env-pocket__bottom" />
                    <svg className="env-seams" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="seamFade" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#B4759B" stopOpacity=".05" />
                          <stop offset="50%" stopColor="#8B5279" stopOpacity=".3" />
                          <stop offset="100%" stopColor="#B4759B" stopOpacity=".05" />
                        </linearGradient>
                      </defs>
                      <path d="M0 0 50 44 100 0" fill="none" stroke="url(#seamFade)" strokeWidth=".45" vectorEffect="non-scaling-stroke" />
                      <path d="M0 100 50 44 100 100" fill="none" stroke="url(#seamFade)" strokeWidth=".45" vectorEffect="non-scaling-stroke" />
                      <path d="M2.5 3 50 45 97.5 3" fill="none" stroke="#FFF9FC" strokeOpacity=".45" strokeWidth=".8" vectorEffect="non-scaling-stroke" />
                      <path d="M50 44v56" stroke="#B4759B" strokeOpacity=".07" strokeWidth=".5" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </div>

                  {/* Top flap with a printed outside and a pearlescent inside. */}
                  <div className="env-flap">
                    <div className="env-flap__face env-flap__face--front">
                      <div className="env-flap__copy">
                        <IntertwinedHearts size={34} tone="#9C6B90" />
                        <p className="env-flap__names">Mahmoud <span>&amp;</span> Aya</p>
                        <p className="env-flap__label">
                          {lang === "ar" ? "دعوة خطوبة" : "Engagement Invitation"}
                        </p>
                      </div>
                    </div>
                    <div className="env-flap__face env-flap__face--back">
                      <div className="env-flap__copy env-flap__copy--back">
                        <p className="env-flap__monogram">M</p>
                        <span className="env-flap__monogram-line" aria-hidden="true" />
                        <p className="env-flap__monogram">A</p>
                      </div>
                    </div>
                  </div>

                  <span className="env-ribbon" aria-hidden="true" />
                  <span className="env-bow" aria-hidden="true">
                    <SatinBow />
                  </span>
                  <span className="env-seal" title={t(copy.envelope.sealAlt, lang)}>
                    <WaxSeal />
                  </span>

                  <div className="env-front-copy">
                    <div className="env-front-copy__names">
                      <span className="env-front-copy__rule" aria-hidden="true" />
                      <p className="env-front-copy__ar">{copy.common.namesAr.ar}</p>
                      <p className="env-front-copy__en">Mahmoud &amp; Aya</p>
                    </div>
                  </div>

                  <button
                    ref={buttonRef}
                    type="button"
                    className="env-open-btn"
                    onClick={handleOpen}
                    disabled={opening}
                    aria-busy={opening}
                    aria-label={`${t(copy.envelope.open, lang)} — ${t(copy.envelope.skip, lang)}`}
                  >
                    <span className="env-open-btn__icon">
                      <EnvelopeIcon size={16} />
                    </span>
                    <span className="env-open-btn__text">
                      <span className="env-open-btn__ar">
                        {opening ? t(copy.envelope.opening, lang) : lang === "ar" ? copy.envelope.open.ar : copy.envelope.open.en}
                      </span>
                      <span className="env-open-btn__en">
                        {opening ? "" : lang === "ar" ? "Open Invitation" : "افتح الدعوة"}
                      </span>
                    </span>
                    <span className="env-open-btn__heart" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 14S.8 9.7.8 4.9A3.6 3.6 0 0 1 8 2.9a3.6 3.6 0 0 1 7.2 2C15.2 9.7 8 14 8 14Z" />
                      </svg>
                    </span>
                  </button>
                </div>

                <div className="mt-4 flex flex-col items-center gap-1 text-center sm:mt-5">
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-[#87547d]/25 bg-white/45 text-[#87547d] backdrop-blur-sm" aria-hidden="true">
                    <ArrowDownIcon size={13} />
                  </span>
                  <p className="text-[0.64rem] leading-relaxed text-[#74476b] sm:text-[0.72rem]">
                    {t(copy.envelope.autoNote, lang)}
                  </p>
                  <p className="flex items-center gap-1 text-[0.56rem] tracking-wide text-[#87547d]/60 sm:text-[0.62rem]">
                    <MusicIcon size={10} />
                    {t(copy.envelope.audioNote, lang)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <HeartDivider className="mx-auto mb-5 mt-1 w-full max-w-md opacity-80" />
        <p className="sr-only" role="status" aria-live="polite">
          {opening ? t(copy.envelope.opening, lang) : t(copy.envelope.open, lang)}
        </p>
      </div>
    </section>
  );
}
