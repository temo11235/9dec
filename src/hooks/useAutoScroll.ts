import { useCallback, useEffect, useRef, useState } from "react";

export type AutoScrollStatus = "idle" | "waiting" | "running" | "paused" | "finished";

/** Slow, continuous auto scroll — configurable in pixels per second. */
export const AUTO_SCROLL_SPEED_PX_PER_SEC = 40;
/** Breathing room after the envelope opens before the page starts moving. */
export const AUTO_SCROLL_START_DELAY_MS = 2600;

type Options = {
  enabled: boolean;
  reducedMotion: boolean;
};

/**
 * A single requestAnimationFrame loop that changes the real page scroll.
 * Any intentional user interaction pauses it, and it never resumes by itself.
 */
export function useAutoScroll({ enabled, reducedMotion }: Options) {
  const [status, setStatus] = useState<AutoScrollStatus>("idle");
  const statusRef = useRef<AutoScrollStatus>("idle");
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const remainderRef = useRef(0);
  const activatedRef = useRef(false);
  const enabledRef = useRef(enabled);

  enabledRef.current = enabled;

  const setBoth = useCallback((next: AutoScrollStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTimeRef.current = null;
    remainderRef.current = 0;
  }, []);

  const pause = useCallback(() => {
    clearTimer();
    stopLoop();
    if (!enabledRef.current) return;
    if (statusRef.current === "finished") return;
    if (statusRef.current === "running" || statusRef.current === "waiting") {
      setBoth("paused");
    }
  }, [clearTimer, setBoth, stopLoop]);

  const resume = useCallback(() => {
    if (!enabledRef.current || statusRef.current === "running") return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    if (window.scrollY >= maxScroll - 4) {
      setBoth("finished");
      return;
    }
    clearTimer();
    stopLoop();
    setBoth("running");
  }, [clearTimer, setBoth, stopLoop]);

  const toggle = useCallback(() => {
    if (statusRef.current === "running" || statusRef.current === "waiting") pause();
    else resume();
  }, [pause, resume]);

  const finish = useCallback(() => {
    clearTimer();
    stopLoop();
    setBoth("finished");
  }, [clearTimer, setBoth, stopLoop]);

  const reset = useCallback(() => {
    clearTimer();
    stopLoop();
    activatedRef.current = false;
    setBoth("idle");
  }, [clearTimer, setBoth, stopLoop]);

  // Arm the experience only after the envelope has opened.
  useEffect(() => {
    if (!enabled) {
      clearTimer();
      stopLoop();
      activatedRef.current = false;
      setBoth("idle");
      return;
    }

    if (activatedRef.current) return;
    activatedRef.current = true;

    if (reducedMotion) {
      setBoth("paused");
      return;
    }

    setBoth("waiting");
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      lastTimeRef.current = null;
      setBoth("running");
    }, AUTO_SCROLL_START_DELAY_MS);

    return clearTimer;
  }, [clearTimer, enabled, reducedMotion, setBoth, stopLoop]);

  // A single animation loop.
  useEffect(() => {
    if (!enabled || status !== "running") {
      stopLoop();
      return;
    }

    const tick = (now: number) => {
      if (!enabledRef.current || statusRef.current !== "running") {
        rafRef.current = null;
        return;
      }
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const deltaMs = Math.min(now - lastTimeRef.current, 64);
      lastTimeRef.current = now;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 2) {
        setBoth("finished");
        rafRef.current = null;
        return;
      }

      if (!document.hidden) {
        remainderRef.current += (AUTO_SCROLL_SPEED_PX_PER_SEC * deltaMs) / 1000;
        const wholePixels = Math.floor(remainderRef.current);
        if (wholePixels > 0) {
          remainderRef.current -= wholePixels;
          document.documentElement.scrollTop += wholePixels;
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return stopLoop;
  }, [enabled, setBoth, status, stopLoop]);

  // Manual intent always takes the wheel back.
  useEffect(() => {
    if (status !== "running" && status !== "waiting") return;

    const onIntent = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target && typeof target.closest === "function" && target.closest("[data-autoscroll-ignore]")) {
        return;
      }
      if (event.type === "keydown") {
        const key = (event as KeyboardEvent).key;
        const scrollKeys = [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
          "Spacebar",
        ];
        if (!scrollKeys.includes(key)) return;
      }
      pause();
    };

    window.addEventListener("wheel", onIntent, { passive: true });
    window.addEventListener("touchstart", onIntent, { passive: true });
    window.addEventListener("touchmove", onIntent, { passive: true });
    window.addEventListener("keydown", onIntent);
    document.addEventListener("pointerdown", onIntent, { passive: true });

    return () => {
      window.removeEventListener("wheel", onIntent);
      window.removeEventListener("touchstart", onIntent);
      window.removeEventListener("touchmove", onIntent);
      window.removeEventListener("keydown", onIntent);
      document.removeEventListener("pointerdown", onIntent);
    };
  }, [pause, status]);

  useEffect(() => {
    return () => {
      clearTimer();
      stopLoop();
    };
  }, [clearTimer, stopLoop]);

  return { status, pause, resume, toggle, finish, reset };
}
