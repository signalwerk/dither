import { useState, useEffect, useRef } from "react";
import "./App.css";
import generateDither from "./lib/generateDither";
import { img8BitToRGBA, renderToCanvas } from "./lib/imageUtils";
import applyDither from "./lib/applyDither";
import { buildBezierLUT, applyColorCurve } from "./lib/applyColorCurve";
import BezierCurveEditor, { type CurvePoints } from "./lib/BezierCurveEditor";
import { DEFAULT_CURVE_POINTS } from "./lib/curveDefaults";

function App() {
  const [pattern, setPattern] = useState<number[]>([]);
  const [config, setConfig] = useState({
    width: 20,
    height: 40,
    seed: 42,
    scale: 12,
  });
  const [curvePoints, setCurvePoints] = useState<CurvePoints>(DEFAULT_CURVE_POINTS);

  const canvasGrayRef = useRef<HTMLCanvasElement>(null);
  const canvasCurvedRef = useRef<HTMLCanvasElement>(null);
  const canvasDitherRef = useRef<HTMLCanvasElement>(null);

  const generatePattern = () => {
    setPattern(
      generateDither({ width: config.width, height: config.height, seed: config.seed }),
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { generatePattern(); }, []);

  useEffect(() => {
    if (pattern.length === 0) return;

    // 1. Raw grayscale
    if (canvasGrayRef.current) {
      renderToCanvas(canvasGrayRef.current, img8BitToRGBA(pattern), config.width, config.height);
    }

    // 2. Curve-adjusted grayscale
    const lut = buildBezierLUT(...curvePoints);
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
  }, [pattern, curvePoints, config.width, config.height, config.scale]);

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
              ["Width", "width", 20],
              ["Height", "height", 40],
              ["Seed", "seed", 42],
              ["Scale", "scale", 12],
            ] as [string, keyof typeof config, number][]
          ).map(([label, key, fallback]) => (
            <label key={key}>
              {label}:
              <input
                type="number"
                value={config[key]}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    [key]: parseInt(e.target.value) || fallback,
                  }))
                }
                style={{ marginLeft: "6px", marginRight: "20px", width: "60px" }}
              />
            </label>
          ))}
        </div>
        <button onClick={generatePattern} style={{ marginTop: "10px" }}>
          Generate New Pattern
        </button>
      </div>

      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
        {/* Column 1 — Raw grayscale */}
        <div>
          <h3>Grayscale</h3>
          <canvas ref={canvasGrayRef} style={canvasStyle} />
        </div>

        {/* Column 2 — Bezier curve editor + curve-adjusted preview */}
        <div>
          <h3>Colour Curve</h3>
          <BezierCurveEditor points={curvePoints} onChange={setCurvePoints} />
          <div style={{ marginTop: "16px" }}>
            <h3>Curve-adjusted</h3>
            <canvas ref={canvasCurvedRef} style={canvasStyle} />
          </div>
        </div>

        {/* Column 3 — Dithered output */}
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
