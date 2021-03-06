import BaseSvg from "./baseSvg"
import Transform from '../points/Transform'

import {
  ArcSeg
} from '../points'

// 坐标轴
export default class Axis extends BaseSvg {
  constructor(options, svg) {
    super(options)
    Object.assign(this, {
      // step: 50,
      ...options,
      svg
    })
  }
  // x轴
  _axisX(options) {
    this._axis(options, 'axisX')
  }
  // y轴
  _axisY(options) {
    this._axis(options, 'axisY')
  }

  // 坐标轴 id = axisX axisY
  _axis(options, id) {
    let {
      width,
      height,
      svg,
      // step
    } = this
    let opt = this._options(options, id)
    if (opt.arrow) {
      this._axisArrow()
    }
    let g = this._g({
      id,
      fill: 'none'
    }, svg)

    let offset = (id === 'axisX' ? width : height) * 0.1
    let p1 = id === 'axisX' ? [0 + offset, height / 2] : [width / 2, height - offset]
    let p2 = id === 'axisX' ? [width - offset, height / 2] : [width / 2, 0 + offset]
    let props = this._lineProps(opt)

    this._line(p1, p2, {
      ...props,
      'marker-end': 'url(#markerArrow)'
    }, g)

    // 刻度
    if (opt.sticks) {
      let sticksProps = this._stricksProps(opt)
      let step = opt.sticks.step || 50
      let stickHeight = opt.sticks.height || 6
      let o = [width / 2, height / 2]
      let n = Math.ceil(((id === 'axisX' ? width : height) / 2 - offset) / step)
      let ps = []
      let sticks = []
      
      let textG = this._g({
        id: id + '-text-group',
        fill: 'black',
        'font-size': 12
      }, g)
      if (id === 'axisX') {
        for (let i = 0; i < n; i++) {
          if (!(options.axisXShow && options.axisYShow && i == 0)) {
            ps[ps.length] = {
              pos: [o[0] + i * step, o[1]],
              label: i
            }
          }
          if (i > 0) {
            ps[ps.length] = {
              pos: [o[0] - i * step, o[1]],
              label: -i
            }
          }
        }
        ps.forEach(t => {
          sticks[sticks.length] = [t.pos, [t.pos[0], t.pos[1] - stickHeight]]
          // this._circle(t.pos, 3, {
          //     fill: 'red'
          // }, g)
          this._text([t.pos[0] - 3, t.pos[1] + 15], t.label, {}, textG)
        })

      } else {
        for (let i = 0; i < n; i++) {
          // 排除O点
          // if (!(options.axisXShow && options.axisYShow && i == 0)) {
          ps[ps.length] = {
            pos: [o[0], o[1] + i * step],
            label: -i
          }
          // }

          if (i > 0) {
            ps[ps.length] = {
              pos: [o[0], o[1] - i * step],
              label: i
            }
          }
        }
        ps.forEach(t => {
          sticks[sticks.length] = [t.pos, [t.pos[0] + stickHeight, t.pos[1]]]
          // this._circle(t.pos, 3, {
          //     fill: 'red'
          // }, g)
          this._text([t.pos[0] - 15, t.pos[1] + 15], t.label, {}, textG)
        })
      }
      this._path(this._d(sticks), {
        stroke: 'gray',
        ...sticksProps
      }, g)
    }
  }
  // 网格坐标
  _grid(options) {
    let {
      width,
      height,
      svg
    } = this
    let opt = this._options(options, "grid")
    let props = this._lineProps(opt)
    let g = this._g({
      ...props,
      id: 'grid',
      fill: 'none',
      transform: opt.rotate ? `rotate(${opt.rotate})` : undefined,
      'transform-origin': `${width/2} ${height/2}`
    }, svg)

    let interval = opt.interval || 100
    let offsetX = (width / 2) % interval
    let offsetY = (height / 2) % interval
    // 竖线
    let tf = new Transform({
      points: [
        [0 + offsetX, 0],
        [0 + offsetX, height]
      ]
    })
    let segments = Array.from({
      length: width / interval
    }, (_, i) => tf.translate(interval * i))
    // 横线
    tf = new Transform({
      points: [
        [0, 0 + offsetY],
        [width, 0 + offsetY]
      ]
    })
    segments = [...segments, ...Array.from({
      length: height / interval
    }, (_, i) => tf.translateY(interval * i))]

    this._path(this._d(segments), {}, g)
  }
  // 极坐标
  _polar(options) {
    let {
      width,
      height,
      svg
    } = this
    let opt = this._options(options, "polar")
    let props = this._lineProps(opt)
    let g = this._g({
      ...props,
      id: 'polar',
      fill: 'none'
    }, svg)
    let interval = opt.interval || 100
    let o = [width / 2, height / 2]
    let n = Math.ceil((width > height ? width : height) / interval / 2)
    let a = opt.rotate || 0

    for (let i = 0; i <= n; i++) {
      this._circle(o, interval * i, {}, g)
    }

    let seg = new ArcSeg({
      o,
      r: 100 * n,
      n: 12,
      a,
      sort: 'diagonal' //对角点
    })
    //false, true

    this._path(this._d(seg.points, {
      closed: false,
      broken: true
    }), {
      // 'stroke-dasharray':0
    }, g)
  }

  //     <marker id="arrow" refX="0" refY="3" markerWidth="20" markerHeight="20" orient="auto">
  //     <path d="M0 0 L0 6 L10 3" style="fill: #ffff;"></path>
  // </marker>
  // 箭头
  _axisArrow() {
    if (this._has('markerArrow')) return
    let defs = this._defs(this.svg)
    let market = this._marker({
      id: 'markerArrow',
      markerWidth: 20,
      markerHeight: 20,
      refX: 0,
      refY: 3,
      orient: 'auto'
    }, defs)

    this._path(this._d([
      [0, 0],
      [0, 6],
      [10, 3]
    ]), {
      fill: 'gray'
    }, market)
  }
}