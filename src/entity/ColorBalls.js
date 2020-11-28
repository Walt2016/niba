import {
    BaseEntity,
    Ball,
    Polygon

} from ".";

import _ from "../utils"

import {
    CurveSeg
} from '../points'

// var cw = c.width = 500;
// var ch = c.height = 500;
// var cx = cw / 2,
//     cy = ch / 2;
// var rad = Math.PI / 180;
// var frames = 0;

// var R = 80;

var A = 1.5;
var B = 1;
var K = 3;
var phi = 0;

export default class ColorBalls extends BaseEntity {
    constructor(options) {
        super(options)
        this.setPoints(new CurveSeg(options))
        // let cs = new CurveSeg(options)
        // this.cs = cs
        // this.points = cs.points
    }
    // update() {
    //     this.points = this.cs.seg()
    // }
    draw(ctx) {
        let {
            n
        } = this
        ctx.fillStyle = "rgba(0,0,0,.15)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.points.forEach((t, i) => {
    
            // ctx.beginPath();
            let a = 360 * i / n
            // ctx.fillStyle = "hsl(" + a + ",100%, 50%)";
            // let [x,y]=t
            // ctx.arc(x, y, 3, 0, 2 * Math.PI);
            // ctx.fill();

            let ball=new Polygon({
                o:t,
                color:"hsl(" + a + ",100%, 50%)",
                r:6,
                n:2
            })
            ball.draw(ctx)

        })
    }

    // draw(ctx) {
    //     let {
    //         o = [0, 0], r = 80, n = 3
    //     } = this
    //     phi++;
    //     ctx.fillStyle = "rgba(0,0,0,.15)";
    //     ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     for (var a = 0; a < 360; a += 10) {

    //         // var r2 = A * r + B * r * _.sin(n * (a + phi)); // n = 0,1,2,3,4,5,.....360...

    //         var r2 = r +  0.5*r * _.sin(n * (a + phi));
    //         // var x = o[0] + r2 * _.cos(a);
    //         // var y = o[1] + r2 * _.sin(a);

    //         let [x, y] = _.polar(o, r2, a)

    //         ctx.beginPath();
    //         ctx.fillStyle = "hsl(" + a + ",100%, 50%)";
    //         ctx.arc(x, y, 3, 0, 2 * Math.PI);
    //         ctx.fill();
    //     }
    //     // requestId = window.requestAnimationFrame(Draw);

    // }

}