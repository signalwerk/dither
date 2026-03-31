const bezierEval = (p0, p1, p2, p3, t) => {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  return {
    x: mt2 * mt * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t2 * t * p3.x,
    y: mt2 * mt * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t2 * t * p3.y,
  };
};

/**
 * Build a 256-entry LUT from 4 bezier control points in normalised [0,1] space.
 * Assumes the curve is monotone in X (x goes 0→1 across the parameter range).
 */
export const buildBezierLUT = (p0, p1, p2, p3) => {
  const N = 4096;
  const xs = new Float32Array(N);
  const ys = new Float32Array(N);

  for (let i = 0; i < N; i++) {
    const pt = bezierEval(p0, p1, p2, p3, i / (N - 1));
    xs[i] = pt.x;
    ys[i] = pt.y;
  }

  const lut = new Uint8Array(256);
  for (let v = 0; v < 256; v++) {
    const x = v / 255;
    let lo = 0;
    let hi = N - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >>> 1;
      if (xs[mid] <= x) lo = mid;
      else hi = mid;
    }
    const dx = xs[hi] - xs[lo];
    const f = dx < 1e-10 ? 0 : (x - xs[lo]) / dx;
    lut[v] = Math.round(Math.max(0, Math.min(1, ys[lo] + f * (ys[hi] - ys[lo]))) * 255);
  }
  return lut;
};

/**
 * Apply a pre-built LUT to a flat grayscale array (values 0–255).
 */
export const applyColorCurve = (pixels, lut) =>
  pixels.map((v) => lut[Math.max(0, Math.min(255, Math.round(v)))]);
