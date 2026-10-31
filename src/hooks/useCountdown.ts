import { useEffect, useMemo, useState } from "react";
import { EVENT } from "../data/invitation";

function zonedParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts: Record<string, number> = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") parts[part.type] = Number(part.value);
  }
  return parts;
}

/**
 * Converts a wall-clock date in a specific IANA time zone to a UTC timestamp.
 * This keeps the countdown accurate for the venue's local time (Africa/Cairo)
 * regardless of the visitor's device time zone.
 */
export function zonedTimeToUtc(
  wall: { year: number; month: number; day: number; hour: number; minute: number },
  timeZone: string,
): number {
  const intendedUtc = Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute);
  let guess = intendedUtc;

  for (let i = 0; i < 3; i += 1) {
    const parts = zonedParts(new Date(guess), timeZone);
    const asUtc = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second ?? 0,
    );
    const diff = asUtc - guess;
    if (diff === 0) break;
    guess = intendedUtc - diff;
  }
  return guess;
}

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  targetTimestamp: number;
};

export function useCountdown(): Countdown {
  const targetTimestamp = useMemo(
    () => zonedTimeToUtc(EVENT.startsAt, EVENT.timeZone),
    [],
  );
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const difference = targetTimestamp - now;
  const isPast = difference <= 0;
  const remaining = Math.max(0, difference);

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
    isPast,
    targetTimestamp,
  };
}
