// 文字

import BaseEntity from "./BaseEntity";

export default class Text extends BaseEntity {
    constructor(options) {
        super(options)
        // this.maxWidth = this.width
        this.set("maxWidth", this.width)
        // this.set("lineHeight",)
        // // if (typeof lineHeight == 'undefined') {
        // //     let canvas = ctx.canvas;
        // //     lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight);
        // // }

        // console.log("lineHeight" + lineHeight)
    }
    // draw
    //文字
    draw() {
        let {
            ctx,
            o,
            text = "A",
            pos = [0, 0],
            // x = 0,
            // y = 0,
            fontSize = 20,
            fillStyle = "#FF0000",
            maxWidth,
            border = false,
            wrap = false,
            letterSpacing = false

        } = this
        let [x, y] = pos
        ctx.font = fontSize + 'px Verdana';


        if (wrap) {
            this.wrapText()
        } else if (letterSpacing) {
            this.letterSpacingText()
        } else {
            ctx.fillStyle = fillStyle

            // ctx.fillText(text, o[0] + x, o[1] + y);
            ctx.fillText(text, x, y, maxWidth);
        }
        if (border) {
            this._border()
        }
    }
    // 边框
    _border() {
        let {
            ctx,
            // x,
            // y,
            pos = [0, 0],
            width,
            height,
            fontSize = 20
        } = this
        let [x, y] = pos
        ctx.beginPath();
        ctx.rect(x, y - fontSize, width, fontSize);
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // ctx.fillStyle = "#FF0000"
        // // ctx.fillStyle = 'rgb(' + (51 * index) + ', ' + (255 - 51 * index) + ', 255)';
        // // ctx.translate(this.x, this.y);
        // // ctx.fillRect(0, 0, this.rectWidth, this.rectHeight);
        // ctx.fillRect(x, y, width, height);
    }

    wrapText() {
        let {
            ctx,
            text,
            pos,
            // x,
            // y,
            maxWidth,
            lineHeight = 20
        } = this
        let [x, y] = pos
        // if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
        //     return;
        // }

        // var context = this;


        // if (typeof maxWidth == 'undefined') {
        //     maxWidth = (canvas && canvas.width) || 300;
        // }


        // 字符分隔为数组
        var arrText = text.split('');
        var line = '';

        for (var n = 0; n < arrText.length; n++) {
            var testLine = line + arrText[n];
            var metrics = ctx.measureText(testLine);
            console.log(metrics)
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = arrText[n];
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
    }
    letterSpacingText() {
        let {
            ctx,
            text,
            pos,
            // x,
            // y,
            maxWidth,
            lineHeight = 20,
            letterSpacing
        } = this
        let [x, y] = pos
        var arrText = text.split('');
        var align = ctx.textAlign || 'left';

        // 这里仅考虑水平排列
        var originWidth = ctx.measureText(text).width;
        // 应用letterSpacing占据宽度
        var actualWidth = originWidth + letterSpacing * (arrText.length - 1);
        // 根据水平对齐方式确定第一个字符的坐标
        if (align == 'center') {
            x = x - actualWidth / 2;
        } else if (align == 'right') {
            x = x - actualWidth;
        }

        // 临时修改为文本左对齐
        ctx.textAlign = 'left';
        // 开始逐字绘制
        arrText.forEach(function (letter) {
            var letterWidth = ctx.measureText(letter).width;
            ctx.fillText(letter, x, y);
            // 确定下一个字符的横坐标
            x = x + letterWidth + letterSpacing;
        });
        // 对齐方式还原
        ctx.textAlign = align;
    }
}