import type { CurvePoints } from "./BezierCurveEditor";

// Linear bezier equivalent to the original * 0.75 darkening factor:
// straight line from (0, 0) → (1, 0.75)
export const DEFAULT_CURVE_POINTS: CurvePoints = [
  { x: 0,     y: 0    },
  { x: 1 / 3, y: 0.25 },
  { x: 2 / 3, y: 0.5  },
  { x: 1,     y: 0.75 },
];
