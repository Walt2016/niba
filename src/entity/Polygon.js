// 多边形
import BaseEntity from './BaseEntity'
import {
    ArcSeg
} from '../points'
export default class Polygon extends BaseEntity {
    constructor(options) {
        super(options)
        Object.assign(this, new ArcSeg(options))
    }
    //连线
    line(ctx) {
        let {
            fillStyle,
            strokeStyle = "#FF0000",
            closePath = true,
            colors,
            index = 0,
            points,
            color
        } = this
        if(color) fillStyle=color
        if (colors)
            strokeStyle = colors[index]
        if (fillStyle) ctx.fillStyle = fillStyle //"white"
        ctx.strokeStyle = color||strokeStyle;

        ctx.beginPath();
        points.forEach((t, i) => {
            ctx[i == 0 ? 'moveTo' : 'lineTo'].apply(ctx, t)
        });

        if (closePath)
            ctx.closePath();
        ctx.stroke()
        if (fillStyle) ctx.fill()
    };
    draw(ctx) {
        this.line(ctx)
    }
}
