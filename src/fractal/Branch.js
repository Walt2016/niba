//分叉 
//分形fractal;
import {
    Ray,
    Polygon,
    Arc,
    Ball,
    Circle
} from '../entity'
import BaseFractal from './BaseFractal'
import {
    _atan
} from '../utils'
export default class Branch extends BaseFractal {
    constructor(options) {
        super(options)
        this.draw()

    }
    draw() {
        let {
            o,
            r,
            n,
            a1,
            a2,
            level,
            shape
        } = this
        this.branch(o, r, n, a1, level, shape, a1, a2, )

    }

    branch(o, r, n, a, level, shape, a1, a2) {
        if (level-- === 0) {
            return
        }
        // this.ctx.fillStyle = 'rgba(0,0,0, .01)';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let alpha = this.alpha || 0.5
        let entity
        let options = { //Ray Polygon
            o,
            r,
            n,
            a1,
            a2,
            color: "hsla(" + 360 * level / this.level + ",100%, 50%," + alpha + ")",
        }
        switch (shape.toLowerCase()) {
            case "ray":
                entity = new Ray(options)
                break;
            case "arc":
                entity = new Arc(options)
                break;
            case "ball":
                entity = new Ball(options)
                break;
            case "polygon":
            default:
                entity = new Polygon(options)
                break
        }
        if (this.showController) {
            entity.drawController(this.ctx)
        }
        entity.draw(this.ctx)

        entity.points.forEach(t => {
            let d = _atan(o, t)
            this.timmers[this.timmers.length] = setTimeout(() => {
                this.branch(t,
                    r * this.shrink, n, d, level, shape, a1, a2)
            })
        })
    }
}