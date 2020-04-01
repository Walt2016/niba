// 文字

import BaseEntity from "./BaseEntity";

export default class Text extends BaseEntity {
    constructor(options) {
        super(options)
    }
    // draw
    //文字
    draw(ctx) {
        let {
            o,
            text="A",
            x = 0,
            y = 0,
            fontSize,
            fillStyle = "#FF0000"
        } = this
        ctx.fillStyle = fillStyle
        ctx.font = fontSize || "20px Verdana";
        // ctx.fillText(text, o[0] + x, o[1] + y);
        ctx.fillText(text, x, y);

    }
}
