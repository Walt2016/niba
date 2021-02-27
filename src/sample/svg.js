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
// 虚线
let dashLine = {
  show: false,
  dashArray: [5, 5],
  animation: false,
}
// 文本
let text = {
  show: false,
  color: 'red',
  fontSize: 12
}
// 实线
let line = {
  lineWidth: 1,
  color: 'red',
  opacity: 0.5,
  linejoin: 'arcs',
}
let fill = {
  show: false,
  color: 'red',
  opacity: 1
}
// 控制点
let controller = {
  show: false,
  link: false,
  color: 'red',
  radius: 5
}
// 延迟动画
let timer = {
  use: false,
  delay: 500,
}
let colorful = {
  use: false,
  opacity: 0.5,
}
let dataModel = {
  // 图形  全局
  // global: {
  o: [width / 2, height / 2].map(t => +t.toFixed(2)),
  r: 100,
  n: 6,
  angle: 0,
  fill: false,
  color: "red",
  lineWidth: 1,
  opacity: 0.5,
  dashLine:false,
  dashArray: [5, 5],
  dashAnimation: false,
  // line,
  // dashLine,
  // linejoin: 'arcs',
  sort: 'normal',
  segType: 'equiangular',
  // },
  // 半径
  radius: {
    show: false,
    color: 'red',
    opacity: 1,
    line,
    dashLine,
    closed: true,
    broken: false,
    markerArrow: false,
    waveform: 'line',
    ratio: 1,
    controller,
    angleOffset: 0,
    orient: true,
    recycleIndex: 0,
    splitNum: 0
  },
  // 边
  edge: {
    show: true,
    line,
    dashLine,
    text,
    animationTwinkle: false,
    closed: true,
    broken: false,
    waveform: 'line',
    radiusRatio: 1,
    controller,
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
    line,
    dashLine
  },

  // 顶点
  vertex: {
    show: false,
    fill: true,
    color: 'red',
    radius: 5,
    shape: 'circle',
    opacity: 0.5,
    line,
    dashLine,
    animationTwinkle: false,
    text,
    colorful
  },

  // 旁切圆
  excircle: {
    show: false,
    fill: false,
    color: 'red',
    opacity: 0.5,
    line,
    dashLine
  },

  // 内切圆
  incircle: {
    show: false,
    fill: false,
    color: 'red',
    // lineWidth: 1,
    opacity: 0.5,
    line,
    dashLine
  },


  // 网格坐标
  grid: {
    show: false,
    lineWidth: 1,
    opacity: 0.5,
    dashLine,
    interval: 100,
    color: 'black',
    rotate: 0,
  },

  // 极坐标
  polar: {
    show: false,
    lineWidth: 1,
    opacity: 0.5,
    dashLine,
    interval: 100,
    color: 'black',
  },


  // 分形
  fractal: {
    use: false,
    type: 'midSeg',
    level: 3,
    offset: 0.5,
    ratio: 1,
    timer,
    colorful
    // refraction: 0
  },
  // 镜像
  mirror: {
    use: false,
    type: 'vertex',
    level: 3,

    ratio: 0.5,
    refraction: 0,
    offset: 1,
    timer,
    colorful
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
    dashLine,
    sticks: true,
    arrow: true,
  },
  axisY: {
    show: false,
    lineWidth: 1,
    color: 'black',
    opacity: 0.5,
    dashLine,
    sticks: true,
    arrow: true,

  },



  // 连接线
  link: {
    show: false,
    // lineWidth: 1,
    color: 'black',
    opacity: 0.5,
    line,
    dashLine,
    waveform: 'line',
    radiusRatio: 1,
    controller,
    angleOffset: 0,
    orient: true,
    recycleIndex: 0,
    splitNum: 0,
  },



  // 曲线
  curve: {
    show: false,
    radiusRatio: 1,
    // controlPoint: false,
    // controlLink: false,
    controller,
    angleOffset: 0,
    orient: true,
    recycleIndex: 0,
    splitNum: 0,
  },

  // 波浪形
  wave: {
    show: false,
    radiusRatio: 1,
    // controlPoint: false,
    // controlLink: false,
    controller,
    angleOffset: 0,
    orient: true,
    recycleIndex: 0,
    splitNum: 0,
  },

  // 锯齿形
  sawtooth: {
    show: false,
    radiusRatio: 1,
    controller,
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
  },
  // 渐变
  gradient: {
    use: false,
    type: 'linearGradient',
    color1: 'red',
    color2: 'blue'
  },
  // 正玄
  sin: {
    show: false,
    num: 360,
    r: 100,
    k: 0,
    a: 0,
    w: 1
  },
  cos: {
    show: false,
    num: 360,
    r: 100,
    k: 0,
    a: 0,
    w: 1
  },
  tan: {
    show: false,
    num: 360,
    r: 100,
    k: 0,
    a: 0,
    w: 1

  },
  // 路径
  path: {
    use: false,
    name: 'sin',
    num: 90,
    r: 100,
    k: 0,
    a: 0,
    w: 1,
    ratio: 0.5,
    colorful
  }

}


let polygon = new Polygon(dataModel, "svg")
let options = Group._options(polygon)
let tabs = Group._tabs()
let validated = Group.validated
let required = Group.required
// debugger
polygon.draw()
let ui = new UI.Form({
  el: "#ui-container",
  data: polygon,
  options,
  group: true,
  tabs,
  validated,
  required,
  btns: [{
      text: "apply",
      name: 'submit'
      // click: (e) => {
      //     console.log(e,this)
      //     debugger
      //     polygon.redraw(e)
      // }
    },
    {
      text: 'reset',
      name: 'reset'
    }
  ]
})
console.log(ui)