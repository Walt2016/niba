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
    angle: 0,
    fill: false,
    showController: false,
    color: "red",
    lineWidth: 1,
    midSeg: false,
    level: 2,
    controllerRadius: 5,
    controllerColor: 'red',
    controllerFill: true,
    controllerText: false,
    controllerShape: 'circle',
    offset: 0,
    showRadius: false,
    showSides: true,
    opacity: 0.5,
    // colorful: false,

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
    shape: ['r', 'n', 'angle']
}, {
    controller: ['showController', 'controllerRadius', 'controllerColor', 'controllerFill', 'controllerText', 'controllerShape', 'showRadius', 'showSides']
}, {
    color: ['fill', 'color', 'opacity']
}, {
    line: ['lineWidth']
}, {
    fractal: ['midSeg', 'level', 'offset'] //, 'colorful'
}]

// polygon.draw(ctx)

polygon.drawSVG()
let color = ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple"]
let controllerShape = ['circle', 'rect']

let ui = new UI.Form({
    data: polygon,
    options: {
        color,
        controllerColor: color,
        controllerShape
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