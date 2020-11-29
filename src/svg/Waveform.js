import _ from '../utils'
// 波形
export default class Waveform {
    constructor(points, options, callback) {
        let cp = []
        let mid = []
        let n = points.length
        let r
        points.map((t, index) => {
            let next = points[index + 1 >= n ? 0 : index + 1]
            let p = this.calc(t, next, options)
            cp[cp.length] = p.cp1
            cp[cp.length] = p.cp2
            mid[mid.length] = p.mid
            r = p.r
        }).join(" ")
        Object.assign(this, {
            points,
            cp,
            n,
            mid,
            r
        })
        callback && callback(this)
    }
    // 计算控制点
    calc(p1, p2, options) {
        let {
            controller,
            radiusRatio = 1,
            angleOffset = 0,
            orient
        } = options
        let mid = _.mid(p1, p2)
        let r = _.dis(p1, mid)
        let cp1 = _.polar(mid, radiusRatio * r, orient ? _.atan(p1, p2) - 90 + angleOffset : angleOffset)
        let cp2 = _.mirror(cp1, mid)
        return {
            p1,
            p2,
            cp1,
            cp2,
            mid,
            r
        }
    }

    _d(points) {
        return points.map((t, index) => {
            return `${index===0 ? "M" : t.length ===7 ? "A": t.length ===4 ? "Q" : "L"}${t.join(" ")}`
        }).join(" ")
    }
    // 半圆弧
    _semicircle() {
        // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
        let ps = []
        let {
            points,
            n,
            r
        } = this
        points.forEach((t, index) => {
            let next = points[index + 1 >= n ? 0 : index + 1]
            ps[ps.length] = t
            ps[ps.length] = [r, r, 0, 0, 1, ...next]
        })
        return this._d(ps)
    }

    // 曲线
    _curve() {
        let ps = []
        let {
            points,
            n
        } = this
        points.forEach((t, index) => {
            let next = points[index + 1 >= n ? 0 : index + 1]
            ps[ps.length] = t
            ps[ps.length] = [...this.cp[2 * index], ...next]
        })
        return this._d(ps)
        // return this._d([this.p1, [...this.cp1, ...this.p2]])
    }
    // 波形
    _wave() {
        let ps = []
        let {
            points,
            n
        } = this
        points.forEach((t, index) => {
            let next = points[index + 1 >= n ? 0 : index + 1]
            ps[ps.length] = t
            ps[ps.length] = [...this.cp[2 * index], ...this.mid[index]]
            ps[ps.length] = [...this.cp[2 * index + 1], ...next]
        })
        return this._d(ps)
        // return this._d([this.p1, [...this.cp1, ...this.mid],
        //     [...this.cp2, ...this.p2]
        // ])
    }
    // 锯齿形
    _sawtooth() {
        let ps = []
        let {
            points,
            n
        } = this
        points.forEach((t, index) => {
            let next = points[index + 1 >= n ? 0 : index + 1]
            ps[ps.length] = t
            ps[ps.length] = this.cp[2 * index]
            ps[ps.length] = this.cp[2 * index + 1]
            ps[ps.length] = next
        })
        return this._d(ps)
        // return this._d([this.p1, this.cp1, this.cp2, this.p2])
    }
}