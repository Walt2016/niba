// 曲线云点
import _ from "../utils"
import PolarSeg from "./PolarSeg"
export default class CurveSeg extends PolarSeg{
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
            let r2 = r +0.5* r * _.sin(4 * (a + this.phi));
            // 心 heard curve
            // r2=r+r*0.5 *(1+_.sin(a + this.phi))
            // 螺旋线spiral curve
            r2=0.5*(a ) + r*_.sin (this.phi)
            points[i] = _.polar(o, r2, a)
        }
        return points
    }

}