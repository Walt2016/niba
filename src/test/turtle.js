// classe Turtle;

function Turtle(ctx) {
    this.ctx = ctx;
    this.ctx.strokeStyle = '#FFF';
    this.ctx.lineWidth = 2;
    this.x = maxx / 2;
    this.y = maxy / 2;
    this.dir = 0;       // upwards
  } //
  
  Turtle.prototype.setXY = function(x,y) {
    this.x = x;
    this.y = y;
  } // Turtle.prototype.setXY
  
  Turtle.prototype.setDir = function(dir) {
    this.dir = dir;
  } // Turtle.prototype.setXY
  
  Turtle.prototype.tr = function() { // turn right
    this.dir++;
    this.dir &= 3;
  } // Turtle.prototype.tr
  
  Turtle.prototype.tl = function() { // turn left
    this.dir--;
    this.dir &= 3;
  } // Turtle.prototype.tl
  
  Turtle.prototype.fwd = (function () { // forward
    const tbdx = [0, -1, 0, 1];
    const tbdy = [1, 0, -1, 0];
    return function(distance) {
      this.ctx.beginPath();
      this.ctx.moveTo (this.x, this.y);
      this.x += tbdx[this.dir] * distance;
      this.y += tbdy[this.dir] * distance;
      this.ctx.lineTo (this.x, this.y);
      this.ctx.stroke();
    }})(); // Turtle.prototype.fwd
  
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  
  export default Turtle