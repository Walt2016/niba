//圆弧切割 arc seg
import ArraySort from '../utils/arraySort'

// import {
//     _.sin,
//     _.cos,
//     _.polar
// } from '../utils'
import _ from '../utils/index'
import PolarSeg from './PolarSeg';

//顶点 vertices
//分割点
// 参数：[x,y],[r1,r2],n
//半径 r,r1~r2  , [r1,r2,r3]
//optionsions{o:[xy],r:[r1,r2],n:n,rn:"random"}
//regular, direction, a1
//圆弧分割  Arc segmentation
export default class ArcSeg extends PolarSeg {
    constructor(options) {
        super(options)
        if (options.angle) {
            this.a1 = options.angle
            this.a2 = 360 + this.a1
        }

        this.points = this.seg()
        this.phi = 0
        if (options.sort && options.sort !== "normal") {
            this.points = ArraySort[options.sort](this.points)
        }
    }

    seg() {
        let {
            o,
            r,
            n,
            a1 = 0,
            a2 = 360
        } = this
        let points = [];
        for (let i = 0; i < n; i++) {
            // a = i * 2 * Math.PI / n + (a1 / 2 * Math.PI) //等角
            // points[i] = [o[0] + r * Math.cos(a), o[1] + r * Math.sin(a)]
            let a = a1 + i * (a2 - a1) / n
            // points[points.length] = [o[0] + r * _.cos(a), o[1] + r * _.sin(a)]
            let r2 = r + 0.5 * r * _.sin(this.phi)
            points[i] = _.polar(o, r2, a)
        }
        this.phi++
        return points
    }

    //     //生成控制点
    // createControlPoint(start, end, len) {
    //     var x1 = end.x - start.x,
    //         y1 = end.y - start.y,
    //         angle = Math.atan2(y1, x1),
    //         c = Math.round(Math.sqrt(x1 * x1 + y1 * y1)),
    //         l = c + (!len ? 0 : c / len),
    //         x2 = l * Math.cos(angle) + start.x,
    //         y2 = l * Math.sin(angle) + start.y;
    //     return {
    //         x: x2,
    //         y: y2
    //     };
    // }

}
// function arcseg(options) {
//     let {
//         o = [0, 0],
//             r = 100,
//             n = 3,
//             a1 = 0,
//             direction,
//             regular = true
//     } = options
//     var points = [],
//         a;

//     var _seg = function (o, r, n, i, regular, direction) {
//         if (regular) {
//             if (direction === "top") {
//                 a = 1.25 * Math.PI + 0.5 * Math.PI * i / n
//             } else {
//                 a = i * 2 * Math.PI / n + (a1 / 2 * Math.PI) //等角
//             }
//         } else { //随机角
//             if (direction === "top") {
//                 a = 1.25 * Math.PI + 0.5 * Math.PI * Math.random()
//             } else if (direction === "outter") {
//                 a = 1 * Math.PI * Math.random()
//             } else {
//                 a = 2 * Math.PI * Math.random()
//             }
//         }
//         points[i] = [o[0] + r * Math.cos(a), o[1] + r * Math.sin(a)]
//     }

//     if (Array.isArray(r)) {
//         var len = r.length
//         for (var i = 0; i < n; i++) {
//             var rn = r[i % len]
//             _seg(o, rn, n, i, regular, direction)
//         }
//     } else if (/~/.test(r)) {
//         var rs = r.split("~").map(function (t) {
//             return +t
//         })
//         for (var i = 0; i < n; i++) {
//             var rn = rs[0] + (rs[1] - rs[0]) * Math.random();
//             _seg(o, rn, n, i, regular, direction)
//         }
//     } else {
//         for (var i = 0; i < n; i++) {
//             _seg(o, r, n, i, regular, direction)
//         }
//     }

//     // return arr

//     if (options.sort &&
//         sort[options.sort]) {
//         points = sort[options.sort](points)
//     }
//     return points
// }