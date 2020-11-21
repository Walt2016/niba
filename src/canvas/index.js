import config from '../config'
let {
    env,
    center
} = config
let {
    width,
    height
} = env

export default class DrawCanvas {
    constructor(options) {
        this.init(options)
    }
    init(options) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext("2d")
        canvas.width = width
        canvas.height = height


        canvas.style.position = 'absolute';
        canvas.style.top = 0;
        canvas.style.bottom = 0;
        canvas.style.left = 0;
        canvas.style.right = 0;
        canvas.style.zIndex = -1;

        canvas.style.background = '-webkit-radial-gradient(#ffffff, #505050)';
        canvas.style.background = '-moz-radial-gradient(#ffffff, #505050)';
        canvas.style.background = '-ms-radial-gradient(#ffffff, #505050)';
        canvas.style.background = '-o-radial-gradient(#ffffff, #505050)';
        canvas.style.background = 'radial-gradient(#ffffff, #505050)';
        document.body.appendChild(canvas)

        Object.assign(this, {
            ctx,
            canvas,
            width,
            height
        })
    }
    //连线
    line(ctx = this._ctx) {
        let {
            fillStyle = "#FF0000",
                strokeStyle = "#FF0000",
                closePath = true,
                _points,
                color,
                fill,
                lineWidth = 1
        } = this
        ctx.fillStyle = color || fillStyle
        ctx.strokeStyle = color || strokeStyle;
        ctx.lineWidth = lineWidth

        ctx.beginPath();
        _points.forEach((t, i) => {
            ctx[i == 0 ? 'moveTo' : 'lineTo'].apply(ctx, t)
        });

        if (closePath) {
            ctx.closePath();
        }
        ctx.stroke()
        if (fill) {
            ctx.fill()
        }
    }
    // 生成代码
    createCode() {
        if (!this._points) return false
        var codes = ['// ' + this.name];
        codes.push('ctx.lineWidth=' + this.lineWidth);
        codes.push('ctx.strokeStyle=\'' + this.strokeStyle + '\';');
        codes.push('ctx.beginPath();');
        this._points.forEach((p, i) => {
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
    drawGuidewires(ctx = this._ctx, x, y) {
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
    createPath(ctx = this._ctx) {
        ctx.beginPath();
        this._points.forEach((p, i) => {
            ctx[i == 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
        });
        ctx.closePath();
    }

    _fadeout(step = 0.01) {
        let ctx = this._ctx
        if (ctx) {
            ctx.fillStyle = 'rgba(0,0,0, ' + step + ')';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        return this
    }
    clear(ctx = this._ctx) {
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        return this
    }
}