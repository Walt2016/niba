import {
    setup as setupCanvas,
    draw as drawCanvas
} from '../draw'

import {
    RoundRect
} from '../entity'
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

// 参数分组
let group = [{
    pos: ['x', 'y']
}, {
    shape: ['width', 'height', 'radius']
}, {
    fill: ['fill', 'color']
},{
    line:['lineWidth']
}]



import UI from '../ui'
let ui = new UI.Form({
    data: rr,
    options: {
        color: ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple"]
    },
    group,
    btns: [{
        text: "apply",
        name: 'submit',
        click: (e) => {
            console.log(e)
            rr.reset().update(e).clear().draw()
        }
    }]
})