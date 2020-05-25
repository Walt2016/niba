// 矩形
import {
    _sin,
    _cos
} from '../utils'
import BaseEntity from './BaseEntity'
import {
    ArcSeg
} from '../points'
let index=0
export default class Rect extends BaseEntity {
    constructor(options) {
        super(options)
        this.setPoints(new ArcSeg(options))

        
        this.rectWidth = this.r * _sin(this.a) *2
        this.rectHeight = this.r * _cos(this.a)*2
        // this.index=0
    }

    draw(ctx) {
        index++
        // ctx.save();
        ctx.beginPath();
        // ctx.fillStyle = "#FF0000"
        ctx.fillStyle = 'rgb(' + (51 * index) + ', ' + (255 - 51 * index) + ', 255)';
        // ctx.translate(this.x, this.y);
        // ctx.fillRect(0, 0, this.rectWidth, this.rectHeight);
        ctx.fillRect(this.x, this.y, this.rectWidth, this.rectHeight);
        // ctx.fill();
        // ctx.restore();
    }
}
