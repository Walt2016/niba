//小球
import BaseEntity from './BaseEntity'
class Ball extends BaseEntity { //(x, y, width, height) 
    constructor(options) {
        super(options)
    }
    update() {
        // this.move2()
        this.move()
        this.bounce();
    }
    
    draw(ctx) {
        ctx.fillStyle = "#0000ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        // ctx.stroke();
        ctx.fill();
    }
}

export default Ball