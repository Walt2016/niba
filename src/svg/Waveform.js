import _ from '../utils'
// 波形
export default class Waveform {
    constructor(points, options, callback) {

        // if (points.length === 2) {
        //     let [p1, p2] = points
        //     Object.assign(this, this.calc(p1, p2, options))
        // } else {
        //     let cp = []
        //     let n = points.length
        //     points.map((t, index) => {
        //         let next = points[index + 1 >= n ? 0 : index + 1]
        //         let p = this.calc(t, next, options)
        //         cp[cp.length] = p.cp1
        //         cp[cp.length] = p.cp2
        //     }).join(" ")
        //     Object.assign(this, {
        //         points,
        //         cp
        //     })
        // }

        let cp = []
        let mid = []
        let n = points.length
        points.map((t, index) => {
            let next = points[index + 1 >= n ? 0 : index + 1]
            let p = this.calc(t, next, options)
            cp[cp.length] = p.cp1
            cp[cp.length] = p.cp2
            mid[mid.length] = p.mid
        }).join(" ")
        Object.assign(this, {
            points,
            cp,
            n,
            mid
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
            mid
        }
    }

    _d(points) {
        return points.map((t, index) => {
            return `${index===0 ? "M" : t.length ===4 ? "Q" : "L"}${t.join(" ")}`
        }).join(" ")
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
            // ps[ps.length] = [...this.cp[2 * index], ...this.mid[index]]
            // ps[ps.length] = [...this.cp[2 * index + 1], ...next]
        })
        return this._d(ps)

        // return this._d([this.p1, this.cp1, this.cp2, this.p2])
    }

}