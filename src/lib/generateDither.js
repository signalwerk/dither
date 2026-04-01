const RANDOM_MODULUS = 4294967296;
const RANDOM_MULTIPLIER = 1664525;
const RANDOM_INCREMENT = 1013904223;

let randomState = 42;

const setSeed = (seed) => {
  randomState = (seed == null ? Math.random() * RANDOM_MODULUS : seed) >>> 0;
};

const lcg = () => {
  randomState =
    (RANDOM_MULTIPLIER * randomState + RANDOM_INCREMENT) % RANDOM_MODULUS;
  return randomState / RANDOM_MODULUS;
};

const random = (min, max) => {
  const rand = lcg();

  if (typeof min === "undefined") {
    return rand;
  }

  if (typeof max === "undefined") {
    return rand * min;
  }

  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }

  return rand * (max - min) + min;
};

const getColor = () => {
  return random(255);
};

let generateDither = ({ width, height, seed }) => {
  setSeed(seed);
  let newPixel = [];

  // generate random noise
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      newPixel[x + y * width] = getColor();
    }
  }

  // write dark background
  for (let i = 0; i <= width * height * 0.075; i++) {
    newPixel = pixelDrawer({
      img: newPixel,
      color: getColor(),
      elementHeight: 5,
      width,
      height,
      count: (width * height) / 120,
    });
  }

  // write white background
  newPixel = pixelDrawer({
    img: newPixel,
    color: 255,
    elementHeight: 4,
    width,
    height,
    count: (width * height) / 120,
  });

  return newPixel;
};

let pixelDrawer = ({ img, color, elementHeight, count, width, height }) => {
  let newPixel = [...img];

  for (let i = 0; i < count; i++) {
    // Pick a random x, y

    let elementH = elementHeight;
    let xRand = random(width);
    let yRand = random(height + elementH) - elementH;

    if (yRand < 0) {
      elementH = elementHeight + yRand;
      yRand = 0;
    }

    for (let h = 0; h < elementH; h++) {
      let index = parseInt(yRand * width + width * h + xRand);
      if (index < width * height) {
        newPixel[index] = color;
      }
    }
  }
  return newPixel;
};

export default generateDither;
