var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = 500;
var ch = c.height = 500;
var cx = cw / 2,
    cy = ch / 2;
var rad = Math.PI / 180;
var frames = 0;

var R = 80;

var A = 1.5;
var B = 1;
var K = 3;
var phi = 0;


function Draw() {
    phi++;
    ctx.fillStyle = "rgba(0,0,0,.15)";
    ctx.fillRect(0, 0, cw, ch);
    for (var a = 0; a < 360; a += 20) {

        var r = A * R + B * R * Math.sin(K * (a + phi) * rad); // K = 0,1,2,3,4,5,.....360...
        var x = cx + r * Math.cos(a * rad);
        var y = cy + r * Math.sin(a * rad);
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + a + ",100%, 50%)";
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
    }
    requestId = window.requestAnimationFrame(Draw);

}
requestId = window.requestAnimationFrame(Draw);