import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./App.css";
import generateDither from "./lib/generateDither";
import { img8BitToRGBA, renderToCanvas } from "./lib/imageUtils";
import applyDither from "./lib/applyDither";
import { buildSplineLUT, applyColorCurve } from "./lib/applyColorCurve";
import CurveEditor, { type Point } from "./lib/BezierCurveEditor";
import { DEFAULT_CURVE_POINTS } from "./lib/curveDefaults";

const DEFAULT_CONFIG = {
  width: 20,
  height: 40,
  seed: 42,
  scale: 12,
};

type ConfigKey = keyof typeof DEFAULT_CONFIG;
type Config = typeof DEFAULT_CONFIG;

const parsePositiveInt = (value: string | null, fallback: number) => {
  if (value === null) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const normalizeCurveValue = (value: number) => (value > 1 ? value / 100 : value);

const formatCurveValue = (value: number) => Number((value * 100).toFixed(2)).toString();

const parseCurve = (value: string | null) => {
  if (!value) return DEFAULT_CURVE_POINTS;

  const points = value
    .split("--")
    .map((segment) => {
      const [rawX, rawY] = segment.split("-", 2)
      const x = Number.parseFloat(rawX);
      const y = Number.parseFloat(rawY);

      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return null;
      }

      return {
        x: Math.max(0, Math.min(1, normalizeCurveValue(x))),
        y: Math.max(0, Math.min(1, normalizeCurveValue(y))),
      };
    })
    .filter((point): point is Point => point !== null)
    .sort((a, b) => a.x - b.x);

  if (points.length < 2) return DEFAULT_CURVE_POINTS;

  for (let i = 1; i < points.length; i++) {
    if (points[i].x <= points[i - 1].x) {
      return DEFAULT_CURVE_POINTS;
    }
  }

  return points;
};

const readStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    config: {
      width: parsePositiveInt(params.get("width"), DEFAULT_CONFIG.width),
      height: parsePositiveInt(params.get("height"), DEFAULT_CONFIG.height),
      seed: parsePositiveInt(params.get("seed"), DEFAULT_CONFIG.seed),
      scale: parsePositiveInt(params.get("scale"), DEFAULT_CONFIG.scale),
    },
    curvePoints: parseCurve(params.get("curve")),
  };
};

const writeStateToUrl = (config: Config, curvePoints: Point[]) => {
  const params = new URLSearchParams(window.location.search);
  params.set("width", String(config.width));
  params.set("height", String(config.height));
  params.set("seed", String(config.seed));
  params.set("scale", String(config.scale));
  params.set(
    "curve",
    curvePoints.map(({ x, y }) => `${formatCurveValue(x)}-${formatCurveValue(y)}`).join("--"),
  );

  const search = params.toString();
  const nextUrl = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`;
  window.history.replaceState(null, "", nextUrl);
};

const sanitizeConfigValue = (key: ConfigKey, value: string) =>
  parsePositiveInt(value, DEFAULT_CONFIG[key]);

const createSeed = () => {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const [seed] = window.crypto.getRandomValues(new Uint32Array(1));
    return (seed % 2147483646) + 1;
  }

  return Math.floor(Math.random() * 2147483646) + 1;
};

function App() {
  const initialState = useMemo(readStateFromUrl, []);
  const [config, setConfig] = useState<Config>(initialState.config);
  const [curvePoints, setCurvePoints] = useState<Point[]>(initialState.curvePoints);
  // effectiveCurve is what the editor reports as the live preview (may exclude a pending-remove point)
  const [effectiveCurve, setEffectiveCurve] = useState<Point[]>(initialState.curvePoints);
  const handlePreview = useCallback((pts: Point[]) => setEffectiveCurve(pts), []);

  const canvasGrayRef = useRef<HTMLCanvasElement>(null);
  const canvasCurvedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitherRef = useRef<HTMLCanvasElement>(null);

  const pattern = useMemo(
    () =>
      generateDither({
        width: config.width,
        height: config.height,
        seed: config.seed,
      }),
    [config.height, config.seed, config.width],
  );

  useEffect(() => {
    writeStateToUrl(config, curvePoints);
  }, [config, curvePoints]);

  useEffect(() => {
    const handlePopState = () => {
      const nextState = readStateFromUrl();
      setConfig(nextState.config);
      setCurvePoints(nextState.curvePoints);
      setEffectiveCurve(nextState.curvePoints);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (pattern.length === 0) return;

    // 1. Raw grayscale
    if (canvasGrayRef.current) {
      renderToCanvas(canvasGrayRef.current, img8BitToRGBA(pattern), config.width, config.height);
    }

    // 2. Curve-adjusted grayscale (use effectiveCurve for live preview)
    const lut = buildSplineLUT(effectiveCurve);
    const curved = applyColorCurve(pattern, lut);

    if (canvasCurvedRef.current) {
      renderToCanvas(canvasCurvedRef.current, img8BitToRGBA(curved), config.width, config.height);
    }

    // 3. Dithered from the curve-adjusted pixels
    if (canvasDitherRef.current) {
      const { pixels, width, height } = applyDither({
        pixels: curved,
        width: config.width,
        height: config.height,
        scale: config.scale,
      });
      renderToCanvas(canvasDitherRef.current, pixels, width, height);
    }
  }, [pattern, effectiveCurve, config.width, config.height, config.scale]);

  const canvasStyle = {
    border: "1px solid #ccc",
    imageRendering: "pixelated" as const,
    width: `${config.width * 10}px`,
    height: `${config.height * 10}px`,
  };

  return (
    <>
      <h1>Scarf</h1>
      <p>Pattern Generator</p>

      <div style={{ marginBottom: "20px" }}>
        <div>
          {(
            [
              ["Width", "width"],
              ["Height", "height"],
              ["Seed", "seed"],
              ["Scale", "scale"],
            ] as [string, ConfigKey][]
          ).map(([label, key]) => (
            <label key={key}>
              {label}:
              <input
                type="number"
                value={config[key]}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    [key]: sanitizeConfigValue(key, e.target.value),
                  }))
                }
                style={{ marginLeft: "6px", marginRight: "20px", width: "60px" }}
              />
            </label>
          ))}
        </div>
        <button
          onClick={() =>
            setConfig((prev) => ({
              ...prev,
              seed: createSeed(),
            }))
          }
          style={{ marginTop: "10px" }}
        >
          Generate New Pattern
        </button>
      </div>

      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
        {/* Column 1 - Raw grayscale */}
        <div>
          <h3>Grayscale</h3>
          <canvas ref={canvasGrayRef} style={canvasStyle} />
        </div>

        {/* Column 2 - Bezier curve editor + curve-adjusted preview */}
        <div>
          <h3>Curve-adjusted</h3>
          <canvas ref={canvasCurvedRef} style={canvasStyle} />
          <div style={{ marginTop: "16px" }}>
            <h3>Colour Curve</h3>
            <CurveEditor points={curvePoints} onChange={setCurvePoints} onPreview={handlePreview} />
          </div>
        </div>

        {/* Column 3 - Dithered output */}
        <div>
          <h3>Dithered (B&amp;W)</h3>
          <canvas
            ref={canvasDitherRef}
            style={{ border: "1px solid #ccc", imageRendering: "pixelated" }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
