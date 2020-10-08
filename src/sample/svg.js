import DrawSVG from '../draw/svg/index'
let draw = new DrawSVG()
let {
    // ctx,
    // canvas,
    width,
    height,
    appendPath
}=draw

import Polygon from '../entity/Polygon'
import UI from '../ui'

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
    // ctx
    // ui
    draw
})
let group =[{
    pos:['o']
},{
    shape:['r','n']
},{
    controller:['showController']
},{
    color:['fill','color']
},{
    line:['lineWidth']
}]

// polygon.draw(ctx)

polygon.drawSVG()

let ui=new UI.Form({
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
            polygon.redrawSVG(e)
        }
    }]
})
console.log(ui)