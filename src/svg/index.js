import MidSeg from '../points/MidSeg'
import _ from '../utils/index'

import './index.css'
import {
    ArcSeg
} from '../points'
import BaseSvg from './baseSvg'
import Fractal from './Fractal'
import Waveform from './WaveForm'
import Axis from './Axis'

export default class DrawSVG extends BaseSvg {
    constructor(options) {
        super(options)
        this.setup(options)
    }
    setup(options) {
        let svg = this._svg()
        document.body.appendChild(svg);
        let axis = new Axis(options, svg)
        Object.assign(this, {
            svg,
            axis
        })
    }
    // 图形合成:入口函数
    _draw(options) {
        // 背景图案
        if (options.patternShow) {
            this._pattern(options)
        }
        // 网格坐标
        if (options.gridShow) {
            this.axis._grid(options)
        }
        // 极坐标
        if (options.polarShow) {
            this.axis._polar(options)
        }
        // x轴
        if (options.axisXShow || options.axisYShow) {
            this.axis._marker()
        }

        if (options.axisXShow) {
            this.axis._axisX(options)
        }
        if (options.axisYShow) {
            this.axis._axisY(options)
        }
        // 图形
        this._shape(options)
    }

    // 规则图形
    _regularShape(name, points, options, root = this.svg) {
        let opt = this._regualrOptions(options, name)
        let defaultProps = Object.assign(this._lineProps(opt), this._shapeProps(opt))
        let g = this._g({
            id: name,
            ...defaultProps
        }, root)

        let props = {}
        let colors = _.colorCircle(points.length, opt.colorfulOpacity || 1)
        points.forEach((t, index) => {
            // 动画发光效果辅助
            if (opt.animationTwinkle) {
                Object.assign(props, {
                    style: `animation:twinkle 1s infinite linear`, //;transform-origin: ${t[0]}px ${t[1]}px
                    'transform-origin': `${t[0]}px ${t[1]}px`
                })
            }
            // debugger
            if (opt.colorful) {
                Object.assign(props, {
                    fill: colors[index],
                    stroke: colors[index],
                })
            }

            switch (opt.shape) {
                case "rect":
                    // 正方形
                    let width = _.sin(45) * opt.radius || 5
                    Object.assign(props, {
                        x: t[0] - width / 2,
                        y: t[1] - width / 2,
                        width,
                        height: width,
                    })
                    break;
                case "line":
                    let r = opt.radius / 2
                    Object.assign(props, {
                        x1: t[0] - r,
                        y1: t[1] - r,
                        x2: t[0] + r,
                        y2: t[1] + r,
                    })
                    break;
                case "polygon":
                    let seg = new ArcSeg({
                        o: t,
                        r: opt.radius,
                        n: options.n
                    })
                    Object.assign(props, {
                        points: seg.points.join(" ")
                    })

                    break;
                default:
                    // 圆形
                    Object.assign(props, {
                        cx: t[0],
                        cy: t[1],
                        r: opt.radius || 5

                        // filter: 'url(#f3)'
                    })
                    break;
            }
            this._createEle(opt.shape || 'circle', props, g)

            // 标注文字
            if (opt.text) {
                this._text({
                    x: t[0],
                    y: t[1],
                    fill: opt.textColor || opt.color || 'black',
                    textContent: index,
                    'font-size': opt.textFontSize || 12
                }, g)
            }
        })
    }



    // 图案
    _pattern(options) {
        let defs = this._defs(this.svg)
        let pattern = this._pattern({
            id: "pattern",
            x: 100,
            y: 100,
            width: 0.2,
            height: 0.2,
            patternUnits: options.patternUnits || "objextBoundingBox"
        }, defs)
        this._circle([10, 10], 5, {
            fill: 'red'
        }, pattern)

        this._rect({
            x: 0,
            y: 0,
            width,
            height,
            fill: "url(#pattern)",
            stroke: "blue"
        }, this.svg)
    }
    // 路径
    _d(points, z, type, props) { //curve, wave, sawtooth
        if (type && props) {
            let wf = new Waveform(points, props, (e) => {
                e.cp.forEach(t => {
                    props.controller &&
                        this._circle(t, 5, {
                            fill: 'red'
                        }, this.svg)
                })
            })
            return wf['_' + type]()
        }

        if (z) { // 闭合线段
            return points.map((t, index) => {
                return (index === 0 ? "M" : "L") + t.join(" ")
            }).concat(["z"]).join(" ")
        } else { // 折线
            return points.map((t, index) => {
                return (index % 2 === 0 ? "M" : "L") + t.join(" ")
            }).join(" ")
        }
    }

    // 图形
    _shape(options, parent = this.svg) {
        console.log(options)
        let {
            width,
            height
        } = this
        let defaultOpt = this._regualrOptions(options)
        let shapeProps = this._shapeProps(defaultOpt)
        let lineProps = this._lineProps(defaultOpt)
        let animationProps = this._animationProps(this._regualrOptions(options, "animation"))
        let transformProps = this._transformProps(this._regualrOptions(options, "transform"))
        let g = this._g({
            id: options.fractalUse ? `shape${options.fractalLevel}` : "shape",
            ...shapeProps,
            ...lineProps,
            ...animationProps,
            ...transformProps
        }, parent)
        let points = options._points || []

        let ds = [];
        let curveEdges = ['semicircle', 'sawtooth', 'wave', 'curve', 'elliptical']
        curveEdges.forEach(t => {
            if (options[t + 'Show']) {
                let props = this._regualrOptions(options, t)
                ds[ds.length] = this._d(points, true, t, props)
            }
        })
        if (options.edgeShow) {
            // 直线
            ds[ds.length] = this._d(points, true)
        }
        let showEdge = [...curveEdges, 'edge'].some(t => {
            return options[t + 'Show']
        })

        if (showEdge) { // 有边
            let defaultOpt = this._regualrOptions(options)
            let opt = this._regualrOptions(options, "edge")
            let edgeShapeProps = this._shapeProps(defaultOpt)
            let edgeLineProps = this._lineProps(opt)
            this._path(ds.join(" "), {
                ...edgeShapeProps,
                ...edgeLineProps,
                transform: options.transform,
                'transform-origin': `${width/2} ${height/2}`
            }, g)
            // 标注文字
            if (opt.text) {
                let midseg = new MidSeg({
                    points
                })
                let groupEdgeText = this._g({
                    id: 'edgeText',
                    fill: opt.textColor || opt.color || 'black',
                    'font-size': opt.textFontSize || 12
                }, g)
                midseg.points.forEach((t, index) => {
                    this._text({
                        x: t[0],
                        y: t[1],
                        textContent: index,
                    }, groupEdgeText)
                })
            }
        }

        // 半径
        if (options.radiusShow) {
            this._radius(points, options, g)
        }

        // 顶点
        if (options.vertexShow) {
            this._regularShape('vertex', points, options, g)
        }
        // 顶点链接线
        if (options.linkShow) {
            this._link(points, options, g)
        }
        // 圆心
        if (options.centerShow) {
            this._regularShape('center', [options.o], options, g)
        }
        // 旁切圆
        if (options.excircleShow) {
            this._excircle(options, g)
        }


        // 分形
        if (options.fractalUse) {
            let colors = _.colorCircle(points.length, options.fractalColorfulOpacity || 1)
            new Fractal(this._shape.bind(this), Object.assign(options, {
                _colors: colors
            }))
        }
    }
    clear() {
        let div = this.svg
        while (div.hasChildNodes()) //当div下还存在子节点时 循环继续
        {
            div.removeChild(div.firstChild);
        }
        return this
    }
    // 半径
    _radius(points, options, g) {
        let d = points.map((t, index) => {
            return `M${options.o.join(" ")} L${t.join(" ")}`
        }).join(" ")
        let opt = this._regualrOptions(options, "radius")
        let props = this._lineProps(opt)
        let groupRadius = this._g({
            id: 'radius',
            ...props
        }, g)
        this._path(d, {}, groupRadius)
    }
    // 连接线
    _link(points, options, g = this.svg) {
        let n = points.length
        let d = points.map((t, index) => {
            let links = []
            for (let i = index + 1; i < n; i++) {
                let next = points[i >= n ? index : i]
                links[links.length] = `M${t.join(" ")} L${next.join(" ")}`
            }
            return links.join(" ")
        }).join(" ")
        let opt = this._regualrOptions(options, "link")
        let props = this._lineProps(opt)
        let groupRadius = this._g({
            id: 'link',
            ...props
        }, g)
        this._path(d, {}, groupRadius)
    }
    // 旁切圆
    _excircle(options, g) {
        this._regularShape('excircle', [options.o], {
            ...options,
            'excircleRadius': options.r
        }, g)
    }
}