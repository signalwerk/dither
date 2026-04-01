import { applyPaletteSync, utils } from "image-q";
import { scaleRgba } from "./imageUtils";
import { hexToRgb, normalizePalette } from "./paletteUtils";

/**
 * Apply palette dithering via image-q, mirroring the old multi-colour flow.
 *
 * @param {object} opts
 * @param {ArrayLike<number>} opts.pixels  - Flat RGBA array, width × height × 4
 * @param {number}   opts.width
 * @param {number}   opts.height
 * @param {number}   [opts.scale=12] - Upscale factor applied before dithering
 * @param {string[]} opts.palette
 * @param {string}   [opts.colorDistanceFormula="ciede2000"]
 * @param {string}   [opts.imageQuantization="riemersma"]
 * @returns {{ pixels: Uint8ClampedArray, width: number, height: number }}
 */
const applyDither = ({
  pixels,
  width,
  height,
  scale = 12,
  palette,
  colorDistanceFormula = "ciede2000",
  imageQuantization = "riemersma",
}) => {
  const scaledW = width * scale;
  const scaledH = height * scale;

  const normalizedPalette = normalizePalette(palette);
  const scaledRGBA = scaleRgba(pixels, width, height, scale);

  const pointContainer = utils.PointContainer.fromUint8Array(
    scaledRGBA,
    scaledW,
    scaledH,
  );

  const quantizedPalette = new utils.Palette();
  normalizedPalette.forEach((color) => {
    const [r, g, b] = hexToRgb(color);
    quantizedPalette.add(utils.Point.createByRGBA(r, g, b, 255));
  });

  const out = applyPaletteSync(pointContainer, quantizedPalette, {
    colorDistanceFormula,
    imageQuantization,
  });

  return { pixels: out.toUint8Array(), width: scaledW, height: scaledH };
};

export default applyDither;
