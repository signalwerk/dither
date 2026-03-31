const LCG = (s) => {
  return () => {
    s = Math.imul(48271, s) | 0 % 2147483647;
    return (s & 2147483647) / 2147483648;
  };
};

let rand = LCG(42);

let getColor = () => {
  return rand() * 255 * 0.75;
};

let generateDither = ({ width, height, seed }) => {
  rand = LCG(seed);
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
    let xRand = rand() * width;
    let yRand = rand() * (height + elementH) - elementH;

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
