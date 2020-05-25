//分叉 
//分形fractal;
import {
    Ray,
    Polygon,
    Arc,
    ArcTo,
    Ball,
    Circle,
    Rect
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

    anime() { //animate
        let {
            ctx,
            entities
        } = this;
        this.requestID && cancelAnimationFrame(this.requestID);
        let _inner = () => {
            ctx.fillStyle = 'rgba(0,0,0, .08)';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            entities.forEach(t => {
                t.update(ctx);
                t.draw(ctx);
                // shape("circle", {r:2,color:"red",o:[t.x,t.y]})
            })
            this.requestID = requestAnimationFrame(_inner);
        }

        _inner()
    }
    draw() {
        // this.requestID && cancelAnimationFrame(this.requestID);
        let {
            o,
            r,
            n,
            a1,
            a2,
            level,
            shape
        } = this
        this.entities.length = 0
        this.branch(o, r, n, a1, level, a1, a2, )

    }

    branch(o, r, n, a, level, a1, a2) {
        if (level-- === 0) {
            return
        }
        // this.ctx.fillStyle = 'rgba(0,0,0, .01)';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // let alpha = this.alpha || 0.5
        let {
            alpha = 0.5, shape, fill,
                colorful = true,
                color
        } = this
        let entity
        let options = { //Ray Polygon
            o,
            r,
            n,
            a1,
            a2,
            color: colorful ? "hsla(" + 360 * level / this.level + ",100%, 50%," + alpha + ")" : color || "red",
            fill
        }
        switch (shape.toLowerCase()) {
            case "ray":
                entity = new Ray(options)
                break;
            case "arc":
                entity = new Arc(options)
                break;
            case "arcto":
                entity = new ArcTo(options)
                break;
            case "ball":
                entity = new Ball(options)
                break;
            case "circle":
                entity = new Circle(options)
                break;
            case "rect":
                entity = new Rect(options)
                break;
            case "polygon":
            default:
                entity = new Polygon(options)
                break
        }
        this.entities.push(entity)
        if (this.showController) {
            entity.drawController(this.ctx)
        }
        entity.draw(this.ctx)

        entity.points.forEach(t => {
            let d = _atan(o, t)
            this.timmers[this.timmers.length] = setTimeout(() => {
                this.branch(t,
                    r * this.shrink, n, d, level, a1, a2)
            })
        })
    }
}