// 控制点
import _ from '../utils'
import Freeform from '../points/Freeform'
export default class Controler extends  Freeform{
    constructor(options) {
        super(options)
        let {
            ctx,
            pos = []
        } = options
        this.ctx = ctx
        this.pos = pos
        // let {
        //     points,
        //     o
        // } = new Freeform(options)
        // this.points = points
        // this.o = o

        // let freeform=new Freeform(options)
        // Object.assign(this,freeform)
        //选中点序号   9999 表示中点
        this.activePointIndex = -1
    }

    //绘制控制点
    draw(ctx = this.ctx, o = this.o) {
        this.drawPoints(ctx);
        this.drawCenter(ctx, o);
        // this.drawCPoints(ctx, o)
        return this
    }

    //绘制顶点
    drawPoints(ctx = this.ctx) {
        if (!this.points) return
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#999';
        ctx.font = "12px Verdana";
        this.points.forEach((t, i) => {
            ctx.beginPath();
            ctx.arc(t[0], t[1], 5, 0, Math.PI * 2, false);
            this.isInPath(ctx, t, i)
            ctx.fillText(i, t[0], t[1]);
            ctx.stroke();
        });
        ctx.restore();
    }

    //绘制中心点
    drawCenter(ctx = this.ctx, o = this.o) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'hsla(60,100%,45%,1)';
        ctx.fillStyle = 'hsla(60,100%,50%,1)';
        ctx.beginPath();
        ctx.arc(o[0], o[1], 5, 0, Math.PI * 2, false);
        this.isInPath(ctx, o, 9999)
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
    //判断鼠标 是否选中
    isInPath(ctx = this.ctx, p, i, pos = this.pos) {
        if (ctx.isPointInPath(pos[0], pos[1])) {
            // ctx.fillStyle = 'hsla(60,100%,50%,1)';
            ctx.fillStyle = '#333';
            ctx.arc(p[0], p[1], 8, 0, Math.PI * 2, false);
            ctx.fill();
            this.activePointIndex = i
        }
    }

    //判断鼠标是否选中对应的图形，选中哪个顶点，选中哪个控制点，中心点；
    // isInPath(ctx = this.ctx, pos) {
    //     for (var i = 0, point, len = this.points.length; i < len; i++) {
    //         point = this.points[i];
    //         ctx.beginPath();
    //         ctx.arc(point[0], point[1], 5, 0, Math.PI * 2, false);
    //         if (ctx.isPointInPath(pos[0], pos[1])) {
    //             return i;
    //         }
    //     }
    //     this.createPath(ctx);
    //     if (ctx.isPointInPath(pos[0], pos[1])) {
    //         return 9999;
    //     }
    //     return -1
    // }

    //生成控制点
    createControlPoint(start, end, len) {
        let angle = _.atan(start, end),
            c = _.dis(start, end),
            l = c + (!len ? 0 : c / len),
            x2 = l * _.cos(angle) + start[0],
            y2 = l * _.sin(angle) + start[1];
        return [x2, y2]
    }
    // 控制点
    drawCPoints(ctx = this.ctx, o = this.o) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'hsla(0,0%,50%,1)';
        ctx.fillStyle = 'hsla(0,100%,60%,1)';

        this.cPoints = this.points.filter((t, i) => i == 0).map(t => {
            return this.createControlPoint(o, t, 2)
        })
        this.cPoints.forEach(t => {
            ctx.beginPath();
            ctx.moveTo(o[0], o[1]);
            ctx.lineTo(t[0], t[1]);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(t[0], t[1], 6, 0, Math.PI * 2, false);
            // this.isInPath(ctx, t, 8888)
            ctx.stroke();
            ctx.fill();
        });
        ctx.restore();
    }
}