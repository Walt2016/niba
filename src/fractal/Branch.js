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
        // let {
        //     ctx,
        //     o = [0, 0],
        //     r = 100,
        //     n = 3,
        //     level = 6,
        //     shrink = 0.9,
        //     direction = -90,
        //     shape = 'Ray'
        // } = options

        Object.assign(this, {
            o: [0, 0],
            r: 100,
            n: 3,
            level: 6,
            shrink: 0.9,
            direction: -90,
            shape: 'Ray'
        }, options)
        this.timmers = []

        // this.ctx = ctx
        // this.shrink = shrink
        // this.direction = direction
        // this.level = level
        // this.shape = shape
        // this.branch(o, r, n, direction, level)
        this.draw()

    }
    clear() {
        // this.ctx.fillStyle = 'rgba(0,0,0, .01)';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // ctx.
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // this.timmer&&clearTimeout(this.timmer)

        this.timmers.forEach(t => {
            t && clearTimeout(t)
        })
        this.timmers = []
        return this
    }

    draw() {
        let {
            o,
            r,
            n,
            direction,
            level
        } = this
        this.branch(o, r, n, direction, level)

    }

    branch(o, r, n, d, level) {
        if (level-- === 0) {
            return
        }
        // this.ctx.fillStyle = 'rgba(0,0,0, .01)';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let ray = new Ray({ //Ray Polygon
            o,
            r,
            n,
            color: "hsl(" + 360 * level / this.level + ",100%, 50%)",
        })

        // ray.drawController(this.ctx)
        ray.draw(this.ctx)

        ray.points.forEach(t => {
            let d = _atan(o, t)
            this.timmers[this.timmers.length] = setTimeout(() => {
                this.branch(t,
                    r * this.shrink, n, d, level)
            })
        })
    }
}