// 向量
export default class Vector {
    constructor(options) {
        let {
            x,
            y
        } = options
        this.x = x
        this.y = y
    }
    // 单位向量
    unit() {
        let magnitude = this.magnitude()
        return {
            x: this.x / magnitude,
            y: this.y / magnitude
        }
    }
    // 大小
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
    // 向量和
    sum(v) {
        return new Vector({
            x: this.x + v.x,
            y: this.y + v.y
        })
    }
    // 向量和
    // sum(v1, v2) {
    //     return {
    //         x: v1.x + v2.x,
    //         y: v1.y + v2.y
    //     }
    // }
    // 点积
    // 与向量加减运算结果不同，点积的结果不是向量，而叫做“标量”。
    // 该数值的重要性不在于其大小，而在于其“大于0” 这个事实。这意味着两个向量大概处于同一方向上。
    //     判断两个矢量的终点是不是大致指向同一个方向，对于响应物体之间的碰撞来说，是一项很关键的技术。
    // 当某个运动的物体和某个静止的物体发生碰撞时，如果我们需要让运动的物体被静止物体弹开，
    // 那么就必须确保这个运动的物体在碰撞之后朝着远离静止物体的方向运动。
    // 而不是朝静止物体的中心运动。通过计算两个向量的点积，我们可以精确地做到这一点。
    dotproduct(v) {
        // var dotProduct = (vectorOne.x * vectorTwo.x) + (vectorOne.y * vectorTwo.y)
        return this.x * v.x + this.y * v.y
    }
}