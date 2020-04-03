//分叉 
//分形fractal;
import {
    ArcSeg
} from '../points'
import {
    Ray,
    Polygon,
    Circle
} from '../entity'
// import entity from '../entity'
import BaseFractal from './BaseFractal'
import {
    _atan
} from '../utils'
export default class Branch extends BaseFractal {
    constructor(options) {
        super(options)
        // Object.assign(this, {
        //     o: [0, 0],
        //     r: 100,
        //     n: 3,
        //     level: 6,
        //     shrink: 0.9,
        //     angle: -90,
        //     shape: 'Ray'
        // }, options)
        // this.timmers = []

        this.draw()

    }
    // clear() {
    //     // this.ctx.fillStyle = 'rgba(0,0,0, .01)';
    //     // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    //     // ctx.
    //     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    //     // this.timmer&&clearTimeout(this.timmer)

    //     this.timmers.forEach(t => {
    //         t && clearTimeout(t)
    //     })
    //     this.timmers.length=0
    //     return this
    // }

    draw() {
        let {
            o,
            r,
            n,
            angle,
            level,
            shape
        } = this
        this.branch(o, r, n, angle, level, shape)

    }

    branch(o, r, n, a, level, shape) {
        if (level-- === 0) {
            return
        }
        // this.ctx.fillStyle = 'rgba(0,0,0, .01)';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let entity
        switch (shape.toLowerCase()) {
            case "ray":
                entity = new Ray({ //Ray Polygon
                    o,
                    r,
                    n,
                    a,
                    color: "hsla(" + 360 * level / this.level + ",100%, 50%,0.5)",
                })
                break;
            case "polygon":
            default:
                entity = new Polygon({ //Ray Polygon
                    o,
                    r,
                    n,
                    a,
                    color: "hsla(" + 360 * level / this.level + ",100%, 50%,0.5)",
                })
                break
        }



        // entity.drawController(this.ctx)
        entity.draw(this.ctx)

        entity.points.forEach(t => {
            let d = _atan(o, t)
            this.timmers[this.timmers.length] = setTimeout(() => {
                this.branch(t,
                    r * this.shrink, n, d, level, shape)
            })
        })
    }
}