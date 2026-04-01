export const PREDEFINED_COLORS = [
  "#e4e4db",
  "#548ba3",
  "#213287",
  "#232121",
  "#c4a78b",
  "#d5b9de",
  "#ed8b2c",
  "#e68c8b",
  "#9e2517",
  "#c7be3b",
  "#2c6255",
  "#82847b",
  "#3a3b39",
  "#e64758",
  "#e1fe44",
  "#e75131",
];

export const DEFAULT_PALETTE = PREDEFINED_COLORS.slice(0, 4);

const HEX_COLOR = /^#?([0-9a-f]{6})$/i;

export const normalizeHexColor = (color) => {
  const match = color.trim().match(HEX_COLOR);

  if (!match) {
    return "#000000";
  }

  return `#${match[1].toLowerCase()}`;
};

export const normalizePalette = (palette) => {
  if (!Array.isArray(palette)) {
    return [...DEFAULT_PALETTE];
  }

  const nextPalette = palette.map(normalizeHexColor);
  return nextPalette.length >= 2 ? nextPalette : [...DEFAULT_PALETTE];
};

export const hexToRgb = (color) => {
  const normalized = normalizeHexColor(color).slice(1);

  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
};

const getDensity = (start, end, value) => {
  const diff = end - start;
  if (diff === 0) {
    return 1;
  }

  return (1 / diff) * (value - start);
};

export const colorSplit = (factor, colorCount) => {
  if (colorCount <= 1) {
    return [1];
  }

  const clampedFactor = Math.max(0, Math.min(1, factor));
  const segments = colorCount - 1;
  const rangePerColor = 1 / segments;

  return Array.from({ length: colorCount }, (_, colorIndex) => {
    const colorMax = rangePerColor * colorIndex;
    const colorEnd = colorMax + rangePerColor;
    const colorStart = colorMax - rangePerColor;

    if (clampedFactor < colorStart || clampedFactor > colorEnd) {
      return 0;
    }

    if (clampedFactor < colorMax) {
      return getDensity(colorStart, colorMax, clampedFactor) || 0;
    }

    return getDensity(colorEnd, colorMax, clampedFactor) || 0;
  });
};

export const mixChannelsWithPalette = (channels, palette) => {
  const normalizedPalette = normalizePalette(palette);

  const mixed = channels.reduce(
    (accumulator, channel, index) => {
      const [r, g, b] = hexToRgb(normalizedPalette[index] || "#000000");

      accumulator[0] += r * channel;
      accumulator[1] += g * channel;
      accumulator[2] += b * channel;

      return accumulator;
    },
    [0, 0, 0],
  );

  return mixed.map((value) => Math.round(value));
};

export const splitFactorToRgba = (factor, palette) => {
  const normalizedPalette = normalizePalette(palette);
  const channels = colorSplit(factor, normalizedPalette.length);
  const [r, g, b] = mixChannelsWithPalette(channels, normalizedPalette);

  return [r, g, b, 255];
};

export const mapGrayscaleToPalette = (pixels, palette) => {
  const normalizedPalette = normalizePalette(palette);
  const output = new Uint8ClampedArray(pixels.length * 4);

  for (let index = 0; index < pixels.length; index += 1) {
    const value = Math.max(0, Math.min(255, Math.round(pixels[index])));
    const [r, g, b, a] = splitFactorToRgba(value / 255, normalizedPalette);
    const offset = index * 4;

    output[offset] = r;
    output[offset + 1] = g;
    output[offset + 2] = b;
    output[offset + 3] = a;
  }

  return output;
};

export const generateGradientRgba = (width, height, palette) => {
  const normalizedPalette = normalizePalette(palette);
  const output = new Uint8ClampedArray(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const factor = width <= 1 ? 0 : x / (width - 1);
      const [r, g, b, a] = splitFactorToRgba(factor, normalizedPalette);

      output[offset] = r;
      output[offset + 1] = g;
      output[offset + 2] = b;
      output[offset + 3] = a;
    }
  }

  return output;
};
