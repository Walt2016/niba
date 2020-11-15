import _ from '../utils/index'
import DrawSVG from '../draw/svg/index'
let draw = new DrawSVG()
let {
    width,
    height
} = draw

import Polygon from '../entity/Polygon'
import UI from '../ui'
import Group from '../draw/svg/group'
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
    dashAnimation: false,
    linejoin: 'arcs',
    sort: 'normal',

    // 半径
    radiusShow: false,
    radiusLineWidth: 1,
    radiusColor: 'red',
    radiusOpacity: 1,
    radiusDashLine: false,
    radiusDashArray: [5, 5],
    radiusDashAnimation: false,
    radiusLinecap: 'butt',
    rediusMarkerArrow: false,

    // 边
    edgeShow: true,
    edgeLineWidth: 1,
    edgeColor: 'red',
    edgeOpacity: 1,
    edgeDashLine: false,
    edgeDashArray: [5, 5],
    edgeLinejoin: 'arcs',
    edgeDashAnimation: false,
    edgeAnimationTwinkle: false,
    edgeText: false,
    edgeTextColor: 'red',
    edgeTextFontSize: 12,
    // edgeColorful: false,


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
    centerDashAnimation: false,

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
    vertexDashAnimation: false,
    vertexAnimationTwinkle: false,
    vertexText: false,
    vertexTextColor: 'red',
    vertexTextFontSize: 12,
    vertexColorful: false,
    vertexColorfulOpacity:0.5,

    // 旁切圆
    excircleShow: false,
    excircleLineWidth: 1,
    excircleOpacity: 0.5,
    excircleDashLine: false,
    excircleDashArray: [5, 5],
    excircleDashAnimation: false,
    excircleColor: 'red',
    

    // 网格坐标
    gridShow: false,
    gridLineWidth: 1,
    gridOpacity: 0.5,
    gridDashLine: false,
    gridDashArray: [5, 5],
    gridDashAnimation: false,
    gridInterval: 100,
    gridColor: 'black',
    gridRotate: 0,

    // 极坐标
    polarShow: false,
    polarLineWidth: 1,
    polarOpacity: 0.5,
    polarDashLine: false,
    polarDashArray: [5, 5],
    polarDashAnimation: false,
    polarInterval: 100,
    polarColor: 'black',

    

    // 分形
    fractalUse: false,
    fractalType: 'midSeg',
    fractalLevel: 3,
    fractalOffset: 0.5,
    fractalTimerUse: false,
    fractalTimerDelay: 500,
    fractalColorful: false,
    fractalColorfulOpacity:0.5,

    // 动画
    animationUse: false,
    animationName: 'rotate',
    animationDuration: 1,
    animationIterationCount: 'infinite',

    // 变形
    transformUse: false,
    transformName: 'scale',
    transformPropA: 2,
    transformPropB: 2,

    // 坐标轴
    axisXShow: false,
    axisXLineWidth: 1,
    axisXColor: 'black',
    axisXOpacity: 0.5,
    axisXDashLine: false,
    axisXDashArray: [5, 5],
    axisXDashAnimation: false,
    axisXSticks: true,

    axisYShow: false,
    axisYLineWidth: 1,
    axisYColor: 'black',
    axisYOpacity: 0.5,
    axisYDashLine: false,
    axisYDashArray: [5, 5],
    axisYDashAnimation: false,
    axisYSticks: true,

    // 背景
    patternShow:false,
    patternUnits:'objectBoundingBox'



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
let group = Group._group(polygon)
let options = Group._options(polygon)

// polygon.draw(ctx)
polygon.drawSVG()
let timmer
let v = Math.random()
let ui = new UI.Form({
    data: polygon,
    options,
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
        // {
        //     text: 'rotate',
        //     name: 'rotate',
        //     click: (e) => {
        //         polygon.redrawSVG(e)
        //         let edge = document.querySelector("[name='angle']")
        //         let btn = document.querySelector("[name='rotate']")
        //         timmer && clearTimeout(timmer)
        //         timmer = setTimeout(() => {
        //             edge.value = Number(edge.value) + Number(edge.getAttribute("step"))
        //             if (edge.value > 360) {
        //                 edge.value = 0
        //             }
        //             btn.click()
        //         }, 17)
        //     }
        // },
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