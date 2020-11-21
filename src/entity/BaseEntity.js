import {
    _atan,
    _dis,
    _sin,
    _cos,
    _pos
} from '../utils'
import Controler from '../canvas/Controler'
import PolarSeg from '../points/PolarSeg'
import Freeform from '../points/Freeform'
import BaseDom from '../ui/BaseDom'
import DrawCanvas from '../canvas/index'
import DrawSVG from '../svg/index'
import Colors from '../colors'
export default class BaseEntity {
    constructor(options, draw) {
        this.init(options, draw)
    }
    init(options, draw) {
        // localStorage.setItem("defaultDataModel", JSON.stringify(options))
        let dataModel = localStorage.getItem("dataModel")
        options = dataModel ? JSON.parse(dataModel) : options
        for (let key in options) {
            if (options[key] instanceof CanvasRenderingContext2D || options[key] instanceof BaseDom || options[key] instanceof DrawCanvas || options[key] instanceof DrawSVG) {
                this.setEnumerable(key, options[key])
            } else {
                this[key] = options[key]
            }

            if (key === "colorful") {
                options[key] &&
                    this.setEnumerable("colors", new Colors())
            }
        }
        if (draw) {
            this.setEnumerable("draw", draw)
        }
    }
    // 根据切割机 设置点
    setPoints(options) {
        if (options instanceof PolarSeg) {
            let {
                points,
                seg
            } = options
            return this.setEnumerable({
                points,
                seg: seg.bind(options)
            })
        } else if (Array.isArray(options)) {
            let {
                points
            } = new Freeform({
                points: options.points
            })
            return this.setEnumerable({
                points
            })
        }
    }
    // 根据参数 重新计算节点
    update(options) {
        Object.assign(this, options)
        if (this.seg) {
            this._points = this.seg()
        }
        if (this.colorful) {
            this._colors = new Colors()
        }
        // options[key] &&
        // this.setEnumerable("colors", new Colors())
        return this
    }
    // _fadeout(step = 0.01) {
    //     let ctx = this._ctx
    //     if (ctx) {
    //         ctx.fillStyle = 'rgba(0,0,0, ' + step + ')';
    //         ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     }
    //     return this
    // }
    clear(ctx = this._ctx) {
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        return this
    }
    // 不可枚举属性  this._ctx
    setEnumerable() { //key, value
        if (arguments.length === 1) {
            let options = arguments[0]
            for (let key in options) {
                Object.defineProperty(this, "_" + key, {
                    value: options[key],
                    writable: true,
                    enumerable: false
                })
            }
        } else if (arguments.length === 2) {
            let [key, value] = arguments
            Object.defineProperty(this, "_" + key, {
                value,
                writable: true,
                enumerable: false
            })
        }
        // return this
    }
    //清空定时器
    reset() {
        this.timmer && clearInterval(this.timmer)
        return this
    }

    //绘制控制点
    drawController(ctx = this._ctx, points = this._points, o = this.o, pos = this.pos) {
        let controler = new Controler({
            ctx,
            points,
            o,
            pos
        })
        this.controler = controler
        this.activePointIndex = controler.draw().activePointIndex
    }

    // // 生成代码
    // createCode() {
    //     if (!this._points) return false
    //     var codes = ['// ' + this.name];
    //     codes.push('ctx.lineWidth=' + this.lineWidth);
    //     codes.push('ctx.strokeStyle=\'' + this.strokeStyle + '\';');
    //     codes.push('ctx.beginPath();');
    //     this._points.forEach((p, i) => {
    //         if (i == 0) {
    //             codes.push('ctx.moveTo(' + p[0] + ',' + p[1] + ');');
    //         } else {
    //             codes.push('ctx.lineTo(' + p[0] + ',' + p[1] + ');');
    //         }
    //     });
    //     codes.push('ctx.closePath();');
    //     codes.push('ctx.stroke();');
    //     return codes.join('\n');
    // }

    // //网格
    // drawGuidewires(ctx = this._ctx, x, y) {
    //     ctx.save();
    //     ctx.strokeStyle = 'rgba(0,0,230,0.4)';
    //     ctx.lineWidth = 0.5;
    //     ctx.beginPath();
    //     ctx.moveTo(x + 0.5, 0);
    //     ctx.lineTo(x + 0.5, ctx.canvas.height);
    //     ctx.stroke();
    //     ctx.beginPath();
    //     ctx.moveTo(0, y + 0.5);
    //     ctx.lineTo(ctx.canvas.width, y + 0.5);
    //     ctx.stroke();
    //     ctx.restore();
    // }

    // //绘制路径
    // createPath(ctx = this._ctx) {
    //     ctx.beginPath();
    //     this._points.forEach((p, i) => {
    //         ctx[i == 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
    //     });
    //     ctx.closePath();
    // }


    //判断鼠标是否选中对应的图形，选中哪个顶点，选中哪个控制点，中心点；
    // isInPath(ctx = this._ctx, pos) {
    //     for (var i = 0, point, len = this._points.length; i < len; i++) {
    //         point = this._points[i];
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
    draw(ctx = this._ctx) {
        this._draw.line.call(this, ctx)
        this.showController && this.drawController(ctx)
        return this
    }
    // 从新画
    redraw(options) {
        this.reset().update(options)
        this._draw.clear.call(this, this._ctx)
        this.draw()
    }
    drawSVG() {
        // this._draw._path(this)
        this._draw._draw(this)
    }
    redrawSVG(options) {
        this.reset().update(options)
        this._draw.clear()
        this.drawSVG()
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
            console.log(o)
            this.ui._set("o", o)
            if (this.controler) {
                this._points = this.controler.move(o).points
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
        let pos = _pos(e, this._ctx.canvas)
        if (this.showController) {
            this.pos = pos
        }
        if (this.followMouse) {
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