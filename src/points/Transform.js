// 线段 line segment // [[x,y],[x,y]]
// vertical 

export default class Transform {
    constructor(options) {
        this.segments = options.segments  
    }

    //     x1:width/2,
    //     y1:0,
    //     x2:width/2,
    //     y2:height,
    // (x1x2+y1y2)=0 。
    vertical() {
        let segments = this.segments
        let p1 = segments[0]
        let p2 = segments[1]

        return [
            [0, (p1[1] + p2[1]) / 2],
            [p1[0] + p2[0], (p1[1] + p2[1]) / 2]
        ]

    }
    // x 轴平移
    translate(x = 100) {
        return this.segments.map(t => {
            return [t[0] + x, t[1]]
        })
    }
    translateY(y = 100) {
        return this.segments.map(t => {
            return [t[0], t[1] + y]
        })
    }
}