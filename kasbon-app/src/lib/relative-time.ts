const relativeTimeFormatter = new Intl.RelativeTimeFormat("id-ID", {
  numeric: "auto",
});

const divisions: Array<{
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
}> = [
  {
    amount: 60,
    unit: "second",
  },
  {
    amount: 60,
    unit: "minute",
  },
  {
    amount: 24,
    unit: "hour",
  },
  {
    amount: 7,
    unit: "day",
  },
  {
    amount: 4.34524,
    unit: "week",
  },
  {
    amount: 12,
    unit: "month",
  },
  {
    amount: Number.POSITIVE_INFINITY,
    unit: "year",
  },
];

export function formatRelativeTime(
  value: string | Date,
  now: Date = new Date(),
): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  let duration = (date.getTime() - now.getTime()) / 1000;

  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return relativeTimeFormatter.format(Math.round(duration), division.unit);
    }

    duration /= division.amount;
  }

  return "-";
}
