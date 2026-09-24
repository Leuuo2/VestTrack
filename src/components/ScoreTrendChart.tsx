type TrendPoint = {
  label: string;
  value: number;
};

function ScoreTrendChart({ points }: { points: TrendPoint[] }) {
  if (points.length < 2) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 px-4 py-10 text-center ring-1 ring-border/50">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">📈</div>
        <p className="mx-auto mt-3 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
          Registre pelo menos 2 simulados para ver sua evolução com gráfico premium.
        </p>
      </div>
    );
  }

  const W = 360;
  const H = 200;
  const PX = 36;
  const PT = 24;
  const PB = 36;
  const innerW = W - PX * 2;
  const innerH = H - PT - PB;

  const x = (i: number) => PX + (i / (points.length - 1)) * innerW;
  const y = (v: number) => PT + (1 - v / 100) * innerH;

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${x(points.length - 1).toFixed(1)} ${(PT + innerH).toFixed(1)} L ${x(0).toFixed(1)} ${(PT + innerH).toFixed(1)} Z`;

  const max = Math.max(...points.map(p => p.value));
  const min = Math.min(...points.map(p => p.value));
  const avg = Math.round(points.reduce((s, p) => s + p.value, 0) / points.length);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-[11px]">
        <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-medium text-violet-600 dark:text-violet-400 ring-1 ring-violet-500/20">Média {avg}%</span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">Pico {max}%</span>
        <span className="text-muted-foreground">Vale {min}%</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Evolução das médias">
        <defs>
          <linearGradient id="trend-fill-v2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.28" />
            <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trend-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={PX} x2={W - PX} y1={y(v)} y2={y(v)} stroke="hsl(var(--border))" strokeOpacity="0.6" strokeWidth="1" strokeDasharray={v % 50 === 0 ? "0" : "3 4"} />
            <text x={PX - 8} y={y(v) + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground font-medium">{v}</text>
          </g>
        ))}

        <path d={area} fill="url(#trend-fill-v2)" />
        <path d={line} fill="none" stroke="url(#trend-stroke)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />

        {points.map((p, i) => {
          const isMax = p.value === max;
          const isMin = p.value === min;
          return (
            <g key={i}>
              <circle cx={x(i)} cy={y(p.value)} r={isMax || isMin ? "6" : "4.5"} fill="white" stroke={isMax ? "#10b981" : isMin ? "#f59e0b" : "#8b5cf6"} strokeWidth="2.5" className="drop-shadow-sm" />
              <circle cx={x(i)} cy={y(p.value)} r="2" fill={isMax ? "#10b981" : isMin ? "#f59e0b" : "#8b5cf6"} />
              <text x={x(i)} y={y(p.value) - 14} textAnchor="middle" fontSize="11" fontWeight="700" className="fill-foreground">{p.value}%</text>
              <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="9.5" fontWeight={i === points.length - 1 ? "600" : "400"} className={i === points.length - 1 ? "fill-foreground" : "fill-muted-foreground"}>{p.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default ScoreTrendChart;
