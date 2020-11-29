import _ from '../utils'
import BaseSvg from './baseSvg'
// 波形
export default class Waveform {
    constructor(p1, p2, options) {

        let {
            controller,
            radiusRatio = 1,
            angleOffset = 0,
            orient
        } = options
        let mid = _.mid(p1, p2)
        let r = _.dis(p1, mid)
        let cp = _.polar(mid, radiusRatio * r, orient ? _.atan(p1, p2) - 90 + angleOffset : angleOffset)
        let cp2 = _.mirror(cp, mid)
        Object.assign(this, {
            p1,
            p2,
            cp,
            cp2,
            mid
        })
    }

    _mapPath(points) {
        return points.map((t, index) => {
            return `${index===0 ?"M":t.length ===4 ?"Q":"L"}${t.join(" ")}`
        }).join(" ")
    }

    // 曲线
    _curve() {
        return this._mapPath([this.p1, [...this.cp, ...this.cp2]])
    }
    // 波形
    _wave() {
        return this._mapPath([this.p1, [...this.cp, ...this.mid],
            [...this.cp2, ...this.p2]
        ])
    }
    // 锯齿形
    _sawtooth() {
        return this._mapPath([this.p1, this.cp, this.cp2, this.p2])
    }

}