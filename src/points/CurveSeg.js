// 曲线云点
import {
    _sin,
    _cos,
    _polar
} from "../utils"
export default class CurveSeg {
    constructor(options) {
        let {
            o,
            r,
            n,
            sAngle = 0,
            eAngle = 360,
        } = options
        Object.assign(this, {
            sAngle: 0,
            eAngle: 360,
            phi:0
        }, options)
        this.points = this.seg(o, r, n, sAngle, eAngle)
        // this.phi = 0
    }
    seg() {
        let {
            o,
            r,
            n,
            sAngle,
            eAngle
        } = this
        this.phi++
        let points = [];
        for (let i = 0; i < n; i++) {
            let a = sAngle + i * (eAngle - sAngle) / n
            // 四叶玫瑰线four leaved rose curve
            let r2 = r +0.5* r * _sin(4 * (a + this.phi));
            // 心
            // r2=r+r*0.5 *(1+_sin(a + this.phi))
            // 螺旋线spiral
            r2=0.5*(a ) + r*_sin (this.phi)

            points[points.length] = _polar(o, r2, a)
        }
        return points
    }

}