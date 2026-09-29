interface Series {
  name: string;
  color: string;
  values: number[];
}

export function MiniLineChart({ series }: { series: Series[] }) {
  const W = 300;
  const H = 100;
  const max = Math.max(...series.flatMap((s) => s.values), 1);

  const toPoints = (values: number[]) =>
    values
      .map((v, i) => {
        const x = (i / Math.max(values.length - 1, 1)) * W;
        const y = H - (v / max) * (H - 8) - 4;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-28 w-full">
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2={W}
          y1={H * g}
          y2={H * g}
          stroke="currentColor"
          className="text-border"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {series.map((s) => (
        <polyline
          key={s.name}
          points={toPoints(s.values)}
          fill="none"
          stroke={s.color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}