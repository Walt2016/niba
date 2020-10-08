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
    }
    // //连线
    // line(ctx = this.ctx) {
    //     let {
    //         fillStyle = "#FF0000",
    //             strokeStyle = "#FF0000",
    //             closePath = true,
    //             points,
    //             color,
    //             fill,
    //             lineWidth = 1
    //     } = this
    //     ctx.fillStyle = color || fillStyle
    //     ctx.strokeStyle = color || strokeStyle;
    //     ctx.lineWidth = lineWidth

    //     ctx.beginPath();
    //     points.forEach((t, i) => {
    //         ctx[i == 0 ? 'moveTo' : 'lineTo'].apply(ctx, t)
    //     });

    //     if (closePath) {
    //         ctx.closePath();
    //     }
    //     ctx.stroke()
    //     if (fill) {
    //         ctx.fill()
    //     }
    // };

    // draw(ctx = this.ctx) {
    //     // this.line(ctx)
    //     this._draw.line.call(this,ctx)
    //     this.showController && this.drawController(ctx)
    //     return this
    // }

    // drawSVG() {
    //     // console.log(this._points)

    //     // let d = this._points.map((t, index) => {
    //     //     return (index === 0 ? "M" : "L") + t.join(" ")
    //     // }).concat(["z"]).join(" ")
    //     // // console.log(d)
    //     // // svg && svg.appendPath(d)
    //     // this._draw.appendPath(d)
        
    // }
}