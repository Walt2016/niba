// 任意多边行

export default class Freeform {
    constructor(options) {
        let {
            points = [],
                o
        } = options
        this.points = points
        // 中心点处理
        if (o) {
            this.o = o
        } else {
            // 无中心点情况下 
            this._o()
        }
    }
    //根据控制点计算 中心点
    _o() {
        let x = 0,
            y = 0,
            len = this.points.length;
        this.points.forEach(t => {
            x += t[0]
            y += t[1]
        })
        this.o = [x / len << 0, y / len << 0]
    }
    // 移动  点 和中心点整体移动
    move(pos) {
        let {
            o
        } = this
        let offset = [pos[0] - o[0], pos[1] - o[1]]
        this.points = this.points.map(t => {
            return [t[0] + offset[0], t[1] + offset[1]]
        })
        this.o = pos
        return this
    }
}