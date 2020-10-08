import DrawSVG from '../draw/svg/index'
let draw = new DrawSVG()
let {
    // ctx,
    // canvas,
    width,
    height,
    appendPath
} = draw

import Polygon from '../entity/Polygon'
import UI from '../ui'

let polygon = new Polygon({
    o: [width / 2, height / 2],
    r: 100,
    n: 6,
    fill: false,
    showController: false,
    color: "red",
    lineWidth: 1,
    midSeg: false,
    level: 2,
    controllerRadius: 5,
    controllerColor: 'red',
    controllerFill: true,
    offset: 0,
    showRadius: false,
    showSides: true,
    // followMouse:false,
    // animate:false,
    // drag:false,
    // ctx
    // ui
    draw
})
let group = [{
    pos: ['o']
}, {
    shape: ['r', 'n']
}, {
    controller: ['showController', 'controllerRadius', 'controllerColor', 'controllerFill', 'showRadius','showSides']
}, {
    color: ['fill', 'color']
}, {
    line: ['lineWidth']
}, {
    fractal: ['midSeg', 'level', 'offset']
}]

// polygon.draw(ctx)

polygon.drawSVG()
let color = ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple"]

let ui = new UI.Form({
    data: polygon,
    options: {
        color,
        controllerColor: color,
    },
    group,
    btns: [{
        text: "apply",
        name: 'submit',
        click: (e) => {
            console.log(e)
            polygon.redrawSVG(e)
        }
    }]
})
console.log(ui)