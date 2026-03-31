import { applyPaletteSync, utils } from "image-q";
import { img8BitToRGBA, scaleGrayscale } from "./imageUtils";

/**
 * Apply Jarvis dithering via image-q, mirroring the original script.js pipeline.
 *
 * @param {object} opts
 * @param {number[]} opts.pixels  - Flat grayscale array (values 0–255), width × height
 * @param {number}   opts.width
 * @param {number}   opts.height
 * @param {number}   [opts.scale=12] - Upscale factor applied before dithering
 * @returns {{ pixels: Uint8ClampedArray, width: number, height: number }}
 */
const applyDither = ({ pixels, width, height, scale = 12 }) => {
  const scaledW = width * scale;
  const scaledH = height * scale;

  // 1. Scale grayscale → RGBA Uint8Array (matches imgScaler(img8BitTo32Bit(...)) in script.js)
  const scaled8 = scaleGrayscale(pixels, width, height, scale);
  const scaledRGBA = img8BitToRGBA(Array.from(scaled8));

  // 2. Feed into image-q exactly like the original
  const pointContainer = utils.PointContainer.fromUint8Array(
    scaledRGBA,
    scaledW,
    scaledH,
  );

  const palette = new utils.Palette();
  palette.add(utils.Point.createByRGBA(0, 0, 0, 255));
  palette.add(utils.Point.createByRGBA(255, 255, 255, 255));

  const out = applyPaletteSync(pointContainer, palette, {
    colorDistanceFormula: "euclidean",
    imageQuantization: "jarvis",
  });

  return { pixels: out.toUint8Array(), width: scaledW, height: scaledH };
};

export default applyDither;
