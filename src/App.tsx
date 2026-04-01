import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useDeferredValue,
  type CSSProperties,
} from "react";
import "./App.css";
import generateDither from "./lib/generateDither";
import { img8BitToRGBA, renderToCanvas } from "./lib/imageUtils";
import applyDither from "./lib/applyDither";
import type {
  ColorDistanceFormula,
  ImageQuantization,
} from "./lib/applyDither";
import { buildSplineLUT, applyColorCurve } from "./lib/applyColorCurve";
import CurveEditor, { type Point } from "./lib/BezierCurveEditor";
import { DEFAULT_CURVE_POINTS } from "./lib/curveDefaults";
import PaletteEditor from "./PaletteEditor";
import {
  DEFAULT_PALETTE,
  generateGradientRgba,
  mapGrayscaleToPalette,
  normalizeHexColor,
  normalizePalette,
} from "./lib/paletteUtils";

const DEFAULT_CONFIG = {
  width: 20,
  height: 40,
  seed: 42,
  scale: 12,
};

const DEFAULT_DITHER_OPTIONS = {
  colorDistanceFormula: "ciede2000" as ColorDistanceFormula,
  imageQuantization: "jarvis" as ImageQuantization,
};

const GRADIENT_WIDTH = 320;
const GRADIENT_HEIGHT = 48;

const COLOR_DISTANCE_OPTIONS = [
  { value: "cie94-textiles", label: "CIE94 Textiles" },
  { value: "cie94-graphic-arts", label: "CIE94 Graphic Arts" },
  { value: "ciede2000", label: "CIEDE2000" },
  { value: "color-metric", label: "Color Metric" },
  { value: "euclidean", label: "Euclidean" },
  { value: "euclidean-bt709-noalpha", label: "Euclidean BT709 No Alpha" },
  { value: "euclidean-bt709", label: "Euclidean BT709" },
  { value: "manhattan", label: "Manhattan" },
  { value: "manhattan-bt709", label: "Manhattan BT709" },
  { value: "manhattan-nommyde", label: "Manhattan Nommyde" },
  { value: "pngquant", label: "PNGQuant" },
] as const satisfies ReadonlyArray<{
  value: ColorDistanceFormula;
  label: string;
}>;

const IMAGE_QUANTIZATION_OPTIONS = [
  { value: "nearest", label: "Nearest" },
  { value: "riemersma", label: "Riemersma" },
  { value: "floyd-steinberg", label: "Floyd-Steinberg" },
  { value: "false-floyd-steinberg", label: "False Floyd-Steinberg" },
  { value: "stucki", label: "Stucki" },
  { value: "atkinson", label: "Atkinson" },
  { value: "jarvis", label: "Jarvis" },
  { value: "burkes", label: "Burkes" },
  { value: "sierra", label: "Sierra" },
  { value: "two-sierra", label: "Two-Sierra" },
  { value: "sierra-lite", label: "Sierra Lite" },
] as const satisfies ReadonlyArray<{
  value: ImageQuantization;
  label: string;
}>;

type ConfigKey = keyof typeof DEFAULT_CONFIG;
type Config = typeof DEFAULT_CONFIG;
type DitherOptions = typeof DEFAULT_DITHER_OPTIONS;

const parsePositiveInt = (value: string | null, fallback: number) => {
  if (value === null) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const parseOption = <T extends string>(
  value: string | null,
  options: readonly { value: T }[],
  fallback: T,
) => {
  if (value === null) {
    return fallback;
  }

  return options.some((option) => option.value === value) ? value as T : fallback;
};

const normalizeCurveValue = (value: number) =>
  value > 1 ? value / 100 : value;

const formatCurveValue = (value: number) =>
  Number((value * 100).toFixed(2)).toString();

const arePointsEqual = (left: Point[], right: Point[]) => {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    if (left[index].x !== right[index].x || left[index].y !== right[index].y) {
      return false;
    }
  }

  return true;
};

const parseCurve = (value: string | null) => {
  if (!value) return DEFAULT_CURVE_POINTS;

  const points = value
    .split("--")
    .map((segment) => {
      const [rawX, rawY] = segment.split("-", 2);
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

const parsePalette = (value: string | null) => {
  if (!value) return DEFAULT_PALETTE;

  return normalizePalette(
    value
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean)
      .map(normalizeHexColor),
  );
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
    ditherOptions: {
      colorDistanceFormula: parseOption(
        params.get("colorDistanceFormula"),
        COLOR_DISTANCE_OPTIONS,
        DEFAULT_DITHER_OPTIONS.colorDistanceFormula,
      ),
      imageQuantization: parseOption(
        params.get("imageQuantization"),
        IMAGE_QUANTIZATION_OPTIONS,
        DEFAULT_DITHER_OPTIONS.imageQuantization,
      ),
    },
    curvePoints: parseCurve(params.get("curve")),
    palette: parsePalette(params.get("palette")),
  };
};

const writeStateToUrl = (
  config: Config,
  ditherOptions: DitherOptions,
  curvePoints: Point[],
  palette: string[],
) => {
  const params = new URLSearchParams(window.location.search);
  params.set("width", String(config.width));
  params.set("height", String(config.height));
  params.set("seed", String(config.seed));
  params.set("scale", String(config.scale));
  params.set("colorDistanceFormula", ditherOptions.colorDistanceFormula);
  params.set("imageQuantization", ditherOptions.imageQuantization);
  params.set(
    "curve",
    curvePoints
      .map(({ x, y }) => `${formatCurveValue(x)}-${formatCurveValue(y)}`)
      .join("--"),
  );
  params.set("palette", normalizePalette(palette).join(","));

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

const downloadCanvasAsPng = (
  canvas: HTMLCanvasElement | null,
  filename: string,
) => {
  if (!canvas) return;

  const triggerDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  if (typeof canvas.toBlob === "function") {
    canvas.toBlob((blob) => {
      if (!blob) {
        triggerDownload(canvas.toDataURL("image/png"));
        return;
      }

      const url = URL.createObjectURL(blob);
      triggerDownload(url);
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    }, "image/png");
    return;
  }

  triggerDownload(canvas.toDataURL("image/png"));
};

function App() {
  const initialState = useMemo(readStateFromUrl, []);
  const [config, setConfig] = useState<Config>(initialState.config);
  const [ditherOptions, setDitherOptions] = useState<DitherOptions>(
    initialState.ditherOptions,
  );
  const [palette, setPalette] = useState<string[]>(
    normalizePalette(initialState.palette),
  );
  const [curvePoints, setCurvePoints] = useState<Point[]>(
    initialState.curvePoints,
  );
  const [effectiveCurve, setEffectiveCurve] = useState<Point[]>(
    initialState.curvePoints,
  );

  const handlePreview = useCallback((points: Point[]) => {
    setEffectiveCurve((previous) =>
      arePointsEqual(previous, points) ? previous : points,
    );
  }, []);

  const gradientCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasGrayRef = useRef<HTMLCanvasElement>(null);
  const canvasCurvedRef = useRef<HTMLCanvasElement>(null);
  const canvasSplitRef = useRef<HTMLCanvasElement>(null);
  const canvasDitherRef = useRef<HTMLCanvasElement>(null);

  const normalizedPalette = useMemo(() => normalizePalette(palette), [palette]);
  const deferredCurve = useDeferredValue(effectiveCurve);

  const pattern = useMemo(
    () =>
      generateDither({
        width: config.width,
        height: config.height,
        seed: config.seed,
      }),
    [config.height, config.seed, config.width],
  );

  const curveLut = useMemo(
    () => buildSplineLUT(deferredCurve),
    [deferredCurve],
  );
  const curvedPattern = useMemo(
    () => applyColorCurve(pattern, curveLut),
    [pattern, curveLut],
  );
  const paletteMappedPattern = useMemo(
    () => mapGrayscaleToPalette(curvedPattern, normalizedPalette),
    [curvedPattern, normalizedPalette],
  );
  const gradientPreview = useMemo(
    () => generateGradientRgba(GRADIENT_WIDTH, GRADIENT_HEIGHT, normalizedPalette),
    [normalizedPalette],
  );
  const ditheredPreview = useMemo(
    () =>
      applyDither({
        pixels: paletteMappedPattern,
        width: config.width,
        height: config.height,
        scale: config.scale,
        palette: normalizedPalette,
        colorDistanceFormula: ditherOptions.colorDistanceFormula,
        imageQuantization: ditherOptions.imageQuantization,
      }),
    [
      paletteMappedPattern,
      config.width,
      config.height,
      config.scale,
      normalizedPalette,
      ditherOptions.colorDistanceFormula,
      ditherOptions.imageQuantization,
    ],
  );

  useEffect(() => {
    writeStateToUrl(config, ditherOptions, curvePoints, normalizedPalette);
  }, [config, ditherOptions, curvePoints, normalizedPalette]);

  useEffect(() => {
    const handlePopState = () => {
      const nextState = readStateFromUrl();
      setConfig(nextState.config);
      setDitherOptions(nextState.ditherOptions);
      setPalette(normalizePalette(nextState.palette));
      setCurvePoints(nextState.curvePoints);
      setEffectiveCurve(nextState.curvePoints);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (gradientCanvasRef.current) {
      renderToCanvas(
        gradientCanvasRef.current,
        gradientPreview,
        GRADIENT_WIDTH,
        GRADIENT_HEIGHT,
      );
    }
  }, [gradientPreview]);

  useEffect(() => {
    if (pattern.length === 0) return;

    if (canvasGrayRef.current) {
      renderToCanvas(
        canvasGrayRef.current,
        img8BitToRGBA(pattern),
        config.width,
        config.height,
      );
    }

    if (canvasCurvedRef.current) {
      renderToCanvas(
        canvasCurvedRef.current,
        img8BitToRGBA(curvedPattern),
        config.width,
        config.height,
      );
    }

    if (canvasSplitRef.current) {
      renderToCanvas(
        canvasSplitRef.current,
        paletteMappedPattern,
        config.width,
        config.height,
      );
    }

    if (canvasDitherRef.current) {
      renderToCanvas(
        canvasDitherRef.current,
        ditheredPreview.pixels,
        ditheredPreview.width,
        ditheredPreview.height,
      );
    }
  }, [
    pattern,
    curvedPattern,
    paletteMappedPattern,
    ditheredPreview,
    config.width,
    config.height,
  ]);

  const previewStyle = useMemo(
    () =>
      ({
        width: `${config.width * 10}px`,
        maxWidth: "100%",
        height: "auto",
      }) satisfies CSSProperties,
    [config.width],
  );

  const ditherStyle = useMemo(
    () =>
      ({
        width: `${ditheredPreview.width}px`,
        maxWidth: "100%",
        height: "auto",
      }) satisfies CSSProperties,
    [ditheredPreview.width],
  );

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="hero__eyebrow">Pattern Generator</p>
        <h1>Palette-based dither experiments</h1>
        <p className="hero__copy">
          Generate the grayscale source pattern, shape it with the tone curve,
          then map it through an ordered multi-colour palette before dithering.
        </p>
      </header>

      <section className="panel">
        <div className="panel__header">
          <h2>Pattern Settings</h2>
          <p>Adjust the base pattern dimensions, seed, and dither upscaling.</p>
        </div>

        <div className="control-grid">
          {(
            [
              ["Width", "width"],
              ["Height", "height"],
              ["Seed", "seed"],
              ["Upscale before dither", "scale"],
            ] as [string, ConfigKey][]
          ).map(([label, key]) => (
            <label className="field" key={key}>
              <span>{label}</span>
              <input
                type="number"
                value={config[key]}
                onChange={(event) =>
                  setConfig((previous) => ({
                    ...previous,
                    [key]: sanitizeConfigValue(key, event.target.value),
                  }))
                }
              />
            </label>
          ))}
        </div>

        <div className="control-grid control-grid--secondary">
          <label className="field">
            <span>Color distance formula</span>
            <select
              value={ditherOptions.colorDistanceFormula}
              onChange={(event) =>
                setDitherOptions((previous) => ({
                  ...previous,
                  colorDistanceFormula: parseOption(
                    event.target.value,
                    COLOR_DISTANCE_OPTIONS,
                    DEFAULT_DITHER_OPTIONS.colorDistanceFormula,
                  ),
                }))
              }
            >
              {COLOR_DISTANCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Image quantization</span>
            <select
              value={ditherOptions.imageQuantization}
              onChange={(event) =>
                setDitherOptions((previous) => ({
                  ...previous,
                  imageQuantization: parseOption(
                    event.target.value,
                    IMAGE_QUANTIZATION_OPTIONS,
                    DEFAULT_DITHER_OPTIONS.imageQuantization,
                  ),
                }))
              }
            >
              {IMAGE_QUANTIZATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="actions-row">
          <button
            type="button"
            onClick={() =>
              setConfig((previous) => ({
                ...previous,
                seed: createSeed(),
              }))
            }
          >
            Generate new pattern
          </button>
        </div>
      </section>

      <section className="palette-layout">
        <div className="palette-layout__stack">
          <section className="panel">
            <div className="panel__header">
              <h2>Colour Curve</h2>
              <p>
                The live curve preview continues to drive the
                grayscale-to-palette mapping and the final dither.
              </p>
            </div>

            <CurveEditor
              points={curvePoints}
              onChange={setCurvePoints}
              onPreview={handlePreview}
            />
          </section>

          <section className="panel">
            <div className="panel__header">
              <h2>Gradient Preview</h2>
              <p>
                This visual shows the exact ordered split that maps grayscale
                values into your current palette.
              </p>
            </div>

            <canvas
              ref={gradientCanvasRef}
              className="gradient-canvas"
              style={{ width: "100%", height: "auto" }}
            />

            <div className="gradient-scale">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>

            <div className="gradient-order">
              {normalizedPalette.map((color, index) => (
                <div className="gradient-order__swatch" key={`${color}-${index}`}>
                  <span
                    className="gradient-order__chip"
                    style={{ backgroundColor: color }}
                  />
                  <code>{color}</code>
                </div>
              ))}
            </div>
          </section>
        </div>

        <PaletteEditor
          palette={normalizedPalette}
          onChange={(nextPalette) => setPalette(normalizePalette(nextPalette))}
        />
      </section>

      <section className="preview-grid">
        <article className="panel preview-card">
          <div className="panel__header">
            <h2>Grayscale</h2>
            <p>The generated base texture before any tone adjustment.</p>
          </div>
          <canvas ref={canvasGrayRef} className="preview-canvas" style={previewStyle} />
          <div className="actions-row">
            <button
              type="button"
              className="button button--secondary"
              onClick={() =>
                downloadCanvasAsPng(canvasGrayRef.current, "grayscale.png")
              }
            >
              Download PNG
            </button>
          </div>
        </article>

        <article className="panel preview-card">
          <div className="panel__header">
            <h2>Curve-adjusted</h2>
            <p>The grayscale source after the tone curve has been applied.</p>
          </div>
          <canvas
            ref={canvasCurvedRef}
            className="preview-canvas"
            style={previewStyle}
          />
          <div className="actions-row">
            <button
              type="button"
              className="button button--secondary"
              onClick={() =>
                downloadCanvasAsPng(
                  canvasCurvedRef.current,
                  "curve-adjusted.png",
                )
              }
            >
              Download PNG
            </button>
          </div>
        </article>

        <article className="panel preview-card">
          <div className="panel__header">
            <h2>Palette mapped</h2>
            <p>The curve-adjusted values remapped through the palette split.</p>
          </div>
          <canvas
            ref={canvasSplitRef}
            className="preview-canvas"
            style={previewStyle}
          />
          <div className="actions-row">
            <button
              type="button"
              className="button button--secondary"
              onClick={() =>
                downloadCanvasAsPng(canvasSplitRef.current, "palette-mapped.png")
              }
            >
              Download PNG
            </button>
          </div>
        </article>

        <article className="panel preview-card">
          <div className="panel__header">
            <h2>Dithered</h2>
            <p>The scaled colour preview quantized back onto the palette.</p>
          </div>
          <canvas
            ref={canvasDitherRef}
            className="preview-canvas"
            style={ditherStyle}
          />
          <div className="actions-row">
            <button
              type="button"
              className="button button--secondary"
              onClick={() =>
                downloadCanvasAsPng(canvasDitherRef.current, "dithered.png")
              }
            >
              Download PNG
            </button>
          </div>
        </article>
      </section>

    </main>
  );
}

export default App;
