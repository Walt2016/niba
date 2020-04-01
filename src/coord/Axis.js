export default class Axis {
    constructor(options) {
        let {
            ctx,
            canvas
        } = options
        this.ctx = ctx



        let AXIS_MARGIN = 40 //一个常量
        this.AXIS_ORIGIN = {
            x: AXIS_MARGIN,
            y: canvas.height - AXIS_MARGIN
        } //原点坐标

        this.AXIS_TOP = AXIS_MARGIN //纵轴端点
        this.AXIS_RIGHT = canvas.width - AXIS_MARGIN, //横轴端点

            this.HORIZONTAL_TICK_SPACING = 10 //横轴间距
        this.VERTICAL_TICK_SPACING = 10 //纵轴间距

        this.AXIS_WIDTH = this.AXIS_RIGHT - this.AXIS_ORIGIN.x //横轴长度
        this.AXIS_HEIGHT = this.AXIS_ORIGIN.y - this.AXIS_TOP //纵轴长度

        this.NUM_VERTICAL_TICKS = this.AXIS_HEIGHT / this.VERTICAL_TICK_SPACING; //纵轴标尺的数量
        this.NUM_HORIZONTAL_TICKS = this.AXIS_WIDTH / this.HORIZONTAL_TICK_SPACING, //横轴标尺的数量

            this.TICK_WIDTH = 10;
        this.TICKS_LINEWIDTH = 0.5
        this.TICKS_COLOR = "navy"

        this.AXIS_LINEWIDTH = 1.0
        this.AXIS_COLOR = "blue";

        this.drawGrid(ctx, "lightgray", 10, 10);
        this.drawAxes(ctx);

    }

    //一个函数,由于绘制网格
    drawGrid(ctx, color, stepx, stepy) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;

        for (var i = stepx + 0.5; i < ctx.canvas.width; i += stepx) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, ctx.canvas.height);
            ctx.stroke();
        }

        for (var i = stepy + 0.5; i < ctx.canvas.height; i += stepy) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(ctx.canvas.width, i);
            ctx.stroke();
        }
    }

    drawAxes(ctx) {
        ctx.save();
        ctx.strokeStyle = this.AXIS_COLOR;
        ctx.lineWidth = this.AXIS_LINEWIDTH;

        this.drawHorizontalAxis(ctx);
        this.drawVerticalAxis(ctx);

        ctx.lineWidth = 0.5;
        ctx.lineWidth = this.TICKS_LINEWIDTH;
        ctx.strokeStyle = this.TICKS_COLOR;

        this.drawHorizontalAxisTicks(ctx);
        this.drawVertialAxisTicks(ctx);
        // this.drawNumberals(ctx);
    }

    //横坐标
    drawHorizontalAxis(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.AXIS_ORIGIN.x, this.AXIS_ORIGIN.y);
        ctx.lineTo(this.AXIS_RIGHT, this.AXIS_ORIGIN.y);
        ctx.stroke();
    }

    //纵坐标
    drawVerticalAxis(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.AXIS_ORIGIN.x, this.AXIS_ORIGIN.y);
        ctx.lineTo(this.AXIS_ORIGIN.x, this.AXIS_TOP);
        ctx.stroke();
    }

    //绘制纵坐标标尺及刻度数
    drawHorizontalAxisTicks(ctx) {
        var deltaY, num = 0;

        for (var i = 1; i < this.NUM_HORIZONTAL_TICKS; ++i) {
            let text = (ctx) => {
                ctx.font = "12pt Helvetica";
                ctx.fillText(num, this.AXIS_ORIGIN.x + (i - 6) * this.HORIZONTAL_TICK_SPACING, this.AXIS_ORIGIN.y + 3 * deltaY);
            }
            ctx.beginPath();
            if (i % 5 === 0) {
                deltaY = this.TICK_WIDTH;
                text(ctx);
                num++;
            } else {
                deltaY = this.TICK_WIDTH / 2;
            }
            ctx.moveTo(this.AXIS_ORIGIN.x + i * this.HORIZONTAL_TICK_SPACING, this.AXIS_ORIGIN.y - deltaY);
            ctx.lineTo(this.AXIS_ORIGIN.x + i * this.HORIZONTAL_TICK_SPACING, this.AXIS_ORIGIN.y + deltaY);
            ctx.stroke();




        }
    }


    //横坐标标尺及刻度
    drawVertialAxisTicks(ctx) {
        var deltaX, num = 1;

        for (var i = 1; i < this.NUM_VERTICAL_TICKS; ++i) {
            let text = (ctx) => {
                ctx.font = "12pt Helvetica";
                ctx.fillText(num, this.AXIS_ORIGIN.x - 3 * deltaX, this.AXIS_ORIGIN.y - i * this.VERTICAL_TICK_SPACING);
            }
            ctx.beginPath();
            if (i % 5 === 0) {
                deltaX = this.TICK_WIDTH;
                text(ctx);
                num++;
            } else {
                deltaX = this.TICK_WIDTH / 2;
            }
            ctx.moveTo(this.AXIS_ORIGIN.x - deltaX, this.AXIS_ORIGIN.y - i * this.VERTICAL_TICK_SPACING);
            ctx.lineTo(this.AXIS_ORIGIN.x + deltaX, this.AXIS_ORIGIN.y - i * this.VERTICAL_TICK_SPACING);
            ctx.stroke();


        }
    }

}

// var canvas = document.getElementById("canvas"),
//     ctx = canvas.getContext("2d"),