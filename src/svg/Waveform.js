import _ from '../utils'
import Path from './Path'
// 波形
export default class Waveform extends Path {
    constructor(points, options, callback) {
        super(points)
        // 波形分割数
        let splitNum = options.splitNum
        if (splitNum) {
            let ps = []
            this._forEach(points, points.length, (t, index, next) => {
                ps = ps.concat(_.split(t, next, splitNum))
            })
            points = ps
        }
        this.options = options
        // 控制点
        let cps = []
        // 中点
        let mids = []

        // 半径
        let rs = []
        // 循环点
        let n = options.recycleIndex % points.length || points.length
        this._forEach(points, n, (t, index, next) => {
            let p = this.calc(t, next)
            cps[cps.length] = p.cp1
            cps[cps.length] = p.cp2
            mids[mids.length] = p.mid
            rs[rs.length] = p.r
        })
        Object.assign(this, {
            points,
            cps,
            mids,
            rs,
            n
        })
        callback && callback(this)
    }
    // foreach增加一个next参数
    _forEach(points, n, callback) {
        // let n = points.length
        points.forEach((t, index) => {
            let next = points[index + 1 >= n ? 0 : index + 1]
            callback && callback(t, index, next)
        })
    }
    // 计算控制点
    calc(p1, p2) {
        let {
            radiusRatio = 1,
                angleOffset = 0,
                orient
        } = this.options
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
    // 半圆弧
    _semicircle() {
        // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
        let {
            sweepFlag,
            radiusRatio = 1,
            xAxisRotation = 0,
            largeArcFlag
        } = this.options
        let ps = []
        this._forEach(this.points, this.n, (t, index, next) => {
            let r = this.rs[index]
            // ps[ps.length] = t
            // ps[ps.length] = [this.r, this.r, xAxisRotation, largeArcFlag ? 1 : 0, sweepFlag ? 1 : 0, ...next]
            ps[ps.length] = [t, [r, r, xAxisRotation, largeArcFlag ? 1 : 0, sweepFlag ? 1 : 0, ...next]]
        })
        return this.d(ps)
    }

    // 椭圆弧 elliptical arc 椭圆弧
    _elliptical() {
        // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
        let {
            sweepFlag,
            radiusRatio = 1,
            xAxisRotation = 0,
            largeArcFlag
        } = this.options
        let ps = []
        this._forEach(this.points, this.n, (t, index, next) => {
            let r = this.rs[index]
            ps[ps.length] = t
            ps[ps.length] = [r, radiusRatio * r, xAxisRotation, largeArcFlag ? 1 : 0, sweepFlag ? 1 : 0, ...next]
        })
        return this.d(ps)
    }

    // 曲线
    _curve() {
        let ps = []
        this._forEach(this.points, this.n, (t, index, next) => {
            ps[ps.length] = t
            ps[ps.length] = [...this.cps[2 * index], ...next]
        })
        return this.d(ps)
    }
    // 波形
    _wave() {
        let ps = []
        this._forEach(this.points, this.n, (t, index, next) => {
            ps[ps.length] = t
            ps[ps.length] = [...this.cps[2 * index], ...this.mids[index]]
            ps[ps.length] = [...this.cps[2 * index + 1], ...next]
        })
        return this.d(ps)
    }
    // 锯齿形
    _sawtooth() {
        let ps = []
        this._forEach(this.points, this.n, (t, index, next) => {
            ps[ps.length] = t
            ps[ps.length] = this.cps[2 * index]
            ps[ps.length] = this.cps[2 * index + 1]
            ps[ps.length] = next
        })
        return this.d(ps)
    }
}