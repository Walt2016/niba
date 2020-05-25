// 弧线
import BaseEntity from "./BaseEntity";
import {
    ArcSeg
} from '../points'
import {
    _dis,
    _mid,
    _atan
} from '../utils'
export default class Arc extends BaseEntity {
    constructor(options) {
        super(options)
        this.setPoints(new ArcSeg(options))
    }
    draw(ctx) {
        let {
            o,
            strokeStyle = "#FF0000",
            fillStyle = "#FF0000",
            points,
            color,
            a1=0,
            fill
        } = this
        let len = points.length
        ctx.strokeStyle = color || strokeStyle;
        ctx.fillStyle = color || fillStyle
        ctx.beginPath();
        points.forEach((t, i) => {
            if(i==0)ctx.moveTo.apply(ctx,t)
            let t1 = i + 1 < len ? points[i + 1] : points[0];
            // let r = _dis(t, t1) 
            // ctx.moveTo.apply(ctx,t)
            // ctx.arcTo.apply(ctx, o.concat(t1).concat([r]))

            // var sAngle = a1 || 0;
            // var eAngle = eAngle || (sAngle + Math.PI)
            // var r = _dis(t, t1) / 2
            // var ot = _mid(t, t1)
            // ctx.arc.apply(ctx, ot.concat([r, sAngle, eAngle]))


            let a = _atan(t, t1) * Math.PI / 180
            let r = _dis(t, t1) / 2
            let ot = _mid(t, t1)
            ctx.arc.apply(ctx, ot.concat([r, a, a + Math.PI ]))
        })
        ctx.stroke()
        if (fill) {
            ctx.fill()
        }
    }
}