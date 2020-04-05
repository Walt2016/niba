//小球
import BaseEntity from './BaseEntity'
import {
    ArcSeg
} from '../points'
export default class Ball extends BaseEntity { //(x, y, width, height) 
    constructor(options) {
        super(options)
        Object.assign(this, new ArcSeg(options))
    }

    draw(ctx) {
        ctx.strokeStyle = this.color || "#0000ff";
        ctx.fillStyle = this.color || "#0000ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r || 3, 0, 2 * Math.PI);
        ctx.stroke();
        if (this.fill) {
            ctx.fill();
        }


        // ctx.save();
        // // ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
        // ctx.translate(this.x, this.y);
        // ctx.arc(0, 0, this.r || 3, 0, 2 * Math.PI);
        // ctx.restore();
    }

}