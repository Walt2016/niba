import _ from '../utils'
export default class PointPath {
    constructor(options, o) {
        Object.assign(this, options)
        if (o) this.o = o
    }
    // 直线
    _line(options = this) {
        let {
            num = 360,
                r = 100,
                k = 0,
                a = 0,
                w = 1,
                o = [0, 0]
        } = options

        return Array.from({
            length: num
        }, (t, i) => _.move(o, o, [o[0] + (i-num/2) * r / num , o[1]]))
    }
    // 圆形
    _circle(options = this) {
        let {
            num = 360,
                r = 100,
                k = 0,
                a = 0,
                w = 1,
                o = [0, 0]
        } = options
        return Array.from({
            length: num
        }, (t, i) => _.polar(o, r, i * 360 / num + a))
    }
    // 正玄曲线
    // y=Asin(ωx+φ)+k
    _sin(options = this) {
        let {
            num = 360,
                r = 100,
                k = 0,
                a = 0,
                w = 1,
                o = [0, 0]
        } = options
        return Array.from({
            length: num
        }, (t, i) => [i * 360 / num + o[0] - 180, r * _.sin(w * (i * 360 / num - 180) - a) + o[1] - k].map(t => _.twoDecimal(t)))
    }
    // 余弦
    _cos(options = this) {
        let {
            num = 360,
                r = 100,
                k = 0,
                a = 0,
                w = 1,
                o = [0, 0]
        } = options
        return Array.from({
            length: num
        }, (t, i) => [i * 360 / num + o[0] - 180, r * _.cos(w * (i * 360 / num - 180) - a) + o[1] - k].map(t => _.twoDecimal(t)))
    }
    // 正切
    _tan(options = this) {
        let {
            num = 360,
                r = 100,
                k = 0,
                a = 0,
                w = 1,
                o = [0, 0]
        } = options

        return Array.from({
            length: num
        }, (t, i) => [i * 360 / num + o[0] - 180, _.tan(i * 360 / num) + o[1]].map(t => _.twoDecimal(t)))
    }
}