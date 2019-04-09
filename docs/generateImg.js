let img8BitTo32Bit = pixels => {
  let newPixel = [];
  pixels.forEach(item => {
    let color = parseInt(item);
    newPixel.push(color);
    newPixel.push(color);
    newPixel.push(color);
    newPixel.push(255);
  });

  return newPixel;
};

let imgScaler = (pixels, width, height, scale) => {
  let newPixel = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let originalPixelIndex = x * 4 + y * width * 4;

      let r = pixels[originalPixelIndex];
      let g = pixels[originalPixelIndex + 1];
      let b = pixels[originalPixelIndex + 2];
      let a = pixels[originalPixelIndex + 3];

      for (let sX = 0; sX < scale; sX++) {
        for (let sY = 0; sY < scale; sY++) {
          let index = x * scale + y * scale * width * scale;
          index = index + sX;
          index = index + sY * width * scale;

          newPixel[4 * index] = r;
          newPixel[4 * index + 1] = g;
          newPixel[4 * index + 2] = b;
          newPixel[4 * index + 3] = a;
        }
      }
    }
  }

  return newPixel;
};
