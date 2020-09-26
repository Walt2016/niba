import {
    setup as setupCanvas,
    draw as drawCanvas
} from '../draw'

import {
    RoundRect
} from '../entity'

import UI from '../ui'

let start = () => {
    let {
        ctx,
        canvas,
        width,
        height
    } = setupCanvas()

    let rr = new RoundRect({
        ctx,
        x: width / 2 - 100,
        y: height / 2 - 50,
        width: 200,
        height: 100,
        radius: 20,
        // fillColor:'red',
        fill: false,
        color: 'red',
        lineWidth: 1
    })

    rr.draw()
    return rr


}
let data = start()

// 参数分组
let group = [{
    pos: ['x', 'y']
}, {
    shape: ['width', 'height', 'radius']
}, {
    fill: ['fill', 'color']
}, {
    line: ['lineWidth']
}]


let ui = new UI.Form({
    data,
    options: {
        color: ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple"]
    },
    group,
    btns: [{
        text: "apply",
        name: 'submit',
        click: (e) => {
            console.log(e)
            data.reset().update(e).clear().draw()
        }
    }]
})

// // 窗体改变重绘
// window.onresize = () => {
//     start()
// }