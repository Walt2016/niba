// 中点切割
export default class MidSeg {
    constructor(options) {
        let points = options.points || []
        let offset = options.offset || 0
        let len = points.length
        this.points = points.map((t, index) => {
            let t2 = points[index + 1 === len ? 0 : index + 1]
            return this.mid(t, t2, offset)
        })
    }
    mid(p1, p2, offset) {
        return [(p1[0] + p2[0] + offset * (p1[0] - p2[0])) / 2, (p1[1] + p2[1] + offset * (p1[1] - p2[1])) / 2]
    }
}