(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['image-q'] = {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var bt709 = createCommonjsModule(function (module, exports) {
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * constants.ts - part of Image Quantization Library
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * sRGB (based on ITU-R Recommendation BT.709)
 * http://en.wikipedia.org/wiki/SRGB
 */
var Y;
(function (Y) {
    Y[Y["RED"] = 0.2126] = "RED";
    Y[Y["GREEN"] = 0.7152] = "GREEN";
    Y[Y["BLUE"] = 0.0722] = "BLUE";
    Y[Y["WHITE"] = 1] = "WHITE";
})(Y = exports.Y || (exports.Y = {}));
// tslint:disable-next-line:naming-convention
var x;
(function (x) {
    x[x["RED"] = 0.64] = "RED";
    x[x["GREEN"] = 0.3] = "GREEN";
    x[x["BLUE"] = 0.15] = "BLUE";
    x[x["WHITE"] = 0.3127] = "WHITE";
})(x = exports.x || (exports.x = {}));
// tslint:disable-next-line:naming-convention
var y;
(function (y) {
    y[y["RED"] = 0.33] = "RED";
    y[y["GREEN"] = 0.6] = "GREEN";
    y[y["BLUE"] = 0.06] = "BLUE";
    y[y["WHITE"] = 0.329] = "WHITE";
})(y = exports.y || (exports.y = {}));

});

unwrapExports(bt709);
var bt709_1 = bt709.Y;
var bt709_2 = bt709.x;
var bt709_3 = bt709.y;

var constants = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * constants.ts - part of Image Quantization Library
 */

exports.bt709 = bt709;

});

unwrapExports(constants);
var constants_1 = constants.bt709;

var rgb2xyz_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2xyz.ts - part of Image Quantization Library
 */
function correctGamma(n) {
    return n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92;
}
function rgb2xyz(r, g, b) {
    // gamma correction, see https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
    r = correctGamma(r / 255);
    g = correctGamma(g / 255);
    b = correctGamma(b / 255);
    // Observer. = 2°, Illuminant = D65
    return {
        x: r * 0.4124 + g * 0.3576 + b * 0.1805,
        y: r * 0.2126 + g * 0.7152 + b * 0.0722,
        z: r * 0.0193 + g * 0.1192 + b * 0.9505,
    };
}
exports.rgb2xyz = rgb2xyz;

});

unwrapExports(rgb2xyz_1);
var rgb2xyz_2 = rgb2xyz_1.rgb2xyz;

var arithmetic = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function degrees2radians(n) {
    return n * (Math.PI / 180);
}
exports.degrees2radians = degrees2radians;
function max3(a, b, c) {
    var m = a;
    if (m < b)
        m = b;
    if (m < c)
        m = c;
    return m;
}
exports.max3 = max3;
function min3(a, b, c) {
    var m = a;
    if (m > b)
        m = b;
    if (m > c)
        m = c;
    return m;
}
exports.min3 = min3;
function intInRange(value, low, high) {
    if (value > high)
        value = high;
    if (value < low)
        value = low;
    return value | 0;
}
exports.intInRange = intInRange;
function inRange0to255Rounded(n) {
    n = Math.round(n);
    if (n > 255)
        n = 255;
    else if (n < 0)
        n = 0;
    return n;
}
exports.inRange0to255Rounded = inRange0to255Rounded;
function inRange0to255(n) {
    if (n > 255)
        n = 255;
    else if (n < 0)
        n = 0;
    return n;
}
exports.inRange0to255 = inRange0to255;
function stableSort(arrayToSort, callback) {
    var type = typeof arrayToSort[0];
    var sorted;
    if (type === 'number' || type === 'string') {
        var ord_1 = Object.create(null); // tslint:disable-line:no-null-keyword
        for (var i = 0, l = arrayToSort.length; i < l; i++) {
            var val = arrayToSort[i]; // tslint:disable-line:no-any
            if (ord_1[val] || ord_1[val] === 0)
                continue;
            ord_1[val] = i;
        }
        sorted = arrayToSort.sort(function (a, b) {
            return callback(a, b) || ord_1[a] - ord_1[b];
        });
    }
    else {
        var ord2_1 = arrayToSort.slice(0);
        sorted = arrayToSort.sort(function (a, b) {
            return callback(a, b) || ord2_1.indexOf(a) - ord2_1.indexOf(b);
        });
    }
    return sorted;
}
exports.stableSort = stableSort;

});

unwrapExports(arithmetic);
var arithmetic_1 = arithmetic.degrees2radians;
var arithmetic_2 = arithmetic.max3;
var arithmetic_3 = arithmetic.min3;
var arithmetic_4 = arithmetic.intInRange;
var arithmetic_5 = arithmetic.inRange0to255Rounded;
var arithmetic_6 = arithmetic.inRange0to255;
var arithmetic_7 = arithmetic.stableSort;

var rgb2hsl_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2hsl.ts - part of Image Quantization Library
 */

/**
 * Calculate HSL from RGB
 * Hue is in degrees [0..360]
 * Lightness: [0..1]
 * Saturation: [0..1]
 * http://web.archive.org/web/20060914040436/http://local.wasp.uwa.edu.au/~pbourke/colour/hsl/
 */
function rgb2hsl(r, g, b) {
    var min = arithmetic.min3(r, g, b);
    var max = arithmetic.max3(r, g, b);
    var delta = max - min;
    var l = (min + max) / 510;
    var s = 0;
    if (l > 0 && l < 1)
        s = delta / (l < 0.5 ? (max + min) : (510 - max - min));
    var h = 0;
    if (delta > 0) {
        if (max === r) {
            h = (g - b) / delta;
        }
        else if (max === g) {
            h = (2 + (b - r) / delta);
        }
        else {
            h = (4 + (r - g) / delta);
        }
        h *= 60;
        if (h < 0)
            h += 360;
    }
    return { h: h, s: s, l: l };
}
exports.rgb2hsl = rgb2hsl;

});

unwrapExports(rgb2hsl_1);
var rgb2hsl_2 = rgb2hsl_1.rgb2hsl;

var xyz2lab_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * xyz2lab.ts - part of Image Quantization Library
 */
var refX = 0.95047; // ref_X =  95.047   Observer= 2°, Illuminant= D65
var refY = 1.00000; // ref_Y = 100.000
var refZ = 1.08883; // ref_Z = 108.883
function pivot(n) {
    return n > 0.008856 ? Math.pow(n, 1 / 3) : (7.787 * n + 16 / 116);
}
function xyz2lab(x, y, z) {
    x = pivot(x / refX);
    y = pivot(y / refY);
    z = pivot(z / refZ);
    if ((116 * y) - 16 < 0)
        throw new Error('xxx');
    return {
        L: Math.max(0, (116 * y) - 16),
        a: 500 * (x - y),
        b: 200 * (y - z),
    };
}
exports.xyz2lab = xyz2lab;

});

unwrapExports(xyz2lab_1);
var xyz2lab_2 = xyz2lab_1.xyz2lab;

var rgb2lab_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2lab.ts - part of Image Quantization Library
 */


function rgb2lab(r, g, b) {
    var xyz = rgb2xyz_1.rgb2xyz(r, g, b);
    return xyz2lab_1.xyz2lab(xyz.x, xyz.y, xyz.z);
}
exports.rgb2lab = rgb2lab;

});

unwrapExports(rgb2lab_1);
var rgb2lab_2 = rgb2lab_1.rgb2lab;

var lab2xyz_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * lab2xyz.ts - part of Image Quantization Library
 */
var refX = 0.95047; // ref_X =  95.047   Observer= 2°, Illuminant = D65
var refY = 1.00000; // ref_Y = 100.000
var refZ = 1.08883; // ref_Z = 108.883
function pivot(n) {
    return n > 0.206893034 ? Math.pow(n, 3) : (n - 16 / 116) / 7.787;
}
// tslint:disable-next-line:naming-convention
function lab2xyz(L, a, b) {
    var y = (L + 16) / 116;
    var x = a / 500 + y;
    var z = y - b / 200;
    return {
        x: refX * pivot(x),
        y: refY * pivot(y),
        z: refZ * pivot(z),
    };
}
exports.lab2xyz = lab2xyz;

});

unwrapExports(lab2xyz_1);
var lab2xyz_2 = lab2xyz_1.lab2xyz;

var xyz2rgb_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * xyz2rgb.ts - part of Image Quantization Library
 */

// gamma correction, see https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
function correctGamma(n) {
    return n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : 12.92 * n;
}
function xyz2rgb(x, y, z) {
    // Observer. = 2°, Illuminant = D65
    var r = correctGamma(x * 3.2406 + y * -1.5372 + z * -0.4986);
    var g = correctGamma(x * -0.9689 + y * 1.8758 + z * 0.0415);
    var b = correctGamma(x * 0.0557 + y * -0.2040 + z * 1.0570);
    return {
        r: arithmetic.inRange0to255Rounded(r * 255),
        g: arithmetic.inRange0to255Rounded(g * 255),
        b: arithmetic.inRange0to255Rounded(b * 255),
    };
}
exports.xyz2rgb = xyz2rgb;

});

unwrapExports(xyz2rgb_1);
var xyz2rgb_2 = xyz2rgb_1.xyz2rgb;

var lab2rgb_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * lab2rgb.ts - part of Image Quantization Library
 */


// tslint:disable-next-line:naming-convention
function lab2rgb(L, a, b) {
    var xyz = lab2xyz_1.lab2xyz(L, a, b);
    return xyz2rgb_1.xyz2rgb(xyz.x, xyz.y, xyz.z);
}
exports.lab2rgb = lab2rgb;

});

unwrapExports(lab2rgb_1);
var lab2rgb_2 = lab2rgb_1.lab2rgb;

var conversion = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */

exports.rgb2xyz = rgb2xyz_1.rgb2xyz;

exports.rgb2hsl = rgb2hsl_1.rgb2hsl;

exports.rgb2lab = rgb2lab_1.rgb2lab;

exports.lab2xyz = lab2xyz_1.lab2xyz;

exports.lab2rgb = lab2rgb_1.lab2rgb;

exports.xyz2lab = xyz2lab_1.xyz2lab;

exports.xyz2rgb = xyz2rgb_1.xyz2rgb;

});

unwrapExports(conversion);
var conversion_1 = conversion.rgb2xyz;
var conversion_2 = conversion.rgb2hsl;
var conversion_3 = conversion.rgb2lab;
var conversion_4 = conversion.lab2xyz;
var conversion_5 = conversion.lab2rgb;
var conversion_6 = conversion.xyz2lab;
var conversion_7 = conversion.xyz2rgb;

var distanceCalculator = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractDistanceCalculator = /** @class */ (function () {
    function AbstractDistanceCalculator() {
        this._setDefaults();
        // set default maximal color component deltas (255 - 0 = 255)
        this.setWhitePoint(255, 255, 255, 255);
    }
    AbstractDistanceCalculator.prototype.setWhitePoint = function (r, g, b, a) {
        this._whitePoint = {
            r: (r > 0) ? 255 / r : 0,
            g: (g > 0) ? 255 / g : 0,
            b: (b > 0) ? 255 / b : 0,
            a: (a > 0) ? 255 / a : 0,
        };
        this._maxDistance = this.calculateRaw(r, g, b, a, 0, 0, 0, 0);
    };
    AbstractDistanceCalculator.prototype.calculateNormalized = function (colorA, colorB) {
        return this.calculateRaw(colorA.r, colorA.g, colorA.b, colorA.a, colorB.r, colorB.g, colorB.b, colorB.a) / this._maxDistance;
    };
    return AbstractDistanceCalculator;
}());
exports.AbstractDistanceCalculator = AbstractDistanceCalculator;

});

unwrapExports(distanceCalculator);
var distanceCalculator_1 = distanceCalculator.AbstractDistanceCalculator;

var cie94 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * cie94.ts - part of Image Quantization Library
 */



/**
 * CIE94 method of delta-e
 * http://en.wikipedia.org/wiki/Color_difference#CIE94
 */
var AbstractCIE94 = /** @class */ (function (_super) {
    __extends(AbstractCIE94, _super);
    function AbstractCIE94() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractCIE94.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var lab1 = rgb2lab_1.rgb2lab(arithmetic.inRange0to255(r1 * this._whitePoint.r), arithmetic.inRange0to255(g1 * this._whitePoint.g), arithmetic.inRange0to255(b1 * this._whitePoint.b));
        var lab2 = rgb2lab_1.rgb2lab(arithmetic.inRange0to255(r2 * this._whitePoint.r), arithmetic.inRange0to255(g2 * this._whitePoint.g), arithmetic.inRange0to255(b2 * this._whitePoint.b));
        var dL = lab1.L - lab2.L;
        var dA = lab1.a - lab2.a;
        var dB = lab1.b - lab2.b;
        var c1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b);
        var c2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
        var dC = c1 - c2;
        var deltaH = dA * dA + dB * dB - dC * dC;
        deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
        var dAlpha = (a2 - a1) * this._whitePoint.a * this._kA;
        // TODO: add alpha channel support
        return Math.sqrt(Math.pow(dL / this._Kl, 2) +
            Math.pow(dC / (1.0 + this._K1 * c1), 2) +
            Math.pow(deltaH / (1.0 + this._K2 * c1), 2) +
            Math.pow(dAlpha, 2));
    };
    return AbstractCIE94;
}(distanceCalculator.AbstractDistanceCalculator));
exports.AbstractCIE94 = AbstractCIE94;
var CIE94Textiles = /** @class */ (function (_super) {
    __extends(CIE94Textiles, _super);
    function CIE94Textiles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CIE94Textiles.prototype._setDefaults = function () {
        this._Kl = 2.0;
        this._K1 = 0.048;
        this._K2 = 0.014;
        this._kA = 0.25 * 50 / 255;
    };
    return CIE94Textiles;
}(AbstractCIE94));
exports.CIE94Textiles = CIE94Textiles;
var CIE94GraphicArts = /** @class */ (function (_super) {
    __extends(CIE94GraphicArts, _super);
    function CIE94GraphicArts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CIE94GraphicArts.prototype._setDefaults = function () {
        this._Kl = 1.0;
        this._K1 = 0.045;
        this._K2 = 0.015;
        this._kA = 0.25 * 100 / 255;
    };
    return CIE94GraphicArts;
}(AbstractCIE94));
exports.CIE94GraphicArts = CIE94GraphicArts;

});

unwrapExports(cie94);
var cie94_1 = cie94.AbstractCIE94;
var cie94_2 = cie94.CIE94Textiles;
var cie94_3 = cie94.CIE94GraphicArts;

var ciede2000 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ciede2000.ts - part of Image Quantization Library
 */



// tslint:disable:variable-name
// tslint:disable:naming-convention
/**
 * CIEDE2000 algorithm - Adapted from Sharma et al's MATLAB implementation at
 * http://www.ece.rochester.edu/~gsharma/ciede2000/
 */
var CIEDE2000 = /** @class */ (function (_super) {
    __extends(CIEDE2000, _super);
    function CIEDE2000() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CIEDE2000.prototype._setDefaults = function () { };
    CIEDE2000._calculatehp = function (b, ap) {
        var hp = Math.atan2(b, ap);
        if (hp >= 0)
            return hp;
        return hp + CIEDE2000._deg360InRad;
    };
    CIEDE2000._calculateRT = function (ahp, aCp) {
        var aCp_to_7 = Math.pow(aCp, 7.0);
        var R_C = 2.0 * Math.sqrt(aCp_to_7 / (aCp_to_7 + CIEDE2000._pow25to7)); // 25^7
        var delta_theta = CIEDE2000._deg30InRad * Math.exp(-Math.pow((ahp - CIEDE2000._deg275InRad) / CIEDE2000._deg25InRad, 2.0));
        return -Math.sin(2.0 * delta_theta) * R_C;
    };
    CIEDE2000._calculateT = function (ahp) {
        return 1.0 - .17 * Math.cos(ahp - CIEDE2000._deg30InRad) + .24 * Math.cos(ahp * 2.0) + .32 * Math.cos(ahp * 3.0 + CIEDE2000._deg6InRad) - .2 * Math.cos(ahp * 4.0 - CIEDE2000._deg63InRad);
    };
    CIEDE2000._calculate_ahp = function (C1pC2p, h_bar, h1p, h2p) {
        var hpSum = h1p + h2p;
        if (C1pC2p === 0)
            return hpSum;
        if (h_bar <= CIEDE2000._deg180InRad)
            return hpSum / 2.0;
        if (hpSum < CIEDE2000._deg360InRad)
            return (hpSum + CIEDE2000._deg360InRad) / 2.0;
        return (hpSum - CIEDE2000._deg360InRad) / 2.0;
    };
    CIEDE2000._calculate_dHp = function (C1pC2p, h_bar, h2p, h1p) {
        var dhp;
        if (C1pC2p === 0) {
            dhp = 0;
        }
        else if (h_bar <= CIEDE2000._deg180InRad) {
            dhp = h2p - h1p;
        }
        else if (h2p <= h1p) {
            dhp = h2p - h1p + CIEDE2000._deg360InRad;
        }
        else {
            dhp = h2p - h1p - CIEDE2000._deg360InRad;
        }
        return 2.0 * Math.sqrt(C1pC2p) * Math.sin(dhp / 2.0);
    };
    CIEDE2000.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var lab1 = rgb2lab_1.rgb2lab(arithmetic.inRange0to255(r1 * this._whitePoint.r), arithmetic.inRange0to255(g1 * this._whitePoint.g), arithmetic.inRange0to255(b1 * this._whitePoint.b));
        var lab2 = rgb2lab_1.rgb2lab(arithmetic.inRange0to255(r2 * this._whitePoint.r), arithmetic.inRange0to255(g2 * this._whitePoint.g), arithmetic.inRange0to255(b2 * this._whitePoint.b));
        var dA = (a2 - a1) * this._whitePoint.a * CIEDE2000._kA;
        var dE2 = this.calculateRawInLab(lab1, lab2);
        return Math.sqrt(dE2 + dA * dA);
    };
    CIEDE2000.prototype.calculateRawInLab = function (Lab1, Lab2) {
        // Get L,a,b values for color 1
        var L1 = Lab1.L;
        var a1 = Lab1.a;
        var b1 = Lab1.b;
        // Get L,a,b values for color 2
        var L2 = Lab2.L;
        var a2 = Lab2.a;
        var b2 = Lab2.b;
        // Calculate Cprime1, Cprime2, Cabbar
        var C1 = Math.sqrt(a1 * a1 + b1 * b1);
        var C2 = Math.sqrt(a2 * a2 + b2 * b2);
        var pow_a_C1_C2_to_7 = Math.pow((C1 + C2) / 2.0, 7.0);
        var G = 0.5 * (1.0 - Math.sqrt(pow_a_C1_C2_to_7 / (pow_a_C1_C2_to_7 + CIEDE2000._pow25to7))); // 25^7
        var a1p = (1.0 + G) * a1;
        var a2p = (1.0 + G) * a2;
        var C1p = Math.sqrt(a1p * a1p + b1 * b1);
        var C2p = Math.sqrt(a2p * a2p + b2 * b2);
        var C1pC2p = C1p * C2p;
        // Angles in Degree.
        var h1p = CIEDE2000._calculatehp(b1, a1p);
        var h2p = CIEDE2000._calculatehp(b2, a2p);
        var h_bar = Math.abs(h1p - h2p);
        var dLp = L2 - L1;
        var dCp = C2p - C1p;
        var dHp = CIEDE2000._calculate_dHp(C1pC2p, h_bar, h2p, h1p);
        var ahp = CIEDE2000._calculate_ahp(C1pC2p, h_bar, h1p, h2p);
        var T = CIEDE2000._calculateT(ahp);
        var aCp = (C1p + C2p) / 2.0;
        var aLp_minus_50_square = Math.pow((L1 + L2) / 2.0 - 50.0, 2.0);
        var S_L = 1.0 + (.015 * aLp_minus_50_square) / Math.sqrt(20.0 + aLp_minus_50_square);
        var S_C = 1.0 + .045 * aCp;
        var S_H = 1.0 + .015 * T * aCp;
        var R_T = CIEDE2000._calculateRT(ahp, aCp);
        var dLpSL = dLp / S_L; // S_L * kL, where kL is 1.0
        var dCpSC = dCp / S_C; // S_C * kC, where kC is 1.0
        var dHpSH = dHp / S_H; // S_H * kH, where kH is 1.0
        return Math.pow(dLpSL, 2) + Math.pow(dCpSC, 2) + Math.pow(dHpSH, 2) + R_T * dCpSC * dHpSH;
    };
    /**
     * Weight in distance: 0.25
     * Max DeltaE: 100
     * Max DeltaA: 255
     */
    CIEDE2000._kA = 0.25 * 100 / 255;
    CIEDE2000._pow25to7 = Math.pow(25, 7);
    CIEDE2000._deg360InRad = arithmetic.degrees2radians(360);
    CIEDE2000._deg180InRad = arithmetic.degrees2radians(180);
    CIEDE2000._deg30InRad = arithmetic.degrees2radians(30);
    CIEDE2000._deg6InRad = arithmetic.degrees2radians(6);
    CIEDE2000._deg63InRad = arithmetic.degrees2radians(63);
    CIEDE2000._deg275InRad = arithmetic.degrees2radians(275);
    CIEDE2000._deg25InRad = arithmetic.degrees2radians(25);
    return CIEDE2000;
}(distanceCalculator.AbstractDistanceCalculator));
exports.CIEDE2000 = CIEDE2000;

});

unwrapExports(ciede2000);
var ciede2000_1 = ciede2000.CIEDE2000;

var cmetric = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * cmetric.ts - part of Image Quantization Library
 */

/**
 * TODO: Name it: http://www.compuphase.com/cmetric.htm
 */
var CMetric = /** @class */ (function (_super) {
    __extends(CMetric, _super);
    function CMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CMetric.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var rmean = (r1 + r2) / 2 * this._whitePoint.r;
        var r = (r1 - r2) * this._whitePoint.r;
        var g = (g1 - g2) * this._whitePoint.g;
        var b = (b1 - b2) * this._whitePoint.b;
        var dE = ((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
        var dA = (a2 - a1) * this._whitePoint.a;
        return Math.sqrt(dE + dA * dA);
    };
    CMetric.prototype._setDefaults = function () { };
    return CMetric;
}(distanceCalculator.AbstractDistanceCalculator));
exports.CMetric = CMetric;

});

unwrapExports(cmetric);
var cmetric_1 = cmetric.CMetric;

var euclidean = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * euclidean.ts - part of Image Quantization Library
 */


/**
 * Euclidean color distance
 */
var AbstractEuclidean = /** @class */ (function (_super) {
    __extends(AbstractEuclidean, _super);
    function AbstractEuclidean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractEuclidean.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var dR = r2 - r1;
        var dG = g2 - g1;
        var dB = b2 - b1;
        var dA = a2 - a1;
        return Math.sqrt(this._kR * dR * dR + this._kG * dG * dG + this._kB * dB * dB + this._kA * dA * dA);
    };
    return AbstractEuclidean;
}(distanceCalculator.AbstractDistanceCalculator));
exports.AbstractEuclidean = AbstractEuclidean;
var Euclidean = /** @class */ (function (_super) {
    __extends(Euclidean, _super);
    function Euclidean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Euclidean.prototype._setDefaults = function () {
        this._kR = 1;
        this._kG = 1;
        this._kB = 1;
        this._kA = 1;
    };
    return Euclidean;
}(AbstractEuclidean));
exports.Euclidean = Euclidean;
/**
 * Euclidean color distance (RGBQuant modification w Alpha)
 */
var EuclideanBT709 = /** @class */ (function (_super) {
    __extends(EuclideanBT709, _super);
    function EuclideanBT709() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EuclideanBT709.prototype._setDefaults = function () {
        this._kR = bt709.Y.RED;
        this._kG = bt709.Y.GREEN;
        this._kB = bt709.Y.BLUE;
        // TODO: what is the best coefficient below?
        this._kA = 1;
    };
    return EuclideanBT709;
}(AbstractEuclidean));
exports.EuclideanBT709 = EuclideanBT709;
/**
 * Euclidean color distance (RGBQuant modification w/o Alpha)
 */
var EuclideanBT709NoAlpha = /** @class */ (function (_super) {
    __extends(EuclideanBT709NoAlpha, _super);
    function EuclideanBT709NoAlpha() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EuclideanBT709NoAlpha.prototype._setDefaults = function () {
        this._kR = bt709.Y.RED;
        this._kG = bt709.Y.GREEN;
        this._kB = bt709.Y.BLUE;
        this._kA = 0;
    };
    return EuclideanBT709NoAlpha;
}(AbstractEuclidean));
exports.EuclideanBT709NoAlpha = EuclideanBT709NoAlpha;

});

unwrapExports(euclidean);
var euclidean_1 = euclidean.AbstractEuclidean;
var euclidean_2 = euclidean.Euclidean;
var euclidean_3 = euclidean.EuclideanBT709;
var euclidean_4 = euclidean.EuclideanBT709NoAlpha;

var manhattan = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * manhattanNeuQuant.ts - part of Image Quantization Library
 */


/**
 * Manhattan distance (NeuQuant modification) - w/o sRGB coefficients
 */
var AbstractManhattan = /** @class */ (function (_super) {
    __extends(AbstractManhattan, _super);
    function AbstractManhattan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractManhattan.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var dR = r2 - r1;
        var dG = g2 - g1;
        var dB = b2 - b1;
        var dA = a2 - a1;
        if (dR < 0)
            dR = 0 - dR;
        if (dG < 0)
            dG = 0 - dG;
        if (dB < 0)
            dB = 0 - dB;
        if (dA < 0)
            dA = 0 - dA;
        return this._kR * dR + this._kG * dG + this._kB * dB + this._kA * dA;
    };
    return AbstractManhattan;
}(distanceCalculator.AbstractDistanceCalculator));
exports.AbstractManhattan = AbstractManhattan;
var Manhattan = /** @class */ (function (_super) {
    __extends(Manhattan, _super);
    function Manhattan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Manhattan.prototype._setDefaults = function () {
        this._kR = 1;
        this._kG = 1;
        this._kB = 1;
        this._kA = 1;
    };
    return Manhattan;
}(AbstractManhattan));
exports.Manhattan = Manhattan;
/**
 * Manhattan distance (Nommyde modification)
 * https://github.com/igor-bezkrovny/image-quantization/issues/4#issuecomment-235155320
 */
var ManhattanNommyde = /** @class */ (function (_super) {
    __extends(ManhattanNommyde, _super);
    function ManhattanNommyde() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManhattanNommyde.prototype._setDefaults = function () {
        this._kR = 0.4984;
        this._kG = 0.8625;
        this._kB = 0.2979;
        // TODO: what is the best coefficient below?
        this._kA = 1;
    };
    return ManhattanNommyde;
}(AbstractManhattan));
exports.ManhattanNommyde = ManhattanNommyde;
/**
 * Manhattan distance (sRGB coefficients)
 */
var ManhattanBT709 = /** @class */ (function (_super) {
    __extends(ManhattanBT709, _super);
    function ManhattanBT709() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManhattanBT709.prototype._setDefaults = function () {
        this._kR = bt709.Y.RED;
        this._kG = bt709.Y.GREEN;
        this._kB = bt709.Y.BLUE;
        // TODO: what is the best coefficient below?
        this._kA = 1;
    };
    return ManhattanBT709;
}(AbstractManhattan));
exports.ManhattanBT709 = ManhattanBT709;

});

unwrapExports(manhattan);
var manhattan_1 = manhattan.AbstractManhattan;
var manhattan_2 = manhattan.Manhattan;
var manhattan_3 = manhattan.ManhattanNommyde;
var manhattan_4 = manhattan.ManhattanBT709;

var pngQuant = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * pngQuant.ts - part of Image Quantization Library
 */

/**
 * TODO: check quality of this distance equation
 * TODO: ask author for usage rights
 * taken from:
 * {@link http://stackoverflow.com/questions/4754506/color-similarity-distance-in-rgba-color-space/8796867#8796867}
 * {@link https://github.com/pornel/pngquant/blob/cc39b47799a7ff2ef17b529f9415ff6e6b213b8f/lib/pam.h#L148}
 */
var PNGQuant = /** @class */ (function (_super) {
    __extends(PNGQuant, _super);
    function PNGQuant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Author's comments
     * px_b.rgb = px.rgb + 0*(1-px.a) // blend px on black
     * px_b.a   = px.a   + 1*(1-px.a)
     * px_w.rgb = px.rgb + 1*(1-px.a) // blend px on white
     * px_w.a   = px.a   + 1*(1-px.a)
     *
     * px_b.rgb = px.rgb              // difference same as in opaque RGB
     * px_b.a   = 1
     * px_w.rgb = px.rgb - px.a       // difference simplifies to formula below
     * px_w.a   = 1
     *
     * (px.rgb - px.a) - (py.rgb - py.a)
     * (px.rgb - py.rgb) + (py.a - px.a)
     *
     */
    PNGQuant.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var alphas = (a2 - a1) * this._whitePoint.a;
        return this._colordifferenceCh(r1 * this._whitePoint.r, r2 * this._whitePoint.r, alphas) +
            this._colordifferenceCh(g1 * this._whitePoint.g, g2 * this._whitePoint.g, alphas) +
            this._colordifferenceCh(b1 * this._whitePoint.b, b2 * this._whitePoint.b, alphas);
    };
    PNGQuant.prototype._colordifferenceCh = function (x, y, alphas) {
        // maximum of channel blended on white, and blended on black
        // premultiplied alpha and backgrounds 0/1 shorten the formula
        var black = x - y;
        var white = black + alphas;
        return black * black + white * white;
    };
    PNGQuant.prototype._setDefaults = function () { };
    return PNGQuant;
}(distanceCalculator.AbstractDistanceCalculator));
exports.PNGQuant = PNGQuant;

});

unwrapExports(pngQuant);
var pngQuant_1 = pngQuant.PNGQuant;

var distance = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */

exports.AbstractDistanceCalculator = distanceCalculator.AbstractDistanceCalculator;

exports.CIE94Textiles = cie94.CIE94Textiles;
exports.CIE94GraphicArts = cie94.CIE94GraphicArts;

exports.CIEDE2000 = ciede2000.CIEDE2000;

exports.CMetric = cmetric.CMetric;

exports.AbstractEuclidean = euclidean.AbstractEuclidean;
exports.Euclidean = euclidean.Euclidean;
exports.EuclideanBT709NoAlpha = euclidean.EuclideanBT709NoAlpha;
exports.EuclideanBT709 = euclidean.EuclideanBT709;

exports.AbstractManhattan = manhattan.AbstractManhattan;
exports.Manhattan = manhattan.Manhattan;
exports.ManhattanBT709 = manhattan.ManhattanBT709;
exports.ManhattanNommyde = manhattan.ManhattanNommyde;

exports.PNGQuant = pngQuant.PNGQuant;

});

unwrapExports(distance);
var distance_1 = distance.AbstractDistanceCalculator;
var distance_2 = distance.CIE94Textiles;
var distance_3 = distance.CIE94GraphicArts;
var distance_4 = distance.CIEDE2000;
var distance_5 = distance.CMetric;
var distance_6 = distance.AbstractEuclidean;
var distance_7 = distance.Euclidean;
var distance_8 = distance.EuclideanBT709NoAlpha;
var distance_9 = distance.EuclideanBT709;
var distance_10 = distance.AbstractManhattan;
var distance_11 = distance.Manhattan;
var distance_12 = distance.ManhattanBT709;
var distance_13 = distance.ManhattanNommyde;
var distance_14 = distance.PNGQuant;

var paletteQuantizer = createCommonjsModule(function (module, exports) {
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractPaletteQuantizer = /** @class */ (function () {
    function AbstractPaletteQuantizer() {
    }
    AbstractPaletteQuantizer.prototype.quantizeSync = function () {
        try {
            for (var _a = __values(this.quantize()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (value.palette) {
                    return value.palette;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw new Error('unreachable');
        var e_1, _c;
    };
    return AbstractPaletteQuantizer;
}());
exports.AbstractPaletteQuantizer = AbstractPaletteQuantizer;

});

unwrapExports(paletteQuantizer);
var paletteQuantizer_1 = paletteQuantizer.AbstractPaletteQuantizer;

var point = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * point.ts - part of Image Quantization Library
 */

/**
 * v8 optimized class
 * 1) "constructor" should have initialization with worst types
 * 2) "set" should have |0 / >>> 0
 */
var Point = /** @class */ (function () {
    function Point() {
        this.uint32 = -1 >>> 0;
        this.r = this.g = this.b = this.a = 0;
        this.rgba = new Array(4);
        this.rgba[0] = 0;
        this.rgba[1] = 0;
        this.rgba[2] = 0;
        this.rgba[3] = 0;
        /*
         this.Lab = {
         L : 0.0,
         a : 0.0,
         b : 0.0
         };
         */
    }
    // Lab : { L : number; a : number; b : number };
    Point.createByQuadruplet = function (quadruplet) {
        var point = new Point();
        point.r = quadruplet[0] | 0;
        point.g = quadruplet[1] | 0;
        point.b = quadruplet[2] | 0;
        point.a = quadruplet[3] | 0;
        point._loadUINT32();
        point._loadQuadruplet();
        // point._loadLab();
        return point;
    };
    Point.createByRGBA = function (red, green, blue, alpha) {
        var point = new Point();
        point.r = red | 0;
        point.g = green | 0;
        point.b = blue | 0;
        point.a = alpha | 0;
        point._loadUINT32();
        point._loadQuadruplet();
        // point._loadLab();
        return point;
    };
    Point.createByUint32 = function (uint32) {
        var point = new Point();
        point.uint32 = uint32 >>> 0;
        point._loadRGBA();
        point._loadQuadruplet();
        // point._loadLab();
        return point;
    };
    Point.prototype.from = function (point) {
        this.r = point.r;
        this.g = point.g;
        this.b = point.b;
        this.a = point.a;
        this.uint32 = point.uint32;
        this.rgba[0] = point.r;
        this.rgba[1] = point.g;
        this.rgba[2] = point.b;
        this.rgba[3] = point.a;
        /*
         this.Lab.L = point.Lab.L;
         this.Lab.a = point.Lab.a;
         this.Lab.b = point.Lab.b;
         */
    };
    /*
     * TODO:
     Luminance from RGB:
  
     Luminance (standard for certain colour spaces): (0.2126*R + 0.7152*G + 0.0722*B) [1]
     Luminance (perceived option 1): (0.299*R + 0.587*G + 0.114*B) [2]
     Luminance (perceived option 2, slower to calculate):  sqrt( 0.241*R^2 + 0.691*G^2 + 0.068*B^2 ) ? sqrt( 0.299*R^2 + 0.587*G^2 + 0.114*B^2 ) (thanks to @MatthewHerbst) [http://alienryderflex.com/hsp.html]
     */
    Point.prototype.getLuminosity = function (useAlphaChannel) {
        var r = this.r;
        var g = this.g;
        var b = this.b;
        if (useAlphaChannel) {
            r = Math.min(255, 255 - this.a + this.a * r / 255);
            g = Math.min(255, 255 - this.a + this.a * g / 255);
            b = Math.min(255, 255 - this.a + this.a * b / 255);
        }
        // var luma = this.r * Point._RED_COEFFICIENT + this.g * Point._GREEN_COEFFICIENT + this.b * Point._BLUE_COEFFICIENT;
        /*
         if(useAlphaChannel) {
         luma = (luma * (255 - this.a)) / 255;
         }
         */
        return r * bt709.Y.RED + g * bt709.Y.GREEN + b * bt709.Y.BLUE;
    };
    Point.prototype._loadUINT32 = function () {
        this.uint32 = (this.a << 24 | this.b << 16 | this.g << 8 | this.r) >>> 0;
    };
    Point.prototype._loadRGBA = function () {
        this.r = this.uint32 & 0xff;
        this.g = (this.uint32 >>> 8) & 0xff;
        this.b = (this.uint32 >>> 16) & 0xff;
        this.a = (this.uint32 >>> 24) & 0xff;
    };
    Point.prototype._loadQuadruplet = function () {
        this.rgba[0] = this.r;
        this.rgba[1] = this.g;
        this.rgba[2] = this.b;
        this.rgba[3] = this.a;
        /*
         var xyz = rgb2xyz(this.r, this.g, this.b);
         var lab = xyz2lab(xyz.x, xyz.y, xyz.z);
         this.lab.l = lab.l;
         this.lab.a = lab.a;
         this.lab.b = lab.b;
         */
    };
    return Point;
}());
exports.Point = Point;

});

unwrapExports(point);
var point_1 = point.Point;

var pointContainer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * pointContainer.ts - part of Image Quantization Library
 */

/**
 * v8 optimizations done.
 * fromXXX methods are static to move out polymorphic code from class instance itself.
 */
var PointContainer = /** @class */ (function () {
    function PointContainer() {
        this._width = 0;
        this._height = 0;
        this._pointArray = [];
    }
    PointContainer.prototype.getWidth = function () {
        return this._width;
    };
    PointContainer.prototype.getHeight = function () {
        return this._height;
    };
    PointContainer.prototype.setWidth = function (width) {
        this._width = width;
    };
    PointContainer.prototype.setHeight = function (height) {
        this._height = height;
    };
    PointContainer.prototype.getPointArray = function () {
        return this._pointArray;
    };
    PointContainer.prototype.clone = function () {
        var clone = new PointContainer();
        clone._width = this._width;
        clone._height = this._height;
        for (var i = 0, l = this._pointArray.length; i < l; i++) {
            clone._pointArray[i] = point.Point.createByUint32(this._pointArray[i].uint32 | 0); // "| 0" is added for v8 optimization
        }
        return clone;
    };
    PointContainer.prototype.toUint32Array = function () {
        var l = this._pointArray.length;
        var uint32Array = new Uint32Array(l);
        for (var i = 0; i < l; i++) {
            uint32Array[i] = this._pointArray[i].uint32;
        }
        return uint32Array;
    };
    PointContainer.prototype.toUint8Array = function () {
        return new Uint8Array(this.toUint32Array().buffer);
    };
    PointContainer.fromHTMLImageElement = function (img) {
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d'); // tslint:disable-line:no-non-null-assertion
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
        return PointContainer.fromHTMLCanvasElement(canvas);
    };
    PointContainer.fromHTMLCanvasElement = function (canvas) {
        var width = canvas.width;
        var height = canvas.height;
        var ctx = canvas.getContext('2d'); // tslint:disable-line:no-non-null-assertion
        var imgData = ctx.getImageData(0, 0, width, height);
        return PointContainer.fromImageData(imgData);
    };
    PointContainer.fromImageData = function (imageData) {
        var width = imageData.width;
        var height = imageData.height;
        return PointContainer.fromUint8Array(imageData.data, width, height);
    };
    PointContainer.fromUint8Array = function (uint8Array, width, height) {
        switch (Object.prototype.toString.call(uint8Array)) {
            case '[object Uint8ClampedArray]':
            case '[object Uint8Array]':
                break;
            default:
                uint8Array = new Uint8Array(uint8Array);
        }
        var uint32Array = new Uint32Array(uint8Array.buffer);
        return PointContainer.fromUint32Array(uint32Array, width, height);
    };
    PointContainer.fromUint32Array = function (uint32Array, width, height) {
        var container = new PointContainer();
        container._width = width;
        container._height = height;
        for (var i = 0, l = uint32Array.length; i < l; i++) {
            container._pointArray[i] = point.Point.createByUint32(uint32Array[i] | 0); // "| 0" is added for v8 optimization
        }
        return container;
    };
    PointContainer.fromBuffer = function (buffer, width, height) {
        var uint32Array = new Uint32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint32Array.BYTES_PER_ELEMENT);
        return PointContainer.fromUint32Array(uint32Array, width, height);
    };
    return PointContainer;
}());
exports.PointContainer = PointContainer;

});

unwrapExports(pointContainer);
var pointContainer_1 = pointContainer.PointContainer;

var palette = createCommonjsModule(function (module, exports) {
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * palette.ts - part of Image Quantization Library
 */
Object.defineProperty(exports, "__esModule", { value: true });


// TODO: make paletteArray via pointContainer, so, export will be available via pointContainer.exportXXX
var hueGroups = 10;
function hueGroup(hue, segmentsNumber) {
    var maxHue = 360;
    var seg = maxHue / segmentsNumber;
    var half = seg / 2;
    for (var i = 1, mid = seg - half; i < segmentsNumber; i++, mid += seg) {
        if (hue >= mid && hue < mid + seg)
            return i;
    }
    return 0;
}
exports.hueGroup = hueGroup;
var Palette = /** @class */ (function () {
    function Palette() {
        this._pointArray = [];
        this._i32idx = {};
        this._pointContainer = new pointContainer.PointContainer();
        this._pointContainer.setHeight(1);
        this._pointArray = this._pointContainer.getPointArray();
    }
    Palette.prototype.add = function (color) {
        this._pointArray.push(color);
        this._pointContainer.setWidth(this._pointArray.length);
    };
    Palette.prototype.has = function (color) {
        for (var i = this._pointArray.length - 1; i >= 0; i--) {
            if (color.uint32 === this._pointArray[i].uint32)
                return true;
        }
        return false;
    };
    // TOTRY: use HUSL - http://boronine.com/husl/ http://www.husl-colors.org/ https://github.com/husl-colors/husl
    Palette.prototype.getNearestColor = function (colorDistanceCalculator, color) {
        return this._pointArray[this._getNearestIndex(colorDistanceCalculator, color) | 0];
    };
    Palette.prototype.getPointContainer = function () {
        return this._pointContainer;
    };
    // TOTRY: use HUSL - http://boronine.com/husl/
    /*
     public nearestIndexByUint32(i32) {
     var idx : number = this._nearestPointFromCache("" + i32);
     if (idx >= 0) return idx;
  
     var min = 1000,
     rgb = [
     (i32 & 0xff),
     (i32 >>> 8) & 0xff,
     (i32 >>> 16) & 0xff,
     (i32 >>> 24) & 0xff
     ],
     len = this._pointArray.length;
  
     idx = 0;
     for (var i = 0; i < len; i++) {
     var dist = Utils.distEuclidean(rgb, this._pointArray[i].rgba);
  
     if (dist < min) {
     min = dist;
     idx = i;
     }
     }
  
     this._i32idx[i32] = idx;
     return idx;
     }
     */
    Palette.prototype._nearestPointFromCache = function (key) {
        return typeof this._i32idx[key] === 'number' ? this._i32idx[key] : -1;
    };
    Palette.prototype._getNearestIndex = function (colorDistanceCalculator, point) {
        var idx = this._nearestPointFromCache('' + point.uint32);
        if (idx >= 0)
            return idx;
        var minimalDistance = Number.MAX_VALUE;
        idx = 0;
        for (var i = 0, l = this._pointArray.length; i < l; i++) {
            var p = this._pointArray[i];
            var distance = colorDistanceCalculator.calculateRaw(point.r, point.g, point.b, point.a, p.r, p.g, p.b, p.a);
            if (distance < minimalDistance) {
                minimalDistance = distance;
                idx = i;
            }
        }
        this._i32idx[point.uint32] = idx;
        return idx;
    };
    /*
     public reduce(histogram : ColorHistogram, colors : number) {
     if (this._pointArray.length > colors) {
     var idxi32 = histogram.getImportanceSortedColorsIDXI32();
  
     // quantize histogram to existing palette
     var keep = [], uniqueColors = 0, idx, pruned = false;
  
     for (var i = 0, len = idxi32.length; i < len; i++) {
     // palette length reached, unset all remaining colors (sparse palette)
     if (uniqueColors >= colors) {
     this.prunePal(keep);
     pruned = true;
     break;
     } else {
     idx = this.nearestIndexByUint32(idxi32[i]);
     if (keep.indexOf(idx) < 0) {
     keep.push(idx);
     uniqueColors++;
     }
     }
     }
  
     if (!pruned) {
     this.prunePal(keep);
     }
     }
     }
  
     // TODO: check usage, not tested!
     public prunePal(keep : number[]) {
     var colors = this._pointArray.length;
     for (var colorIndex = colors - 1; colorIndex >= 0; colorIndex--) {
     if (keep.indexOf(colorIndex) < 0) {
  
     if(colorIndex + 1 < colors) {
     this._pointArray[ colorIndex ] = this._pointArray [ colors - 1 ];
     }
     --colors;
     //this._pointArray[colorIndex] = null;
     }
     }
     console.log("colors pruned: " + (this._pointArray.length - colors));
     this._pointArray.length = colors;
     this._i32idx = {};
     }
     */
    // TODO: group very low lum and very high lum colors
    // TODO: pass custom sort order
    // TODO: sort criteria function should be placed to HueStats class
    Palette.prototype.sort = function () {
        this._i32idx = {};
        this._pointArray.sort(function (a, b) {
            var hslA = rgb2hsl_1.rgb2hsl(a.r, a.g, a.b);
            var hslB = rgb2hsl_1.rgb2hsl(b.r, b.g, b.b);
            // sort all grays + whites together
            var hueA = (a.r === a.g && a.g === a.b) ? 0 : 1 + hueGroup(hslA.h, hueGroups);
            var hueB = (b.r === b.g && b.g === b.b) ? 0 : 1 + hueGroup(hslB.h, hueGroups);
            /*
             var hueA = (a.r === a.g && a.g === a.b) ? 0 : 1 + Utils.hueGroup(hslA.h, hueGroups);
             var hueB = (b.r === b.g && b.g === b.b) ? 0 : 1 + Utils.hueGroup(hslB.h, hueGroups);
             */
            var hueDiff = hueB - hueA;
            if (hueDiff)
                return -hueDiff;
            /*
             var lumDiff = Utils.lumGroup(+hslB.l.toFixed(2)) - Utils.lumGroup(+hslA.l.toFixed(2));
             if (lumDiff) return -lumDiff;
             */
            var lA = a.getLuminosity(true);
            var lB = b.getLuminosity(true);
            if (lB - lA !== 0)
                return lB - lA;
            var satDiff = ((hslB.s * 100) | 0) - ((hslA.s * 100) | 0);
            if (satDiff)
                return -satDiff;
            return 0;
        });
    };
    return Palette;
}());
exports.Palette = Palette;

});

unwrapExports(palette);
var palette_1 = palette.hueGroup;
var palette_2 = palette.Palette;

var hueStatistics = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * hueStatistics.ts - part of Image Quantization Library
 */


var HueGroup = /** @class */ (function () {
    function HueGroup() {
        this.num = 0;
        this.cols = [];
    }
    return HueGroup;
}());
var HueStatistics = /** @class */ (function () {
    function HueStatistics(numGroups, minCols) {
        this._numGroups = numGroups;
        this._minCols = minCols;
        this._stats = [];
        for (var i = 0; i <= numGroups; i++) {
            this._stats[i] = new HueGroup();
        }
        this._groupsFull = 0;
    }
    HueStatistics.prototype.check = function (i32) {
        if (this._groupsFull === this._numGroups + 1) {
            this.check = function () {
            };
        }
        var r = (i32 & 0xff);
        var g = (i32 >>> 8) & 0xff;
        var b = (i32 >>> 16) & 0xff;
        var hg = (r === g && g === b) ? 0 : 1 + palette.hueGroup(rgb2hsl_1.rgb2hsl(r, g, b).h, this._numGroups);
        var gr = this._stats[hg];
        var min = this._minCols;
        gr.num++;
        if (gr.num > min) {
            return;
        }
        if (gr.num === min) {
            this._groupsFull++;
        }
        if (gr.num <= min) {
            this._stats[hg].cols.push(i32);
        }
    };
    HueStatistics.prototype.injectIntoDictionary = function (histG) {
        for (var i = 0; i <= this._numGroups; i++) {
            if (this._stats[i].num <= this._minCols) {
                this._stats[i].cols.forEach(function (col) {
                    if (!histG[col]) {
                        histG[col] = 1;
                    }
                    else {
                        histG[col]++;
                    }
                });
            }
        }
    };
    HueStatistics.prototype.injectIntoArray = function (histG) {
        for (var i = 0; i <= this._numGroups; i++) {
            if (this._stats[i].num <= this._minCols) {
                this._stats[i].cols.forEach(function (col) {
                    if (histG.indexOf(col) === -1) {
                        histG.push(col);
                    }
                });
            }
        }
    };
    return HueStatistics;
}());
exports.HueStatistics = HueStatistics;

});

unwrapExports(hueStatistics);
var hueStatistics_1 = hueStatistics.HueStatistics;

var progressTracker = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var ProgressTracker = /** @class */ (function () {
    function ProgressTracker(valueRange, progressRange) {
        this._range = valueRange;
        this._progressRange = progressRange;
        this._step = Math.max(1, this._range / (ProgressTracker.steps + 1) | 0);
        this._last = -this._step;
        this.progress = 0;
    }
    ProgressTracker.prototype.shouldNotify = function (current) {
        if (current - this._last >= this._step) {
            this._last = current;
            this.progress = Math.min(this._progressRange * this._last / this._range, this._progressRange);
            return true;
        }
        return false;
    };
    ProgressTracker.steps = 100;
    return ProgressTracker;
}());
exports.ProgressTracker = ProgressTracker;

});

unwrapExports(progressTracker);
var progressTracker_1 = progressTracker.ProgressTracker;

var utils = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */

exports.arithmetic = arithmetic;

exports.HueStatistics = hueStatistics.HueStatistics;

exports.Palette = palette.Palette;

exports.Point = point.Point;

exports.PointContainer = pointContainer.PointContainer;

exports.ProgressTracker = progressTracker.ProgressTracker;

});

unwrapExports(utils);
var utils_1 = utils.arithmetic;
var utils_2 = utils.HueStatistics;
var utils_3 = utils.Palette;
var utils_4 = utils.Point;
var utils_5 = utils.PointContainer;
var utils_6 = utils.ProgressTracker;

var neuquant = createCommonjsModule(function (module, exports) {
/*
 * NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
 * "Kohonen neural networks for optimal colour quantization" in "Network:
 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
 * the algorithm.
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
 * this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons who
 * receive copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 */
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * neuquant.ts - part of Image Quantization Library
 */




// bias for colour values
var networkBiasShift = 3;
var Neuron = /** @class */ (function () {
    function Neuron(defaultValue) {
        this.r = this.g = this.b = this.a = defaultValue;
    }
    /**
     * There is a fix in original NEUQUANT by Anthony Dekker (http://members.ozemail.com.au/~dekker/NEUQUANT.HTML)
     * @example
     * r = Math.min(255, (neuron.r + (1 << (networkBiasShift - 1))) >> networkBiasShift);
     */
    Neuron.prototype.toPoint = function () {
        return point.Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
    };
    Neuron.prototype.subtract = function (r, g, b, a) {
        this.r -= r | 0;
        this.g -= g | 0;
        this.b -= b | 0;
        this.a -= a | 0;
    };
    return Neuron;
}());
var NeuQuant = /** @class */ (function (_super) {
    __extends(NeuQuant, _super);
    function NeuQuant(colorDistanceCalculator, colors) {
        if (colors === void 0) { colors = 256; }
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        _this._pointArray = [];
        _this._sampleFactor = 1;
        _this._networkSize = colors;
        _this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
        return _this;
    }
    NeuQuant.prototype.sample = function (pointContainer) {
        this._pointArray = this._pointArray.concat(pointContainer.getPointArray());
    };
    NeuQuant.prototype.quantize = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this._init();
                    return [5 /*yield**/, __values(this._learn())];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, {
                            palette: this._buildPalette(),
                            progress: 100,
                        }];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    NeuQuant.prototype._init = function () {
        this._freq = [];
        this._bias = [];
        this._radPower = [];
        this._network = [];
        for (var i = 0; i < this._networkSize; i++) {
            this._network[i] = new Neuron((i << (networkBiasShift + 8)) / this._networkSize | 0);
            // 1/this._networkSize
            this._freq[i] = NeuQuant._initialBias / this._networkSize | 0;
            this._bias[i] = 0;
        }
    };
    /**
     * Main Learning Loop
     */
    NeuQuant.prototype._learn = function () {
        var sampleFactor, pointsNumber, alphadec, pointsToSample, delta, alpha, radius, rad, i, step, tracker, i, pointIndex, point$$1, b, g, r, a, neuronIndex, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sampleFactor = this._sampleFactor;
                    pointsNumber = this._pointArray.length;
                    if (pointsNumber < NeuQuant._minpicturebytes)
                        sampleFactor = 1;
                    alphadec = 30 + (sampleFactor - 1) / 3 | 0;
                    pointsToSample = pointsNumber / sampleFactor | 0;
                    delta = pointsToSample / NeuQuant._nCycles | 0;
                    alpha = NeuQuant._initAlpha;
                    radius = (this._networkSize >> 3) * NeuQuant._radiusBias;
                    rad = radius >> NeuQuant._radiusBiasShift;
                    if (rad <= 1)
                        rad = 0;
                    for (i = 0; i < rad; i++) {
                        this._radPower[i] = alpha * (((rad * rad - i * i) * NeuQuant._radBias) / (rad * rad)) >>> 0;
                    }
                    if (pointsNumber < NeuQuant._minpicturebytes) {
                        step = 1;
                    }
                    else if (pointsNumber % NeuQuant._prime1 !== 0) {
                        step = NeuQuant._prime1;
                    }
                    else if ((pointsNumber % NeuQuant._prime2) !== 0) {
                        step = NeuQuant._prime2;
                    }
                    else if ((pointsNumber % NeuQuant._prime3) !== 0) {
                        step = NeuQuant._prime3;
                    }
                    else {
                        step = NeuQuant._prime4;
                    }
                    tracker = new utils.ProgressTracker(pointsToSample, 99);
                    i = 0, pointIndex = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < pointsToSample)) return [3 /*break*/, 5];
                    if (!tracker.shouldNotify(i)) return [3 /*break*/, 3];
                    return [4 /*yield*/, {
                            progress: tracker.progress,
                        }];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    point$$1 = this._pointArray[pointIndex];
                    b = point$$1.b << networkBiasShift;
                    g = point$$1.g << networkBiasShift;
                    r = point$$1.r << networkBiasShift;
                    a = point$$1.a << networkBiasShift;
                    neuronIndex = this._contest(b, g, r, a);
                    this._alterSingle(alpha, neuronIndex, b, g, r, a);
                    if (rad !== 0)
                        this._alterNeighbour(rad, neuronIndex, b, g, r, a);
                    /* alter neighbours */
                    pointIndex += step;
                    if (pointIndex >= pointsNumber)
                        pointIndex -= pointsNumber;
                    i++;
                    if (delta === 0)
                        delta = 1;
                    if (i % delta === 0) {
                        alpha -= (alpha / alphadec) | 0;
                        radius -= (radius / NeuQuant._radiusDecrease) | 0;
                        rad = radius >> NeuQuant._radiusBiasShift;
                        if (rad <= 1)
                            rad = 0;
                        for (j = 0; j < rad; j++)
                            this._radPower[j] = alpha * (((rad * rad - j * j) * NeuQuant._radBias) / (rad * rad)) >>> 0;
                    }
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    };
    NeuQuant.prototype._buildPalette = function () {
        var palette$$1 = new palette.Palette();
        this._network.forEach(function (neuron) {
            palette$$1.add(neuron.toPoint());
        });
        palette$$1.sort();
        return palette$$1;
    };
    /**
     * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in radpower[|i-j|]
     */
    NeuQuant.prototype._alterNeighbour = function (rad, i, b, g, r, al) {
        var lo = i - rad;
        if (lo < -1)
            lo = -1;
        var hi = i + rad;
        if (hi > this._networkSize)
            hi = this._networkSize;
        var j = i + 1;
        var k = i - 1;
        var m = 1;
        while (j < hi || k > lo) {
            var a = this._radPower[m++] / NeuQuant._alphaRadBias;
            if (j < hi) {
                var p = this._network[j++];
                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
            }
            if (k > lo) {
                var p = this._network[k--];
                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
            }
        }
    };
    /**
     * Move neuron i towards biased (b,g,r) by factor alpha
     */
    NeuQuant.prototype._alterSingle = function (alpha, i, b, g, r, a) {
        alpha /= NeuQuant._initAlpha;
        /* alter hit neuron */
        var n = this._network[i];
        n.subtract(alpha * (n.r - r), alpha * (n.g - g), alpha * (n.b - b), alpha * (n.a - a));
    };
    /**
     * Search for biased BGR values
     * description:
     *    finds closest neuron (min dist) and updates freq
     *    finds best neuron (min dist-bias) and returns position
     *    for frequently chosen neurons, freq[i] is high and bias[i] is negative
     *    bias[i] = _gamma*((1/this._networkSize)-freq[i])
     *
     * Original distance equation:
     *        dist = abs(dR) + abs(dG) + abs(dB)
     */
    NeuQuant.prototype._contest = function (b, g, r, a) {
        var multiplier = (255 * 4) << networkBiasShift;
        var bestd = ~(1 << 31);
        var bestbiasd = bestd;
        var bestpos = -1;
        var bestbiaspos = bestpos;
        for (var i = 0; i < this._networkSize; i++) {
            var n = this._network[i];
            var dist = this._distance.calculateNormalized(n, { r: r, g: g, b: b, a: a }) * multiplier | 0;
            if (dist < bestd) {
                bestd = dist;
                bestpos = i;
            }
            var biasdist = dist - ((this._bias[i]) >> (NeuQuant._initialBiasShift - networkBiasShift));
            if (biasdist < bestbiasd) {
                bestbiasd = biasdist;
                bestbiaspos = i;
            }
            var betafreq = (this._freq[i] >> NeuQuant._betaShift);
            this._freq[i] -= betafreq;
            this._bias[i] += (betafreq << NeuQuant._gammaShift);
        }
        this._freq[bestpos] += NeuQuant._beta;
        this._bias[bestpos] -= NeuQuant._betaGamma;
        return bestbiaspos;
    };
    /*
     four primes near 500 - assume no image has a length so large
     that it is divisible by all four primes
     */
    NeuQuant._prime1 = 499;
    NeuQuant._prime2 = 491;
    NeuQuant._prime3 = 487;
    NeuQuant._prime4 = 503;
    NeuQuant._minpicturebytes = NeuQuant._prime4;
    // no. of learning cycles
    NeuQuant._nCycles = 100;
    // defs for freq and bias
    NeuQuant._initialBiasShift = 16;
    // bias for fractions
    NeuQuant._initialBias = (1 << NeuQuant._initialBiasShift);
    NeuQuant._gammaShift = 10;
    // gamma = 1024
    // TODO: why gamma is never used?
    // private static _gamma : number     = (1 << NeuQuant._gammaShift);
    NeuQuant._betaShift = 10;
    NeuQuant._beta = (NeuQuant._initialBias >> NeuQuant._betaShift);
    // beta = 1/1024
    NeuQuant._betaGamma = (NeuQuant._initialBias << (NeuQuant._gammaShift - NeuQuant._betaShift));
    /*
     * for 256 cols, radius starts
     */
    NeuQuant._radiusBiasShift = 6;
    // at 32.0 biased by 6 bits
    NeuQuant._radiusBias = 1 << NeuQuant._radiusBiasShift;
    // and decreases by a factor of 1/30 each cycle
    NeuQuant._radiusDecrease = 30;
    /* defs for decreasing alpha factor */
    // alpha starts at 1.0
    NeuQuant._alphaBiasShift = 10;
    // biased by 10 bits
    NeuQuant._initAlpha = (1 << NeuQuant._alphaBiasShift);
    /* radBias and alphaRadBias used for radpower calculation */
    NeuQuant._radBiasShift = 8;
    NeuQuant._radBias = 1 << NeuQuant._radBiasShift;
    NeuQuant._alphaRadBiasShift = NeuQuant._alphaBiasShift + NeuQuant._radBiasShift;
    NeuQuant._alphaRadBias = 1 << NeuQuant._alphaRadBiasShift;
    return NeuQuant;
}(paletteQuantizer.AbstractPaletteQuantizer));
exports.NeuQuant = NeuQuant;

});

unwrapExports(neuquant);
var neuquant_1 = neuquant.NeuQuant;

var neuquantFloat = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * NeuQuantFloat Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
 * "Kohonen neural networks for optimal colour quantization" in "Network:
 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
 * the algorithm.
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
 * this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons who
 * receive copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 */
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * neuquant.ts - part of Image Quantization Library
 */




// bias for colour values
var networkBiasShift = 3;
var NeuronFloat = /** @class */ (function () {
    function NeuronFloat(defaultValue) {
        this.r = this.g = this.b = this.a = defaultValue;
    }
    /**
     * There is a fix in original NEUQUANT by Anthony Dekker (http://members.ozemail.com.au/~dekker/NEUQUANT.HTML)
     * @example
     * r = Math.min(255, (neuron.r + (1 << (networkBiasShift - 1))) >> networkBiasShift);
     */
    NeuronFloat.prototype.toPoint = function () {
        return point.Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
    };
    NeuronFloat.prototype.subtract = function (r, g, b, a) {
        this.r -= r;
        this.g -= g;
        this.b -= b;
        this.a -= a;
    };
    return NeuronFloat;
}());
var NeuQuantFloat = /** @class */ (function (_super) {
    __extends(NeuQuantFloat, _super);
    function NeuQuantFloat(colorDistanceCalculator, colors) {
        if (colors === void 0) { colors = 256; }
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        _this._pointArray = [];
        _this._sampleFactor = 1;
        _this._networkSize = colors;
        _this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
        return _this;
    }
    NeuQuantFloat.prototype.sample = function (pointContainer) {
        this._pointArray = this._pointArray.concat(pointContainer.getPointArray());
    };
    NeuQuantFloat.prototype.quantize = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this._init();
                    return [5 /*yield**/, __values(this._learn())];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, {
                            palette: this._buildPalette(),
                            progress: 100,
                        }];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    NeuQuantFloat.prototype._init = function () {
        this._freq = [];
        this._bias = [];
        this._radPower = [];
        this._network = [];
        for (var i = 0; i < this._networkSize; i++) {
            this._network[i] = new NeuronFloat((i << (networkBiasShift + 8)) / this._networkSize);
            // 1/this._networkSize
            this._freq[i] = NeuQuantFloat._initialBias / this._networkSize;
            this._bias[i] = 0;
        }
    };
    /**
     * Main Learning Loop
     */
    NeuQuantFloat.prototype._learn = function () {
        var sampleFactor, pointsNumber, alphadec, pointsToSample, delta, alpha, radius, rad, i, step, tracker, i, pointIndex, point$$1, b, g, r, a, neuronIndex, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sampleFactor = this._sampleFactor;
                    pointsNumber = this._pointArray.length;
                    if (pointsNumber < NeuQuantFloat._minpicturebytes)
                        sampleFactor = 1;
                    alphadec = 30 + (sampleFactor - 1) / 3;
                    pointsToSample = pointsNumber / sampleFactor;
                    delta = pointsToSample / NeuQuantFloat._nCycles | 0;
                    alpha = NeuQuantFloat._initAlpha;
                    radius = (this._networkSize >> 3) * NeuQuantFloat._radiusBias;
                    rad = radius >> NeuQuantFloat._radiusBiasShift;
                    if (rad <= 1)
                        rad = 0;
                    for (i = 0; i < rad; i++) {
                        this._radPower[i] = alpha * (((rad * rad - i * i) * NeuQuantFloat._radBias) / (rad * rad));
                    }
                    if (pointsNumber < NeuQuantFloat._minpicturebytes) {
                        step = 1;
                    }
                    else if (pointsNumber % NeuQuantFloat._prime1 !== 0) {
                        step = NeuQuantFloat._prime1;
                    }
                    else if ((pointsNumber % NeuQuantFloat._prime2) !== 0) {
                        step = NeuQuantFloat._prime2;
                    }
                    else if ((pointsNumber % NeuQuantFloat._prime3) !== 0) {
                        step = NeuQuantFloat._prime3;
                    }
                    else {
                        step = NeuQuantFloat._prime4;
                    }
                    tracker = new utils.ProgressTracker(pointsToSample, 99);
                    i = 0, pointIndex = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < pointsToSample)) return [3 /*break*/, 5];
                    if (!tracker.shouldNotify(i)) return [3 /*break*/, 3];
                    return [4 /*yield*/, {
                            progress: tracker.progress,
                        }];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    point$$1 = this._pointArray[pointIndex];
                    b = point$$1.b << networkBiasShift;
                    g = point$$1.g << networkBiasShift;
                    r = point$$1.r << networkBiasShift;
                    a = point$$1.a << networkBiasShift;
                    neuronIndex = this._contest(b, g, r, a);
                    this._alterSingle(alpha, neuronIndex, b, g, r, a);
                    if (rad !== 0)
                        this._alterNeighbour(rad, neuronIndex, b, g, r, a);
                    /* alter neighbours */
                    pointIndex += step;
                    if (pointIndex >= pointsNumber)
                        pointIndex -= pointsNumber;
                    i++;
                    if (delta === 0)
                        delta = 1;
                    if (i % delta === 0) {
                        alpha -= (alpha / alphadec);
                        radius -= (radius / NeuQuantFloat._radiusDecrease);
                        rad = radius >> NeuQuantFloat._radiusBiasShift;
                        if (rad <= 1)
                            rad = 0;
                        for (j = 0; j < rad; j++)
                            this._radPower[j] = alpha * (((rad * rad - j * j) * NeuQuantFloat._radBias) / (rad * rad));
                    }
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    };
    NeuQuantFloat.prototype._buildPalette = function () {
        var palette$$1 = new palette.Palette();
        this._network.forEach(function (neuron) {
            palette$$1.add(neuron.toPoint());
        });
        palette$$1.sort();
        return palette$$1;
    };
    /**
     * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in radpower[|i-j|]
     */
    NeuQuantFloat.prototype._alterNeighbour = function (rad, i, b, g, r, al) {
        var lo = i - rad;
        if (lo < -1)
            lo = -1;
        var hi = i + rad;
        if (hi > this._networkSize)
            hi = this._networkSize;
        var j = i + 1;
        var k = i - 1;
        var m = 1;
        while (j < hi || k > lo) {
            var a = this._radPower[m++] / NeuQuantFloat._alphaRadBias;
            if (j < hi) {
                var p = this._network[j++];
                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
            }
            if (k > lo) {
                var p = this._network[k--];
                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
            }
        }
    };
    /**
     * Move neuron i towards biased (b,g,r) by factor alpha
     */
    NeuQuantFloat.prototype._alterSingle = function (alpha, i, b, g, r, a) {
        alpha /= NeuQuantFloat._initAlpha;
        /* alter hit neuron */
        var n = this._network[i];
        n.subtract(alpha * (n.r - r), alpha * (n.g - g), alpha * (n.b - b), alpha * (n.a - a));
    };
    /**
     * Search for biased BGR values
     * description:
     *    finds closest neuron (min dist) and updates freq
     *    finds best neuron (min dist-bias) and returns position
     *    for frequently chosen neurons, freq[i] is high and bias[i] is negative
     *    bias[i] = _gamma*((1/this._networkSize)-freq[i])
     *
     * Original distance equation:
     *        dist = abs(dR) + abs(dG) + abs(dB)
     */
    NeuQuantFloat.prototype._contest = function (b, g, r, al) {
        var multiplier = (255 * 4) << networkBiasShift;
        var bestd = ~(1 << 31);
        var bestbiasd = bestd;
        var bestpos = -1;
        var bestbiaspos = bestpos;
        for (var i = 0; i < this._networkSize; i++) {
            var n = this._network[i];
            var dist = this._distance.calculateNormalized(n, { r: r, g: g, b: b, a: al }) * multiplier;
            if (dist < bestd) {
                bestd = dist;
                bestpos = i;
            }
            var biasdist = dist - ((this._bias[i]) >> (NeuQuantFloat._initialBiasShift - networkBiasShift));
            if (biasdist < bestbiasd) {
                bestbiasd = biasdist;
                bestbiaspos = i;
            }
            var betafreq = (this._freq[i] >> NeuQuantFloat._betaShift);
            this._freq[i] -= betafreq;
            this._bias[i] += (betafreq << NeuQuantFloat._gammaShift);
        }
        this._freq[bestpos] += NeuQuantFloat._beta;
        this._bias[bestpos] -= NeuQuantFloat._betaGamma;
        return bestbiaspos;
    };
    /*
     four primes near 500 - assume no image has a length so large
     that it is divisible by all four primes
     */
    NeuQuantFloat._prime1 = 499;
    NeuQuantFloat._prime2 = 491;
    NeuQuantFloat._prime3 = 487;
    NeuQuantFloat._prime4 = 503;
    NeuQuantFloat._minpicturebytes = NeuQuantFloat._prime4;
    // no. of learning cycles
    NeuQuantFloat._nCycles = 100;
    // defs for freq and bias
    NeuQuantFloat._initialBiasShift = 16;
    // bias for fractions
    NeuQuantFloat._initialBias = (1 << NeuQuantFloat._initialBiasShift);
    NeuQuantFloat._gammaShift = 10;
    // gamma = 1024
    // TODO: why gamma is never used?
    // private static _gamma : number     = (1 << NeuQuantFloat._gammaShift);
    NeuQuantFloat._betaShift = 10;
    NeuQuantFloat._beta = (NeuQuantFloat._initialBias >> NeuQuantFloat._betaShift);
    // beta = 1/1024
    NeuQuantFloat._betaGamma = (NeuQuantFloat._initialBias << (NeuQuantFloat._gammaShift - NeuQuantFloat._betaShift));
    /*
     * for 256 cols, radius starts
     */
    NeuQuantFloat._radiusBiasShift = 6;
    // at 32.0 biased by 6 bits
    NeuQuantFloat._radiusBias = 1 << NeuQuantFloat._radiusBiasShift;
    // and decreases by a factor of 1/30 each cycle
    NeuQuantFloat._radiusDecrease = 30;
    /* defs for decreasing alpha factor */
    // alpha starts at 1.0
    NeuQuantFloat._alphaBiasShift = 10;
    // biased by 10 bits
    NeuQuantFloat._initAlpha = (1 << NeuQuantFloat._alphaBiasShift);
    /* radBias and alphaRadBias used for radpower calculation */
    NeuQuantFloat._radBiasShift = 8;
    NeuQuantFloat._radBias = 1 << NeuQuantFloat._radBiasShift;
    NeuQuantFloat._alphaRadBiasShift = NeuQuantFloat._alphaBiasShift + NeuQuantFloat._radBiasShift;
    NeuQuantFloat._alphaRadBias = 1 << NeuQuantFloat._alphaRadBiasShift;
    return NeuQuantFloat;
}(paletteQuantizer.AbstractPaletteQuantizer));
exports.NeuQuantFloat = NeuQuantFloat;

});

unwrapExports(neuquantFloat);
var neuquantFloat_1 = neuquantFloat.NeuQuantFloat;

var colorHistogram = createCommonjsModule(function (module, exports) {
/*
 * Copyright (c) 2015, Leon Sorokin
 * All rights reserved. (MIT Licensed)
 *
 * ColorHistogram.js - an image quantization lib
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * colorHistogram.ts - part of Image Quantization Library
 */


var ColorHistogram = /** @class */ (function () {
    function ColorHistogram(method, colors) {
        // 1 = by global population, 2 = subregion population threshold
        this._method = method;
        // if > 0, enables hues stats and min-color retention per group
        this._minHueCols = colors << 2; // opts.minHueCols || 0;
        // # of highest-frequency colors to start with for palette reduction
        this._initColors = colors << 2;
        // HueStatistics instance
        this._hueStats = new hueStatistics.HueStatistics(ColorHistogram._hueGroups, this._minHueCols);
        this._histogram = Object.create(null); // tslint:disable-line:no-null-keyword
    }
    ColorHistogram.prototype.sample = function (pointContainer) {
        switch (this._method) {
            case 1:
                this._colorStats1D(pointContainer);
                break;
            case 2:
                this._colorStats2D(pointContainer);
                break;
        }
    };
    ColorHistogram.prototype.getImportanceSortedColorsIDXI32 = function () {
        var _this = this;
        // TODO: fix typing issue in stableSort func
        var sorted = arithmetic.stableSort(Object.keys(this._histogram), function (a, b) { return _this._histogram[b] - _this._histogram[a]; });
        if (sorted.length === 0) {
            return [];
        }
        var idxi32;
        switch (this._method) {
            case 1:
                var initialColorsLimit = Math.min(sorted.length, this._initColors);
                var last = sorted[initialColorsLimit - 1];
                var freq = this._histogram[last];
                idxi32 = sorted.slice(0, initialColorsLimit);
                // add any cut off colors with same freq as last
                var pos = initialColorsLimit;
                var len = sorted.length;
                while (pos < len && this._histogram[sorted[pos]] === freq) {
                    idxi32.push(sorted[pos++]);
                }
                // inject min huegroup colors
                this._hueStats.injectIntoArray(idxi32);
                break;
            case 2:
                idxi32 = sorted;
                break;
            default:
                // TODO: rethink errors
                throw new Error('Incorrect method');
        }
        // int32-ify values
        return idxi32.map(function (v) {
            return +v;
        });
    };
    // global top-population
    ColorHistogram.prototype._colorStats1D = function (pointContainer) {
        var histG = this._histogram;
        var pointArray = pointContainer.getPointArray();
        var len = pointArray.length;
        for (var i = 0; i < len; i++) {
            var col = pointArray[i].uint32;
            // collect hue stats
            this._hueStats.check(col);
            if (col in histG) {
                histG[col]++;
            }
            else {
                histG[col] = 1;
            }
        }
    };
    // population threshold within subregions
    // FIXME: this can over-reduce (few/no colors same?), need a way to keep
    // important colors that dont ever reach local thresholds (gradients?)
    ColorHistogram.prototype._colorStats2D = function (pointContainer) {
        var _this = this;
        var width = pointContainer.getWidth();
        var height = pointContainer.getHeight();
        var pointArray = pointContainer.getPointArray();
        var boxW = ColorHistogram._boxSize[0];
        var boxH = ColorHistogram._boxSize[1];
        var area = boxW * boxH;
        var boxes = this._makeBoxes(width, height, boxW, boxH);
        var histG = this._histogram;
        boxes.forEach(function (box) {
            var effc = Math.round((box.w * box.h) / area) * ColorHistogram._boxPixels;
            if (effc < 2)
                effc = 2;
            var histL = {};
            _this._iterateBox(box, width, function (i) {
                var col = pointArray[i].uint32;
                // collect hue stats
                _this._hueStats.check(col);
                if (col in histG) {
                    histG[col]++;
                }
                else if (col in histL) {
                    if (++histL[col] >= effc) {
                        histG[col] = histL[col];
                    }
                }
                else {
                    histL[col] = 1;
                }
            });
        });
        // inject min huegroup colors
        this._hueStats.injectIntoDictionary(histG);
    };
    // iterates @bbox within a parent rect of width @wid; calls @fn, passing index within parent
    ColorHistogram.prototype._iterateBox = function (bbox, wid, fn) {
        var b = bbox;
        var i0 = b.y * wid + b.x;
        var i1 = (b.y + b.h - 1) * wid + (b.x + b.w - 1);
        var incr = wid - b.w + 1;
        var cnt = 0;
        var i = i0;
        do {
            fn.call(this, i);
            i += (++cnt % b.w === 0) ? incr : 1;
        } while (i <= i1);
    };
    /**
     *    partitions a rectangle of width x height into
     *    array of boxes stepX x stepY (or less)
     */
    ColorHistogram.prototype._makeBoxes = function (width, height, stepX, stepY) {
        var wrem = width % stepX;
        var hrem = height % stepY;
        var xend = width - wrem;
        var yend = height - hrem;
        var boxesArray = [];
        for (var y = 0; y < height; y += stepY) {
            for (var x = 0; x < width; x += stepX) {
                boxesArray.push({ x: x, y: y, w: (x === xend ? wrem : stepX), h: (y === yend ? hrem : stepY) });
            }
        }
        return boxesArray;
    };
    ColorHistogram._boxSize = [64, 64];
    ColorHistogram._boxPixels = 2;
    ColorHistogram._hueGroups = 10;
    return ColorHistogram;
}());
exports.ColorHistogram = ColorHistogram;

});

unwrapExports(colorHistogram);
var colorHistogram_1 = colorHistogram.ColorHistogram;

var rgbquant = createCommonjsModule(function (module, exports) {
/*
 * Copyright (c) 2015, Leon Sorokin
 * All rights reserved. (MIT Licensed)
 *
 * RGBQuant.js - an image quantization lib
 */
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgbquant.ts - part of Image Quantization Library
 */






var RemovedColor = /** @class */ (function () {
    function RemovedColor(index, color, distance) {
        this.index = index;
        this.color = color;
        this.distance = distance;
    }
    return RemovedColor;
}());
// TODO: make input/output image and input/output palettes with instances of class Point only!
var RGBQuant = /** @class */ (function (_super) {
    __extends(RGBQuant, _super);
    function RGBQuant(colorDistanceCalculator, colors, method) {
        if (colors === void 0) { colors = 256; }
        if (method === void 0) { method = 2; }
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        // desired final palette size
        _this._colors = colors;
        // histogram to accumulate
        _this._histogram = new colorHistogram.ColorHistogram(method, colors);
        _this._initialDistance = 0.01;
        _this._distanceIncrement = 0.005;
        return _this;
    }
    // gathers histogram info
    RGBQuant.prototype.sample = function (image) {
        /*
         var pointArray = image.getPointArray(), max = [0, 0, 0, 0], min = [255, 255, 255, 255];
    
         for (var i = 0, l = pointArray.length; i < l; i++) {
         var color = pointArray[i];
         for (var componentIndex = 0; componentIndex < 4; componentIndex++) {
         if (max[componentIndex] < color.rgba[componentIndex]) max[componentIndex] = color.rgba[componentIndex];
         if (min[componentIndex] > color.rgba[componentIndex]) min[componentIndex] = color.rgba[componentIndex];
         }
         }
         var rd = max[0] - min[0], gd = max[1] - min[1], bd = max[2] - min[2], ad = max[3] - min[3];
         this._distance.setWhitePoint(rd, gd, bd, ad);
    
         this._initialDistance = (Math.sqrt(rd * rd + gd * gd + bd * bd + ad * ad) / Math.sqrt(255 * 255 + 255 * 255 + 255 * 255)) * 0.01;
         */
        this._histogram.sample(image);
    };
    // reduces histogram to palette, remaps & memoizes reduced colors
    RGBQuant.prototype.quantize = function () {
        var idxi32;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idxi32 = this._histogram.getImportanceSortedColorsIDXI32();
                    if (idxi32.length === 0) {
                        throw new Error('No colors in image');
                    }
                    return [5 /*yield**/, __values(this._buildPalette(idxi32))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    // reduces similar colors from an importance-sorted Uint32 rgba array
    RGBQuant.prototype._buildPalette = function (idxi32) {
        var palette$$1, colorArray, usageArray, i, len, memDist, palLen, thold, tracker, i, pxi, j, pxj, dist, k, removedColor, colors, colorIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    palette$$1 = new palette.Palette();
                    colorArray = palette$$1.getPointContainer().getPointArray();
                    usageArray = new Array(idxi32.length);
                    for (i = 0; i < idxi32.length; i++) {
                        colorArray.push(point.Point.createByUint32(idxi32[i]));
                        usageArray[i] = 1;
                    }
                    len = colorArray.length;
                    memDist = [];
                    palLen = len;
                    thold = this._initialDistance;
                    tracker = new utils.ProgressTracker(palLen - this._colors, 99);
                    _a.label = 1;
                case 1:
                    if (!(palLen > this._colors)) return [3 /*break*/, 7];
                    memDist.length = 0;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < len)) return [3 /*break*/, 6];
                    if (!tracker.shouldNotify(len - palLen)) return [3 /*break*/, 4];
                    return [4 /*yield*/, {
                            progress: tracker.progress,
                        }];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (usageArray[i] === 0)
                        return [3 /*break*/, 5];
                    pxi = colorArray[i];
                    // if (!pxi) continue;
                    for (j = i + 1; j < len; j++) {
                        if (usageArray[j] === 0)
                            continue;
                        pxj = colorArray[j];
                        dist = this._distance.calculateNormalized(pxi, pxj);
                        if (dist < thold) {
                            // store index,rgb,dist
                            memDist.push(new RemovedColor(j, pxj, dist));
                            usageArray[j] = 0;
                            palLen--;
                        }
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6:
                    // palette reduction pass
                    // console.log("palette length: " + palLen);
                    // if palette is still much larger than target, increment by larger initDist
                    thold += (palLen > this._colors * 3) ? this._initialDistance : this._distanceIncrement;
                    return [3 /*break*/, 1];
                case 7:
                    // if palette is over-reduced, re-add removed colors with largest distances from last round
                    if (palLen < this._colors) {
                        // sort descending
                        arithmetic.stableSort(memDist, function (a, b) {
                            return b.distance - a.distance;
                        });
                        k = 0;
                        while (palLen < this._colors && k < memDist.length) {
                            removedColor = memDist[k];
                            // re-inject rgb into final palette
                            usageArray[removedColor.index] = 1;
                            palLen++;
                            k++;
                        }
                    }
                    colors = colorArray.length;
                    for (colorIndex = colors - 1; colorIndex >= 0; colorIndex--) {
                        if (usageArray[colorIndex] === 0) {
                            if (colorIndex !== colors - 1) {
                                colorArray[colorIndex] = colorArray[colors - 1];
                            }
                            --colors;
                        }
                    }
                    colorArray.length = colors;
                    palette$$1.sort();
                    return [4 /*yield*/, {
                            palette: palette$$1,
                            progress: 100,
                        }];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    return RGBQuant;
}(paletteQuantizer.AbstractPaletteQuantizer));
exports.RGBQuant = RGBQuant;

});

unwrapExports(rgbquant);
var rgbquant_1 = rgbquant.RGBQuant;

var wuQuant = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * wuQuant.ts - part of Image Quantization Library
 */




function createArray1D(dimension1) {
    var a = [];
    for (var k = 0; k < dimension1; k++) {
        a[k] = 0;
    }
    return a;
}
function createArray4D(dimension1, dimension2, dimension3, dimension4) {
    var a = new Array(dimension1);
    for (var i = 0; i < dimension1; i++) {
        a[i] = new Array(dimension2);
        for (var j = 0; j < dimension2; j++) {
            a[i][j] = new Array(dimension3);
            for (var k = 0; k < dimension3; k++) {
                a[i][j][k] = new Array(dimension4);
                for (var l = 0; l < dimension4; l++) {
                    a[i][j][k][l] = 0;
                }
            }
        }
    }
    return a;
}
function createArray3D(dimension1, dimension2, dimension3) {
    var a = new Array(dimension1);
    for (var i = 0; i < dimension1; i++) {
        a[i] = new Array(dimension2);
        for (var j = 0; j < dimension2; j++) {
            a[i][j] = new Array(dimension3);
            for (var k = 0; k < dimension3; k++) {
                a[i][j][k] = 0;
            }
        }
    }
    return a;
}
function fillArray3D(a, dimension1, dimension2, dimension3, value) {
    for (var i = 0; i < dimension1; i++) {
        a[i] = [];
        for (var j = 0; j < dimension2; j++) {
            a[i][j] = [];
            for (var k = 0; k < dimension3; k++) {
                a[i][j][k] = value;
            }
        }
    }
}
function fillArray1D(a, dimension1, value) {
    for (var i = 0; i < dimension1; i++) {
        a[i] = value;
    }
}
var WuColorCube = /** @class */ (function () {
    function WuColorCube() {
    }
    return WuColorCube;
}());
exports.WuColorCube = WuColorCube;
var WuQuant = /** @class */ (function (_super) {
    __extends(WuQuant, _super);
    function WuQuant(colorDistanceCalculator, colors, significantBitsPerChannel) {
        if (colors === void 0) { colors = 256; }
        if (significantBitsPerChannel === void 0) { significantBitsPerChannel = 5; }
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        _this._setQuality(significantBitsPerChannel);
        _this._initialize(colors);
        return _this;
    }
    WuQuant.prototype.sample = function (image) {
        var pointArray = image.getPointArray();
        for (var i = 0, l = pointArray.length; i < l; i++) {
            this._addColor(pointArray[i]);
        }
        this._pixels = this._pixels.concat(pointArray);
    };
    WuQuant.prototype.quantize = function () {
        var palette$$1, paletteIndex, sum, r, g, b, a, color;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values(this._preparePalette())];
                case 1:
                    _a.sent();
                    palette$$1 = new palette.Palette();
                    // generates palette
                    for (paletteIndex = 0; paletteIndex < this._colors; paletteIndex++) {
                        if (this._sums[paletteIndex] > 0) {
                            sum = this._sums[paletteIndex];
                            r = this._reds[paletteIndex] / sum;
                            g = this._greens[paletteIndex] / sum;
                            b = this._blues[paletteIndex] / sum;
                            a = this._alphas[paletteIndex] / sum;
                            color = point.Point.createByRGBA(r | 0, g | 0, b | 0, a | 0);
                            palette$$1.add(color);
                        }
                    }
                    palette$$1.sort();
                    return [4 /*yield*/, {
                            palette: palette$$1,
                            progress: 100,
                        }];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    WuQuant.prototype._preparePalette = function () {
        var next, volumeVariance, cubeIndex, temp, index, lookupRed, lookupGreen, lookupBlue, lookupAlpha, k, weight, index, l, color, match, bestMatch, bestDistance, lookup, foundRed, foundGreen, foundBlue, foundAlpha, distance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // preprocess the colors
                return [5 /*yield**/, __values(this._calculateMoments())];
                case 1:
                    // preprocess the colors
                    _a.sent();
                    next = 0;
                    volumeVariance = createArray1D(this._colors);
                    // processes the cubes
                    for (cubeIndex = 1; cubeIndex < this._colors; ++cubeIndex) {
                        // if cut is possible; make it
                        if (this._cut(this._cubes[next], this._cubes[cubeIndex])) {
                            volumeVariance[next] = this._cubes[next].volume > 1 ? this._calculateVariance(this._cubes[next]) : 0.0;
                            volumeVariance[cubeIndex] = this._cubes[cubeIndex].volume > 1 ? this._calculateVariance(this._cubes[cubeIndex]) : 0.0;
                        }
                        else {
                            // the cut was not possible, revert the index
                            volumeVariance[next] = 0.0;
                            cubeIndex--;
                        }
                        next = 0;
                        temp = volumeVariance[0];
                        for (index = 1; index <= cubeIndex; ++index) {
                            if (volumeVariance[index] > temp) {
                                temp = volumeVariance[index];
                                next = index;
                            }
                        }
                        if (temp <= 0.0) {
                            this._colors = cubeIndex + 1;
                            break;
                        }
                    }
                    lookupRed = [];
                    lookupGreen = [];
                    lookupBlue = [];
                    lookupAlpha = [];
                    // precalculates lookup tables
                    for (k = 0; k < this._colors; ++k) {
                        weight = WuQuant._volume(this._cubes[k], this._weights);
                        if (weight > 0) {
                            lookupRed[k] = (WuQuant._volume(this._cubes[k], this._momentsRed) / weight) | 0;
                            lookupGreen[k] = (WuQuant._volume(this._cubes[k], this._momentsGreen) / weight) | 0;
                            lookupBlue[k] = (WuQuant._volume(this._cubes[k], this._momentsBlue) / weight) | 0;
                            lookupAlpha[k] = (WuQuant._volume(this._cubes[k], this._momentsAlpha) / weight) | 0;
                        }
                        else {
                            lookupRed[k] = 0;
                            lookupGreen[k] = 0;
                            lookupBlue[k] = 0;
                            lookupAlpha[k] = 0;
                        }
                    }
                    this._reds = createArray1D(this._colors + 1);
                    this._greens = createArray1D(this._colors + 1);
                    this._blues = createArray1D(this._colors + 1);
                    this._alphas = createArray1D(this._colors + 1);
                    this._sums = createArray1D(this._colors + 1);
                    // scans and adds colors
                    for (index = 0, l = this._pixels.length; index < l; index++) {
                        color = this._pixels[index];
                        match = -1;
                        bestMatch = match;
                        bestDistance = Number.MAX_VALUE;
                        for (lookup = 0; lookup < this._colors; lookup++) {
                            foundRed = lookupRed[lookup];
                            foundGreen = lookupGreen[lookup];
                            foundBlue = lookupBlue[lookup];
                            foundAlpha = lookupAlpha[lookup];
                            distance = this._distance.calculateRaw(foundRed, foundGreen, foundBlue, foundAlpha, color.r, color.g, color.b, color.a);
                            if (distance < bestDistance) {
                                bestDistance = distance;
                                bestMatch = lookup;
                            }
                        }
                        this._reds[bestMatch] += color.r;
                        this._greens[bestMatch] += color.g;
                        this._blues[bestMatch] += color.b;
                        this._alphas[bestMatch] += color.a;
                        this._sums[bestMatch]++;
                    }
                    return [2 /*return*/];
            }
        });
    };
    WuQuant.prototype._addColor = function (color) {
        var bitsToRemove = 8 - this._significantBitsPerChannel;
        var indexRed = (color.r >> bitsToRemove) + 1;
        var indexGreen = (color.g >> bitsToRemove) + 1;
        var indexBlue = (color.b >> bitsToRemove) + 1;
        var indexAlpha = (color.a >> bitsToRemove) + 1;
        // if(color.a > 10) {
        this._weights[indexAlpha][indexRed][indexGreen][indexBlue]++;
        this._momentsRed[indexAlpha][indexRed][indexGreen][indexBlue] += color.r;
        this._momentsGreen[indexAlpha][indexRed][indexGreen][indexBlue] += color.g;
        this._momentsBlue[indexAlpha][indexRed][indexGreen][indexBlue] += color.b;
        this._momentsAlpha[indexAlpha][indexRed][indexGreen][indexBlue] += color.a;
        this._moments[indexAlpha][indexRed][indexGreen][indexBlue] += this._table[color.r] + this._table[color.g] + this._table[color.b] + this._table[color.a];
        // }
    };
    /**
     * Converts the histogram to a series of _moments.
     */
    WuQuant.prototype._calculateMoments = function () {
        var area, areaRed, areaGreen, areaBlue, areaAlpha, area2, xarea, xareaRed, xareaGreen, xareaBlue, xareaAlpha, xarea2, trackerProgress, tracker, alphaIndex, redIndex, greenIndex, line, lineRed, lineGreen, lineBlue, lineAlpha, line2, blueIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    area = [];
                    areaRed = [];
                    areaGreen = [];
                    areaBlue = [];
                    areaAlpha = [];
                    area2 = [];
                    xarea = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xareaRed = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xareaGreen = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xareaBlue = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xareaAlpha = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xarea2 = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    trackerProgress = 0;
                    tracker = new utils.ProgressTracker(this._alphaMaxSideIndex * this._maxSideIndex, 99);
                    alphaIndex = 1;
                    _a.label = 1;
                case 1:
                    if (!(alphaIndex <= this._alphaMaxSideIndex)) return [3 /*break*/, 7];
                    fillArray3D(xarea, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xareaRed, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xareaGreen, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xareaBlue, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xareaAlpha, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xarea2, this._sideSize, this._sideSize, this._sideSize, 0);
                    redIndex = 1;
                    _a.label = 2;
                case 2:
                    if (!(redIndex <= this._maxSideIndex)) return [3 /*break*/, 6];
                    if (!tracker.shouldNotify(trackerProgress)) return [3 /*break*/, 4];
                    return [4 /*yield*/, {
                            progress: tracker.progress,
                        }];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    fillArray1D(area, this._sideSize, 0);
                    fillArray1D(areaRed, this._sideSize, 0);
                    fillArray1D(areaGreen, this._sideSize, 0);
                    fillArray1D(areaBlue, this._sideSize, 0);
                    fillArray1D(areaAlpha, this._sideSize, 0);
                    fillArray1D(area2, this._sideSize, 0);
                    for (greenIndex = 1; greenIndex <= this._maxSideIndex; ++greenIndex) {
                        line = 0;
                        lineRed = 0;
                        lineGreen = 0;
                        lineBlue = 0;
                        lineAlpha = 0;
                        line2 = 0.0;
                        for (blueIndex = 1; blueIndex <= this._maxSideIndex; ++blueIndex) {
                            line += this._weights[alphaIndex][redIndex][greenIndex][blueIndex];
                            lineRed += this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex];
                            lineGreen += this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex];
                            lineBlue += this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex];
                            lineAlpha += this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex];
                            line2 += this._moments[alphaIndex][redIndex][greenIndex][blueIndex];
                            area[blueIndex] += line;
                            areaRed[blueIndex] += lineRed;
                            areaGreen[blueIndex] += lineGreen;
                            areaBlue[blueIndex] += lineBlue;
                            areaAlpha[blueIndex] += lineAlpha;
                            area2[blueIndex] += line2;
                            xarea[redIndex][greenIndex][blueIndex] = xarea[redIndex - 1][greenIndex][blueIndex] + area[blueIndex];
                            xareaRed[redIndex][greenIndex][blueIndex] = xareaRed[redIndex - 1][greenIndex][blueIndex] + areaRed[blueIndex];
                            xareaGreen[redIndex][greenIndex][blueIndex] = xareaGreen[redIndex - 1][greenIndex][blueIndex] + areaGreen[blueIndex];
                            xareaBlue[redIndex][greenIndex][blueIndex] = xareaBlue[redIndex - 1][greenIndex][blueIndex] + areaBlue[blueIndex];
                            xareaAlpha[redIndex][greenIndex][blueIndex] = xareaAlpha[redIndex - 1][greenIndex][blueIndex] + areaAlpha[blueIndex];
                            xarea2[redIndex][greenIndex][blueIndex] = xarea2[redIndex - 1][greenIndex][blueIndex] + area2[blueIndex];
                            this._weights[alphaIndex][redIndex][greenIndex][blueIndex] = this._weights[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xarea[redIndex][greenIndex][blueIndex];
                            this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsRed[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaRed[redIndex][greenIndex][blueIndex];
                            this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsGreen[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaGreen[redIndex][greenIndex][blueIndex];
                            this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsBlue[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaBlue[redIndex][greenIndex][blueIndex];
                            this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsAlpha[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaAlpha[redIndex][greenIndex][blueIndex];
                            this._moments[alphaIndex][redIndex][greenIndex][blueIndex] = this._moments[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xarea2[redIndex][greenIndex][blueIndex];
                        }
                    }
                    _a.label = 5;
                case 5:
                    ++redIndex, ++trackerProgress;
                    return [3 /*break*/, 2];
                case 6:
                    ++alphaIndex;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    };
    /**
     * Computes the volume of the cube in a specific moment.
     */
    WuQuant._volumeFloat = function (cube, moment) {
        return (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] -
            moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] -
            moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] +
            moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] -
            moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] +
            moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] +
            moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] -
            moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
            (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] -
                moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] -
                moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] -
                moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
                moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
                moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] -
                moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
    };
    /**
     * Computes the volume of the cube in a specific moment.
     */
    WuQuant._volume = function (cube, moment) {
        return WuQuant._volumeFloat(cube, moment) | 0;
    };
    /**
     * Splits the cube in given position][and color direction.
     */
    WuQuant._top = function (cube, direction, position, moment) {
        var result;
        switch (direction) {
            case WuQuant._alpha:
                result = (moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] -
                    moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] -
                    moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] +
                    moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
                    (moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] -
                        moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] -
                        moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
                        moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
                break;
            case WuQuant._red:
                result = (moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMaximum] -
                    moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMaximum] -
                    moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMaximum] +
                    moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMaximum]) -
                    (moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMinimum] -
                        moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMinimum] -
                        moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMinimum]);
                break;
            case WuQuant._green:
                result = (moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMaximum] -
                    moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMaximum] -
                    moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMaximum] +
                    moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMaximum]) -
                    (moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMinimum] -
                        moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMinimum] -
                        moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMinimum]);
                break;
            case WuQuant._blue:
                result = (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][position] -
                    moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][position] -
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][position] +
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][position]) -
                    (moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][position] -
                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][position] -
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][position] +
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][position]);
                break;
            default:
                throw new Error('impossible');
        }
        return result | 0;
    };
    /**
     * Splits the cube in a given color direction at its minimum.
     */
    WuQuant._bottom = function (cube, direction, moment) {
        switch (direction) {
            case WuQuant._alpha:
                return (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] +
                    moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] +
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] -
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
                    (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
            case WuQuant._red:
                return (-moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] +
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] +
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] -
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
                    (-moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
                        moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
            case WuQuant._green:
                return (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] +
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] +
                    moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] -
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum]) -
                    (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] -
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
            case WuQuant._blue:
                return (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] +
                    moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]) -
                    (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
            default:
                // TODO: why here is return 0, and in this._top there is no default at all (now it is throw error)?
                return 0;
        }
    };
    /**
     * Calculates statistical variance for a given cube.
     */
    WuQuant.prototype._calculateVariance = function (cube) {
        var volumeRed = WuQuant._volume(cube, this._momentsRed);
        var volumeGreen = WuQuant._volume(cube, this._momentsGreen);
        var volumeBlue = WuQuant._volume(cube, this._momentsBlue);
        var volumeAlpha = WuQuant._volume(cube, this._momentsAlpha);
        var volumeMoment = WuQuant._volumeFloat(cube, this._moments);
        var volumeWeight = WuQuant._volume(cube, this._weights);
        var distance = volumeRed * volumeRed + volumeGreen * volumeGreen + volumeBlue * volumeBlue + volumeAlpha * volumeAlpha;
        return volumeMoment - (distance / volumeWeight);
    };
    /**
     * Finds the optimal (maximal) position for the cut.
     */
    WuQuant.prototype._maximize = function (cube, direction, first, last, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight) {
        var bottomRed = WuQuant._bottom(cube, direction, this._momentsRed) | 0;
        var bottomGreen = WuQuant._bottom(cube, direction, this._momentsGreen) | 0;
        var bottomBlue = WuQuant._bottom(cube, direction, this._momentsBlue) | 0;
        var bottomAlpha = WuQuant._bottom(cube, direction, this._momentsAlpha) | 0;
        var bottomWeight = WuQuant._bottom(cube, direction, this._weights) | 0;
        var result = 0.0;
        var cutPosition = -1;
        for (var position = first; position < last; ++position) {
            // determines the cube cut at a certain position
            var halfRed = bottomRed + WuQuant._top(cube, direction, position, this._momentsRed);
            var halfGreen = bottomGreen + WuQuant._top(cube, direction, position, this._momentsGreen);
            var halfBlue = bottomBlue + WuQuant._top(cube, direction, position, this._momentsBlue);
            var halfAlpha = bottomAlpha + WuQuant._top(cube, direction, position, this._momentsAlpha);
            var halfWeight = bottomWeight + WuQuant._top(cube, direction, position, this._weights);
            // the cube cannot be cut at bottom (this would lead to empty cube)
            if (halfWeight !== 0) {
                var halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha;
                var temp = halfDistance / halfWeight;
                halfRed = wholeRed - halfRed;
                halfGreen = wholeGreen - halfGreen;
                halfBlue = wholeBlue - halfBlue;
                halfAlpha = wholeAlpha - halfAlpha;
                halfWeight = wholeWeight - halfWeight;
                if (halfWeight !== 0) {
                    halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha;
                    temp += halfDistance / halfWeight;
                    if (temp > result) {
                        result = temp;
                        cutPosition = position;
                    }
                }
            }
        }
        return { max: result, position: cutPosition };
    };
    // Cuts a cube with another one.
    WuQuant.prototype._cut = function (first, second) {
        var direction;
        var wholeRed = WuQuant._volume(first, this._momentsRed);
        var wholeGreen = WuQuant._volume(first, this._momentsGreen);
        var wholeBlue = WuQuant._volume(first, this._momentsBlue);
        var wholeAlpha = WuQuant._volume(first, this._momentsAlpha);
        var wholeWeight = WuQuant._volume(first, this._weights);
        var red = this._maximize(first, WuQuant._red, first.redMinimum + 1, first.redMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
        var green = this._maximize(first, WuQuant._green, first.greenMinimum + 1, first.greenMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
        var blue = this._maximize(first, WuQuant._blue, first.blueMinimum + 1, first.blueMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
        var alpha = this._maximize(first, WuQuant._alpha, first.alphaMinimum + 1, first.alphaMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
        if (alpha.max >= red.max && alpha.max >= green.max && alpha.max >= blue.max) {
            direction = WuQuant._alpha;
            // cannot split empty cube
            if (alpha.position < 0)
                return false;
        }
        else {
            if (red.max >= alpha.max && red.max >= green.max && red.max >= blue.max) {
                direction = WuQuant._red;
            }
            else if (green.max >= alpha.max && green.max >= red.max && green.max >= blue.max) {
                direction = WuQuant._green;
            }
            else {
                direction = WuQuant._blue;
            }
        }
        second.redMaximum = first.redMaximum;
        second.greenMaximum = first.greenMaximum;
        second.blueMaximum = first.blueMaximum;
        second.alphaMaximum = first.alphaMaximum;
        // cuts in a certain direction
        switch (direction) {
            case WuQuant._red:
                second.redMinimum = first.redMaximum = red.position;
                second.greenMinimum = first.greenMinimum;
                second.blueMinimum = first.blueMinimum;
                second.alphaMinimum = first.alphaMinimum;
                break;
            case WuQuant._green:
                second.greenMinimum = first.greenMaximum = green.position;
                second.redMinimum = first.redMinimum;
                second.blueMinimum = first.blueMinimum;
                second.alphaMinimum = first.alphaMinimum;
                break;
            case WuQuant._blue:
                second.blueMinimum = first.blueMaximum = blue.position;
                second.redMinimum = first.redMinimum;
                second.greenMinimum = first.greenMinimum;
                second.alphaMinimum = first.alphaMinimum;
                break;
            case WuQuant._alpha:
                second.alphaMinimum = first.alphaMaximum = alpha.position;
                second.blueMinimum = first.blueMinimum;
                second.redMinimum = first.redMinimum;
                second.greenMinimum = first.greenMinimum;
                break;
        }
        // determines the volumes after cut
        first.volume = (first.redMaximum - first.redMinimum) * (first.greenMaximum - first.greenMinimum) * (first.blueMaximum - first.blueMinimum) * (first.alphaMaximum - first.alphaMinimum);
        second.volume = (second.redMaximum - second.redMinimum) * (second.greenMaximum - second.greenMinimum) * (second.blueMaximum - second.blueMinimum) * (second.alphaMaximum - second.alphaMinimum);
        // the cut was successful
        return true;
    };
    WuQuant.prototype._initialize = function (colors) {
        this._colors = colors;
        // creates all the _cubes
        this._cubes = [];
        // initializes all the _cubes
        for (var cubeIndex = 0; cubeIndex < colors; cubeIndex++) {
            this._cubes[cubeIndex] = new WuColorCube();
        }
        // resets the reference minimums
        this._cubes[0].redMinimum = 0;
        this._cubes[0].greenMinimum = 0;
        this._cubes[0].blueMinimum = 0;
        this._cubes[0].alphaMinimum = 0;
        // resets the reference maximums
        this._cubes[0].redMaximum = this._maxSideIndex;
        this._cubes[0].greenMaximum = this._maxSideIndex;
        this._cubes[0].blueMaximum = this._maxSideIndex;
        this._cubes[0].alphaMaximum = this._alphaMaxSideIndex;
        this._weights = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsRed = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsGreen = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsBlue = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsAlpha = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._moments = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._table = [];
        for (var tableIndex = 0; tableIndex < 256; ++tableIndex) {
            this._table[tableIndex] = tableIndex * tableIndex;
        }
        this._pixels = [];
    };
    WuQuant.prototype._setQuality = function (significantBitsPerChannel) {
        if (significantBitsPerChannel === void 0) { significantBitsPerChannel = 5; }
        this._significantBitsPerChannel = significantBitsPerChannel;
        this._maxSideIndex = 1 << this._significantBitsPerChannel;
        this._alphaMaxSideIndex = this._maxSideIndex;
        this._sideSize = this._maxSideIndex + 1;
        this._alphaSideSize = this._alphaMaxSideIndex + 1;
    };
    WuQuant._alpha = 3;
    WuQuant._red = 2;
    WuQuant._green = 1;
    WuQuant._blue = 0;
    return WuQuant;
}(paletteQuantizer.AbstractPaletteQuantizer));
exports.WuQuant = WuQuant;

});

unwrapExports(wuQuant);
var wuQuant_1 = wuQuant.WuColorCube;
var wuQuant_2 = wuQuant.WuQuant;

var palette$2 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */

exports.AbstractPaletteQuantizer = paletteQuantizer.AbstractPaletteQuantizer;

exports.NeuQuant = neuquant.NeuQuant;

exports.NeuQuantFloat = neuquantFloat.NeuQuantFloat;

exports.RGBQuant = rgbquant.RGBQuant;

exports.ColorHistogram = colorHistogram.ColorHistogram;

exports.WuQuant = wuQuant.WuQuant;
exports.WuColorCube = wuQuant.WuColorCube;

});

unwrapExports(palette$2);
var palette_1$1 = palette$2.AbstractPaletteQuantizer;
var palette_2$1 = palette$2.NeuQuant;
var palette_3 = palette$2.NeuQuantFloat;
var palette_4 = palette$2.RGBQuant;
var palette_5 = palette$2.ColorHistogram;
var palette_6 = palette$2.WuQuant;
var palette_7 = palette$2.WuColorCube;

var imageQuantizer = createCommonjsModule(function (module, exports) {
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractImageQuantizer = /** @class */ (function () {
    function AbstractImageQuantizer() {
    }
    AbstractImageQuantizer.prototype.quantizeSync = function (pointContainer, palette) {
        try {
            for (var _a = __values(this.quantize(pointContainer, palette)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (value.pointContainer) {
                    return value.pointContainer;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw new Error('unreachable');
        var e_1, _c;
    };
    return AbstractImageQuantizer;
}());
exports.AbstractImageQuantizer = AbstractImageQuantizer;

});

unwrapExports(imageQuantizer);
var imageQuantizer_1 = imageQuantizer.AbstractImageQuantizer;

var nearestColor = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * nearestColor.ts - part of Image Quantization Library
 */


var NearestColor = /** @class */ (function (_super) {
    __extends(NearestColor, _super);
    function NearestColor(colorDistanceCalculator) {
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        return _this;
    }
    /**
     * Mutates pointContainer
     */
    NearestColor.prototype.quantize = function (pointContainer, palette) {
        var pointArray, width, height, tracker, y, x, idx, point;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pointArray = pointContainer.getPointArray();
                    width = pointContainer.getWidth();
                    height = pointContainer.getHeight();
                    tracker = new progressTracker.ProgressTracker(height, 99);
                    y = 0;
                    _a.label = 1;
                case 1:
                    if (!(y < height)) return [3 /*break*/, 5];
                    if (!tracker.shouldNotify(y)) return [3 /*break*/, 3];
                    return [4 /*yield*/, {
                            progress: tracker.progress,
                        }];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    for (x = 0, idx = y * width; x < width; x++, idx++) {
                        point = pointArray[idx];
                        // Reduced pixel
                        point.from(palette.getNearestColor(this._distance, point));
                    }
                    _a.label = 4;
                case 4:
                    y++;
                    return [3 /*break*/, 1];
                case 5: return [4 /*yield*/, {
                        pointContainer: pointContainer,
                        progress: 100,
                    }];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    return NearestColor;
}(imageQuantizer.AbstractImageQuantizer));
exports.NearestColor = NearestColor;

});

unwrapExports(nearestColor);
var nearestColor_1 = nearestColor.NearestColor;

var array = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ditherErrorDiffusionArray.ts - part of Image Quantization Library
 */




// TODO: is it the best name for this enum "kernel"?
var ErrorDiffusionArrayKernel;
(function (ErrorDiffusionArrayKernel) {
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["FloydSteinberg"] = 0] = "FloydSteinberg";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["FalseFloydSteinberg"] = 1] = "FalseFloydSteinberg";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Stucki"] = 2] = "Stucki";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Atkinson"] = 3] = "Atkinson";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Jarvis"] = 4] = "Jarvis";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Burkes"] = 5] = "Burkes";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Sierra"] = 6] = "Sierra";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["TwoSierra"] = 7] = "TwoSierra";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["SierraLite"] = 8] = "SierraLite";
})(ErrorDiffusionArrayKernel = exports.ErrorDiffusionArrayKernel || (exports.ErrorDiffusionArrayKernel = {}));
// http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
var ErrorDiffusionArray = /** @class */ (function (_super) {
    __extends(ErrorDiffusionArray, _super);
    function ErrorDiffusionArray(colorDistanceCalculator, kernel, serpentine, minimumColorDistanceToDither, calculateErrorLikeGIMP) {
        if (serpentine === void 0) { serpentine = true; }
        if (minimumColorDistanceToDither === void 0) { minimumColorDistanceToDither = 0; }
        if (calculateErrorLikeGIMP === void 0) { calculateErrorLikeGIMP = false; }
        var _this = _super.call(this) || this;
        _this._setKernel(kernel);
        _this._distance = colorDistanceCalculator;
        _this._minColorDistance = minimumColorDistanceToDither;
        _this._serpentine = serpentine;
        _this._calculateErrorLikeGIMP = calculateErrorLikeGIMP;
        return _this;
    }
    /**
     * adapted from http://jsbin.com/iXofIji/2/edit by PAEz
     * fixed version. it doesn't use image pixels as error storage, also it doesn't have 0.3 + 0.3 + 0.3 + 0.3 = 0 error
     * Mutates pointContainer
     */
    ErrorDiffusionArray.prototype.quantize = function (pointContainer, palette) {
        var pointArray, originalPoint, width, height, errorLines, dir, maxErrorLines, _a, _b, kernel, kernelErrorLines, i, tracker, y, lni, xStart, xEnd, errorLine, x, idx, point$$1, error, correctedPoint, palettePoint, dist, er, eg, eb, ea, dStart, dEnd, i, x1, y1, d, e, e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    pointArray = pointContainer.getPointArray();
                    originalPoint = new point.Point();
                    width = pointContainer.getWidth();
                    height = pointContainer.getHeight();
                    errorLines = [];
                    dir = 1;
                    maxErrorLines = 1;
                    try {
                        // initial error lines (number is taken from dithering kernel)
                        for (_a = __values(this._kernel), _b = _a.next(); !_b.done; _b = _a.next()) {
                            kernel = _b.value;
                            kernelErrorLines = kernel[2] + 1;
                            if (maxErrorLines < kernelErrorLines)
                                maxErrorLines = kernelErrorLines;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    for (i = 0; i < maxErrorLines; i++) {
                        this._fillErrorLine(errorLines[i] = [], width);
                    }
                    tracker = new progressTracker.ProgressTracker(height, 99);
                    y = 0;
                    _d.label = 1;
                case 1:
                    if (!(y < height)) return [3 /*break*/, 5];
                    if (!tracker.shouldNotify(y)) return [3 /*break*/, 3];
                    return [4 /*yield*/, {
                            progress: tracker.progress,
                        }];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    // always serpentine
                    if (this._serpentine)
                        dir = dir * -1;
                    lni = y * width;
                    xStart = dir === 1 ? 0 : width - 1;
                    xEnd = dir === 1 ? width : -1;
                    // cyclic shift with erasing
                    this._fillErrorLine(errorLines[0], width);
                    // TODO: why it is needed to cast types here?
                    errorLines.push(errorLines.shift());
                    errorLine = errorLines[0];
                    for (x = xStart, idx = lni + xStart; x !== xEnd; x += dir, idx += dir) {
                        point$$1 = pointArray[idx];
                        error = errorLine[x];
                        originalPoint.from(point$$1);
                        correctedPoint = point.Point.createByRGBA(arithmetic.inRange0to255Rounded(point$$1.r + error[0]), arithmetic.inRange0to255Rounded(point$$1.g + error[1]), arithmetic.inRange0to255Rounded(point$$1.b + error[2]), arithmetic.inRange0to255Rounded(point$$1.a + error[3]));
                        palettePoint = palette.getNearestColor(this._distance, correctedPoint);
                        point$$1.from(palettePoint);
                        // dithering strength
                        if (this._minColorDistance) {
                            dist = this._distance.calculateNormalized(point$$1, palettePoint);
                            if (dist < this._minColorDistance)
                                continue;
                        }
                        er = void 0;
                        eg = void 0;
                        eb = void 0;
                        ea = void 0;
                        if (this._calculateErrorLikeGIMP) {
                            er = correctedPoint.r - palettePoint.r;
                            eg = correctedPoint.g - palettePoint.g;
                            eb = correctedPoint.b - palettePoint.b;
                            ea = correctedPoint.a - palettePoint.a;
                        }
                        else {
                            er = originalPoint.r - palettePoint.r;
                            eg = originalPoint.g - palettePoint.g;
                            eb = originalPoint.b - palettePoint.b;
                            ea = originalPoint.a - palettePoint.a;
                        }
                        dStart = dir === 1 ? 0 : this._kernel.length - 1;
                        dEnd = dir === 1 ? this._kernel.length : -1;
                        for (i = dStart; i !== dEnd; i += dir) {
                            x1 = this._kernel[i][1] * dir;
                            y1 = this._kernel[i][2];
                            if (x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height) {
                                d = this._kernel[i][0];
                                e = errorLines[y1][x1 + x];
                                e[0] = e[0] + er * d;
                                e[1] = e[1] + eg * d;
                                e[2] = e[2] + eb * d;
                                e[3] = e[3] + ea * d;
                            }
                        }
                    }
                    _d.label = 4;
                case 4:
                    y++;
                    return [3 /*break*/, 1];
                case 5: return [4 /*yield*/, {
                        pointContainer: pointContainer,
                        progress: 100,
                    }];
                case 6:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    };
    ErrorDiffusionArray.prototype._fillErrorLine = function (errorLine, width) {
        // shrink
        if (errorLine.length > width) {
            errorLine.length = width;
        }
        // reuse existing arrays
        var l = errorLine.length;
        for (var i = 0; i < l; i++) {
            var error = errorLine[i];
            error[0] = error[1] = error[2] = error[3] = 0;
        }
        // create missing arrays
        for (var i = l; i < width; i++) {
            errorLine[i] = [0.0, 0.0, 0.0, 0.0];
        }
    };
    ErrorDiffusionArray.prototype._setKernel = function (kernel) {
        switch (kernel) {
            case ErrorDiffusionArrayKernel.FloydSteinberg:
                this._kernel = [
                    [7 / 16, 1, 0],
                    [3 / 16, -1, 1],
                    [5 / 16, 0, 1],
                    [1 / 16, 1, 1],
                ];
                break;
            case ErrorDiffusionArrayKernel.FalseFloydSteinberg:
                this._kernel = [
                    [3 / 8, 1, 0],
                    [3 / 8, 0, 1],
                    [2 / 8, 1, 1],
                ];
                break;
            case ErrorDiffusionArrayKernel.Stucki:
                this._kernel = [
                    [8 / 42, 1, 0],
                    [4 / 42, 2, 0],
                    [2 / 42, -2, 1],
                    [4 / 42, -1, 1],
                    [8 / 42, 0, 1],
                    [4 / 42, 1, 1],
                    [2 / 42, 2, 1],
                    [1 / 42, -2, 2],
                    [2 / 42, -1, 2],
                    [4 / 42, 0, 2],
                    [2 / 42, 1, 2],
                    [1 / 42, 2, 2],
                ];
                break;
            case ErrorDiffusionArrayKernel.Atkinson:
                this._kernel = [
                    [1 / 8, 1, 0],
                    [1 / 8, 2, 0],
                    [1 / 8, -1, 1],
                    [1 / 8, 0, 1],
                    [1 / 8, 1, 1],
                    [1 / 8, 0, 2],
                ];
                break;
            case ErrorDiffusionArrayKernel.Jarvis:
                this._kernel = [
                    [7 / 48, 1, 0],
                    [5 / 48, 2, 0],
                    [3 / 48, -2, 1],
                    [5 / 48, -1, 1],
                    [7 / 48, 0, 1],
                    [5 / 48, 1, 1],
                    [3 / 48, 2, 1],
                    [1 / 48, -2, 2],
                    [3 / 48, -1, 2],
                    [5 / 48, 0, 2],
                    [3 / 48, 1, 2],
                    [1 / 48, 2, 2],
                ];
                break;
            case ErrorDiffusionArrayKernel.Burkes:
                this._kernel = [
                    [8 / 32, 1, 0],
                    [4 / 32, 2, 0],
                    [2 / 32, -2, 1],
                    [4 / 32, -1, 1],
                    [8 / 32, 0, 1],
                    [4 / 32, 1, 1],
                    [2 / 32, 2, 1],
                ];
                break;
            case ErrorDiffusionArrayKernel.Sierra:
                this._kernel = [
                    [5 / 32, 1, 0],
                    [3 / 32, 2, 0],
                    [2 / 32, -2, 1],
                    [4 / 32, -1, 1],
                    [5 / 32, 0, 1],
                    [4 / 32, 1, 1],
                    [2 / 32, 2, 1],
                    [2 / 32, -1, 2],
                    [3 / 32, 0, 2],
                    [2 / 32, 1, 2],
                ];
                break;
            case ErrorDiffusionArrayKernel.TwoSierra:
                this._kernel = [
                    [4 / 16, 1, 0],
                    [3 / 16, 2, 0],
                    [1 / 16, -2, 1],
                    [2 / 16, -1, 1],
                    [3 / 16, 0, 1],
                    [2 / 16, 1, 1],
                    [1 / 16, 2, 1],
                ];
                break;
            case ErrorDiffusionArrayKernel.SierraLite:
                this._kernel = [
                    [2 / 4, 1, 0],
                    [1 / 4, -1, 1],
                    [1 / 4, 0, 1],
                ];
                break;
            default:
                throw new Error('ErrorDiffusionArray: unknown kernel = ' + kernel);
        }
    };
    return ErrorDiffusionArray;
}(imageQuantizer.AbstractImageQuantizer));
exports.ErrorDiffusionArray = ErrorDiffusionArray;

});

unwrapExports(array);
var array_1 = array.ErrorDiffusionArrayKernel;
var array_2 = array.ErrorDiffusionArray;

var hilbertCurve_1 = createCommonjsModule(function (module, exports) {
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });

var Direction;
(function (Direction) {
    Direction[Direction["NONE"] = 0] = "NONE";
    Direction[Direction["UP"] = 1] = "UP";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
    Direction[Direction["DOWN"] = 4] = "DOWN";
})(Direction || (Direction = {}));
function hilbertCurve(width, height, callback) {
    var maxBound, level, tracker, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                maxBound = Math.max(width, height);
                level = Math.floor(Math.log(maxBound) / Math.log(2) + 1);
                tracker = new progressTracker.ProgressTracker(width * height, 99);
                data = {
                    width: width,
                    height: height,
                    level: level,
                    callback: callback,
                    tracker: tracker,
                    index: 0,
                    x: 0,
                    y: 0,
                };
                return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 1:
                _a.sent();
                visit(data, Direction.NONE);
                return [2 /*return*/];
        }
    });
}
exports.hilbertCurve = hilbertCurve;
function walkHilbert(data, direction) {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (data.level < 1)
                    return [2 /*return*/];
                if (!data.tracker.shouldNotify(data.index)) return [3 /*break*/, 2];
                return [4 /*yield*/, { progress: data.tracker.progress }];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                data.level--;
                _a = direction;
                switch (_a) {
                    case Direction.LEFT: return [3 /*break*/, 3];
                    case Direction.RIGHT: return [3 /*break*/, 8];
                    case Direction.UP: return [3 /*break*/, 13];
                    case Direction.DOWN: return [3 /*break*/, 18];
                }
                return [3 /*break*/, 23];
            case 3: return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 4:
                _b.sent();
                visit(data, Direction.RIGHT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.LEFT))];
            case 5:
                _b.sent();
                visit(data, Direction.DOWN);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.LEFT))];
            case 6:
                _b.sent();
                visit(data, Direction.LEFT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.DOWN))];
            case 7:
                _b.sent();
                return [3 /*break*/, 24];
            case 8: return [5 /*yield**/, __values(walkHilbert(data, Direction.DOWN))];
            case 9:
                _b.sent();
                visit(data, Direction.LEFT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.RIGHT))];
            case 10:
                _b.sent();
                visit(data, Direction.UP);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.RIGHT))];
            case 11:
                _b.sent();
                visit(data, Direction.RIGHT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 12:
                _b.sent();
                return [3 /*break*/, 24];
            case 13: return [5 /*yield**/, __values(walkHilbert(data, Direction.LEFT))];
            case 14:
                _b.sent();
                visit(data, Direction.DOWN);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 15:
                _b.sent();
                visit(data, Direction.RIGHT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 16:
                _b.sent();
                visit(data, Direction.UP);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.RIGHT))];
            case 17:
                _b.sent();
                return [3 /*break*/, 24];
            case 18: return [5 /*yield**/, __values(walkHilbert(data, Direction.RIGHT))];
            case 19:
                _b.sent();
                visit(data, Direction.UP);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.DOWN))];
            case 20:
                _b.sent();
                visit(data, Direction.LEFT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.DOWN))];
            case 21:
                _b.sent();
                visit(data, Direction.DOWN);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.LEFT))];
            case 22:
                _b.sent();
                return [3 /*break*/, 24];
            case 23: return [3 /*break*/, 24];
            case 24:
                data.level++;
                return [2 /*return*/];
        }
    });
}
function visit(data, direction) {
    if (data.x >= 0 && data.x < data.width && data.y >= 0 && data.y < data.height) {
        data.callback(data.x, data.y);
        data.index++;
    }
    switch (direction) {
        case Direction.LEFT:
            data.x--;
            break;
        case Direction.RIGHT:
            data.x++;
            break;
        case Direction.UP:
            data.y--;
            break;
        case Direction.DOWN:
            data.y++;
            break;
    }
}

});

unwrapExports(hilbertCurve_1);
var hilbertCurve_2 = hilbertCurve_1.hilbertCurve;

var riemersma = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * MIT License
 *
 * Copyright 2015-2018 Igor Bezkrovnyi
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * riemersma.ts - part of Image Quantization Library
 */




var ErrorDiffusionRiemersma = /** @class */ (function (_super) {
    __extends(ErrorDiffusionRiemersma, _super);
    function ErrorDiffusionRiemersma(colorDistanceCalculator, errorQueueSize, errorPropagation) {
        if (errorQueueSize === void 0) { errorQueueSize = 16; }
        if (errorPropagation === void 0) { errorPropagation = 1; }
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        _this._errorQueueSize = errorQueueSize;
        _this._weights = ErrorDiffusionRiemersma._createWeights(errorPropagation, errorQueueSize);
        return _this;
    }
    /**
     * Mutates pointContainer
     */
    ErrorDiffusionRiemersma.prototype.quantize = function (pointContainer, palette) {
        var _this = this;
        var pointArray, width, height, errorQueue, head, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pointArray = pointContainer.getPointArray();
                    width = pointContainer.getWidth();
                    height = pointContainer.getHeight();
                    errorQueue = [];
                    head = 0;
                    for (i = 0; i < this._errorQueueSize; i++) {
                        errorQueue[i] = { r: 0, g: 0, b: 0, a: 0 };
                    }
                    return [5 /*yield**/, __values(hilbertCurve_1.hilbertCurve(width, height, function (x, y) {
                            var p = pointArray[x + y * width];
                            var r = p.r;
                            var g = p.g;
                            var b = p.b;
                            var a = p.a;
                            for (var i = 0; i < _this._errorQueueSize; i++) {
                                var weight = _this._weights[i];
                                var e = errorQueue[(i + head) % _this._errorQueueSize];
                                r += e.r * weight;
                                g += e.g * weight;
                                b += e.b * weight;
                                a += e.a * weight;
                            }
                            var correctedPoint = point.Point.createByRGBA(arithmetic.inRange0to255Rounded(r), arithmetic.inRange0to255Rounded(g), arithmetic.inRange0to255Rounded(b), arithmetic.inRange0to255Rounded(a));
                            var quantizedPoint = palette.getNearestColor(_this._distance, correctedPoint);
                            // update head and calculate tail
                            head = (head + 1) % _this._errorQueueSize;
                            var tail = (head + _this._errorQueueSize - 1) % _this._errorQueueSize;
                            // update error with new value
                            errorQueue[tail].r = p.r - quantizedPoint.r;
                            errorQueue[tail].g = p.g - quantizedPoint.g;
                            errorQueue[tail].b = p.b - quantizedPoint.b;
                            errorQueue[tail].a = p.a - quantizedPoint.a;
                            // update point
                            p.from(quantizedPoint);
                        }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, {
                            pointContainer: pointContainer,
                            progress: 100,
                        }];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    ErrorDiffusionRiemersma._createWeights = function (errorPropagation, errorQueueSize) {
        var weights = [];
        var multiplier = Math.exp(Math.log(errorQueueSize) / (errorQueueSize - 1));
        for (var i = 0, next = 1; i < errorQueueSize; i++) {
            weights[i] = (((next + 0.5) | 0) / errorQueueSize) * errorPropagation;
            next *= multiplier;
        }
        return weights;
    };
    return ErrorDiffusionRiemersma;
}(imageQuantizer.AbstractImageQuantizer));
exports.ErrorDiffusionRiemersma = ErrorDiffusionRiemersma;

});

unwrapExports(riemersma);
var riemersma_1 = riemersma.ErrorDiffusionRiemersma;

var image = createCommonjsModule(function (module, exports) {
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */
Object.defineProperty(exports, "__esModule", { value: true });

exports.AbstractImageQuantizer = imageQuantizer.AbstractImageQuantizer;

exports.NearestColor = nearestColor.NearestColor;

exports.ErrorDiffusionArray = array.ErrorDiffusionArray;
exports.ErrorDiffusionArrayKernel = array.ErrorDiffusionArrayKernel;

exports.ErrorDiffusionRiemersma = riemersma.ErrorDiffusionRiemersma;

});

unwrapExports(image);
var image_1 = image.AbstractImageQuantizer;
var image_2 = image.NearestColor;
var image_3 = image.ErrorDiffusionArray;
var image_4 = image.ErrorDiffusionArrayKernel;
var image_5 = image.ErrorDiffusionRiemersma;

var ssim_1 = createCommonjsModule(function (module, exports) {
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });

// based on https://github.com/rhys-e/structural-similarity
// http://en.wikipedia.org/wiki/Structural_similarity
var K1 = 0.01; // tslint:disable-line:naming-convention
var K2 = 0.03; // tslint:disable-line:naming-convention
function ssim(image1, image2) {
    if (image1.getHeight() !== image2.getHeight() || image1.getWidth() !== image2.getWidth()) {
        throw new Error('Images have different sizes!');
    }
    var bitsPerComponent = 8;
    var L = (1 << bitsPerComponent) - 1; // tslint:disable-line:naming-convention
    var c1 = Math.pow((K1 * L), 2);
    var c2 = Math.pow((K2 * L), 2);
    var numWindows = 0;
    var mssim = 0.0;
    // calculate ssim for each window
    iterate(image1, image2, function (lumaValues1, lumaValues2, averageLumaValue1, averageLumaValue2) {
        // calculate variance and covariance
        var sigxy = 0.0;
        var sigsqx = 0.0;
        var sigsqy = 0.0;
        for (var i = 0; i < lumaValues1.length; i++) {
            sigsqx += Math.pow((lumaValues1[i] - averageLumaValue1), 2);
            sigsqy += Math.pow((lumaValues2[i] - averageLumaValue2), 2);
            sigxy += (lumaValues1[i] - averageLumaValue1) * (lumaValues2[i] - averageLumaValue2);
        }
        var numPixelsInWin = lumaValues1.length - 1;
        sigsqx /= numPixelsInWin;
        sigsqy /= numPixelsInWin;
        sigxy /= numPixelsInWin;
        // perform ssim calculation on window
        var numerator = (2 * averageLumaValue1 * averageLumaValue2 + c1) * (2 * sigxy + c2);
        var denominator = (Math.pow(averageLumaValue1, 2) + Math.pow(averageLumaValue2, 2) + c1) * (sigsqx + sigsqy + c2);
        var ssim = numerator / denominator;
        mssim += ssim;
        numWindows++;
    });
    return mssim / numWindows;
}
exports.ssim = ssim;
function iterate(image1, image2, callback) {
    var windowSize = 8;
    var width = image1.getWidth();
    var height = image1.getHeight();
    for (var y = 0; y < height; y += windowSize) {
        for (var x = 0; x < width; x += windowSize) {
            // avoid out-of-width/height
            var windowWidth = Math.min(windowSize, width - x);
            var windowHeight = Math.min(windowSize, height - y);
            var lumaValues1 = calculateLumaValuesForWindow(image1, x, y, windowWidth, windowHeight);
            var lumaValues2 = calculateLumaValuesForWindow(image2, x, y, windowWidth, windowHeight);
            var averageLuma1 = calculateAverageLuma(lumaValues1);
            var averageLuma2 = calculateAverageLuma(lumaValues2);
            callback(lumaValues1, lumaValues2, averageLuma1, averageLuma2);
        }
    }
}
function calculateLumaValuesForWindow(image, x, y, width, height) {
    var pointArray = image.getPointArray();
    var lumaValues = [];
    var counter = 0;
    for (var j = y; j < y + height; j++) {
        var offset = j * image.getWidth();
        for (var i = x; i < x + width; i++) {
            var point = pointArray[offset + i];
            lumaValues[counter] = point.r * bt709.Y.RED + point.g * bt709.Y.GREEN + point.b * bt709.Y.BLUE;
            counter++;
        }
    }
    return lumaValues;
}
function calculateAverageLuma(lumaValues) {
    var sumLuma = 0.0;
    try {
        for (var lumaValues_1 = __values(lumaValues), lumaValues_1_1 = lumaValues_1.next(); !lumaValues_1_1.done; lumaValues_1_1 = lumaValues_1.next()) {
            var luma = lumaValues_1_1.value;
            sumLuma += luma;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lumaValues_1_1 && !lumaValues_1_1.done && (_a = lumaValues_1.return)) _a.call(lumaValues_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return sumLuma / lumaValues.length;
    var e_1, _a;
}

});

unwrapExports(ssim_1);
var ssim_2 = ssim_1.ssim;

var quality = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */

exports.ssim = ssim_1.ssim;

});

unwrapExports(quality);
var quality_1 = quality.ssim;

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_core.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

var process = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process) == 'process') {
    defer = function (id) {
      process.nextTick(_ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(_ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
    defer = function (id) {
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function (id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};

_export(_export.G + _export.B, {
  setImmediate: _task.set,
  clearImmediate: _task.clear
});

var setImmediate = _core.setImmediate;

var basicAPI = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * helper.ts - part of Image Quantization Library
 */



var palette = palette$2;
function buildPaletteSync(images, _a) {
    var _b = _a === void 0 ? {} : _a, colorDistanceFormula = _b.colorDistanceFormula, paletteQuantization = _b.paletteQuantization, colors = _b.colors;
    var distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
    var paletteQuantizer = paletteQuantizationToPaletteQuantizer(distanceCalculator, paletteQuantization, colors);
    images.forEach(function (image$$1) { return paletteQuantizer.sample(image$$1); });
    return paletteQuantizer.quantizeSync();
}
exports.buildPaletteSync = buildPaletteSync;
function buildPalette(images, _a) {
    var _b = _a === void 0 ? {} : _a, colorDistanceFormula = _b.colorDistanceFormula, paletteQuantization = _b.paletteQuantization, colors = _b.colors, onProgress = _b.onProgress;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
                    var paletteQuantizer = paletteQuantizationToPaletteQuantizer(distanceCalculator, paletteQuantization, colors);
                    images.forEach(function (image$$1) { return paletteQuantizer.sample(image$$1); });
                    var palette;
                    var timerId;
                    var iterator = paletteQuantizer.quantize();
                    var next = function () {
                        try {
                            var result = iterator.next();
                            if (result.done) {
                                resolve(palette);
                            }
                            else {
                                if (result.value.palette)
                                    palette = result.value.palette;
                                if (onProgress)
                                    onProgress(result.value.progress);
                                timerId = setImmediate(next);
                            }
                        }
                        catch (error) {
                            clearTimeout(timerId);
                            reject(error);
                        }
                    };
                    timerId = setImmediate(next);
                })];
        });
    });
}
exports.buildPalette = buildPalette;
function applyPaletteSync(image$$1, palette, _a) {
    var _b = _a === void 0 ? {} : _a, colorDistanceFormula = _b.colorDistanceFormula, imageQuantization = _b.imageQuantization;
    var distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
    var imageQuantizer = imageQuantizationToImageQuantizer(distanceCalculator, imageQuantization);
    return imageQuantizer.quantizeSync(image$$1, palette);
}
exports.applyPaletteSync = applyPaletteSync;
function applyPalette(image$$1, palette, _a) {
    var _b = _a === void 0 ? {} : _a, colorDistanceFormula = _b.colorDistanceFormula, imageQuantization = _b.imageQuantization, onProgress = _b.onProgress;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
                    var imageQuantizer = imageQuantizationToImageQuantizer(distanceCalculator, imageQuantization);
                    var outPointContainer;
                    var timerId;
                    var iterator = imageQuantizer.quantize(image$$1, palette);
                    var next = function () {
                        try {
                            var result = iterator.next();
                            if (result.done) {
                                resolve(outPointContainer);
                            }
                            else {
                                if (result.value.pointContainer)
                                    outPointContainer = result.value.pointContainer;
                                if (onProgress)
                                    onProgress(result.value.progress);
                                timerId = setImmediate(next);
                            }
                        }
                        catch (error) {
                            clearTimeout(timerId);
                            reject(error);
                        }
                    };
                    timerId = setImmediate(next);
                })];
        });
    });
}
exports.applyPalette = applyPalette;
function colorDistanceFormulaToColorDistance(colorDistanceFormula) {
    if (colorDistanceFormula === void 0) { colorDistanceFormula = 'euclidean-bt709'; }
    switch (colorDistanceFormula) {
        case 'cie94-graphic-arts': return new distance.CIE94GraphicArts();
        case 'cie94-textiles': return new distance.CIE94Textiles();
        case 'ciede2000': return new distance.CIEDE2000();
        case 'color-metric': return new distance.CMetric();
        case 'euclidean': return new distance.Euclidean();
        case 'euclidean-bt709': return new distance.EuclideanBT709();
        case 'euclidean-bt709-noalpha': return new distance.EuclideanBT709NoAlpha();
        case 'manhattan': return new distance.Manhattan();
        case 'manhattan-bt709': return new distance.ManhattanBT709();
        case 'manhattan-nommyde': return new distance.ManhattanNommyde();
        case 'pngquant': return new distance.PNGQuant();
        default: throw new Error("Unknown colorDistanceFormula " + colorDistanceFormula);
    }
}
function imageQuantizationToImageQuantizer(distanceCalculator, imageQuantization) {
    if (imageQuantization === void 0) { imageQuantization = 'floyd-steinberg'; }
    switch (imageQuantization) {
        case 'nearest': return new image.NearestColor(distanceCalculator);
        case 'riemersma': return new image.ErrorDiffusionRiemersma(distanceCalculator);
        case 'floyd-steinberg': return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.FloydSteinberg);
        case 'false-floyd-steinberg': return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.FalseFloydSteinberg);
        case 'stucki': return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Stucki);
        case 'atkinson': return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Atkinson);
        case 'jarvis': return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Jarvis);
        case 'burkes': return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Burkes);
        case 'sierra': return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.Sierra);
        case 'two-sierra': return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.TwoSierra);
        case 'sierra-lite': return new image.ErrorDiffusionArray(distanceCalculator, image.ErrorDiffusionArrayKernel.SierraLite);
        default: throw new Error("Unknown imageQuantization " + imageQuantization);
    }
}
function paletteQuantizationToPaletteQuantizer(distanceCalculator, paletteQuantization, colors) {
    if (paletteQuantization === void 0) { paletteQuantization = 'wuquant'; }
    if (colors === void 0) { colors = 256; }
    switch (paletteQuantization) {
        case 'neuquant': return new palette.NeuQuant(distanceCalculator, colors);
        case 'rgbquant': return new palette.RGBQuant(distanceCalculator, colors);
        case 'wuquant': return new palette.WuQuant(distanceCalculator, colors);
        case 'neuquant-float': return new palette.NeuQuantFloat(distanceCalculator, colors);
        default: throw new Error("Unknown paletteQuantization " + paletteQuantization);
    }
}

});

unwrapExports(basicAPI);
var basicAPI_1 = basicAPI.buildPaletteSync;
var basicAPI_2 = basicAPI.buildPalette;
var basicAPI_3 = basicAPI.applyPaletteSync;
var basicAPI_4 = basicAPI.applyPalette;

var imageQ = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */

exports.constants = constants;

exports.conversion = conversion;

exports.distance = distance;

exports.palette = palette$2;

exports.image = image;

exports.quality = quality;

exports.utils = utils;

exports.buildPalette = basicAPI.buildPalette;
exports.buildPaletteSync = basicAPI.buildPaletteSync;
exports.applyPalette = basicAPI.applyPalette;
exports.applyPaletteSync = basicAPI.applyPaletteSync;

});

var imageQ$1 = unwrapExports(imageQ);
var imageQ_1 = imageQ.constants;
var imageQ_2 = imageQ.conversion;
var imageQ_3 = imageQ.distance;
var imageQ_4 = imageQ.palette;
var imageQ_5 = imageQ.image;
var imageQ_6 = imageQ.quality;
var imageQ_7 = imageQ.utils;
var imageQ_8 = imageQ.buildPalette;
var imageQ_9 = imageQ.buildPaletteSync;
var imageQ_10 = imageQ.applyPalette;
var imageQ_11 = imageQ.applyPaletteSync;

exports.default = imageQ$1;
exports.constants = imageQ_1;
exports.conversion = imageQ_2;
exports.distance = imageQ_3;
exports.palette = imageQ_4;
exports.image = imageQ_5;
exports.quality = imageQ_6;
exports.utils = imageQ_7;
exports.buildPalette = imageQ_8;
exports.buildPaletteSync = imageQ_9;
exports.applyPalette = imageQ_10;
exports.applyPaletteSync = imageQ_11;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=image-q.js.map
