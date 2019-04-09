let iq = window["image-q"];

let { buildPaletteSync, applyPaletteSync, utils } = iq;

let canvasW = 20;
let canvasH = 100;
let randomImg = [];

// scale image by factor
let scale = 12;
let scaleImg = []; // holds scaled img

let ditherImg = []; // holds dithered img

// scale the final image
let ditherScale = 3;
let ditherScaleImg = []; // holds scaled img

function setup() {
  // reproducable function
  randomSeed(42);
  pixelDensity(1);

  // createCanvas(windowWidth, windowHeight);
  createCanvas(canvasW * scale * ditherScale, canvasH * scale * ditherScale);
  background(0, 100, 200);

  // generate random noise 1x1
  for (let x = 0; x < canvasW; x++) {
    for (let y = 0; y < canvasH; y++) {
      randomImg[x + y * canvasW] = getColor();
    }
  }

  // write dark background 1x5
  for (let i = 0; i <= 60; i++) {
    pixelDrawer(getColor(), 5, (canvasW * canvasH) / 120);
  }

  pixelDrawer(1, 4, (canvasW * canvasH) / 120);

  scaleImg = imgScaler(img1BitTo32Bit(randomImg), canvasW, canvasH, scale);

  const pointContainer = utils.PointContainer.fromUint8Array(
    scaleImg,
    canvasW * scale,
    canvasH * scale
  );

  const palette = new utils.Palette();

  palette.add(utils.Point.createByRGBA(0, 0, 0, 255)); // black
  palette.add(utils.Point.createByRGBA(255, 255, 255, 255)); // white

  const outPointContainer = applyPaletteSync(pointContainer, palette, {
    colorDistanceFormula: "euclidean", // optional
    imageQuantization: "jarvis" // optional
  });

  ditherImg = outPointContainer.toUint8Array();

  ditherScaleImg = imgScaler(
    ditherImg,
    canvasW * scale,
    canvasH * scale,
    ditherScale
  );

  loadPixels();

  pixels.forEach((item, index) => (pixels[index] = ditherScaleImg[index]));

  updatePixels();
}

let getColor = function() {
  return random() * 0.65;
};

let pixelDrawer = function(c, height, totalRun) {
  for (let i = 0; i < totalRun; i++) {
    // Pick a random x, y

    let elementH = height;

    let xRand = random(canvasW);

    let yRand = random(canvasH + elementH) - elementH;

    if (yRand < 0) {
      elementH = height + yRand;
      yRand = 0;
    }

    for (let h = 0; h < elementH; h++) {
      // console.log("write", yRand * canvasW + h + canvasW + xRand, c)
      let index = parseInt(yRand * canvasW + canvasW * h + xRand);
      if (index <= canvasW * canvasH) {
        randomImg[index] = c;
      }
    }
  }
};

function draw() {}

function keyTyped() {
  if (key === "s") {
    let img = createImage(
      canvasW * scale * ditherScale,
      canvasH * scale * ditherScale
    );
    img.loadPixels();

    ditherScaleImg.forEach(
      (item, index) => (img.pixels[index] = ditherScaleImg[index])
    );

    img.updatePixels();

    img.save("photo", "png");
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
