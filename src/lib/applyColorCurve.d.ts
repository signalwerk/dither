import type { Point } from "./BezierCurveEditor";

export function buildSplineLUT(points: Point[]): Uint8Array;

export function naturalCubicSplinePath(
  points: Point[],
  size: number,
  pad?: number,
): string;

export function applyColorCurve(pixels: number[], lut: Uint8Array): number[];
