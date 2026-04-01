/**
 * Convert a flat grayscale array (values 0–255) to a Uint8ClampedArray of RGBA pixels.
 */
export const img8BitToRGBA = (pixels) => {
  const result = new Uint8ClampedArray(pixels.length * 4);
  for (let i = 0; i < pixels.length; i++) {
    const v = Math.floor(Math.max(0, Math.min(255, pixels[i])));
    result[i * 4] = v;
    result[i * 4 + 1] = v;
    result[i * 4 + 2] = v;
    result[i * 4 + 3] = 255;
  }
  return result;
};

/**
 * Scale a flat grayscale array (values 0–255) by an integer factor.
 * Returns a Float32Array of size (width * scale) * (height * scale).
 */
export const scaleGrayscale = (pixels, width, height, scale) => {
  const newWidth = width * scale;
  const newHeight = height * scale;
  const result = new Float32Array(newWidth * newHeight);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const val = pixels[y * width + x];
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          result[(y * scale + sy) * newWidth + (x * scale + sx)] = val;
        }
      }
    }
  }

  return result;
};

/**
 * Render a Uint8ClampedArray of RGBA pixels onto a canvas.
 * Also resizes the canvas to match width × height.
 */
export const renderToCanvas = (canvas, rgbaPixels, width, height) => {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const clamped =
    rgbaPixels instanceof Uint8ClampedArray
      ? rgbaPixels
      : new Uint8ClampedArray(rgbaPixels);
  const imageData = new ImageData(clamped, width, height);
  ctx.putImageData(imageData, 0, 0);
};
