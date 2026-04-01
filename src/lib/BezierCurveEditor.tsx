import { useRef, useCallback, useEffect, useState, useMemo } from "react";
import { naturalCubicSplinePath } from "./applyColorCurve";

export interface Point {
  x: number;
  y: number;
}

interface Props {
  points: Point[];
  onChange: (points: Point[]) => void;
  /** Called during drag with the effective points for live output preview.
   *  When not dragging, this equals `points`. */
  onPreview?: (points: Point[]) => void;
  size?: number;
}

function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}

const POINT_R = 6;
const PAD = POINT_R + 2;
const REMOVE_MARGIN = 40;

export default function CurveEditor({ points, onChange, onPreview, size = 220 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<number | null>(null);
  const selected = useRef<number | null>(null);
  const [pendingRemove, setPendingRemove] = useState<number | null>(null);

  const canRemove = (idx: number) =>
    idx > 0 && idx < points.length - 1 && points.length > 2;

  // Display/effective points: exclude the pending-remove point
  const displayPoints = useMemo(() => {
    if (pendingRemove !== null && canRemove(pendingRemove)) {
      return points.filter((_, i) => i !== pendingRemove);
    }
    return points;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, pendingRemove]);

  // Notify parent of effective points whenever they change
  useEffect(() => {
    onPreview?.(displayPoints);
  }, [displayPoints, onPreview]);

  // Convert normalised [0,1] → SVG px (Y flipped, with padding)
  const toSvg = (p: Point): [number, number] => [
    PAD + p.x * size,
    PAD + (1 - p.y) * size,
  ];

  const svgPts = displayPoints.map(toSvg);
  const pathD = naturalCubicSplinePath(displayPoints, size, PAD);

  // Flat-extension paths for endpoints dragged inward
  const first = displayPoints[0];
  const last = displayPoints[displayPoints.length - 1];

  const leftExt =
    first.x > 0.001
      ? `M ${PAD} ${PAD + (1 - first.y) * size} L ${PAD + first.x * size} ${PAD + (1 - first.y) * size}`
      : null;
  const rightExt =
    last.x < 0.999
      ? `M ${PAD + last.x * size} ${PAD + (1 - last.y) * size} L ${PAD + size} ${PAD + (1 - last.y) * size}`
      : null;

  // --- coordinate helpers ---

  const pointerToNorm = useCallback(
    (e: React.PointerEvent | PointerEvent | React.MouseEvent) => {
      const rect = svgRef.current!.getBoundingClientRect();
      const graphLeft = rect.left + (PAD / (size + PAD * 2)) * rect.width;
      const graphTop = rect.top + (PAD / (size + PAD * 2)) * rect.height;
      const graphW = (size / (size + PAD * 2)) * rect.width;
      const graphH = (size / (size + PAD * 2)) * rect.height;
      return {
        nx: (e.clientX - graphLeft) / graphW,
        ny: 1 - (e.clientY - graphTop) / graphH,
      };
    },
    [size],
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

  // --- pointer handlers ---

  const onPointDown = useCallback(
    (e: React.PointerEvent<SVGCircleElement>, idx: number) => {
      e.stopPropagation();
      svgRef.current!.setPointerCapture(e.pointerId);
      dragging.current = idx;
      selected.current = idx;
      setPendingRemove(null);
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (dragging.current === null) return;
      const idx = dragging.current;
      const { nx, ny } = pointerToNorm(e);

      // Interior point dragged outside → mark for removal preview
      if (idx > 0 && idx < points.length - 1 && points.length > 2 && isOutside(e)) {
        setPendingRemove(idx);
        return;
      }
      // Dragged back inside → clear removal preview
      if (pendingRemove !== null) {
        setPendingRemove(null);
      }

      // Normal drag — update the point position
      const next = points.map((p) => ({ ...p }));
      const isFirst = idx === 0;
      const isLast = idx === points.length - 1;

      if (isFirst) {
        const xMax = points.length > 1 ? points[1].x - 0.005 : 1;
        next[0] = { x: clamp(nx, 0, xMax), y: clamp(ny) };
      } else if (isLast) {
        const xMin = points.length > 1 ? points[idx - 1].x + 0.005 : 0;
        next[idx] = { x: clamp(nx, xMin, 1), y: clamp(ny) };
      } else {
        const xMin = next[idx - 1].x + 0.005;
        const xMax = next[idx + 1].x - 0.005;
        next[idx] = { x: clamp(nx, xMin, xMax), y: clamp(ny) };
      }
      onChange(next);
    },
    [points, onChange, pointerToNorm, isOutside, pendingRemove],
  );

  const onPointerUp = useCallback(() => {
    const idx = dragging.current;
    dragging.current = null;

    // Finalize removal: commit filtered points to parent
    if (idx !== null && pendingRemove === idx && canRemove(idx)) {
      const next = points.filter((_, i) => i !== idx);
      selected.current = null;
      setPendingRemove(null);
      onChange(next);
      return;
    }

    setPendingRemove(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, onChange, pendingRemove]);

  // Double-click → add a point
  const onDblClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const { nx, ny } = pointerToNorm(e);
      const cx = clamp(nx);
      const cy = clamp(ny);

      const insertIdx = points.findIndex((p) => p.x > cx);
      const next = [...points];
      if (insertIdx === -1) {
        next.push({ x: cx, y: cy });
      } else {
        next.splice(insertIdx, 0, { x: cx, y: cy });
      }
      selected.current = insertIdx === -1 ? next.length - 1 : insertIdx;
      onChange(next);
    },
    [points, onChange, pointerToNorm],
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
  const totalSize = size + PAD * 2;

  return (
    <div style={{ userSelect: "none" }}>
      <svg
        ref={svgRef}
        width={totalSize}
        height={totalSize}
        viewBox={`0 0 ${totalSize} ${totalSize}`}
        tabIndex={0}
        style={{
          display: "block",
          cursor: "crosshair",
          outline: "none",
        }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={onDblClick}
      >
        {/* Graph background */}
        <rect x={PAD} y={PAD} width={size} height={size} fill="#111" stroke="#444" strokeWidth={1} rx={2} />

        {/* Grid */}
        {gridValues.map((v) => (
          <g key={v}>
            <line x1={PAD + v * size} y1={PAD} x2={PAD + v * size} y2={PAD + size} stroke="#222" strokeWidth={1} />
            <line x1={PAD} y1={PAD + v * size} x2={PAD + size} y2={PAD + v * size} stroke="#222" strokeWidth={1} />
          </g>
        ))}

        {/* Identity diagonal */}
        <line
          x1={PAD} y1={PAD + size} x2={PAD + size} y2={PAD}
          stroke="#333" strokeWidth={1} strokeDasharray="4 4"
        />

        {/* Flat extensions for endpoints dragged inward */}
        {leftExt && (
          <path d={leftExt} fill="none" stroke="#fff" strokeWidth={1.5} strokeDasharray="3 3" />
        )}
        {rightExt && (
          <path d={rightExt} fill="none" stroke="#fff" strokeWidth={1.5} strokeDasharray="3 3" />
        )}

        {/* Spline curve */}
        <path d={pathD} fill="none" stroke="#fff" strokeWidth={1.5} />

        {/* Control points */}
        {svgPts.map(([cx, cy], idx) => {
          const isSel = selected.current === idx;
          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={POINT_R}
              fill={isSel ? "#f80" : "#48f"}
              stroke={isSel ? "#fff" : "#ccc"}
              strokeWidth={isSel ? 2 : 1}
              style={{ cursor: "move" }}
              onPointerDown={(e) => onPointDown(e, idx)}
            />
          );
        })}

        {/* Axis labels */}
        <text x={PAD + 2} y={PAD + size - 3} fontSize={9} fill="#555">0</text>
        <text x={PAD + size - 8} y={PAD + size - 3} fontSize={9} fill="#555">1</text>
        <text x={PAD + 2} y={PAD + 10} fontSize={9} fill="#555">1</text>
      </svg>
      <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
        Double-click to add · Drag outside to remove · Del to delete selected
      </div>
    </div>
  );
}
