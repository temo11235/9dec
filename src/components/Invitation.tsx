import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { Lang } from "../data/invitation";
import { copy, EVENT, mapEmbedUrl, t, VENUE_CAPTIONS, VENUE_IMAGES } from "../data/invitation";
import type { MusicStatus } from "../hooks/useMusic";
import { useCountdown } from "../hooks/useCountdown";
import { Reveal } from "./Reveal";
import { HeartCounter } from "./HeartCounter";
import {
  BokehParticles,
  FloatingHearts,
  FloralSpray,
  HeartDivider,
  IntertwinedHearts,
  ScriptCrest,
} from "./Ornaments";
import {
  ArrowDownIcon,
  CalendarIcon,
  ClockIcon,
  CompassIcon,
  ExternalLinkIcon,
  FilledHeartIcon,
  HeartIcon,
  MapPinIcon,
  MusicIcon,
  MusicOffIcon,
  PauseIcon,
  PlayIcon,
  RestartIcon,
  SparkleIcon,
} from "./Icons";

type InvitationProps = {
  lang: Lang;
  reducedMotion: boolean;
  musicStatus: MusicStatus;
  onMusicToggle: () => void;
  onRestartRequest: () => void;
  onMapInteract: () => void;
};

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
/* ------------------------------------------------------------------ */

function SectionHeading({
  lang,
  eyebrow,
  title,
  subtitle,
  id,
}: {
  lang: Lang;
  eyebrow: { ar: string; en: string };
  title: { ar: string; en: string };
  subtitle?: { ar: string; en: string };
  id?: string;
}) {
  const otherLang = lang === "ar" ? "en" : "ar";
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">{t(eyebrow, lang)}</p>
      <div className="mx-auto mt-2.5 flex items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a7d8]/70" />
        <FilledHeartIcon size={9} className="text-[#c9a7d8]" />
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#c9a7d8]/70" />
      </div>
      <h2 id={id} className="section-title mt-3 text-[clamp(1.55rem,3.6vw,2.45rem)]">
        {t(title, lang)}
      </h2>
      {subtitle && (
        <p
          className={`mt-2.5 ${lang === "ar" ? "secondary-copy" : "arabic-sub"} text-[clamp(0.9rem,1.8vw,1.08rem)] leading-relaxed`}
          lang={otherLang}
          dir={otherLang === "ar" ? "rtl" : "ltr"}
        >
          {t(subtitle, otherLang)}
        </p>
      )}
      <HeartDivider className="mt-4" />
    </div>
  );
}

function DisplayName({ lang, nameAr, nameEn }: { lang: Lang; nameAr: string; nameEn: string }) {
  return (
    <div className="flex flex-col items-center">
      <h3
        className={`${
          lang === "ar" ? "font-ar-display" : "font-display"
        } text-[clamp(2.6rem,7.5vw,4.9rem)] leading-[1.08] text-[#6c3f63]`}
      >
        {lang === "ar" ? nameAr : nameEn}
      </h3>
      <p
        className={`mt-1 ${
          lang === "ar" ? "font-display tracking-[0.18em] italic" : "font-ar-display"
        } text-[clamp(0.82rem,2vw,1.08rem)] text-[#9a6b8d]`}
        lang={lang === "ar" ? "en" : "ar"}
      >
        {lang === "ar" ? nameEn : nameAr}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Invitation                                                         */
/* ------------------------------------------------------------------ */

export default function Invitation({
  lang,
  reducedMotion,
  musicStatus,
  onMusicToggle,
  onRestartRequest,
  onMapInteract,
}: InvitationProps) {
  const countdown = useCountdown();
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrFailed, setQrFailed] = useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const otherLang: Lang = lang === "ar" ? "en" : "ar";
  const musicPlaying = musicStatus === "playing";

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(EVENT.mapsUrl, {
      width: 480,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#6C3F63", light: "#FFF9FC" },
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        if (active) setQrFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const parentOrder = lang === "ar" ? "groomFirst" : "brideFirst";

  return (
    <main
      id="invitation-start"
      tabIndex={-1}
      lang={lang}
      dir={dir}
      className="invitation-shell relative min-h-screen overflow-clip pb-8 pt-[78px] sm:pt-[96px]"
    >
      {/* Page-level floral atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -start-24 top-[16%] h-[460px] w-[330px] rounded-full opacity-[0.22] blur-[1px]"
          style={{ backgroundImage: "url(/images/floral-hero.jpg)", backgroundSize: "cover", backgroundPosition: "left center", maskImage: "radial-gradient(ellipse, black, transparent 72%)" }}
        />
        <div
          className="absolute -end-28 top-[58%] h-[520px] w-[360px] rounded-full opacity-[0.2]"
          style={{ backgroundImage: "url(/images/floral-hero.jpg)", backgroundSize: "cover", backgroundPosition: "right center", maskImage: "radial-gradient(ellipse, black, transparent 72%)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1228px] px-2 sm:px-5">
        <div className="overflow-hidden rounded-[24px] border border-[#e4c3d3]/70 bg-[rgba(255,249,252,0.76)] shadow-[0_40px_100px_-45px_rgba(108,63,99,0.55)] sm:rounded-[32px]">
          {/* ------------------------------------------------------ */}
          {/* 1. Invitation introduction                             */}
          {/* ------------------------------------------------------ */}
          <section
            id="intro"
            aria-labelledby="intro-title"
            className="relative scroll-mt-24 overflow-hidden px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14"
          >
            <div
              className="absolute inset-0 opacity-[0.32]"
              style={{ backgroundImage: "url(/images/floral-hero.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,249,252,.88),rgba(252,228,236,.72)_45%,rgba(255,249,252,.94))]" aria-hidden="true" />
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#c9a7d8] to-transparent" aria-hidden="true" />
            <BokehParticles count={12} />
            <FloralSpray className="pointer-events-none absolute -start-8 -top-10 hidden w-40 opacity-70 sm:block lg:w-52" />
            <FloralSpray className="pointer-events-none absolute -end-10 bottom-0 hidden w-44 -scale-x-100 opacity-65 sm:block lg:w-56" />

            <div className="relative z-10 mx-auto max-w-[980px] text-center">
              <Reveal reducedMotion={reducedMotion}>
                <div className="flex flex-col items-center gap-2.5">
                  <ScriptCrest />
                  <p className="eyebrow mt-1">{t(copy.common.engagementCelebration, lang)}</p>
                </div>
                <div className="mt-3 flex items-center justify-center gap-3" aria-hidden="true">
                  <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#b78aab]" />
                  <IntertwinedHearts size={38} tone="#9c6b90" />
                  <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#b78aab]" />
                </div>
              </Reveal>

              <Reveal reducedMotion={reducedMotion} delay={1}>
                <p className="mt-5 font-ar-display text-[clamp(1.1rem,2.6vw,1.5rem)] text-[#87547d]" lang="ar">
                  {copy.intro.eyebrow.ar}
                </p>
                <p className="secondary-copy text-[0.9rem]" lang="en" dir="ltr">
                  {copy.intro.eyebrow.en}
                </p>
                <HeartDivider className="my-3" />
                <h1 id="intro-title" className="section-title mx-auto max-w-[760px] text-[clamp(1.5rem,4.4vw,2.7rem)] leading-[1.45]">
                  {t(copy.intro.heading, lang)}
                </h1>
                <p
                  className={`mx-auto mt-2 max-w-[580px] ${
                    lang === "ar" ? "secondary-copy" : "arabic-sub"
                  } text-[clamp(0.92rem,2vw,1.1rem)] leading-relaxed`}
                  lang={otherLang}
                  dir={otherLang === "ar" ? "rtl" : "ltr"}
                >
                  {t(copy.intro.subtitle, otherLang)}
                </p>
              </Reveal>

              <Reveal reducedMotion={reducedMotion} delay={2}>
                <div className="relative mt-7 flex flex-row items-center justify-center gap-1.5 sm:mt-9 sm:gap-5">
                  <span className="absolute left-1/2 top-1/2 -z-10 h-32 w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,.95),rgba(252,228,236,.45),transparent_72%)] blur-sm" aria-hidden="true" />
                  <div className="min-w-0 flex-1 text-center sm:flex-none">
                    <span className="eyebrow text-[0.55rem] sm:text-[0.62rem]">{t(copy.common.groom, lang)}</span>
                    <DisplayName lang={lang} nameAr={copy.common.groomName.ar} nameEn={copy.common.groomName.en} />
                  </div>

                  <div className="flex flex-none flex-col items-center justify-center px-0.5 sm:px-2">
                    <span className="font-script text-[clamp(2rem,5vw,3.3rem)] leading-none text-[#b07fa0]">&amp;</span>
                    <span className="mt-1 text-[0.55rem] tracking-[0.28em] text-[#87547d]/70 uppercase">
                      {lang === "ar" ? "و" : "and"}
                    </span>
                    <span className="mt-2 hidden h-10 w-px bg-gradient-to-b from-transparent via-[#c9a7d8] to-transparent sm:block" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1 text-center sm:flex-none">
                    <span className="eyebrow text-[0.55rem] sm:text-[0.62rem]">{t(copy.common.bride, lang)}</span>
                    <DisplayName lang={lang} nameAr={copy.common.brideName.ar} nameEn={copy.common.brideName.en} />
                  </div>
                </div>
              </Reveal>

              <Reveal reducedMotion={reducedMotion} delay={3}>
                <p className="mx-auto mt-5 max-w-[530px] font-ar-display text-[clamp(1rem,2.2vw,1.2rem)] leading-relaxed text-[#87547d]" lang="ar">
                  {copy.intro.quote.ar}
                </p>
                <p className="secondary-copy mx-auto mt-1 max-w-[500px] text-[0.92rem] leading-relaxed" lang="en" dir="ltr">
                  {copy.intro.quote.en}
                </p>

                <div className="mx-auto mt-6 flex w-fit max-w-full flex-col items-center gap-1 rounded-[18px] border border-[#c9a7d8]/40 bg-white/60 px-5 py-2.5 text-[#74476b] shadow-[inset_0_1px_0_#fff] sm:flex-row sm:gap-3 sm:rounded-full sm:px-6">
                  <span className="flex items-center gap-2">
                    <CalendarIcon size={15} className="flex-none text-[#87547d]" />
                    <span className="font-ar-display text-[clamp(0.82rem,2vw,1rem)]" lang="ar">
                      {lang === "ar" ? copy.intro.dateLine.ar : copy.intro.dateLine.en}
                    </span>
                  </span>
                  <span className="hidden h-3 w-px bg-[#87547d]/25 sm:block" aria-hidden="true" />
                  <span className="secondary-copy text-[0.8rem]" lang={lang === "ar" ? "en" : "ar"}>
                    {lang === "ar" ? copy.intro.dateLine.en : copy.intro.dateLine.ar}
                  </span>
                </div>

                {!reducedMotion && (
                  <div className="mt-7 flex flex-col items-center gap-1 text-[#87547d]/65">
                    <span className="drift grid h-8 w-8 place-items-center rounded-full border border-[#87547d]/25 bg-white/40">
                      <ArrowDownIcon size={13} />
                    </span>
                    <span className="text-[0.62rem] tracking-wide">{t(copy.intro.scrollHint, lang)}</span>
                  </div>
                )}
              </Reveal>
            </div>
          </section>

          {/* ------------------------------------------------------ */}
          {/* 2. Parents                                             */}
          {/* ------------------------------------------------------ */}
          <section
            id="parents"
            aria-labelledby="parents-title"
            className="relative scroll-mt-24 overflow-hidden border-y border-[#e8c6b0]/55 bg-[linear-gradient(120deg,rgba(252,228,236,.65),rgba(255,255,255,.84)_38%,rgba(232,221,245,.55))] px-4 py-12 sm:px-8 sm:py-14"
          >
            <FloralSpray className="pointer-events-none absolute -start-12 top-0 w-36 opacity-40 sm:w-44" />
            <FloralSpray className="pointer-events-none absolute -end-12 bottom-0 w-36 -scale-x-100 opacity-40 sm:w-44" />
            <div className="relative z-10 mx-auto max-w-[1080px]">
              <Reveal reducedMotion={reducedMotion}>
                <SectionHeading
                  lang={lang}
                  eyebrow={copy.parents.eyebrow}
                  title={copy.parents.heading}
                  subtitle={copy.parents.subheading}
                  id="parents-title"
                />
              </Reveal>

              <Reveal reducedMotion={reducedMotion} delay={1}>
                <div className="relative mx-auto mt-7 max-w-[900px]">
                  <span className="absolute inset-y-4 left-1/2 hidden w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(201,167,216,.75),rgba(232,198,176,.8),rgba(201,167,216,.75),transparent)] md:block" aria-hidden="true" />
                  <span className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#c9a7d8]/50 bg-[#fff9fc] text-[#a47398] shadow-[0_6px_18px_-8px_rgba(135,84,125,.4)] md:grid" aria-hidden="true">
                    <HeartIcon size={16} />
                  </span>

                  <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                    {(parentOrder === "groomFirst"
                      ? [
                          { key: "groom", label: copy.common.groomFatherLabel, name: copy.common.groomFatherName },
                          { key: "bride", label: copy.common.brideFatherLabel, name: copy.common.brideFatherName },
                        ]
                      : [
                          { key: "bride", label: copy.common.brideFatherLabel, name: copy.common.brideFatherName },
                          { key: "groom", label: copy.common.groomFatherLabel, name: copy.common.groomFatherName },
                        ]
                    ).map((parent) => (
                      <div key={parent.key} className="flex flex-col items-center text-center">
                        <span className="grid h-9 w-9 place-items-center rounded-full border border-[#c9a7d8]/45 bg-white/65 text-[#b07fa0]">
                          <FilledHeartIcon size={13} />
                        </span>
                        <p className="eyebrow mt-3">{t(parent.label, lang)}</p>
                        <p className="secondary-copy text-[0.82rem]" lang={otherLang}>
                          {t(parent.label, otherLang)}
                        </p>
                        <p className="mt-2 font-ar-display text-[clamp(1.65rem,4vw,2.25rem)] leading-tight text-[#6c3f63]" lang="ar">
                          {parent.name.ar}
                        </p>
                        <p className="font-display text-[clamp(0.9rem,2vw,1.05rem)] tracking-[0.08em] text-[#9a6b8d]" lang="en">
                          {parent.name.en}
                        </p>
                        <span className="mt-3 h-px w-16 bg-gradient-to-r from-transparent via-[#c9a7d8] to-transparent" aria-hidden="true" />
                        <span className="mt-2 text-[0.55rem] tracking-[0.26em] text-[#87547d]/55 uppercase">
                          {t(parent.key === "groom" ? copy.common.groom : copy.common.bride, lang)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <HeartDivider className="mt-7 md:hidden" />
            </div>
          </section>

          {/* ------------------------------------------------------ */}
          {/* 3. Date & time                                         */}
          {/* ------------------------------------------------------ */}
          <section
            id="date-time"
            aria-labelledby="when-title"
            className="relative scroll-mt-24 overflow-hidden border-b border-[#e8c6b0]/45 px-4 py-12 sm:px-8 sm:py-14"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(252,228,236,.65),transparent_65%)]" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-[1080px]">
              <Reveal reducedMotion={reducedMotion}>
                <SectionHeading lang={lang} eyebrow={copy.when.eyebrow} title={copy.when.heading} id="when-title" />
              </Reveal>

              <Reveal reducedMotion={reducedMotion} delay={1}>
                <div className="mt-8 grid overflow-hidden rounded-[20px] border border-[#e0c2d2]/60 bg-white/42 shadow-[inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-sm sm:grid-cols-3">
                  <div className="relative flex flex-col items-center px-5 py-7 text-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c9a7d8]/45 bg-gradient-to-br from-white to-[#f8d7e5]/65 text-[#87547d]" aria-hidden="true">
                      <CalendarIcon size={21} />
                    </span>
                    <p className="eyebrow mt-3">{t(copy.common.dateLabel, lang)}</p>
                    <p className="mt-1.5 font-ar-display text-[clamp(1.35rem,3vw,1.8rem)] leading-tight text-[#6c3f63]" lang="ar" aria-hidden="true">
                      {copy.common.dateDay.ar}
                    </p>
                    <p className="font-display text-[clamp(1.05rem,2.4vw,1.35rem)] italic text-[#87547d]" lang="en">
                      {lang === "ar" ? copy.common.dateLong.ar : copy.common.dateLong.en}
                    </p>
                    <p className="secondary-copy mt-0.5 text-[0.86rem]" lang={otherLang}>
                      {lang === "ar" ? copy.common.dateLong.en : copy.common.dateLong.ar}
                    </p>
                    <span className="sr-only">{t(copy.when.calendarAria, lang)}</span>
                  </div>

                  <div className="relative flex flex-col items-center justify-center px-5 py-7 text-center before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-[#c9a7d8]/35 sm:before:inset-y-7 sm:before:inset-x-auto sm:before:left-0 sm:before:h-auto sm:before:w-px">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c9a7d8]/45 bg-gradient-to-br from-white to-[#e8ddf5]/75 text-[#87547d]" aria-hidden="true">
                      <ClockIcon size={21} />
                    </span>
                    <p className="eyebrow mt-3">{t(copy.common.timeLabel, lang)}</p>
                    <p className="mt-1.5 font-ar-display text-[clamp(1.35rem,3vw,1.8rem)] leading-tight text-[#6c3f63]" lang="ar">
                      {lang === "ar" ? copy.common.time.ar : copy.common.time.en}
                    </p>
                    <p className="font-display text-[clamp(1.05rem,2.4vw,1.35rem)] italic text-[#87547d]" lang="en">
                      {lang === "ar" ? copy.common.time.en : copy.common.time.ar}
                    </p>
                    <span className="sr-only">{t(copy.when.clockAria, lang)}</span>
                  </div>

                  <div className="relative flex flex-col items-center justify-center px-5 py-7 text-center before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-[#c9a7d8]/35 sm:before:inset-y-7 sm:before:inset-x-auto sm:before:left-0 sm:before:h-auto sm:before:w-px">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c9a7d8]/45 bg-gradient-to-br from-white to-[#fce4ec]/80 text-[#b07fa0]" aria-hidden="true">
                      <HeartIcon size={21} />
                    </span>
                    <p className="mt-3 max-w-[230px] font-ar-display text-[clamp(1.08rem,2.4vw,1.35rem)] leading-relaxed text-[#6c3f63]" lang="ar">
                      {lang === "ar" ? copy.when.celebrationTitle.ar : copy.when.celebrationTitle.en}
                    </p>
                    <p className="secondary-copy mt-1 max-w-[250px] text-[0.88rem] leading-relaxed" lang="en">
                      {lang === "ar" ? copy.when.celebrationEn.en : copy.when.celebrationEn.ar}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ------------------------------------------------------ */}
          {/* 4. Countdown                                           */}
          {/* ------------------------------------------------------ */}
          <section
            id="countdown"
            aria-labelledby="countdown-title"
            className="relative scroll-mt-24 overflow-hidden border-b border-[#e8c6b0]/45 bg-[linear-gradient(120deg,rgba(232,221,245,.72),rgba(255,249,252,.88)_48%,rgba(252,228,236,.7))] px-4 py-12 sm:px-8 sm:py-14"
          >
            <div className="pointer-events-none absolute -end-10 top-6 hidden w-40 opacity-50 sm:block">
              <FloralSpray className="w-full" />
            </div>
            <div className="relative z-10 mx-auto max-w-[1080px]">
              <Reveal reducedMotion={reducedMotion}>
                <SectionHeading
                  lang={lang}
                  eyebrow={copy.countdown.eyebrow}
                  title={copy.countdown.heading}
                  subtitle={copy.countdown.subheading}
                  id="countdown-title"
                />
              </Reveal>

              <Reveal reducedMotion={reducedMotion} delay={1}>
                <div
                  role="group"
                  aria-label={t(copy.countdown.liveLabel, lang)}
                  className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 lg:gap-5"
                >
                  <HeartCounter value={countdown.days} arLabel={copy.countdown.days.ar} enLabel={copy.countdown.days.en} lang={lang} />
                  <HeartCounter value={countdown.hours} arLabel={copy.countdown.hours.ar} enLabel={copy.countdown.hours.en} lang={lang} />
                  <HeartCounter value={countdown.minutes} arLabel={copy.countdown.minutes.ar} enLabel={copy.countdown.minutes.en} lang={lang} />
                  <HeartCounter value={countdown.seconds} arLabel={copy.countdown.seconds.ar} enLabel={copy.countdown.seconds.en} lang={lang} />
                </div>

                <p className="sr-only" role="status" aria-live="polite">
                  {countdown.isPast
                    ? t(copy.countdown.pastTitle, lang)
                    : `${countdown.days} ${t(copy.countdown.days, lang)} · ${countdown.hours} ${t(copy.countdown.hours, lang)} · ${countdown.minutes} ${t(copy.countdown.minutes, lang)}`}
                </p>

                <div className="mt-5 flex flex-col items-center justify-center gap-2 text-center">
                  <div className="flex items-center gap-3 text-[#87547d]/70" aria-hidden="true">
                    <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a7d8]" />
                    <IntertwinedHearts size={30} tone="#a47398" />
                    <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a7d8]" />
                  </div>
                  <p className="font-script text-[clamp(1.35rem,3vw,1.8rem)] leading-none text-[#9b648d]">
                    {countdown.isPast ? "With love, always" : "Forever begins here"}
                  </p>
                  <p className="arabic-sub text-[0.78rem]">{countdown.isPast ? "بحب دائم" : "هنا تبدأ حكايتنا"}</p>
                </div>

                {countdown.isPast && (
                  <div className="mx-auto mt-5 max-w-xl rounded-2xl border border-[#c9a7d8]/45 bg-white/60 px-5 py-4 text-center">
                    <p className="font-ar-display text-lg text-[#6c3f63]">{copy.countdown.pastTitle.ar}</p>
                    <p className="secondary-copy text-[0.85rem]">{copy.countdown.pastTitle.en}</p>
                    <p className="mt-1 text-[0.8rem] leading-relaxed text-[#87547d]/80">
                      {lang === "ar" ? copy.countdown.pastBody.ar : copy.countdown.pastBody.en}
                    </p>
                  </div>
                )}
              </Reveal>
            </div>
          </section>

          {/* ------------------------------------------------------ */}
          {/* 5. Venue                                               */}
          {/* ------------------------------------------------------ */}
          <section
            id="venue"
            aria-labelledby="venue-title"
            className="relative scroll-mt-24 overflow-hidden border-b border-[#e8c6b0]/45 px-4 py-12 sm:px-8 sm:py-16"
          >
            <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_20%_0%,rgba(252,228,236,.8),transparent_60%)]" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-[1080px]">
              <Reveal reducedMotion={reducedMotion}>
                <SectionHeading
                  lang={lang}
                  eyebrow={copy.venue.eyebrow}
                  title={copy.venue.heading}
                  subtitle={copy.venue.tagline}
                  id="venue-title"
                />
              </Reveal>

              <div className="mt-9 grid items-start gap-7 lg:grid-cols-12 lg:gap-8">
                <Reveal reducedMotion={reducedMotion} className="lg:col-span-7" delay={1}>
                  <figure className="venue-frame relative venue-hero">
                    <div className="group relative overflow-hidden rounded-[3px]">
                      <img
                        src={VENUE_IMAGES[0].src}
                        alt={t(VENUE_IMAGES[0].alt, lang)}
                        width={1400}
                        height={800}
                        loading="eager"
                        decoding="async"
                        className="venue-photo h-[270px] w-full object-cover sm:h-[340px] lg:h-[392px]"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d2038]/55 via-transparent to-transparent" aria-hidden="true" />
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                        <span className="font-ar-display text-[0.82rem] text-white/95 drop-shadow-[0_1px_3px_rgba(45,20,40,.7)] sm:text-[0.95rem]" lang="ar">
                          {VENUE_CAPTIONS[0].ar}
                        </span>
                        <span className="font-display text-[0.62rem] tracking-[0.18em] text-white/85 uppercase drop-shadow-[0_1px_3px_rgba(45,20,40,.7)] sm:text-[0.7rem]">
                          Marsilia Garden
                        </span>
                      </figcaption>
                      <span className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/85 px-2.5 py-1 font-display text-[0.54rem] tracking-[0.16em] text-[#74476b] uppercase shadow-sm backdrop-blur-sm">
                        <MapPinIcon size={10} />
                        Marsilia
                      </span>
                    </div>
                    <span className="pointer-events-none absolute -bottom-2 -end-2 h-10 w-10 border-b border-e border-[#e8c6b0]" aria-hidden="true" />
                    <span className="pointer-events-none absolute -top-2 -start-2 h-10 w-10 border-t border-s border-[#e8c6b0]" aria-hidden="true" />
                  </figure>

                  <div className="venue-gallery-thumbs mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                    {VENUE_IMAGES.slice(1).map((image, index) => (
                      <figure key={image.src} className="venue-frame relative">
                        <div className="group relative overflow-hidden rounded-[3px]">
                          <img
                            src={image.src}
                            alt={t(image.alt, lang)}
                            width={1200}
                            height={800}
                            loading="lazy"
                            decoding="async"
                            className="venue-photo h-[128px] w-full object-cover sm:h-[155px]"
                          />
                          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d2038]/45 to-transparent opacity-80" aria-hidden="true" />
                          <span className="pointer-events-none absolute inset-x-0 bottom-0 p-2 text-[0.6rem] leading-tight text-white/95 drop-shadow-[0_1px_3px_rgba(45,20,40,.75)]">
                            {lang === "ar" ? VENUE_CAPTIONS[index + 1].ar : VENUE_CAPTIONS[index + 1].en}
                          </span>
                        </div>
                      </figure>
                    ))}
                  </div>
                  <p className="mt-3 flex items-start gap-1.5 text-[0.63rem] leading-relaxed text-[#87547d]/65">
                    <SparkleIcon size={12} className="mt-0.5 flex-none" />
                    {t(copy.venue.galleryNote, lang)}
                  </p>
                </Reveal>

                <Reveal reducedMotion={reducedMotion} className="lg:col-span-5" delay={2}>
                  <div className="paper-card rounded-[22px] px-5 py-6 sm:px-7 sm:py-8">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-[#c9a7d8]/50 bg-gradient-to-br from-[#fce4ec] to-[#e8ddf5] text-[#87547d]">
                        <MapPinIcon size={20} />
                      </span>
                      <div>
                        <p className="eyebrow">{t(copy.venue.eyebrow, lang)}</p>
                        <p className="font-ar-display text-[1.2rem] leading-tight text-[#6c3f63]" lang="ar">
                          {copy.common.venue.ar}
                        </p>
                      </div>
                    </div>

                    <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#c9a7d8]/60 to-transparent" aria-hidden="true" />

                    <p className="font-ar-display text-[clamp(1.45rem,3.4vw,1.95rem)] leading-tight text-[#6c3f63]" lang="ar">
                      {lang === "ar" ? copy.common.venue.ar : copy.common.venue.en}
                    </p>
                    <p className={`mt-1 ${lang === "ar" ? "font-display tracking-[0.06em]" : "font-ar-display"} text-[1.02rem] text-[#9a6b8d]`} lang={otherLang}>
                      {lang === "ar" ? copy.common.venue.en : copy.common.venue.ar}
                    </p>

                    <div className="mt-4 space-y-0.5">
                      <p className="eyebrow text-[0.55rem]">{t(copy.venue.addressLabel, lang)}</p>
                      {(lang === "ar" ? copy.common.address.ar : copy.common.address.en).map((line, index) => (
                        <p key={line} className="text-[0.9rem] leading-relaxed text-[#74476b]">
                          {line}
                          <span className="block text-[0.74rem] text-[#87547d]/65" lang={otherLang} dir={otherLang === "ar" ? "rtl" : "ltr"}>
                            {(lang === "ar" ? copy.common.address.en : copy.common.address.ar)[index]}
                          </span>
                        </p>
                      ))}
                    </div>

                    <p className="mt-4 text-[0.84rem] leading-relaxed text-[#74476b]/80">
                      {t(copy.venue.body, lang)}
                    </p>

                    <a
                      href={EVENT.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxe mt-5 w-full px-4 py-3"
                      aria-label={t(copy.venue.mapsAria, lang)}
                    >
                      <MapPinIcon size={17} className="flex-none" />
                      <span className="flex min-w-0 flex-col items-center text-center leading-tight">
                        <span className="font-ar-display text-[0.92rem]">{copy.venue.mapsButton.ar}</span>
                        <span className="font-display text-[0.68rem] tracking-wide text-white/80">{copy.venue.mapsButton.en}</span>
                      </span>
                      <ExternalLinkIcon size={14} className="flex-none opacity-80" />
                    </a>

                    <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#fce4ec]/55 px-3 py-2 text-center text-[0.68rem] text-[#87547d]/80">
                      <CalendarIcon size={13} className="flex-none" />
                      {lang === "ar" ? copy.intro.dateLine.ar : copy.intro.dateLine.en}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------ */}
          {/* 6. Location & directions                               */}
          {/* ------------------------------------------------------ */}
          <section
            id="location"
            aria-labelledby="location-title"
            className="relative scroll-mt-24 overflow-hidden border-b border-[#e8c6b0]/45 bg-[linear-gradient(160deg,rgba(255,249,252,.9),rgba(232,221,245,.55))] px-4 py-12 sm:px-8 sm:py-16"
          >
            <div className="relative z-10 mx-auto max-w-[1080px]">
              <Reveal reducedMotion={reducedMotion}>
                <SectionHeading
                  lang={lang}
                  eyebrow={copy.location.eyebrow}
                  title={copy.location.heading}
                  subtitle={copy.location.intro}
                  id="location-title"
                />
              </Reveal>

              <div className="mt-9 grid gap-6 lg:grid-cols-12 lg:[direction:ltr]">
                <Reveal reducedMotion={reducedMotion} className="lg:col-span-7 lg:order-1" delay={1}>
                  <div className="map-frame relative rounded-[20px] border border-[#d9b8ca]/60 bg-white/70 p-1.5 shadow-[0_24px_60px_-32px_rgba(108,63,99,.55)]">
                    <div
                      className="relative h-[280px] overflow-hidden rounded-[15px] sm:h-[360px] lg:h-[430px]"
                      onPointerEnter={onMapInteract}
                      onPointerDown={onMapInteract}
                      onTouchStart={onMapInteract}
                      onFocus={onMapInteract}
                    >
                      <iframe
                        key={lang}
                        src={mapEmbedUrl(lang)}
                        title={t(copy.location.mapTitle, lang)}
                        className="absolute inset-0 h-full w-full border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <span className="pointer-events-none absolute start-3 top-3 rounded-full border border-white/75 bg-white/90 px-2.5 py-1 text-[0.58rem] tracking-wide text-[#87547d] shadow-sm backdrop-blur-sm">
                        {t(copy.location.mapBadge, lang)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 px-1 text-[0.62rem] leading-relaxed text-[#87547d]/65">
                    {t(copy.location.mapFallback, lang)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={EVENT.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline px-4 py-2 text-[0.78rem]"
                    >
                      <MapPinIcon size={14} />
                      {t(copy.location.mapsButton, lang)}
                      <ExternalLinkIcon size={12} className="opacity-70" />
                    </a>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a7d8]/35 bg-white/45 px-3 py-2 text-[0.68rem] text-[#87547d]/70">
                      <MapPinIcon size={12} />
                      {copy.common.venue.ar} · {copy.common.venue.en}
                    </span>
                  </div>
                </Reveal>

                <Reveal reducedMotion={reducedMotion} className="lg:col-span-5 lg:order-2" delay={2}>
                  <div className="paper-card rounded-[20px] px-5 py-6 sm:px-6" dir={dir}>
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e8ddf5]/80 text-[#87547d]">
                        <CompassIcon size={16} />
                      </span>
                      <p className="font-ar-display text-[1.15rem] text-[#6c3f63]">{t(copy.location.directionsHeading, lang)}</p>
                    </div>

                    <ol className="mt-4 space-y-3.5">
                      {copy.location.steps[lang].map((step, index) => (
                        <li key={step} className="direction-step">
                          <span className="direction-step__num">{index + 1}</span>
                          <div className="min-w-0">
                            <p className="text-[0.88rem] font-medium leading-relaxed text-[#603456]">{step}</p>
                            <p
                              className={`text-[0.74rem] leading-relaxed text-[#87547d]/60 ${lang === "ar" ? "font-display italic" : "font-ar"}`}
                              lang={otherLang}
                              dir={otherLang === "ar" ? "rtl" : "ltr"}
                            >
                              {copy.location.steps[otherLang][index]}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>

                    <p className="mt-4 flex items-start gap-1.5 rounded-xl border border-[#e8c6b0]/40 bg-[#fff9fc]/70 px-2.5 py-2 text-[0.67rem] leading-relaxed text-[#87547d]/70">
                      <SparkleIcon size={12} className="mt-0.5 flex-none" />
                      {t(copy.location.note, lang)}
                    </p>
                  </div>

                  <div className="paper-card mt-4 flex items-center gap-4 rounded-[18px] px-4 py-4">
                    <div className="flex-none rounded-xl border border-[#e8c6b0]/60 bg-white p-1.5 shadow-inner">
                      {qrDataUrl ? (
                        <a href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={t(copy.location.qrAlt, lang)}>
                          <img
                            src={qrDataUrl}
                            alt={t(copy.location.qrAlt, lang)}
                            width={132}
                            height={132}
                            className="h-[104px] w-[104px] rounded-sm object-contain"
                          />
                        </a>
                      ) : (
                        <div className="grid h-[104px] w-[104px] place-items-center rounded-sm bg-[#fff9fc] text-center text-[0.58rem] leading-relaxed text-[#87547d]/60">
                          {qrFailed ? t(copy.location.qrError, lang) : t(copy.location.qrLoading, lang)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="arabic-sub font-ar-display text-[1.02rem] leading-tight text-[#6c3f63]">{copy.location.qrTitle.ar}</p>
                      <p className="font-display text-[0.74rem] tracking-wide text-[#9a6b8d]">{copy.location.qrTitle.en}</p>
                      <p className="mt-1 text-[0.69rem] leading-relaxed text-[#87547d]/70">{t(copy.location.qrBody, lang)}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------ */}
          {/* 7. Final message                                       */}
          {/* ------------------------------------------------------ */}
          <section
            id="final"
            aria-labelledby="final-title"
            className="relative scroll-mt-24 overflow-hidden px-3 py-12 sm:px-6 sm:py-16"
          >
            <div
              className="absolute inset-0 scale-105 bg-cover bg-bottom"
              style={{ backgroundImage: "url(/images/floral-footer.jpg)" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,249,252,.72),rgba(252,228,236,.38)_40%,rgba(232,221,245,.5))]" aria-hidden="true" />
            <FloatingHearts count={14} />
            <BokehParticles count={12} />
            <FloralSpray className="pointer-events-none absolute -start-10 bottom-0 hidden w-44 opacity-80 sm:block lg:w-56" />
            <FloralSpray className="pointer-events-none absolute -end-10 bottom-0 hidden w-44 -scale-x-100 opacity-80 sm:block lg:w-56" />

            <div className="relative z-10 mx-auto max-w-[900px]">
              <Reveal reducedMotion={reducedMotion}>
                <div className="relative overflow-hidden rounded-[26px] border border-white/75 bg-[rgba(255,249,252,.66)] px-5 py-9 text-center shadow-[0_30px_80px_-40px_rgba(108,63,99,.6)] backdrop-blur-lg sm:px-10 sm:py-12">
                  <span className="pointer-events-none absolute inset-x-6 top-3 h-px bg-gradient-to-r from-transparent via-[#e8c6b0] to-transparent" aria-hidden="true" />
                  <div className="flex flex-col items-center">
                    <ScriptCrest />
                    <p className="eyebrow mt-3">{t(copy.final.eyebrow, lang)}</p>
                    <HeartDivider className="my-3" />
                    <h2 id="final-title" className="section-title max-w-[620px] text-[clamp(1.6rem,4.6vw,2.7rem)] leading-[1.5]">
                      {t(copy.final.heading, lang)}
                    </h2>
                    <p className={`mt-2 ${lang === "ar" ? "secondary-copy" : "arabic-sub"} text-[1rem]`} lang={otherLang}>
                      {t(copy.final.heading, otherLang)}
                    </p>

                    <div className="my-5 flex flex-row items-center justify-center gap-3 sm:gap-5">
                      <div className="text-end">
                        <p className="font-ar-display text-[clamp(1.65rem,4.3vw,2.4rem)] leading-tight text-[#6c3f63]">محمود</p>
                        <p className="font-display text-[0.76rem] tracking-[0.2em] text-[#9a6b8d] uppercase">Mahmoud</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-script text-[clamp(1.8rem,4vw,2.5rem)] leading-none text-[#b07fa0]">&amp;</span>
                        <span className="my-1 h-8 w-px bg-gradient-to-b from-transparent via-[#c9a7d8] to-transparent" aria-hidden="true" />
                      </div>
                      <div className="text-start">
                        <p className="font-ar-display text-[clamp(1.65rem,4.3vw,2.4rem)] leading-tight text-[#6c3f63]">آية</p>
                        <p className="font-display text-[0.76rem] tracking-[0.2em] text-[#9a6b8d] uppercase">Aya</p>
                      </div>
                    </div>

                    <div className="mx-auto max-w-[560px] rounded-[18px] border border-[#e8c6b0]/45 bg-white/45 px-4 py-4">
                      <p className="font-ar-display text-[clamp(1.1rem,2.8vw,1.4rem)] leading-relaxed text-[#6c3f63]" lang="ar">
                        {lang === "ar" ? copy.final.line1.ar : copy.final.line1.en}
                      </p>
                      <p className="secondary-copy mt-1 text-[0.9rem] leading-relaxed" lang={otherLang}>
                        {lang === "ar" ? copy.final.line1.en : copy.final.line1.ar}
                      </p>
                      <span className="mx-auto my-2.5 block h-px w-16 bg-[#c9a7d8]/55" aria-hidden="true" />
                      <p className="text-[0.82rem] leading-relaxed text-[#87547d]/80">{t(copy.final.line2, lang)}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.76rem] text-[#87547d]/80">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarIcon size={12} />
                        {lang === "ar" ? copy.final.dateLine.ar : copy.final.dateLine.en}
                      </span>
                      <span className="h-3 w-px bg-[#87547d]/25" aria-hidden="true" />
                      <span className="inline-flex items-center gap-1.5">
                        <MapPinIcon size={12} />
                        {lang === "ar" ? copy.common.venue.ar : copy.common.venue.en}
                      </span>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c9a7d8]/40 bg-white/50 px-4 py-1.5 font-display text-[0.72rem] tracking-[0.18em] text-[#87547d]/85">
                      <FilledHeartIcon size={10} className="text-[#b07fa0]" />
                      {EVENT.hashtag}
                    </span>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                      <button type="button" onClick={onRestartRequest} className="btn-luxe px-4 py-2.5">
                        <RestartIcon size={15} />
                        <span className="flex min-w-0 flex-col items-center leading-tight">
                          <span className="text-[0.84rem]">{t(copy.final.returnButton, lang)}</span>
                          <span className="font-display text-[0.64rem] tracking-wide text-white/75">
                            {t(copy.final.returnButton, otherLang)}
                          </span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={onMusicToggle}
                        className="btn-outline px-4 py-2.5 text-[0.82rem]"
                        aria-pressed={musicPlaying}
                        aria-label={musicPlaying ? t(copy.controls.pauseMusic, lang) : t(copy.controls.playMusic, lang)}
                      >
                        {musicStatus === "unavailable" ? (
                          <MusicOffIcon size={15} />
                        ) : musicPlaying ? (
                          <PauseIcon size={13} />
                        ) : (
                          <PlayIcon size={13} />
                        )}
                        <MusicIcon size={14} className="opacity-60" />
                        {musicPlaying ? t(copy.controls.pauseMusic, lang) : t(copy.controls.playMusic, lang)}
                      </button>
                    </div>
                    <p className="mt-3 text-[0.65rem] tracking-wide text-[#87547d]/55">{t(copy.final.restartHint, lang)}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>

        <footer className="relative z-10 flex flex-col items-center gap-2 px-4 pb-4 pt-7 text-center">
          <HeartDivider className="w-full max-w-sm" />
          <p className="flex items-center gap-1.5 text-[0.68rem] tracking-wide text-[#87547d]/65">
            <HeartIcon size={11} className="text-[#b07fa0]" />
            {t(copy.final.closing, lang)}
          </p>
          <p className="font-display text-[0.7rem] tracking-[0.22em] text-[#87547d]/45 uppercase">
            Mahmoud &amp; Aya · 09 . 12 . 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
