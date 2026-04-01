/**
 * Solve for natural cubic spline coefficients.
 * Given N sorted points, returns (N-1) sets of {a, b, c, d} such that
 *   S_i(x) = a_i + b_i*(x - x_i) + c_i*(x - x_i)^2 + d_i*(x - x_i)^3
 */
const computeSpline = (pts) => {
  const n = pts.length - 1;
  if (n < 1) return [];

  const h = new Float64Array(n);
  const alpha = new Float64Array(n);
  for (let i = 0; i < n; i++) h[i] = pts[i + 1].x - pts[i].x;
  for (let i = 1; i < n; i++) {
    alpha[i] =
      (3 / h[i]) * (pts[i + 1].y - pts[i].y) -
      (3 / h[i - 1]) * (pts[i].y - pts[i - 1].y);
  }

  const l = new Float64Array(n + 1);
  const mu = new Float64Array(n + 1);
  const z = new Float64Array(n + 1);
  l[0] = 1;

  for (let i = 1; i < n; i++) {
    l[i] = 2 * (pts[i + 1].x - pts[i - 1].x) - h[i - 1] * mu[i - 1];
    mu[i] = h[i] / l[i];
    z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
  }

  l[n] = 1;
  const c = new Float64Array(n + 1);
  const b = new Float64Array(n);
  const d = new Float64Array(n);

  for (let j = n - 1; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1];
    b[j] =
      (pts[j + 1].y - pts[j].y) / h[j] - (h[j] * (c[j + 1] + 2 * c[j])) / 3;
    d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
  }

  const segs = [];
  for (let i = 0; i < n; i++) {
    segs.push({ a: pts[i].y, b: b[i], c: c[i], d: d[i], x0: pts[i].x });
  }
  return segs;
};

const evalSpline = (segs, pts, x) => {
  if (segs.length === 0) return pts.length ? pts[0].y : 0;
  // Find the segment
  let i = segs.length - 1;
  for (let j = 0; j < segs.length; j++) {
    if (x < pts[j + 1].x) {
      i = j;
      break;
    }
  }
  const s = segs[i];
  const dx = x - s.x0;
  return s.a + s.b * dx + s.c * dx * dx + s.d * dx * dx * dx;
};

/**
 * Build a 256-entry LUT from an array of {x,y} points using natural cubic spline.
 * If the first point's x > 0 or last point's x < 1, the value is held flat to the edge.
 */
export const buildSplineLUT = (points) => {
  const sorted = [...points].sort((a, b) => a.x - b.x);
  const segs = computeSpline(sorted);
  const lut = new Uint8Array(256);

  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  for (let v = 0; v < 256; v++) {
    const x = v / 255;
    let y;
    if (x <= first.x) {
      y = first.y; // flat extension on the left
    } else if (x >= last.x) {
      y = last.y; // flat extension on the right
    } else {
      y = evalSpline(segs, sorted, x);
    }
    lut[v] = Math.round(Math.max(0, Math.min(1, y)) * 255);
  }
  return lut;
};

/**
 * Build an SVG path string for displaying the spline curve.
 * Points are in normalised [0,1] coords; output is in SVG pixel coords
 * with Y flipped (0=top). `pad` offsets everything so edge points aren't clipped.
 * Only draws between the first and last point's x (flat extensions are separate).
 */
export const naturalCubicSplinePath = (points, size, pad = 8) => {
  const sorted = [...points].sort((a, b) => a.x - b.x);
  if (sorted.length < 2) return "";

  const segs = computeSpline(sorted);
  const x0 = sorted[0].x;
  const x1 = sorted[sorted.length - 1].x;
  const steps = Math.max(200, size * 2);
  const parts = [];

  for (let i = 0; i <= steps; i++) {
    const x = x0 + (x1 - x0) * (i / steps);
    const y = evalSpline(segs, sorted, x);
    const sx = (pad + x * size).toFixed(1);
    const sy = (pad + (1 - Math.max(0, Math.min(1, y))) * size).toFixed(1);
    parts.push(i === 0 ? `M ${sx} ${sy}` : `L ${sx} ${sy}`);
  }
  return parts.join(" ");
};

/**
 * Apply a pre-built LUT to a flat grayscale array (values 0–255).
 */
export const applyColorCurve = (pixels, lut) =>
  pixels.map((v) => lut[Math.max(0, Math.min(255, Math.round(v)))]);
