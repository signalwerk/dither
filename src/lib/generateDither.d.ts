interface GenerateDitherOptions {
  width: number;
  height: number;
  seed: number;
}

declare function generateDither(options: GenerateDitherOptions): number[];

export default generateDither;
