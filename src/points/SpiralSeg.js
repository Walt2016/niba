// 曲线云点
import {
    _sin,
    _cos,
    _polar
} from "../utils"
import PolarSeg from "./PolarSeg"
export default class SpiralSeg extends PolarSeg {
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
            // 螺旋线spiral curve
            let r2 = 0.5 * (a) + r * _sin(this.phi)
            points[i] = _polar(o, r2, a)
        }
        return points
    }
}