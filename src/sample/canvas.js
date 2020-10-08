import DrawCanvas from '../draw/canvas/index'

import {
    Ball,
    Polygon,
    BaseEntity,
    Rect,
    FoldLine,
    Ray,
    Text,
    Arc
} from '../entity'
import UI from '../ui'
import Events from '../events'
let draw = new DrawCanvas()
console.log(draw)
let {
    ctx,
    canvas,
    width,
    height
} = draw



let polygon = new Polygon({
    o: [width / 2, height / 2],
    r: 100,
    n: 6,
    fill: true,
    showController: false,
    color: "red",
    lineWidth: 1,
    // followMouse:false,
    // animate:false,
    // drag:false,
    ctx,
    // ui,
    draw
})
let group = [{
    pos: ['o']
}, {
    shape: ['r', 'n']
}, {
    controller: ['showController']
}, {
    color: ['fill', 'color']
}, {
    line: ['lineWidth']
}]

polygon.draw(ctx)

let ui = new UI.Form({
    data: polygon,
    options: {
        color: ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple"]
    },
    group,
    btns: [{
        text: "apply",
        name: 'submit',
        click: (e) => {
            console.log(e)
            polygon.redraw(e)
        }
    }]
})
console.log(ui)


// ui.setData(polygon)




// new Events({
//     canvas,
//     ctx,
//     entity:polygon,
//     // ui
// })