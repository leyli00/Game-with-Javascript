// setup canvas
var c = document.createElement("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.body.appendChild(c);

var pts = [];
while(pts.length < 255){
    while(pts.includes(val = Math.floor(Math.random()*254)));
    pts.push(val);
}

// 255 lik  indislerin il değeri ile son değeri birbirine denk geldiğinde keskin bir çizgi oluşuyor, çünkü bu iki adım arasında lerp geçemeyecek. O çizgiyi orataden kaldırmak için indeks  sayısını 254 yaptık ve aşağıdaki şlemi uyguladık : (0.index ve 255.indeksin değerleir aynı oldu) 
pts.push(pts[0]);

console.table(pts);

var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t*Math.PI))/2; // a değerinden b değerine t adım sayısında git anlamına gelir.

var noise = x =>{
    x = x * 0.01 % 254;
    return lerp(pts[Math.floor(x)],pts[Math.ceil(x)],x - Math.floor(x));
}

// we should use context for drawing 2d figures on canvas.
var ctx = c.getContext("2d");


// init color
var bgColor = "#ff4301"; // orange
var foreColor = "#4a3f35"; // light grey
var lineColor = "#2f2519"; // dark grey
var lineWidth = 5;
var offset = -10;
var t = 0;


// draw
function draw(){
    t++;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,c.width,c.height);
    
    ctx.fillStyle = foreColor;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(offset,c.height-offset);

    for(let i = offset; i < c.width - offset; ++i){
        ctx.lineTo(i,c.height * .9 - noise(i + t) * .4); // upper line
    }

    ctx.lineTo(c.width-offset, c.height-offset);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    requestAnimationFrame(draw);
}

draw();


