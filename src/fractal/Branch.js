//分叉 
//分形fractal;
import {
    Ray,
    Polygon,
    Arc,
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
        let options={ //Ray Polygon
            o,
            r,
            n,
            a,
            color: "hsla(" + 360 * level / this.level + ",100%, 50%,0.5)",
        }
        switch (shape.toLowerCase()) {
            case "ray":
                entity = new Ray(options)
                break;
            case "arc":
                entity = new Arc(options)
                break;
            case "polygon":
            default:
                entity = new Polygon(options)
                break
        }
        if(this.showController){
            entity.drawController(this.ctx)
        }
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