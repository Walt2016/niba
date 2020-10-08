// 线段切割

export default class LineSeg {
    constructor(options) {
        const {
            p1,
            p2,
            n
        } = options
        let points = this.seg(p1, p2, n)
        Object.assign(this, {
            p1,
            p2,
            n,
            points
        })
    }
    seg(p1, p2, n) {
        let points = []
        for (let i = 0; i <= n; i++) {
            points[points.length] = [p1[0] + (p2[0] - p1[0]) * i / n, p1[1] + (p2[1] - p1[1]) * i / n]
        }
        return points
    }
}