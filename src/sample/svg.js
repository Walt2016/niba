import _ from '../utils/index'
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

    color: "red",
    lineWidth: 1,
    midSeg: false,
    level: 2,
    // showController: false,
    // controllerRadius: 5,
    // controllerColor: 'red',
    // controllerFill: true,
    // controllerText: false,
    // controllerShape: 'circle',
    offset: 0.5,
    opacity: 0.5,
    dashLine: false,
    dashArray: [5, 5],

    radiusShow: false,
    radiusLineWidth: 1,
    radiusColor: 'red',
    radiusOpacity: 1,
    radiusDashLine: false,
    radiusDashArray: [5, 5],

    sidesShow: true,
    // sidesNumber: 5,
    sidesLineWidth: 1,
    sidesColor: 'red',
    sidesOpacity: 1,
    sidesDashLine: false,
    sidesDashArray: [5, 5],


    centerShow: false,
    centerFill: true,
    centerColor: 'red',
    centerRadius: 8,
    centerShape: 'circle',
    centerOpacity: 0.5,
    centerLineWidth: 1,
    centerDashLine: false,
    centerDashArray: [5, 5],


    vertexShow: false,
    vertexFill: true,
    vertexColor: 'red',
    vertexRadius: 5,
    vertexShape: 'circle',
    vertexText: false,
    vertexTextColor: 'red',
    vertexOpacity: 0.5,
    vertexLineWidth: 1,
    vertexDashLine: false,
    vertexDashArray: [5, 5],
    // colorful: false,

    // followMouse:false,
    // animate:false,
    // drag:false,
    // ctx
    // ui
    draw
})

let _groupItem = (name) => {
    return {
        [name]: Object.keys(polygon).filter(t => t.indexOf(name) === 0)
        // [name]: [_.camelCase(['show', name])].concat(Object.keys(polygon).filter(t => t.indexOf(name) === 0))
    }
}
let _group = (props) => {
    return props.map(t => _groupItem(t))
}

let group = [{
        shape: ['o', 'r', 'n', 'angle', 'fill', 'color', 'opacity']
    },
    ..._group(['sides', 'radius', 'vertex', 'center']),
    {
        fractal: ['midSeg', 'level', 'offset'] //, 'colorful'
    }
]

// polygon.draw(ctx)
polygon.drawSVG()
let color = ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple", 'lime']
let shape = ['circle', 'rect', 'line', 'polygon']

let _options = () => {
    let keys = Object.keys(polygon)
    let opt = {}
    keys.filter(t => /color/i.test(t)).forEach(t => {
        opt[t] = color
    })
    keys.filter(t => /shape/i.test(t)).forEach(t => {
        opt[t] = shape
    })
    return opt
}
let timmer
let ui = new UI.Form({
    data: polygon,
    options: _options(),
    group,
    btns: [{
        text: "apply",
        name: 'submit',
        click: (e) => {
            console.log(e)
            polygon.redrawSVG(e)
            timmer && clearTimeout(timmer)
        }
    }, {
        text: 'roate',
        name: 'animate',
        click: (e) => {
            polygon.redrawSVG(e)
            let sides = document.querySelector("[name='angle']")
            let btn = document.querySelector("[name='animate']")
            timmer && clearTimeout(timmer)
            timmer = setTimeout(() => {
                sides.value = Number(sides.value) + Number(sides.getAttribute("step"))
                if (sides.value > 360) {
                    sides.value = 0
                }
                btn.click()
            }, 17)
            // if (btn.innerText === 'stop') {
            //     // btn.innerText = "animate"
            // } else {
            //     btn.innerText = "stop"
            //     setTimeout(() => {
            //         sides.value = Number(sides.value) + Number(sides.getAttribute("step"))
            //         btn.click()
            //     }, 1000)
            // }
            // timmer && clearTimeout(timmer)


            // timmer && clearInterval(timmer)

            // timmer = setInterval(() => {
            //     sides.value = Number(sides.value) + Number(sides.getAttribute("step"))
            //     console.log(e)
            //     // debugger
            //     polygon.redrawSVG(e)
            // }, 1000)
        }
    }]
})
console.log(ui)