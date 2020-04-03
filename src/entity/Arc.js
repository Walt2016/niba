// 弧线
import BaseEntity from "./BaseEntity";
import {
    ArcSeg
} from '../points'
import {
    _dis
} from '../utils'
export default class Arc extends BaseEntity {
    constructor(options) {
        super(options)
        Object.assign(this, new ArcSeg(options))
    }
    draw(ctx) {
        let {
            o,
            strokeStyle = "#FF0000",
            points,
            color
        } = this
        let len = points.length
        ctx.strokeStyle =color|| strokeStyle;
        ctx.beginPath();
        points.forEach((t, i) => {
            let t1 = i + 1 < len ? points[i + 1] : points[0];
            let r = _dis(t, t1) 
            ctx.moveTo.apply(ctx,t)
            ctx.arcTo.apply(ctx, o.concat(t1).concat([r]))
        })
        ctx.stroke()
    }
}