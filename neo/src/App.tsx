import { useState, useEffect, useRef } from "react";
import "./App.css";
import generateDither from "./lib/generateDither";
import { img8BitToRGBA, renderToCanvas } from "./lib/imageUtils";
import applyDither from "./lib/applyDither";

function App() {
  const [pattern, setPattern] = useState<number[]>([]);
  const [config, setConfig] = useState({
    width: 20,
    height: 40,
    seed: 42,
    scale: 12,
  });
  const canvasGrayRef = useRef<HTMLCanvasElement>(null);
  const canvasDitherRef = useRef<HTMLCanvasElement>(null);

  const generatePattern = () => {
    const newPattern = generateDither({
      width: config.width,
      height: config.height,
      seed: config.seed,
    });
    setPattern(newPattern);
  };

  useEffect(() => {
    setPattern(
      generateDither({ width: config.width, height: config.height, seed: config.seed })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pattern.length === 0) return;

    if (canvasGrayRef.current) {
      const rgba = img8BitToRGBA(pattern);
      renderToCanvas(canvasGrayRef.current, rgba, config.width, config.height);
    }

    if (canvasDitherRef.current) {
      const { pixels, width, height } = applyDither({
        pixels: pattern,
        width: config.width,
        height: config.height,
        scale: config.scale,
      });
      renderToCanvas(canvasDitherRef.current, pixels, width, height);
    }
  }, [pattern, config.width, config.height, config.scale]);

  return (
    <>
      <h1>Scarf</h1>
      <p>Pattern Generator</p>

      <div style={{ marginBottom: "20px" }}>
        <div>
          <label>
            Width:
            <input
              type="number"
              value={config.width}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, width: parseInt(e.target.value) || 20 }))
              }
              style={{ marginLeft: "10px", marginRight: "20px" }}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              value={config.height}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, height: parseInt(e.target.value) || 40 }))
              }
              style={{ marginLeft: "10px", marginRight: "20px" }}
            />
          </label>
          <label>
            Seed:
            <input
              type="number"
              value={config.seed}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, seed: parseInt(e.target.value) || 42 }))
              }
              style={{ marginLeft: "10px", marginRight: "20px" }}
            />
          </label>
          <label>
            Scale:
            <input
              type="number"
              value={config.scale}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, scale: parseInt(e.target.value) || 12 }))
              }
              style={{ marginLeft: "10px", marginRight: "20px" }}
            />
          </label>
        </div>
        <button onClick={generatePattern} style={{ marginTop: "10px" }}>
          Generate New Pattern
        </button>
      </div>

      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
        <div>
          <h3>Grayscale</h3>
          <canvas
            ref={canvasGrayRef}
            style={{
              border: "1px solid #ccc",
              imageRendering: "pixelated",
              width: `${config.width * 10}px`,
              height: `${config.height * 10}px`,
            }}
          />
          <p>10× scaled</p>
        </div>
        <div>
          <h3>Dithered (B&amp;W)</h3>
          <canvas
            ref={canvasDitherRef}
            style={{
              border: "1px solid #ccc",
              imageRendering: "pixelated",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
