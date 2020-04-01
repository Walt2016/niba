import {
    _sin,
    _cos
} from '../utils'
export default class BaseEntity {
    constructor(options) {

        let {
            // x,
            // y,
            o = [0, 0],
                r = 50,
                a = 0,
                n = 3,
                width,
                height,
                speed,
                animate = "move2,bounce",
                shape
        } = options

        Object.assign(this, options)

        let [x, y] = o
        this.x = x
        this.y = y
        // 中点 //[x,y]
        this.o = o
        //半径
        this.r = r
        // 角度
        this.a = a
        //速度   
        this.vx = Math.random();
        this.vy = Math.random();
        this.va = Math.random() //* 10
        this.speed = speed || Math.random()
        // 方向
        this.dirX = 1
        this.dirY = 1

        // 活动范围
        this.width = width
        this.height = height

        this.animate = animate
        this.shape = shape
        this.n = n
        this.index = 0

    }
    update() {
        if (this.animate) {
            this.animate.split(",").forEach(t => {
                this[t] && this[t]()
            })
        }
        this.o = [this.x, this.y]
    }
    //反弹
    bounce() {
        // let r=this.r //边框
        if (this.width) {
            if (this.x + this.r > this.width || this.x - this.r < 0) {
                this.dirX *= -1
            }
        }

        if (this.height > 0) {
            if (this.y + this.r > this.height || this.y - this.r < 0) {
                this.dirY *= -1
            }
        }

    }
    //直线运动
    move() {
        this.x += this.speed * this.vx * this.dirX;
        this.y += this.speed * this.vy * this.dirY

    }
    //小蝌蚪游泳运动
    move2() {
        this.x += _cos(this.a) * this.speed * this.dirX;
        this.y += _sin(this.a) * this.speed * this.dirY
        this.a += Math.random() * 90 - 45;
        // this.a += Math.random() * 0.8 - 0.4;

        // if (this.x < 0 || this.x > this.w - this.radius) {
        //   return false;
        // }

        // if (this.y < 0 || this.y > this.h - this.radius) {
        //   return false;
        // }

    }
    //转动
    roll() {
        this.a += this.va
    }
    // roll2() {
    //     this.a2 += this.va2
    // }

    // 连线
    // link(points,ctx){
    //     points.forEach((t, i) => {
    //         ctx[i == 0 ? 'moveTo' : 'lineTo'].apply(ctx, t)
    //     });
    // }

    //生成顶点
    // createPoints(start, end) {
    //     var x1 = end.x - start.x,
    //         y1 = end.y - start.y,
    //         angle = 0;
    //     this.points = [];
    //     for (var i = 0; i < this.sides; i++) {
    //         angle = 2 * Math.PI / this.sides * i;
    //         var sin = Math.sin(angle),
    //             cos = Math.cos(angle),
    //             newX = x1 * cos - y1 * sin,
    //             newY = y1 * cos + x1 * sin;
    //         this.points.push({
    //             x: Math.round(start.x + newX),
    //             y: Math.round(start.y + newY)
    //         });
    //     }
    // }


    //生成控制点
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


    // 控制点
    drawCPoints(ctx) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'hsla(0,0%,50%,1)';
        ctx.fillStyle = 'hsla(0,100%,60%,1)';
        this.cPoints.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(p.x, p.y, 6, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.fill();
        });
        ctx.restore();
    }


    //绘制顶点
    drawPoints(ctx) {
        if (!this.points) return
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#999';
        ctx.font ="12px Verdana";
        this.points.forEach( (p,i) => {
            ctx.beginPath();
            ctx.arc(p[0], p[1], 5, 0, Math.PI * 2, false);
            ctx.fillText(i, p[0], p[1]);
            ctx.stroke();
        });
        ctx.restore();
    }
    //绘制中心点
    drawCenter(ctx) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'hsla(60,100%,45%,1)';
        ctx.fillStyle = 'hsla(60,100%,50%,1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
    //绘制控制点
    drawController(ctx) {
        this.drawPoints(ctx);
        this.drawCenter(ctx);
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
    drawGuidewires(ctx, x, y) {
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
    createPath(ctx) {
        ctx.beginPath();
        this.points.forEach((p, i) => {
            ctx[i == 0 ? 'moveTo' : 'lineTo'](p.x, p.y);
        });
        ctx.closePath();
    }


    //判断鼠标是否选中对应的图形，选中哪个顶点，选中哪个控制点，中心点；
    isInPath(ctx, pos) {
        for (var i = 0, point, len = this.points.length; i < len; i++) {
            point = this.points[i];
            ctx.beginPath();
            ctx.arc(point[0], point[1], 5, 0, Math.PI * 2, false);
            if (ctx.isPointInPath(pos[0], pos[1])) {
                return i;
            }
        }
        this.createPath(ctx);
        if (ctx.isPointInPath(pos[0], pos[1])) {
            return 9999;
        }
        return -1
    }



    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color || "#0000ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r || 3, 0, 2 * Math.PI);
        // ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
}

