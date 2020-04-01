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
            points
        } = this
        let len = points.length
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        points.forEach((t, i) => {
            let t1 = i + 1 < len ? points[i + 1] : points[0];
            let r = _dis(t, t1, o)
            ctx.arcTo.apply(ctx, t.concat(t1).concat([r]))
        })
        ctx.stroke()
    }
}