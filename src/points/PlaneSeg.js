// 平面切割
// 平面云点
export default class PlaneSeg {
    constructor(options) {
        let {
            n,
            n1,
            n2,
            p1,
            p2,
            random
        } = options
        if (n !== undefined && n1 === undefined && n2 === undefined) {
            n1 = n2 = n
        }
        let points = random ? this.random(p1, p2, n1, n2) : this.seg(p1, p2, n1, n2)
        Object.assign(this, {
            points
        })

    }
    seg(p1, p2, n1, n2) {
        let points = []
        let width = p2[0] - p1[0],
            height = p2[1] - p1[1]
        for (let i = 0; i <= n1; i++) {
            for (let j = 0; j <= n2; j++) {
                points[points.length] = [p1[0] + width * i / n1, p1[1] + height * j / n2]
            }
        }
        return points
    }
    //随机点
    random(p1, p2, n1, n2) {
        let points = []
        let width = p2[0] - p1[0],
            height = p2[1] - p1[1]
        for (let i = 0; i <= n1; i++) {
            for (let j = 0; j <= n2; j++) {
                points[points.length] = [p1[0] + width * Math.random(), p1[1] + height * Math.random()]
            }
        }
        return points

    }

}