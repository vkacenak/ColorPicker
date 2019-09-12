let m,shiftedH, shiftedL,shiftedS;
let newHSL = [];
const root = document.documentElement;
const colorInput = document.querySelector("#picker");
const list = document.querySelectorAll(".values");
const harmony = document.querySelector(".harmony__select");
const boxes = document.querySelectorAll(".scheme__color__box");
const values = document.querySelectorAll(".scheme__color__values");
const HEXList = document.querySelectorAll(".HEX");
const RGBList = document.querySelectorAll(".RGB");
const HSLList = document.querySelectorAll(".HSL");




function init(){
// MAKE CONVERSIONS AND HARMONY OF A DEFAULT INPUT COLOR
baseHSL = changeValue();
controller(baseHSL);

//EVENT LISTENERS FOR CHANGING COLORS AND HARMONY
colorInput.addEventListener("change", function(){
    baseHSL = changeValue();
    controller(baseHSL);
}); 
harmony.addEventListener("change", function(){
    controller(baseHSL);
});


}

function controller(baseHSL) {
    // DECIDE WHICH HARMONY IS SELECTED
    harmonyType = harmony.options[harmony.selectedIndex].value;

    switch (harmonyType) {
        case "analogous":
            newHSL = analogous(baseHSL);
            break;
        case "monochromatic":
           newHSL = mono(baseHSL);
            break;
        case "triad":
            newHSL = triad(baseHSL);
            break;
        case "complementary":
            newHSL = complementary(baseHSL);
            break;
        case "compound":
            newHSL = compound(baseHSL);
            break;
        case "shades":
            newHSL = shades(baseHSL);
            break;

    }
    DOMChanges(newHSL);
}

function changeValue() {
// CHANGING AND CONVERTING BASE COLOR 
    let baseHEX = colorInput.value;
    let baseRGB = hexToRGB(baseHEX);
    console.log(baseRGB);
    let baseHSL = RGBToHSL(baseRGB);
    console.log(baseHSL);
    root.style.setProperty(`--color`, baseHEX);


    return baseHSL;
}
function DOMChanges(newHSL){
    // CHANGING THE BACKGROUNDS AND VALUES OF ALL BOXES
    for (i=0; i < 5; i++){
    boxes[i].style.backgroundColor = newHSL[i];
    newRGB = boxes[i].style.backgroundColor;
    
    HSLList[i].textContent = newHSL[i];
    RGBList[i].textContent = newRGB;
    newHEX = RGBToHex(newRGB);
    HEXList[i].textContent = newHEX;
    }
}

// HARMONIES
function analogous(baseHSL) {
    for (i=0; i < 5; i++){
        m = i-2;
        shiftedH = baseHSL.h - m*30;
        newHSL[i] = `hsl(${shiftedH},${baseHSL.s}%, ${baseHSL.l}%)`;
       
    }
    return newHSL;
}


function mono(baseHSL){
    for (i=0; i < 5; i++){
        m = i-2;
        shiftedL = baseHSL.l - m*30;
        newHSL[i] = `hsl(${baseHSL.h},${baseHSL.s}%, ${shiftedL}%)`;
    }
    return newHSL;
}
function triad(baseHSL){
    for (i=0; i < 5; i++){
        m = i-2;
        shiftedH = baseHSL.h - m*60;
        newHSL[i] = `hsl(${shiftedH},${baseHSL.s}%, ${baseHSL.l}%)`;
    }
    return newHSL;

}
function complementary(baseHSL){
    for (i=0; i < 5; i++){
        m = i-2;
        let shiftedH = baseHSL.h + 180*m;
        newHSL[i] = `hsl(${shiftedH},${baseHSL.s}%, ${baseHSL.l}%)`;
    }
    return newHSL;

}

function hexToRGB(val) {
    r = "0x" + val[1] + val[2];
    g = "0x" + val[3] + val[4];
    b = "0x" + val[5] + val[6];

    return {r,g,b};
}

function RGBToHSL(baseRGB) {

let r = baseRGB.r / 255,
    g = baseRGB.g / 255,
    b = baseRGB.b / 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;

    else if (cmax == r)
        h = ((g - b) / delta) % 6;

    else if (cmax == g)
        h = (b - r) / delta + 2;

    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);


    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;


    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));


    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        h,
        s,
        l
    };

}

function RGBToHex(rgb) {

console.log(rgb);
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
     // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    r = (+rgb[0]).toString(16);
      g = (+rgb[1]).toString(16);
      b = (+rgb[2]).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }


init();