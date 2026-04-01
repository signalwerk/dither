export type PaletteColor = string;

export declare const PREDEFINED_COLORS: PaletteColor[];
export declare const DEFAULT_PALETTE: PaletteColor[];

export declare function normalizeHexColor(color: string): PaletteColor;

export declare function normalizePalette(
  palette: PaletteColor[],
): PaletteColor[];

export declare function hexToRgb(color: PaletteColor): [number, number, number];

export declare function colorSplit(
  factor: number,
  colorCount: number,
): number[];

export declare function mixChannelsWithPalette(
  channels: number[],
  palette: PaletteColor[],
): [number, number, number];

export declare function splitFactorToRgba(
  factor: number,
  palette: PaletteColor[],
): [number, number, number, number];

export declare function mapGrayscaleToPalette(
  pixels: ArrayLike<number>,
  palette: PaletteColor[],
): Uint8ClampedArray;

export declare function generateGradientRgba(
  width: number,
  height: number,
  palette: PaletteColor[],
): Uint8ClampedArray;
