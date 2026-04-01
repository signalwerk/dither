export function img8BitToRGBA(pixels: ArrayLike<number>): Uint8ClampedArray;

export function scaleGrayscale(
  pixels: ArrayLike<number>,
  width: number,
  height: number,
  scale: number,
): Float32Array;

export function renderToCanvas(
  canvas: HTMLCanvasElement,
  rgbaPixels: ArrayLike<number>,
  width: number,
  height: number,
): void;
