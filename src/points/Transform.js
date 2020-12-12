// 线段 line segment // [[x,y],[x,y],[x,y]] [p1,p2,p3]
// vertical 
import _ from '../utils'

export default class Transform {
    constructor(options) {
        this.points = options.points
    }

    //     x1:width/2,
    //     y1:0,
    //     x2:width/2,
    //     y2:height,
    // (x1x2+y1y2)=0 。
    vertical() {
        let points = this.points
        let p1 = points[0]
        let p2 = points[1]

        return [
            [0, (p1[1] + p2[1]) / 2],
            [p1[0] + p2[0], (p1[1] + p2[1]) / 2]
        ]

    }
    //  平移r   方向
    translate(r = 100, direction = 0) {
        return this.points.map(t => {
            return [t[0] + r * _.cos(direction), t[1] + r * _.sin(direction)]
        })
    }
    translateY(y = 100) {
        return this.points.map(t => {
            return [t[0], t[1] + y]
        })
    }
}