// 曲线云点
import {
    _sin,
    _cos,
    _polar
} from "../utils"
import PolarSeg from "./PolarSeg"
export default class RoseCurveSeg extends PolarSeg{
    constructor(options) {
        super(options)
        this.points = this.seg()
        // this.phi = 0
        console.log(this)
    }
    seg() {
        let {
            o,
            r,
            n,
            a1,
            a2
        } = this
        this.phi++
        let points = [];
        for (let i = 0; i < n; i++) {
            let a = a1 + i * (a2 - a1) / n
            // 四叶玫瑰线four leaved rose curve
            let r2 = r +0.5* r * _sin(4 * (a + this.phi));
            points[i] = _polar(o, r2, a)
        }
        return points
    }

}