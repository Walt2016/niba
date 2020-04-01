export default class Grow {
    constructor(options) {
        let {
            o,
            r,
            d,
            level = 5
        } = options

        this.points = grow(o, r, d, level)



    }
    //生长
    // //startPoint,radius,direction
    // grow(o, r, d) {
    //     var arr = [o],
    //         level = 5;
    //     return arr
    // }
    grow(o, r, d, level) {
        if (level-- === 0) {
            return
        }
        var a = 0
        if (d === "top") {
            a = 1.25 * Math.PI + 0.5 * Math.PI * Math.random()
        } else {
            a = 2 * Math.PI * Math.random()
        }
        var endPoint = [o[0] + r * Math.cos(a), o[1] + r * Math.sin(a)]
        arr.push(endPoint)
        this.grow(endPoint, r, d, level)
    }
}