import { useRef, useCallback } from "react";

export interface Point {
  x: number;
  y: number;
}

export type CurvePoints = [Point, Point, Point, Point];

interface Props {
  points: CurvePoints;
  onChange: (points: CurvePoints) => void;
  size?: number;
}

function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}

// Initial linear curve equivalent to the original * 0.75 darkening factor:
// straight line from (0,0) → (1, 0.75)
export default function BezierCurveEditor({ points, onChange, size = 220 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<number | null>(null);

  // Convert normalised data coords to SVG pixel coords (Y is flipped)
  const toSvg = (p: Point) => [p.x * size, (1 - p.y) * size] as const;

  const [s0, s1, s2, s3] = points.map(toSvg);
  const pathD = [
    `M ${s0[0].toFixed(1)} ${s0[1].toFixed(1)}`,
    `C ${s1[0].toFixed(1)} ${s1[1].toFixed(1)},`,
    `${s2[0].toFixed(1)} ${s2[1].toFixed(1)},`,
    `${s3[0].toFixed(1)} ${s3[1].toFixed(1)}`,
  ].join(" ");

  const onPointerDown = useCallback(
    (e: React.PointerEvent<SVGCircleElement>, idx: number) => {
      // Capture on the SVG so onPointerMove fires even outside the circle
      svgRef.current!.setPointerCapture(e.pointerId);
      dragging.current = idx;
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (dragging.current === null) return;
      const rect = svgRef.current!.getBoundingClientRect();
      const nx = clamp((e.clientX - rect.left) / rect.width);
      const ny = clamp(1 - (e.clientY - rect.top) / rect.height);
      const idx = dragging.current;
      const next: CurvePoints = [points[0], points[1], points[2], points[3]];

      if (idx === 1) next[1] = { x: nx, y: ny };
      if (idx === 2) next[2] = { x: nx, y: ny };
      if (idx === 3) next[3] = { x: 1, y: ny }; // P3 only moves vertically

      onChange(next);
    },
    [points, onChange],
  );

  const gridValues = [0.25, 0.5, 0.75];

  return (
    <div style={{ userSelect: "none" }}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          display: "block",
          background: "#111",
          border: "1px solid #444",
          borderRadius: 4,
          cursor: "default",
        }}
        onPointerMove={onPointerMove}
        onPointerUp={() => { dragging.current = null; }}
      >
        {/* Grid lines */}
        {gridValues.map((v) => (
          <g key={v}>
            <line x1={v * size} y1={0} x2={v * size} y2={size} stroke="#222" strokeWidth={1} />
            <line x1={0} y1={v * size} x2={size} y2={v * size} stroke="#222" strokeWidth={1} />
          </g>
        ))}

        {/* Identity diagonal reference */}
        <line
          x1={0} y1={size} x2={size} y2={0}
          stroke="#333" strokeWidth={1} strokeDasharray="4 4"
        />

        {/* Control arm lines */}
        <line
          x1={s0[0]} y1={s0[1]} x2={s1[0]} y2={s1[1]}
          stroke="#444" strokeWidth={1}
        />
        <line
          x1={s3[0]} y1={s3[1]} x2={s2[0]} y2={s2[1]}
          stroke="#444" strokeWidth={1}
        />

        {/* The bezier curve itself */}
        <path d={pathD} fill="none" stroke="#fff" strokeWidth={1.5} />

        {/* P0 – fixed anchor (black in, black out) */}
        <circle cx={s0[0]} cy={s0[1]} r={3} fill="#666" />

        {/* P3 – top-right anchor, Y-draggable (controls output ceiling) */}
        <circle
          cx={s3[0]}
          cy={s3[1]}
          r={5}
          fill="#f80"
          stroke="#fff"
          strokeWidth={1.5}
          style={{ cursor: "ns-resize" }}
          onPointerDown={(e) => onPointerDown(e, 3)}
        />

        {/* P1 & P2 – free control handles */}
        {([1, 2] as const).map((idx) => {
          const [cx, cy] = idx === 1 ? s1 : s2;
          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={5}
              fill="#48f"
              stroke="#fff"
              strokeWidth={1.5}
              style={{ cursor: "move" }}
              onPointerDown={(e) => onPointerDown(e, idx)}
            />
          );
        })}

        {/* Axis labels */}
        <text x={2} y={size - 3} fontSize={9} fill="#555">0</text>
        <text x={size - 6} y={size - 3} fontSize={9} fill="#555">1</text>
        <text x={2} y={10} fontSize={9} fill="#555">1</text>
      </svg>
      <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
        <span style={{ color: "#48f" }}>●</span> control handles &nbsp;
        <span style={{ color: "#f80" }}>●</span> output ceiling
      </div>
    </div>
  );
}
