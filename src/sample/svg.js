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
    // 全局
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
    linejoin: 'arcs',

    // 半径
    radiusShow: false,
    radiusLineWidth: 1,
    radiusColor: 'red',
    radiusOpacity: 1,
    radiusDashLine: false,
    radiusDashArray: [5, 5],
    radiusLinecap: 'butt',

    // 边
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


    // 中心点
    centerShow: false,
    centerFill: true,
    centerColor: 'red',
    centerRadius: 8,
    centerShape: 'circle',
    centerOpacity: 0.5,
    centerLineWidth: 1,
    centerDashLine: false,
    centerDashArray: [5, 5],

    // 顶点
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

    // 网格坐标
    gridShow: false,
    gridLineWidth: 1,
    gridOpacity: 0.5,
    gridDashLine: false,
    gridDashArray: [5, 5],
    gridInterval: 100,
    gridColor: 'black',
    gridAnimationShift: false,
    gridRotate: 0,

    // 极坐标
    polarShow: false,
    polarLineWidth: 1,
    polarOpacity: 0.5,
    polarDashLine: false,
    polarDashArray: [5, 5],
    polarInterval: 100,
    polarColor: 'black',
    polarAnimationShift: false,

    // 分形
    fractalUse: false,
    fractalType: 'midSeg',
    fractalLevel: 3,
    fractalOffset: 0.5,

    // 动画
    animationUse: false,
    animationName: 'rotate',
    animationDuration: 1,
    animationIterationCount: 'infinite',

    // 变形
    transformUse: false,
    transformName: 'scale',
    transformPropA: 2,
    transformPropB: 2




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
        shape: ['o', 'r', 'n', 'angle', 'fill', 'color', 'opacity', 'dashLine', 'dashArray', 'linejoin']
    },
    ..._group(['edge', 'radius', 'vertex', 'center', 'grid', 'polar', 'fractal', 'animation', 'transform']),
]

// polygon.draw(ctx)
polygon.drawSVG()
let optionsConfig = {
    color: ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple", 'lime'],
    shape: ['circle', 'rect', 'line', 'polygon'],
    linecap: ['butt', 'round', 'square', 'inherit'],
    linejoin: ['arcs', 'bevel', 'miter', 'miter-clip', 'round'],
    fractalType: ['midSeg', 'zoom'],
    animationName: ['rotate', 'twinkle'],
    transformName: ['scale', 'translate', 'rotate', 'skew']
}

let _options = () => {
    let keys = Object.keys(polygon)
    let opt = {}
    let regs = Object.keys(optionsConfig)
    regs.forEach(reg => {
        keys.filter(t => (new RegExp(reg, 'i')).test(t)).forEach(t => {
            opt[t] = optionsConfig[reg]
        })
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
        },
        {
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
        },
        {
            text: 'reset',
            name: 'reset'

        },
        // {
        //     text: 'move',
        //     name: 'move',
        //     click: (e) => {
        //         // debugger
        //         polygon.redrawSVG(e)
        //         let o = document.querySelector("[name='o']")
        //         let btn = document.querySelector("[name='move']")
        //         console.log(o.value)
        //         let [x, y] = o.value.split(",").map(t => Number(t))
        //         console.log(x, y)
        //         timmer && clearTimeout(timmer)
        //         timmer = setTimeout(() => {
        //             x += v
        //             y += v
        //             o.value = [x, y].map(t => +Number(t).toFixed(2))
        //             btn.click()
        //         }, 17)
        //     }

        // }
    ]
})
console.log(ui)