// 折线
import _ from "../utils"
import BaseEntity from "./BaseEntity";

export default class FoldLine extends BaseEntity {
    constructor(options) {
        super(options)
        let {
            p1,
            p2
        } = options
        this.p1 = p1
        this.p2 = p2
        // let r1 = _.dis(p1, p2)/2
        // this.o1 = _.mid(p1, p2)

        // let a = 90
        // let p3 = [p1[0] - r1 * _.cos(a), p1[1] + r1 * _.sin(a)]
        // let p4 = [p2[0] + r1 * _.cos(a), p2[1] - r1 * _.sin(a)]

        // this.points = [p1, p4, p3, p2]

        // this.points = [p1,p2]
        this.level=0

        this.points = this.fold(p1,p2)
       

    }
    fold(p1,p2){
       

        let r1 = _.dis(p1, p2)/2
       let o1 = _.mid(p1, p2)

        let a = 90
        let p3 = [o1[0] + r1 * _.cos(a), o1[1] + r1 * _.sin(a)]

        // let p3 = [p1[0] - r1 * _.cos(a), p1[1] + r1 * _.sin(a)]
        // let p4 = [p2[0] + r1 * _.cos(a), p2[1] - r1 * _.sin(a)]

        if(this.level++>=10){
            // return [p1, p4, p3, p2]
            return [p1,  p3, p2]
        }

        return [...this.fold(p1,p3),...this.fold(p3, p2)]

        // return [...this.fold(p1,p4),...this.fold(p3, p2)]

    //    return [...this.fold(p1,p4),...this.fold(p4, p3),...this.fold(p3, p2)]

        // return [p1, p4, p3, p2]



    }

    //连线
    line(ctx) {
        let {
            points
        } = this
        let {
            fillStyle,
            strokeStyle = "#FF0000",
            closePath = true,
            colors,
            index = 0
        } = this
        if (colors)
            strokeStyle = colors[index]
        if (fillStyle) ctx.fillStyle = fillStyle //"white"
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        points.forEach((t, i) => {
            ctx[i == 0 ? 'moveTo' : 'lineTo'].apply(ctx, t)
        });
        // if (closePath)
        //     ctx.closePath();
        ctx.stroke()
        if (fillStyle) ctx.fill()
    };
    draw(ctx) {
        this.line(ctx)
    }




}
