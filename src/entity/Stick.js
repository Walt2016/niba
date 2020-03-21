import {
    _sin,
    _cos,
    _polar,
    _mid
} from '../utils'

// 线段
import BaseEntity from './BaseEntity'
class Stick extends BaseEntity {
    constructor(options) {
        super(options)
        
        // this.calculate()
        // this.a2 = 0
        // this.va2 = Math.random()
        // this.speed = Math.random()
        this.calculate()
    }

    update() {
        // this.move();
        // this.roll();
        // this.calculate();
        // this.roll2();
        // this.calculate2();
        this.move2()
        this.calculate();

    }
    // 匀速边转边移动
    calculate() {
        let {
            o,
            r,
            a
        } = this

        // 两端
        this.p1 = _polar(o, r, a) //[o[0] + r * _cos(a), o[1] + r * _sin(a)]
        this.p2 = _polar(o, r, a + 180) //[o[0] - r * _cos(a), o[1] - r * _sin(a)]

    }
    calculate2() {
        let {
            p1,
            p2,
            r,
            a2
        } = this
        a2 %= 360
        if (a2 < 180) {
            this.p1 = _polar(p2, 2 * r, a2)
            // this.p1 = [p2[0] + 2 * r * Math.cos(a2 * Math.PI / 180), p2[1] + 2 * r * Math.sin(a2 * Math.PI / 180)]
        } else {
            this.p2 = _polar(p1, 2 * r, a2 + 180)
            // this.p2 = [p1[0] - 2 * r * Math.cos(a2 * Math.PI / 180), p1[1] - 2 * r * Math.sin(a2 * Math.PI / 180)]
        }
        // this.o = [(this.p1[0] + this.p2[0]) / 2, (this.p1[1] + this.p2[1]) / 2]
        this.o = _mid(this.p1, this.p2)

    }

    //移动
    move() {
        // this.o = [this.o[0] + this.vx, this.o[1] + this.vy]
        this.o[0] += this.vx
        this.o[1] += this.vy
    }
    move2() {
        this.o[0] += Math.cos(this.a) * this.speed;
        this.o[1] += Math.sin(this.a) * this.speed;
        this.a += Math.random() * 0.8 - 0.4;
    }

    roll2() {
        this.a2 += this.va2
    }


    draw(ctx) {
        ctx.strokeStyle = "#0000ff"; // "#000";
        ctx.beginPath();
        ctx.moveTo.apply(ctx, this.p1)
        ctx.lineTo.apply(ctx, this.p2)
        ctx.stroke()
        // ctx.endPath()
    }



}
export default Stick