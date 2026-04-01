export type ColorDistanceFormula =
  | "cie94-textiles"
  | "cie94-graphic-arts"
  | "ciede2000"
  | "color-metric"
  | "euclidean"
  | "euclidean-bt709-noalpha"
  | "euclidean-bt709"
  | "manhattan"
  | "manhattan-bt709"
  | "manhattan-nommyde"
  | "pngquant";

export type ImageQuantization =
  | "nearest"
  | "riemersma"
  | "floyd-steinberg"
  | "false-floyd-steinberg"
  | "stucki"
  | "atkinson"
  | "jarvis"
  | "burkes"
  | "sierra"
  | "two-sierra"
  | "sierra-lite";

interface ApplyDitherOptions {
  pixels: ArrayLike<number>;
  width: number;
  height: number;
  scale?: number;
  palette: string[];
  colorDistanceFormula?: ColorDistanceFormula;
  imageQuantization?: ImageQuantization;
}

interface ApplyDitherResult {
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
}

declare function applyDither(options: ApplyDitherOptions): ApplyDitherResult;

export default applyDither;
