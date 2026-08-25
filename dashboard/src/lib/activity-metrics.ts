type TimedActivity = {
  status: string;
  durationSeconds?: number | null;
  idleSeconds?: number | null;
  productivityCategory?: string | null;
};

export function activityMetrics(logs: TimedActivity[]) {
  let trackedSeconds = 0;
  let idleSeconds = 0;
  let productiveSeconds = 0;
  let neutralSeconds = 0;
  let unproductiveSeconds = 0;

  for (const log of logs) {
    const duration = Math.min(120, Math.max(1, log.durationSeconds ?? 60));
    const legacyIdle = log.status === 'IDLE' && log.idleSeconds == null ? duration : 0;
    const idle = Math.min(duration, Math.max(0, log.idleSeconds ?? legacyIdle));
    trackedSeconds += duration;
    idleSeconds += idle;
    const active = duration - idle;
    if (log.productivityCategory === 'PRODUCTIVE') productiveSeconds += active;
    else if (log.productivityCategory === 'UNPRODUCTIVE') unproductiveSeconds += active;
    else neutralSeconds += active;
  }

  const activeSeconds = Math.max(0, trackedSeconds - idleSeconds);
  const ratedSeconds = productiveSeconds + unproductiveSeconds;
  const productivity = ratedSeconds > 0
    ? Math.round((productiveSeconds / ratedSeconds) * 100)
    : 0;

  return { trackedSeconds, activeSeconds, idleSeconds, productiveSeconds, neutralSeconds, unproductiveSeconds, productivity };
}

export function formatDuration(totalSeconds: number) {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return hours > 0
    ? `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`
    : `${String(minutes).padStart(2, '0')}m ${String(remainder).padStart(2, '0')}s`;
}
