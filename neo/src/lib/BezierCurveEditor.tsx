import { useRef, useCallback, useEffect } from "react";
import { naturalCubicSplinePath } from "./applyColorCurve";

export interface Point {
  x: number;
  y: number;
}

interface Props {
  points: Point[];
  onChange: (points: Point[]) => void;
  size?: number;
}

function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}

const POINT_R = 5;
const REMOVE_MARGIN = 40; // px outside the square to trigger removal

export default function CurveEditor({ points, onChange, size = 220 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<number | null>(null);
  const selected = useRef<number | null>(null);

  // Convert normalised [0,1] coords → SVG px (Y flipped)
  const toSvg = (p: Point): [number, number] => [p.x * size, (1 - p.y) * size];

  // Build the spline SVG path
  const svgPts = points.map(toSvg);
  const pathD = naturalCubicSplinePath(points, size);

  // --- pointer handlers ---

  const pointerToNorm = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      const rect = svgRef.current!.getBoundingClientRect();
      return {
        nx: (e.clientX - rect.left) / rect.width,
        ny: 1 - (e.clientY - rect.top) / rect.height,
      };
    },
    [],
  );

  const isOutside = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      const rect = svgRef.current!.getBoundingClientRect();
      return (
        e.clientX < rect.left - REMOVE_MARGIN ||
        e.clientX > rect.right + REMOVE_MARGIN ||
        e.clientY < rect.top - REMOVE_MARGIN ||
        e.clientY > rect.bottom + REMOVE_MARGIN
      );
    },
    [],
  );

  const onPointDown = useCallback(
    (e: React.PointerEvent<SVGCircleElement>, idx: number) => {
      e.stopPropagation();
      svgRef.current!.setPointerCapture(e.pointerId);
      dragging.current = idx;
      selected.current = idx;
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (dragging.current === null) return;
      const idx = dragging.current;
      const { nx, ny } = pointerToNorm(e);

      const next = points.map((p) => ({ ...p }));
      const isFirst = idx === 0;
      const isLast = idx === points.length - 1;

      // First and last points: X stays fixed at 0 / 1, Y is free
      if (isFirst) {
        next[0] = { x: 0, y: clamp(ny) };
      } else if (isLast) {
        next[idx] = { x: 1, y: clamp(ny) };
      } else {
        // Interior points: clamp X between neighbours
        const xMin = next[idx - 1].x + 0.005;
        const xMax = next[idx + 1].x - 0.005;
        next[idx] = { x: clamp(nx, xMin, xMax), y: clamp(ny) };
      }
      onChange(next);
    },
    [points, onChange, pointerToNorm],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const idx = dragging.current;
      dragging.current = null;

      // Remove if dragged outside, but keep at least 2 points, and never remove endpoints
      if (
        idx !== null &&
        idx > 0 &&
        idx < points.length - 1 &&
        points.length > 2 &&
        isOutside(e)
      ) {
        const next = points.filter((_, i) => i !== idx);
        selected.current = null;
        onChange(next);
      }
    },
    [points, onChange, isOutside],
  );

  // Double-click on background → add a point
  const onDblClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = svgRef.current!.getBoundingClientRect();
      const nx = clamp((e.clientX - rect.left) / rect.width);
      const ny = clamp(1 - (e.clientY - rect.top) / rect.height);

      // Insert sorted by x
      const insertIdx = points.findIndex((p) => p.x > nx);
      const next = [...points];
      if (insertIdx === -1) {
        next.push({ x: nx, y: ny }); // shouldn't happen but just in case
      } else {
        next.splice(insertIdx, 0, { x: nx, y: ny });
      }
      selected.current = insertIdx === -1 ? next.length - 1 : insertIdx;
      onChange(next);
    },
    [points, onChange],
  );

  // Keyboard: Delete / Backspace removes selected interior point
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = selected.current;
      if (idx === null || idx === 0 || idx === points.length - 1) return;
      if (points.length <= 2) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        const next = points.filter((_, i) => i !== idx);
        selected.current = null;
        onChange(next);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [points, onChange]);

  const gridValues = [0.25, 0.5, 0.75];

  return (
    <div style={{ userSelect: "none" }}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        tabIndex={0}
        style={{
          display: "block",
          background: "#111",
          border: "1px solid #444",
          borderRadius: 4,
          cursor: "crosshair",
          outline: "none",
        }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={onDblClick}
      >
        {/* Grid */}
        {gridValues.map((v) => (
          <g key={v}>
            <line x1={v * size} y1={0} x2={v * size} y2={size} stroke="#222" strokeWidth={1} />
            <line x1={0} y1={v * size} x2={size} y2={v * size} stroke="#222" strokeWidth={1} />
          </g>
        ))}

        {/* Identity diagonal */}
        <line
          x1={0} y1={size} x2={size} y2={0}
          stroke="#333" strokeWidth={1} strokeDasharray="4 4"
        />

        {/* Spline curve */}
        <path d={pathD} fill="none" stroke="#fff" strokeWidth={1.5} />

        {/* Control points */}
        {svgPts.map(([cx, cy], idx) => {
          const isEnd = idx === 0 || idx === points.length - 1;
          const isSel = selected.current === idx;
          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={POINT_R}
              fill={isSel ? "#f80" : isEnd ? "#48f" : "#48f"}
              stroke={isSel ? "#fff" : "#ccc"}
              strokeWidth={isSel ? 2 : 1}
              style={{ cursor: "move" }}
              onPointerDown={(e) => onPointDown(e, idx)}
            />
          );
        })}

        {/* Axis labels */}
        <text x={2} y={size - 3} fontSize={9} fill="#555">0</text>
        <text x={size - 8} y={size - 3} fontSize={9} fill="#555">1</text>
        <text x={2} y={10} fontSize={9} fill="#555">1</text>
      </svg>
      <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
        Double-click to add · Drag outside to remove · Del to delete selected
      </div>
    </div>
  );
}
