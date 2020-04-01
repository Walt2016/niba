// 字母 或图形 点阵
import {Text} from '../entity'
export default class ImageData {
    constructor(options) {
        let {
            text = 'A',
                gap = 6,
                width,
                height
        } = options

        // const figures = [{
        //     shape: 'text',
        //     text: 'hello 2020',
        //     color: 'red', //'#000',
        //     fontSize: '200px Verdana',
        //     filter: 'lattice',
        //     y: 200
        //     // x:-300
        //     // o:[0,0]
        // }]




    }

    //文字
    // text(ctx) {
    //     let {
    //         o,
    //         text,
    //         x = 0,
    //         y = 0,
    //         fontSize,
    //         fillStyle = "#000"
    //     } = this
    //     ctx.fillStyle = fillStyle
    //     ctx.font = fontSize || "20px Verdana";
    //     // ctx.fillText(text, o[0] + x, o[1] + y);
    //     ctx.fillText(text, x, y);
    // }

    //图形点阵
    pixel(ctx) { //canvas,gap

        let _text= new Text({
            text: 'hello 2020',
            color: 'red', //'#000',
            fontSize: '200px Verdana',
        })
        _text.draw(ctx)

        // let {
        //     canvas,
        //     gap = 6 //采样间隙
        // } = options
        // let ctx = canvas.getContext("2d")
        // let cols = width = canvas.width;
        // let rows = height = canvas.height;
        // fill({color:"rgb(255,0,0)"})
        var imgData = ctx.getImageData(0, 0, cols, rows)
        let data = imgData.data
        // console.log(data)
        // var len = imgData.data.length;
        var points = [];
        // //rgba
        for (var i = 0; i < rows; i += gap) {
            for (var j = 0; j < cols; j += gap) {
                var pos = (i * cols + j) * 4;
                // 判断像素点是不是红色
                if (data[pos] == 255 && data[pos + 1] == 0 && data[pos + 2] == 0 && data[pos + 3] == 255) {
                    // var dot = new Dot(x, y);
                    points.push([j / gap, i / gap])
                    // points.push([i, j])
                }
            }
        }
        console.log(points)
        return points
    }

}