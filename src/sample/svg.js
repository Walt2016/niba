import _ from '../utils/index'
import DrawSVG from '../draw/svg/index'
let draw = new DrawSVG()
let {
    width,
    height
} = draw

import Polygon from '../entity/Polygon'
import UI from '../ui'
let dataModel = {
    o: [width / 2, height / 2],
    r: 100,
    n: 6,
    angle: 0,
    fill: false,

    color: "red",
    lineWidth: 1,

    opacity: 0.5,
    dashLine: false,
    dashArray: [5, 5],

    radiusShow: false,
    radiusLineWidth: 1,
    radiusColor: 'red',
    radiusOpacity: 1,
    radiusDashLine: false,
    radiusDashArray: [5, 5],
    radiusLinecap: 'butt',


    edgeShow: true,
    edgeLineWidth: 1,
    edgeColor: 'red',
    edgeOpacity: 1,
    edgeDashLine: false,
    edgeDashArray: [5, 5],
    edgeLinejoin: 'arcs',
    edgeAnimationShift: false,
    edgeAnimationTwinkle: false,
    edgeText: false,
    edgeTextColor: 'red',
    edgeTextFontSize: 12,



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
    vertexOpacity: 0.5,
    vertexLineWidth: 1,
    vertexDashLine: false,
    vertexDashArray: [5, 5],
    vertexAnimationShift: false,
    vertexAnimationTwinkle: false,
    vertexText: false,
    vertexTextColor: 'red',
    vertexTextFontSize: 12,

    gridShow: false,
    gridLineWidth: 1,
    gridOpacity: 0.5,
    gridDashLine: false,
    gridDashArray: [5, 5],
    gridInterval: 100,
    gridColor: 'black',
    gridAnimationShift: false,
    gridRotate: 0,


    polarShow: false,
    polarLineWidth: 1,
    polarOpacity: 0.5,
    polarDashLine: false,
    polarDashArray: [5, 5],
    polarInterval: 100,
    polarColor: 'black',
    polarAnimationShift: false,


    // midSeg: false,
    fractalUse: false,
    fractalType: 'midSeg',
    fractalLevel: 3,
    fractalOffset: 0.5,


    amimationRotate:false

    // colorful: false,
    // followMouse:false,
    // animate:false,
    // drag:false,
    // ctx
    // ui
    // draw
}

// debugger
let polygon = new Polygon(dataModel, draw)

let _groupItem = (name) => {
    return {
        [name]: Object.keys(polygon).filter(t => t.indexOf(name) === 0)
    }
}
let _group = (props) => {
    return props.map(t => _groupItem(t))
}

let group = [{
        shape: ['o', 'r', 'n', 'angle', 'fill', 'color', 'opacity']
    },
    ..._group(['edge', 'radius', 'vertex', 'center', 'grid', 'polar', 'fractal','amimation']),
]

// polygon.draw(ctx)
polygon.drawSVG()
let color = ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple", 'lime']
let shape = ['circle', 'rect', 'line', 'polygon']
let linecap = ['butt', 'round', 'square', 'inherit']
let linejoin = ['arcs', 'bevel', 'miter', 'miter-clip', 'round']
let fractalType = ['midSeg', 'zoom']

let _options = () => {
    let keys = Object.keys(polygon)
    let opt = {}
    keys.filter(t => /color/i.test(t)).forEach(t => {
        opt[t] = color
    })
    keys.filter(t => /shape/i.test(t)).forEach(t => {
        opt[t] = shape
    })
    keys.filter(t => /linecap/i.test(t)).forEach(t => {
        opt[t] = linecap
    })
    keys.filter(t => /linejoin/i.test(t)).forEach(t => {
        opt[t] = linejoin
    })
    keys.filter(t => /fractalType/i.test(t)).forEach(t => {
        opt[t] = fractalType
    })
    return opt
}
let timmer
let v = Math.random()
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
        text: 'rotate',
        name: 'rotate',
        click: (e) => {
            polygon.redrawSVG(e)
            let edge = document.querySelector("[name='angle']")
            let btn = document.querySelector("[name='rotate']")
            timmer && clearTimeout(timmer)
            timmer = setTimeout(() => {
                edge.value = Number(edge.value) + Number(edge.getAttribute("step"))
                if (edge.value > 360) {
                    edge.value = 0
                }
                btn.click()
            }, 17)
        }
    }, {
        text: 'reset',
        name: 'reset'

    }, {
        text: 'move',
        name: 'move',
        click: (e) => {
            // debugger
            polygon.redrawSVG(e)
            let o = document.querySelector("[name='o']")
            let btn = document.querySelector("[name='move']")
            console.log(o.value)
            let [x, y] = o.value.split(",").map(t => Number(t))
            console.log(x, y)
            timmer && clearTimeout(timmer)
            timmer = setTimeout(() => {

                // let directX = 1 //x > width ? -1 : x < 0 ? -1 : 1
                // let directY = 1 // y > height ? -1 : y < 0 ? -1 : 1
                // x += directX * v
                // y += directY * v
                x += v
                y += v

                o.value = [x, y].map(t => +Number(t).toFixed(2))

                btn.click()
            }, 17)
        }

    }]
})
console.log(ui)