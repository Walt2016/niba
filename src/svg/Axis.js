import BaseSvg from "./baseSvg"
import Transform from '../points/Transform'

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
    // x轴
    _axisX(options) {
        let {
            width,
            height,
            svg,
            step
        } = this
        let opt = this._regualrOptions(options, "axisX")
        let g = this._g({
            id: 'axisX',
            fill: 'transparent'
        }, svg)

        // let offset = 150
        // let offset = (width - 10 * 50) / 2
        let offset = width * 0.1
        let p1 = [0 + offset, height / 2]
        let p2 = [width - offset, height / 2]
        // this._axis([0 + offset, height / 2],
        //     [width - offset, height / 2], opt, g)
        let props = this._lineProps(opt)

        if (opt.arrow) {
            this._axisArrow()
        }

        this._line(p1, p2, {
            ...props,
            'marker-end': 'url(#markerArrow)'
        }, g)

        // 刻度
        if (opt.sticks) {
            let o = [width / 2, height / 2]
            let n = Math.ceil(width / 2 / step) - 1
            let ps = []
            for (let i = 0; i < n; i++) {
                ps[ps.length] = {
                    pos: [o[0] + i * step, o[1]],
                    label: i
                }
                if (i > 0) {
                    ps[ps.length] = {
                        pos: [o[0] - i * step, o[1]],
                        label: -i
                    }
                }
            }
            let sticks = []
            ps.forEach(t => {
                sticks[sticks.length] = [t.pos, [t.pos[0], t.pos[1] - 10]]
                // this._circle(t.pos, 3, {
                //     fill: 'red'
                // }, g)
                this._text([t.pos[0] - 3, t.pos[1] + 15], t.label, {}, g)
            })
            this._path(this._sticks(sticks), {
                stroke: 'gray'
            }, g)
        }
    }
    // y轴
    _axisY(options) {
        let {
            width,
            height,
            svg,
            step
        } = this
        let opt = this._regualrOptions(options, "axisY")
        let g = this._g({
            id: 'axisY',
            fill: 'transparent'
        }, svg)
        // let offset = 150
        // let offset = (height - 10 * 50) / 2
        // this._axis([width / 2, 0 + offset], [width / 2, height - offset], opt, g)

        let offset = width * 0.1
        let p1 = [width / 2, height - offset]
        let p2 = [width / 2, 0 + offset]

        let props = this._lineProps(opt)

        if (opt.arrow) {
            this._axisArrow()
        }


        this._line(p1, p2, {
            ...props,
            'marker-end': 'url(#markerArrow)'
        }, g)

        // 刻度
        if (opt.sticks) {
            let o = [width / 2, height / 2]
            let n = Math.ceil(height / 2 / step) - 1
            let ps = []
            for (let i = 0; i < n; i++) {
                ps[ps.length] = {
                    pos: [o[0], o[1] + i * step],
                    label: -i
                }
                if (i > 0) {
                    ps[ps.length] = {
                        pos: [o[0], o[1] - i * step],
                        label: i
                    }
                }
            }
            let sticks = []
            ps.forEach(t => {
                sticks[sticks.length] = [t.pos, [t.pos[0] + 10, t.pos[1]]]
                // this._circle(t.pos, 3, {
                //     fill: 'red'
                // }, g)
                this._text([t.pos[0] - 15, t.pos[1] + 15], t.label, {}, g)
            })

            this._path(this._sticks(sticks), {
                stroke: 'gray'
            }, g)
        }

    }
    // 二维点
    _sticks(sticks) {
        return sticks.map(t => {
            return `M${t[0].join(" ")} L${t[1].join(" ")}`
        }).join(" ")
    }
    // 链接点
    _d(points) {
        return points.map((t, index) => {
            return `${index===0 ? "M" : t.length ===7 ? "A": t.length ===4 ? "Q" : "L"}${t.join(" ")}`
        }).join(" ")
    }
    // 坐标轴
    _axis(p1, p2, opt, g) {
        let props = this._lineProps(opt)
        this._line(p1, p2, {
            ...props,
            'marker-end': 'url(#markerArrow)'
        }, g)
        // 刻度
        if (opt.sticks) {
            this._line(p1, p2, {
                ...opt,
                ...this._lineProps({
                    lineWidth: 10,
                    dashLine: true,
                    dashArray: [1, 50],
                    dashOffset: 5
                })
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
            // markerWidth: 13,
            // markerHeight: 13,
            // refx: 2,
            // refy: 6,
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
            // [2, 2],
            // [2, 11],
            // [10, 6],
            // [2, 2]
        ]), {
            fill: 'gray'
        }, market)
    }
}