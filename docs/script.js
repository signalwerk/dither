let iq = window["image-q"];

let { buildPaletteSync, applyPaletteSync, utils } = iq;

let config = {
  width: 20, // blocks width
  height: 40, // blocks width
  pixelWidth: 12, // each blocks is 6×6px
  upscaleFactor: 2, // the resulting image
  seed: false, // seed for random generator if false eacht execution is random
  colorFactor: 0.75 // darken the overall color
};

let canvasW = config.width;
let canvasH = config.height;
let randomImg = [];

// scale image by factor
let scale = config.pixelWidth;
let scaleImg = []; // holds scaled img

let ditherImg = []; // holds dithered img

// scale the final image
let ditherScale = config.upscaleFactor;
let ditherScaleImg = []; // holds scaled img

function setup() {
  // reproducable function
  if (config.seed) {
    randomSeed(config.seed);
  }
  pixelDensity(1);

  var canvas = createCanvas(
    canvasW * scale * ditherScale,
    canvasH * scale * ditherScale
  );
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent("sketch-holder");
  background(0, 100, 200);

  // generate random noise 1x1
  for (let x = 0; x < canvasW; x++) {
    for (let y = 0; y < canvasH; y++) {
      randomImg[x + y * canvasW] = getColor();
    }
  }

  // write dark background
  for (let i = 0; i <= canvasW * canvasH * 0.075; i++) {
    pixelDrawer(getColor(), 5, (canvasW * canvasH) / 120);
  }

  pixelDrawer(255, 4, (canvasW * canvasH) / 120);

  scaleImg = imgScaler(img8BitTo32Bit(randomImg), canvasW, canvasH, scale);

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
  noLoop();
}

let getColor = function() {
  return random() * 255 * config.colorFactor;
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
