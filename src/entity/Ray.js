//射线
//一中心p,多中心o [p1,p2]
import BaseEntity from './BaseEntity'
import {
    ArcSeg
} from '../points'
export default class Ray extends BaseEntity {
    constructor(options) {
        super(options)
        if (!this.points) {
            Object.assign(this, new ArcSeg(options))
        }

    }
    draw(ctx) {
        let {
            o,
            strokeStyle = "#000",
            colors,
            index = 0,
            points,
            color
        } = this
        if (colors) {
            ctx.strokeStyle = colors[index]
        } else {
            ctx.strokeStyle = color||strokeStyle;
        }

        ctx.beginPath();
        if (Array.isArray(o[0])) { //二维数组  多中心
            var n = o.length;
            points.forEach((t, i) => {
                ctx.moveTo.apply(ctx, o[i % n])
                ctx.lineTo.apply(ctx, t)
            })
        } else {
            points.forEach((t, i) => {
                ctx.moveTo.apply(ctx, o)
                ctx.lineTo.apply(ctx, t)
            })
        }
        ctx.stroke()

    }

}
