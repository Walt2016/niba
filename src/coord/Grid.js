export default class Grid {
    constructor(options) {
        let {
            ctx
        } = options
        let {
            width,
            height
        } = ctx.canvas
        this.ctx = ctx
        this.width = width
        this.height = height

        // this.grid(10, 10, 'lightgray', 0.5);
        this.drawgrid()
    }

    grid(stepX, stepY, color, lineWidth) {
        let {
            ctx,
            width,
            height
        } = this
        // 创建垂直格网线路径
        for (let i = 0.5 + stepX; i < width; i += stepX) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
        }
        // 创建水平格网线路径
        for (let j = 0.5 + stepY; j < height; j += stepY) {
            ctx.moveTo(0, j);
            ctx.lineTo(width, j);
        }

        // 设置绘制颜色
        ctx.strokeStyle = color;
        // 设置绘制线段的宽度
        ctx.lineWidth = lineWidth;
        // 绘制格网
        ctx.stroke();
        // 清除路径
        ctx.beginPath();
    }
    /**绘制小网格
     * 第一个for语句循环出纵向小方格细线条，间距为X轴方向3像素
     * 第二个for语句循环出横向小方格细线条，间距为Y轴方向3像素
     */
    drawSmallGrid(ctx) {
        ctx.strokeStyle = "#f1dedf";
        ctx.strokeWidth = 1;
        ctx.beginPath();
        let {width,height}=ctx.canvas
        for (var x = 0.5; x < width; x += 3) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (var y = 0.5; y < height; y += 3) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        ctx.closePath();
        return;
    }
    /**绘制中型网格
     * 第一个for语句循环出纵向中方格中线条，间距为X轴方向15像素，小网格的5倍
     * 第二个for语句循环出横向中方格中线条，间距为Y轴方向15像素，小网格的5倍
     */
    drawMediumGrid(ctx) {
        ctx.strokeStyle = "#fdbeb9";
        ctx.strokeWidth = 2
        //宽度是小网格的2倍
        ctx.beginPath();
        let {width,height}=ctx.canvas
        for (var x = 0.5; x < width; x += 15) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (var y = 0.5; y < height; y += 15) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        ctx.closePath();
        return;
    }
    /**绘制大型网格
     * 第一个for语句循环出纵向大方格中线条，间距为X轴方向75像素，小网格的5倍
     * 第二个for语句循环出横向大方格中线条，间距为Y轴方向75像素，小网格的5倍
     */
    drawBigGrid(ctx) {
        ctx.strokeStyle = "#e0514b";
        ctx.strokeWidth = 3;
        ctx.beginPath();
        let {width,height}=ctx.canvas
        for (var x = 0.5; x < width; x += 75) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (var y = 0.5; y < height; y += 75) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        ctx.closePath();
        return;
    }
    /**绘制网格总函数
     * 分别绘制
     * drawSmallGrid小网格
     * drawMediumGrid中网格
     * drawBigGrid大网格
     */
    drawgrid() {
        let {
            ctx
        } = this
        this.drawSmallGrid(ctx);
        this.drawMediumGrid(ctx);
        this.drawBigGrid(ctx);
    }
    // draw(options) {
    //     let {
    //         ctx,
    //         color = "#000",
    //         stepx = 10,
    //         stepy = 10,
    //         padding = 0
    //     } = options
    //     let {
    //         width,
    //         height
    //     } = ctx.canvas
    //     ctx.strokeStyle = color;
    //     ctx.lineWidth = 0.5;

    //     for (var i = stepx + 0.5 + padding; i <= width - padding * 2; i += stepx) {
    //         ctx.beginPath();
    //         ctx.moveTo(i, padding);
    //         ctx.lineTo(i, height - padding );
    //         ctx.stroke();
    //     }

    //     for (var i = stepy + 0.5 + padding; i <= height - padding * 2; i += stepy) {
    //         ctx.beginPath();
    //         ctx.moveTo(padding, i);
    //         ctx.lineTo(width - padding , i);
    //         ctx.stroke();
    //     }
    // }

}