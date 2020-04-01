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
import BaseFractal from './BaseFractal'
import {
    _atan
} from '../utils'
export default class Branch extends BaseFractal {
    constructor(options) {
        super(options)
        let {
            ctx,
            o,
            r,
            d = "top",
            level = 6,
            n = 3,
            sAngle = 0,
            eAngle = 45,
            shrink = 0.9,
            direction = -90
        } = options

        this.ctx = ctx
        this.sAngle = sAngle
        this.eAngle = eAngle
        this.shrink = shrink
        this.direction = direction
        this.branch(o, r, n, direction, level)

    }
    // branch(o, r, d, level) {
    //     var level = level || 6;
    //     var _this = this;
    //     var _branch = function (o, r, d, level) {
    //         if (level-- === 0) {
    //             return
    //         }
    //         r = r * 0.9
    //         var ps = _this.cutpoints(o, r, 2, {
    //             regular: false,
    //             direction: d
    //         })
    //         _this.ray(o, ps)
    //         ps.forEach(function (t) {
    //             _branch(t, r, d, level)
    //         })
    //     }
    //     _branch(o, r, d, level)
    // }

    branch(o, r, n, d, level) {
        if (level-- === 0) {
            return
        }
        // console.log(level)
        // let ray = new Polygon({  //Ray Polygon
        //     o,
        //     r,
        //     n,
        //     sAngle: d - 45,
        //     eAngle: d + 45,
        //     color:'red'
        // })

        let ray = new Ray({  //Ray Polygon
            o,
            r,
            n,
            // sAngle: d - 45,
            // eAngle: d + 45,
            color:'red'
        })
        this.ctx.fillStyle = 'rgba(0,0,0, .01)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // ray.drawController(this.ctx)
        ray.draw(this.ctx)
        // console.log(ray)
        // return
        // r = r * 0.9
        // let {
        //     points
        // } = new ArcSeg({
        //     o,
        //     r,
        //     n: 2,
        //     regular: false,
        //     direction: d
        // })
        // let ray = new Ray({
        //     o,
        //     points
        // })

        ray.points.forEach(t => {
            let d = _atan( o,t)
            // console.log(d)
            setTimeout(()=>{
                this.branch(t,
                    r * this.shrink, n, d, level)
            })
            // if(level==1)
           
        })
    }
}