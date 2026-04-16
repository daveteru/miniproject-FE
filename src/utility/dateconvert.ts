

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export function getCountdown(inputexpiry: string): Countdown {
  const diff = new Date(inputexpiry).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

export function formatCountdown(expiredAt: string): string {
  const { days, hours, minutes, expired } = getCountdown(expiredAt);
  if (expired) return "Expired";
  return `${days}d ${hours}h ${minutes}m`;
}

export function formatDate(date: string | Date): string {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatThousand(n: number): string {
  return n.toLocaleString("id-ID");
}

export function formatSnakeCase(str: string): string {
  return str.replaceAll("_", " ");
}