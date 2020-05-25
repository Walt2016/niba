// 圆角矩形
import BaseEntity from './BaseEntity'

export default class RoundRect extends BaseEntity {
    constructor(options) {
        super(options)
    }
    draw() {
        this.fillRoundRect()
    }
    fillRoundRect() {
        let {
            x,
            y,
            width,
            height,
            radius = 5,
            fillColor,
            fill,
            color = 'red',
            strokeColor,
            ctx
        } = this
        //圆的直径必然要小于矩形的宽高          
        if (2 * radius > width || 2 * radius > height) {
            return false;
        }

        ctx.save();
        ctx.translate(x, y);
        //绘制圆角矩形的各个边  
        this.drawRoundRectPath(width, height, radius);
        ctx.fillStyle = fillColor || color;
        ctx.strokeStyle = strokeColor || color
        if (fill) {
            ctx.fill();
        }
        ctx.stroke()
        ctx.restore();
    }
    strokeRoundRect(x, y, width, height, radius, /*optional*/ lineWidth, /*optional*/ strokeColor) {
        let ctx = this.ctx
        //圆的直径必然要小于矩形的宽高          
        if (2 * radius > width || 2 * radius > height) {
            return false;
        }

        ctx.save();
        ctx.translate(x, y);
        //绘制圆角矩形的各个边  
        this.drawRoundRectPath(width, height, radius);
        ctx.lineWidth = lineWidth || 2; //若是给定了值就用给定的值否则给予默认值2  
        ctx.strokeStyle = strokeColor || "#000";
        ctx.stroke();
        ctx.restore();
    }

    drawRoundRectPath(width, height, radius) {
        let ctx = this.ctx
        ctx.beginPath(0);
        //从右下角顺时针绘制，弧度从0到1/2PI  
        ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

        //矩形下边线  
        ctx.lineTo(radius, height);

        //左下角圆弧，弧度从1/2PI到PI  
        ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

        //矩形左边线  
        ctx.lineTo(0, radius);

        //左上角圆弧，弧度从PI到3/2PI  
        ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

        //上边线  
        ctx.lineTo(width - radius, 0);

        //右上角圆弧  
        ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

        //右边线  
        ctx.lineTo(width, height - radius);
        ctx.closePath();
    }

}