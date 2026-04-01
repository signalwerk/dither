interface ApplyDitherOptions {
  pixels: ArrayLike<number>;
  width: number;
  height: number;
  scale?: number;
  palette: string[];
}

interface ApplyDitherResult {
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
}

declare function applyDither(options: ApplyDitherOptions): ApplyDitherResult;

export default applyDither;
