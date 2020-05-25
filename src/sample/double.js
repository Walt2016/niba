import {
    setup as setupCanvas,
    draw as drawCanvas
} from '../draw'

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
let {
    ctx,
    canvas,
    width,
    height
} = setupCanvas()



let ui=new UI.Form({
    // data: polygon,
    options: {
        color: ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple"]
    },
    btns: [{
        text: "apply",
        name: 'submit',
        click: (e) => {
            console.log(e)
            polygon.reset().update(e).clear().draw()
        }
    }]
})
console.log(ui)

let polygon = new Polygon({
    o: [width / 2-100, height / 2],
    r: 100,
    n: 3,
    fill: true,
    showController: false,
    color: "red",
    lineWidth: 1,
    followMouse:false,
    animate:false,
    drag:false,
    fadeout:0.02,
    ctx,
    ui
})

let polygon2 = new Polygon({
    o: [width / 2+100, height / 2],
    r: 100,
    n: 3,
    fill: true,
    showController: false,
    color: "red",
    lineWidth: 1,
    followMouse:false,
    animate:false,
    drag:false,
    ctx,
    ui
})


ui.setData(polygon)

polygon.draw(ctx)
polygon2.draw(ctx)


new Events({
    canvas,
    ctx,
    entity:polygon
    // entity:[polygon,polygon2],
    // ui
})
