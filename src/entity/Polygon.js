// 多边形
import BaseEntity from './BaseEntity'
import {
    ArcSeg
} from '../points'
export default class Polygon extends BaseEntity {
    constructor(options) {
        super(options)
        this.setPoints(new ArcSeg(options))
    }
    update(options) {
        Object.assign(this, options)
        return this.setPoints(new ArcSeg(this))
        // return this.setPoints(new ArcSeg(options))
    }
    //连线
    line(ctx) {
        let {
            fillStyle = "#FF0000",
                strokeStyle = "#FF0000",
                closePath = true,
                points,
                color,
                fill,
                lineWidth = 1
        } = this
        ctx.fillStyle = color || fillStyle
        ctx.strokeStyle = color || strokeStyle;
        ctx.lineWidth = lineWidth

        ctx.beginPath();
        points.forEach((t, i) => {
            ctx[i == 0 ? 'moveTo' : 'lineTo'].apply(ctx, t)
        });

        if (closePath) {
            ctx.closePath();
        }
        ctx.stroke()
        if (fill) {
            ctx.fill()
        }
    };
    // update(ctx) {
    //     // this.tx += this.vx
    //     // this.ty += this.vy
    //     // ctx.translate(this.tx, this.ty)
    // }

    draw(ctx = this.ctx) {
        this.line(ctx)
        if (this.showController) {
            this.drawController(ctx)
        }
        return this
    }
}