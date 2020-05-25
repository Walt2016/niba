import {
    _atan,
    _dis,
    _sin,
    _cos,
    _pos
} from '../utils'
import Controler from './Controler'
import PolarSeg from '../points/PolarSeg'
import Freeform from '../points/Freeform'
import BaseDom from '../ui/BaseDom'
export default class BaseEntity {
    constructor(options) {
        this.init(options)
    }
    init(options) {
        for (let key in options) {
            if (options[key] instanceof CanvasRenderingContext2D || options[key] instanceof BaseDom) {
                this.set(key, options[key])
            } else {
                this[key] = options[key]
            }
        }
    }
    // 根据切割机 设置点
    setPoints(options) {
        if (options instanceof PolarSeg) {
            let {
                points,
                seg
            } = options
            return this.set("points", points).set("seg", seg.bind(options))
        } else if (Array.isArray(options)) {

            let {
                points,
                o
            } = new Freeform({
                points: options.points
            })
            return this.set("points", points)

        }

    }
    // 根据参数 重新计算节点
    update(options) {
        Object.assign(this, options)
        if (this.seg) {
            this.points = this.seg()
        }
        return this
    }
    _fadeout(step = 0.01) {
        let ctx = this.ctx
        if (ctx) {
            ctx.fillStyle = 'rgba(0,0,0, ' + step + ')';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        return this
    }
    clear(ctx = this.ctx) {
        // this.timmer && clearInterval(this.timmer)
        // this.ctx.fillStyle = 'rgba(0,0,0, .01)';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        // this.timmer&&clearTimeout(this.timmer)
        // this.timmers.forEach(t => {
        //     t && clearTimeout(t)
        // })
        // this.timmers.length=0
        return this
    }
    // 不可枚举属性  this.ctx
    set(key, value) {
        return Object.defineProperty(this, key, {
            value,
            writable: true,
            enumerable: false
        })
    }
    //清空定时器
    reset() {
        this.timmer && clearInterval(this.timmer)
        return this
    }

    //绘制控制点
    drawController(ctx = this.ctx, points = this.points, o = this.o, pos = this.pos) {
        let controler = new Controler({
            ctx,
            points,
            o,
            pos
        })
        this.controler = controler
        // this.set("controler",controler)
        this.activePointIndex = controler.draw().activePointIndex
    }

    // 生成代码
    createCode() {
        if (!this.points) return false
        var codes = ['// ' + this.name];
        codes.push('ctx.lineWidth=' + this.lineWidth);
        codes.push('ctx.strokeStyle=\'' + this.strokeStyle + '\';');
        codes.push('ctx.beginPath();');
        this.points.forEach((p, i) => {
            if (i == 0) {
                codes.push('ctx.moveTo(' + p[0] + ',' + p[1] + ');');
            } else {
                codes.push('ctx.lineTo(' + p[0] + ',' + p[1] + ');');
            }
        });
        codes.push('ctx.closePath();');
        codes.push('ctx.stroke();');
        return codes.join('\n');
    }

    //网格
    drawGuidewires(ctx = this.ctx, x, y) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0,0,230,0.4)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, ctx.canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(ctx.canvas.width, y + 0.5);
        ctx.stroke();
        ctx.restore();
    }

    //绘制路径
    createPath(ctx = this.ctx) {
        ctx.beginPath();
        this.points.forEach((p, i) => {
            ctx[i == 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
        });
        ctx.closePath();
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

    // 接口
    draw(ctx = this.ctx) {
        // ctx.save();
        // ctx.fillStyle = this.color || "#0000ff";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.r || 3, 0, 2 * Math.PI);
        // // ctx.stroke();
        // ctx.fill();
        // ctx.restore();
        // return this
    }
    // 动画  靠近目标
    moveTo([tx, ty]) {
        this.timmer && clearInterval(this.timmer)
        this.timmer = setInterval(() => {
            let d = _dis(this.o, [tx, ty])
            console.log(d)
            if (d < 1) {
                this.render([tx, ty])
                this.timmer && clearInterval(this.timmer)
            }

            let [x, y] = this.o
            this.render([Math.round((x + (tx - x) / 10) * 100) / 100, Math.round((y + (ty - y) / 10) * 100) / 100])
        }, 17)
    }
    // 根据中心点重绘
    render(o) {
        // [tx, ty] = this.o
        if (o) {
            // console.log(this.ui)
            console.log(o)

            this.ui._set("o", o)
            // return this.update({
            //     o
            // }).clear().draw();

            if (this.controler) {
                this.points = this.controler.move(o).points
                this.o = o //= this.controler._o()
            }
        }
        if (this.fadeout) {
            return this._fadeout(this.fadeout).draw();
        }
        return this.clear().draw();
    }
    // 跟随鼠标
    follow(e) {
        let pos = _pos(e, this.ctx.canvas)
        if (this.showController) {
            this.pos = pos
        }
        if (this.followMouse) {
            // ui&& ui._set("o", pos)
            if (this.animate) {
                this.moveTo(pos)
            } else {
                this.render(pos)
            }
        } else {
            this.render()
        }
    }
}