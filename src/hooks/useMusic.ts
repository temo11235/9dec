import { useCallback, useEffect, useRef, useState } from "react";

export type MusicStatus = "idle" | "loading" | "playing" | "paused" | "unavailable" | "error";

const AUDIO_SRC = "/audio/engagement-music.mp3";
const TARGET_VOLUME = 0.42;
const FADE_MS = 900;

/**
 * Local, optional soundtrack. No remote audio is ever requested.
 * If public/audio/engagement-music.mp3 is not present the control honestly
 * reports that the track is unavailable instead of pretending to play.
 */
export function useMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const statusRef = useRef<MusicStatus>("idle");
  const [status, setStatus] = useState<MusicStatus>("idle");

  const update = useCallback((next: MusicStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const cancelFade = useCallback(() => {
    if (fadeRef.current !== null) {
      window.cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.0001;
    audio.setAttribute("playsinline", "");
    audio.addEventListener("error", () => {
      // Only a genuine media failure (missing/unsupported local file) is "unavailable".
      update("unavailable");
    });
    audio.src = AUDIO_SRC;
    audio.load();
    audio.addEventListener("playing", () => update("playing"));
    audio.addEventListener("pause", () => {
      if (statusRef.current === "playing") update("paused");
    });
    audioRef.current = audio;
    return audio;
  }, [update]);

  const fadeTo = useCallback(
    (target: number, onDone?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      cancelFade();
      const startVolume = audio.volume;
      const started = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - started) / FADE_MS);
        audio.volume = Math.max(0, Math.min(1, startVolume + (target - startVolume) * progress));
        if (progress < 1) {
          fadeRef.current = window.requestAnimationFrame(step);
        } else {
          fadeRef.current = null;
          onDone?.();
        }
      };
      fadeRef.current = window.requestAnimationFrame(step);
    },
    [cancelFade],
  );

  const play = useCallback(async (): Promise<MusicStatus> => {
    const audio = ensureAudio();
    update("loading");
    try {
      audio.volume = 0.0001;
      await audio.play();
      update("playing");
      fadeTo(TARGET_VOLUME);
      return "playing";
    } catch (error) {
      const name = error instanceof DOMException ? error.name : "";
      // A blocked autoplay attempt is not a missing file: keep the control usable.
      if (name === "NotAllowedError" || name === "AbortError") {
        update(audio.currentTime > 0 ? "paused" : "idle");
        return statusRef.current;
      }
      if (audio.error && audio.error.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        update("unavailable");
        return "unavailable";
      }
      update("error");
      return "error";
    }
  }, [ensureAudio, fadeTo, update]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, () => {
      audio.pause();
      update("paused");
    });
  }, [fadeTo, update]);

  const toggle = useCallback(async (): Promise<MusicStatus> => {
    if (statusRef.current === "playing" || statusRef.current === "loading") {
      pause();
      return "paused";
    }
    return play();
  }, [pause, play]);

  useEffect(() => {
    return () => {
      cancelFade();
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
      }
      audioRef.current = null;
    };
  }, [cancelFade]);

  return {
    status,
    play,
    pause,
    toggle,
    isPlaying: status === "playing",
    isUnavailable: status === "unavailable",
  };
}
