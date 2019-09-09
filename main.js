let r,g,b;

const root = document.documentElement;
const list = document.querySelectorAll(".values");
console.log(list);
const colorInput = document.querySelector("#picker");
console.log(colorInput)

const changeValue = () => {

let hex = colorInput.value;
  let rgb = hexToRGB(hex);
  let hsl = RGBToHSL(hex);


  root.style.setProperty("--color", hex);
  list[1].textContent = hex;
  list[0].textContent = rgb;
  list[2].textContent = hsl;
}

function hexToRGB(val){
    r = "0x" + val[1] + val[2];
    g = "0x" + val[3] + val[4];
    b = "0x" + val[5] + val[6];

    return " " + +r + "," + +g + "," + +b;
}

function RGBToHSL(){
    
    r /= 255;
    g /= 255;
    b /= 255;
      
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


    s =+ (s * 100).toFixed(1);
    l =+ (l * 100).toFixed(1);

    return + h + "°," + s + "%," + l + "%";

}

changeValue();

colorInput.addEventListener("change", changeValue);