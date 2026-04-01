interface ApplyDitherOptions {
  pixels: number[];
  width: number;
  height: number;
  scale?: number;
}

interface ApplyDitherResult {
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
}

declare function applyDither(options: ApplyDitherOptions): ApplyDitherResult;

export default applyDither;
