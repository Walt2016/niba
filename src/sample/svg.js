import config from '../config'
let {
    env,
    center
} = config
let {
    width,
    height
} = env

import Polygon from '../entity/Polygon'
import UI from '../ui'
import Group from '../svg/group'
let dataModel = {
    // 图形  全局
    // global: {
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
    segType: 'equiangular',
    // },
    // 半径
    radius: {
        show: false,
        lineWidth: 1,
        color: 'red',
        opacity: 1,
        dashLine: false,
        dashArray: [5, 5],
        dashAnimation: false,
        linecap: 'butt',
        closed: true,
        broken: false,
        markerArrow: false,
        waveform: 'line',
        ratio: 1,
        controller: false,
        angleOffset: 0,
        orient: true,
        recycleIndex: 0,
        splitNum: 0
    },
    // 边
    edge: {
        show: true,
        lineWidth: 1,
        color: 'red',
        opacity: 1,
        dashLine: false,
        dashArray: [5, 5],
        linejoin: 'arcs',
        dashAnimation: false,
        animationTwinkle: false,
        text: false,
        textColor: 'red',
        textFontSize: 12,
        closed: true,
        broken: false,
        waveform: 'line',
        radiusRatio: 1,
        controlPoint: false,
        controlLink: false,
        angleOffset: 0,
        orient: true,
        recycleIndex: 0,
        splitNum: 0,
    },


    // 中心点
    center: {
        show: false,
        fill: true,
        color: 'red',
        radius: 8,
        shape: 'circle',
        opacity: 0.5,
        lineWidth: 1,
        dashLine: false,
        dashArray: [5, 5],
        dashAnimation: false,
    },

    // 顶点
    vertex: {
        show: false,
        fill: true,
        color: 'red',
        radius: 5,
        shape: 'circle',
        opacity: 0.5,
        lineWidth: 1,
        dashLine: false,
        dashArray: [5, 5],
        dashAnimation: false,
        animationTwinkle: false,
        text: false,
        textColor: 'red',
        textFontSize: 12,
        colorful: false,
        colorfulOpacity: 0.5,
    },

    // 旁切圆
    excircle: {
        show: false,
        fill: false,
        lineWidth: 1,
        opacity: 0.5,
        dashLine: false,
        dashArray: [5, 5],
        dashAnimation: false,
        color: 'red'
    },

    // 内切圆
    incircle: {
        show: false,
        fill: false,
        lineWidth: 1,
        opacity: 0.5,
        dashLine: false,
        dashArray: [5, 5],
        dashAnimation: false,
        color: 'red',
    },


    // 网格坐标
    grid: {
        show: false,
        lineWidth: 1,
        opacity: 0.5,
        dashLine: true,
        dashArray: [5, 5],
        dashAnimation: false,
        interval: 100,
        color: 'black',
        rotate: 0,
    },

    // 极坐标
    polar: {
        show: false,
        lineWidth: 1,
        opacity: 0.5,
        dashLine: true,
        dashArray: [5, 5],
        dashAnimation: false,
        interval: 100,
        color: 'black',
    },


    // 分形
    fractal: {
        use: false,
        type: 'midSeg',
        level: 3,
        offset: 0.5,
        timerUse: false,
        timerDelay: 500,
        colorful: false,
        colorfulOpacity: 0.5,
    },

    // 动画
    animation: {
        use: false,
        name: 'rotate',
        duration: 1,
        iterationCount: 'infinite',

    },

    // 变形
    transform: {
        use: false,
        name: 'scale',
        propA: 2,
        propB: 2,

    },

    // 坐标轴
    axisX: {
        show: false,
        lineWidth: 1,
        color: 'black',
        opacity: 0.5,
        dashLine: false,
        dashArray: [5, 5],
        dashAnimation: false,
        sticks: true,
        arrow: true,
    },
    axisY: {
        show: false,
        lineWidth: 1,
        color: 'black',
        opacity: 0.5,
        dashLine: false,
        dashArray: [5, 5],
        dashAnimation: false,
        sticks: true,
        arrow: true,

    },

    // 背景
    pattern: {
        use: false,
        // Units: 'objectBoundingBox',
        name: 'chequer',
        color1: 'red',
        color2: 'red',
        size: 10,
        offset: 0,
        skewX: 0,
        opacity: 1,

    },

    // 连接线
    link: {
        show: false,
        lineWidth: 1,
        color: 'black',
        opacity: 0.5,
        dashLine: true,
        dashArray: [5, 5],
        dashAnimation: false,
        waveform: 'line',
        radiusRatio: 1,
        controlPoint: false,
        controlLink: false,
        angleOffset: 0,
        orient: true,
        recycleIndex: 0,
        splitNum: 0,
    },

    // 曲线
    curve: {
        show: false,
        radiusRatio: 1,
        controlPoint: false,
        controlLink: false,
        angleOffset: 0,
        orient: true,
        recycleIndex: 0,
        splitNum: 0,
    },

    // 波浪形
    wave: {
        show: false,
        radiusRatio: 1,
        controlPoint: false,
        controlLink: false,
        angleOffset: 0,
        orient: true,
        recycleIndex: 0,
        splitNum: 0,
    },

    // 锯齿形
    sawtooth: {
        show: false,
        radiusRatio: 1,
        controlPoint: false,
        controlLink: false,
        angleOffset: 0,
        orient: true,
        recycleIndex: 0,
        splitNum: 0,
    },

    // 半圆
    semicircle: {
        show: false,
        sweepFlag: true,
        recycleIndex: 0,
        splitNum: 0,
    },


    // 椭圆弧
    elliptical: {
        show: false,
        sweepFlag: true,
        radiusRatio: 1,
        xAxisRotation: 0,
        largeArcFlag: false,
        recycleIndex: 0,
        splitNum: 0,
    },

    // 渐变
    gradient: {
        use: false,
        type: 'linearGradient',
        color1: 'red',
        color2: 'blue'
    },

    // 格子
    chequer: {
        use: false,
        size: 10,
        color1: 'red',
        color2: 'green',
        borderRadius1: 1,
        borderRadius2: 1,
    },

    // 条纹
    stripe: {
        use: false,
        size: 10,
        color1: 'red',
        color2: 'green',
        radio: 0.2,
        skewX: 0,
    },

    diagonalStripe: {
        use: false,
        size: 10,
        color1: 'red',
        offset: 0
    }
}


let polygon = new Polygon(dataModel, "svg")
let options = Group._options(polygon)
// debugger
polygon.draw()
let ui = new UI.Form({
    el: "#params-container",
    data: polygon,
    options,
    group: true,
    btns: [{
            text: "apply",
            name: 'submit',
            click: (e) => {
                console.log(e)
                // polygon.redrawSVG(e)
                polygon.redraw(e)
                // timmer && clearTimeout(timmer)
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