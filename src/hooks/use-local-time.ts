import { useSyncExternalStore } from "react";

export type LocalTime = {
  hours: string;
  minutes: string;
  seconds: string;
};

function subscribeToSeconds(onTick: () => void): () => void {
  const interval = window.setInterval(onTick, 1000);
  return () => window.clearInterval(interval);
}

function formatTime(timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}

export function useLocalTime(timeZone: string): LocalTime | null {
  const time = useSyncExternalStore(
    subscribeToSeconds,
    () => formatTime(timeZone),
    () => null,
  );
  if (!time) return null;

  const [hours, minutes, seconds] = time.split(":");
  return { hours, minutes, seconds };
}
