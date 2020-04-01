// 线段切割

export default class LineSeg {
    constructor(options) {
        const {
            p1,
            p2,
            n
        } = options
        this.p1 = p1
        this.p2 = p2
        this.n = n
        // this.width = p2[0] - p1[0]
        // this.height = p2[1] - p1[1]
        this.points = this.seg(p1, p2, n)
    }
    seg(p1, p2, n) {
        let points = []
        for (let i = 0; i <= n; i++) {
            points[points.length] = [p1[0] + (p2[0] - p1[0]) * i / n, p1[1] + (p2[1] - p1[1]) * i / n]
        }
        return points
    }
}
