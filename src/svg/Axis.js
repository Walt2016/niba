import BaseSvg from "./baseSvg"
import Transform from '../points/Transform'
import Path from './Path'

// 坐标轴
export default class Axis extends BaseSvg {
    constructor(options, svg) {
        super(options)
        Object.assign(this, {
            step: 50,
            ...options,
            svg
        })


    }
    // 链接点 [p1,p2]  =>[[x,y],[x,y]]
    _d(points, z, type) {
        return (new Path()).polyline(points, z, type)
    }
    // x轴
    _axisX(options) {
        this._axis(options,'axisX')
    }
    // y轴
    _axisY(options) {
        this._axis(options,'axisY')
    }

    // 坐标轴 id = axisX axisY
    _axis(options, id) {
        let {
            width,
            height,
            svg,
            step
        } = this
        let opt = this._regualrOptions(options, id)
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
                    sticks[sticks.length] = t.pos
                    sticks[sticks.length] = [t.pos[0], t.pos[1] - 6]
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
                    sticks[sticks.length] = t.pos
                    sticks[sticks.length] = [t.pos[0] + 6, t.pos[1]]
                    // this._circle(t.pos, 3, {
                    //     fill: 'red'
                    // }, g)
                    this._text([t.pos[0] - 15, t.pos[1] + 15], t.label, {}, textG)
                })
            }
            this._path(this._d(sticks, false, true), {
                stroke: 'gray'
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
        let opt = this._regualrOptions(options, "grid")
        let props = this._lineProps(opt)
        let g = this._g({
            ...props,
            id: 'grid',
            fill: 'transparent',
            transform: opt.rotate ? `rotate(${opt.rotate})` : undefined,
            'transform-origin': `${width/2} ${height/2}`
        }, svg)

        let interval = opt.interval || 100
        let offsetX = (width / 2) % interval
        let offsetY = (height / 2) % interval
        // 竖线
        let points = [
            [0 + offsetX, 0],
            [0 + offsetX, height]
        ]
        let tf = new Transform({
            points
        })
        for (let i = 0; i < width / interval; i++) {
            points = points.concat(tf.translate(interval * i))
        }
        // 横线
        let points2 = [
            [0, 0 + offsetY],
            [width, 0 + offsetY]
        ]
        tf = new Transform({
            points: points2
        })
        for (let i = 0; i < height / interval; i++) {
            points = points.concat(tf.translateY(interval * i))
        }

        let d = points.map((t, index) => {
            return (index % 2 === 0 ? "M" : "L") + t.join(" ")
        }).join(" ")

        this._path(d, {}, g)

    }
    // 极坐标
    _polar(options) {
        let {
            width,
            height,
            svg
        } = this
        let opt = this._regualrOptions(options, "polar")
        let props = this._lineProps(opt)
        let g = this._g({
            ...props,
            id: 'polar',
            fill: 'transparent'
        }, svg)
        let interval = opt.interval || 100
        let o = [width / 2, height / 2]

        for (let i = 0; i < height / interval; i++) {
            this._circle(o, interval * i, {}, g)
        }

        let points = [
            [width / 2, 0],
            [width / 2, height],
            [0, height / 2],
            [width, height / 2]
        ]
        let d = points.map((t, index) => {
            return (index % 2 === 0 ? "M" : "L") + t.join(" ")
        }).join(" ")
        this._path(d, {}, g)
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