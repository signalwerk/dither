import type { Point } from "./BezierCurveEditor";

// Linear curve equivalent to the original * 0.75 darkening factor:
// straight line from (0, 0) → (1, 0.75)
export const DEFAULT_CURVE_POINTS: Point[] = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
];
