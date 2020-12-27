import MidSeg from '../points/MidSeg'
import _ from '../utils/index'
import './index.css'
import {
    ArcSeg
} from '../points'
import BaseSvg from './baseSvg'
import Fractal from './Fractal'
import Axis from './Axis'
import PointPath from './PointPath'

export default class DrawSVG extends BaseSvg {
    constructor(options) {
        super(options)
        this.setup(options)
    }
    setup(options) {
        let svg = this._svg()
        this._append(document.querySelector("#svg-container") || document.body, svg)
        let axis = new Axis(options, svg)
        Object.assign(this, {
            svg,
            axis
        })
    }
    // 图形合成:入口函数
    _draw(options) {
        // debugger
        // this.options = options
        // // 背景图案
        // if (options.patternUse) {
        //     this._shapePattern(options)
        // }
        // 网格坐标
        if (this._show(options, "grid")) {
            this.axis._grid(options)
        }
        // 极坐标
        if (this._show(options, "polar")) {
            this.axis._polar(options)
        }
        // x轴
        if (this._show(options, "axisX") || this._show(options, "axisY")) {
            this.axis._marker()
        }
        if (this._show(options, "axisX")) {
            this.axis._axisX(options)
        }
        if (this._show(options, "axisY")) {
            this.axis._axisY(options)
        }
        // 图形
        this._shape(options)
    }

    // 规则图形
    _regularShape(name, points, options, root = this.svg) {
        // let opt = this._options(options, name)
        let defaultProps = Object.assign(this._lineProps(options), this._shapeProps(options))
        let g = this._g({
            id: name,
            ...defaultProps
        }, root)

        let props = {}
        let r = options.radius
        let colors = _.colorCircle(points.length, options.colorfulOpacity || 1)
        points.forEach((t, index) => {
            // 动画发光效果辅助
            if (options.animationTwinkle) {
                Object.assign(props, {
                    style: `animation:twinkle 1s infinite linear`, //;transform-origin: ${t[0]}px ${t[1]}px
                    'transform-origin': `${t[0]}px ${t[1]}px`
                })
            }
            // debugger
            if (options.colorful) {
                Object.assign(props, {
                    fill: colors[index],
                    stroke: colors[index],
                })
            }

            switch (options.shape) {
                case "rect":
                    // 正方形
                    let width = _.sin(45) * r || 5
                    Object.assign(props, {
                        x: t[0] - width / 2,
                        y: t[1] - width / 2,
                        width,
                        height: width,
                    })
                    break;
                case "line":
                    r = r / 2
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
                        r: r,
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
                        r: r || 5
                        // filter: 'url(#f3)'
                    })
                    break;
            }
            this._createEle(options.shape || 'circle', props, g)

            // 标注文字
            if (options.text) {
                this._text(t, index, {
                    fill: options.textColor || options.color || 'black',
                    'font-size': options.textFontSize || 12
                }, g)
            }
        })
    }

    // 图形
    _shape(options, parent = this.svg) {
        this.options = options
        console.log(options);
        // 背景图案 格子图案 条纹图案  渐变
        ["pattern", "chequer", "stripe", "diagonalStripe", "gradient"].forEach(t => {
            if (this._show(options, t)) {
                this["_" + t] && this["_" + t](this._options(options, t), this.svg)
            }
        })
        let defaultOpt = this._options(options)
        let shapeProps = this._shapeProps(defaultOpt)
        let lineProps = this._lineProps(defaultOpt)
        let animationProps = this._animationProps(this._options(options, "animation"))
        let transformProps = this._transformProps(this._options(options, "transform"))
        let g = this._g({
            id: this._show(options, "fractal") ? `shape${options.fractal.level}` : "shape",
            ...shapeProps,
            ...lineProps,
            ...animationProps,
            ...transformProps
        }, parent)

        let points = options._points || []
        let ds = [];
        // let showEdge = false;
        let curveEdges = ['edge', 'semicircle', 'sawtooth', 'wave', 'curve', 'elliptical']
        // 未定义边，默认显示边
        let showEdge = curveEdges.every(t => !options[t])
        if (showEdge) {
            ds[ds.length] = this._d(points, {
                closed: true,
                ...options
            })
        }
        // 定义了边，根据定义显示
        curveEdges.forEach(t => {
            if (this._show(options, t)) {
                showEdge = true
                let opt = this._options(options, t)
                ds[ds.length] = this._d(points, {
                    waveform: t,
                    ...opt
                }, (e) => {
                    if (opt.controlPoint) {
                        e.cps.forEach(t => {
                            this._circle(t, 5, {
                                fill: 'red'
                            }, g)
                        })
                    }
                    if (opt.controlLink) {
                        this._path(this._d(e.cps, {
                            closed: false,
                            broken: true
                        }), {}, g)
                    }
                })
            }
        })

        if (showEdge) { // 有边
            let defaultOpt = this._options(options)
            let opt = this._options(options, "edge")
            let edgeShapeProps = this._shapeProps(defaultOpt)
            let edgeLineProps = this._lineProps(opt)
            let params = {
                // fill: options.patternUse ? "url(#shape-pattern)" : options.gradientUse ? "url(#shape-gradient)" : "none",
                ...edgeShapeProps,
                ...edgeLineProps,
                // transform: this._options(options, "transform").name,
                // 'transform-origin': `${width/2} ${height/2}`
            };

            ['pattern', 'chequer', 'stripe', 'diagonalStripe', 'gradient'].forEach(t => {
                if (this._show(options, t)) {
                    params.fill = `url(#shape-${t})`
                }
            })
            this._path(ds.join(" "), params, g)
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
                    this._text(t, index, {}, groupEdgeText)
                })
            }
        }

        ['radius', 'link', 'vertex', 'center', 'excircle', 'incircle', 'sin', 'cos', 'tan'].forEach(t => {
            this._show(options, t) && this['_' + t] && this['_' + t](this._options(options, t), g)
        })
        // 分形
        if (this._show(options, "fractal")) {
            let colors = _.colorCircle(points.length, options.fractal.colorfulOpacity || 1)
            new Fractal(this._shape.bind(this), Object.assign(options, {
                _colors: colors
            }))
        }
        // 路径
        if (this._show(options, "path")) {
            let opt = this._options(options, "path")
            let points = new PointPath({
                ...opt,
                o: options.o
            })["_" + opt.name]()
            // debugger
            points.forEach(t => {
                this._shape(Object.assign({}, options, {
                    o: t,
                    _points: _.move(options._points, options.o, t),
                    path: {
                        use: false
                    }
                }))
            })
        }

    }

    // 半径
    _radius(options, g) {
        let points = this.options._points || []
        let props = this._lineProps(options)
        let groupRadius = this._g({
            id: 'radius',
            ...props
        }, g)
        let ps = []
        let o = this.options.o
        points.forEach(t => {
            ps[ps.length] = o
            ps[ps.length] = t
        })

        let d = this._d(ps, options, (e) => {
            if (options.controlPoint) {
                e.cps.forEach(t => {
                    this._circle(t, 5, {
                        fill: 'red'
                    }, groupRadius)
                })
            }
            if (options.controlLink) {
                this._path(this._d(e.cps, {
                    closed: false,
                    broken: true
                }), {}, groupRadius)
            }
        })
        this._path(d, {}, groupRadius)
    }
    // 连接线
    _link(options, g = this.svg) {
        let points = this.options._points || []
        let n = points.length
        let links = []
        points.forEach((t, index) => {
            for (let i = index + 1; i < n; i++) {
                let next = points[i >= n ? index : i]
                // links[links.length] = [t, next]
                links[links.length] = t
                links[links.length] = next
            }
        })
        let props = this._lineProps(options)
        let groupRadius = this._g({
            id: 'link',
            ...props
        }, g)
        let d = this._d(links, {
            ...options,
            closed: false
        }, (e) => {
            if (options.controlPoint) {
                e.cps.forEach(t => {
                    this._circle(t, 5, {
                        fill: 'red'
                    }, groupRadius)
                })
            }
            if (options.controlLink) {
                this._path(this._d(e.cps, {
                    closed: false,
                    broken: true
                }), {}, groupRadius)
            }
        })
        this._path(d, {}, groupRadius)
    }
    // 顶点
    _vertex(options, g) {
        let points = this.options._points || []
        this._regularShape('vertex', points, options, g)
    }
    // 圆心
    _center(options, g) {
        let o = this.options.o
        this._regularShape('center', [o], options, g)
    }
    // 旁切圆
    _excircle(options, g) {
        let o = this.options.o
        let r = this.options.r
        this._regularShape('excircle', [o], {
            ...options,
            radius: r
        }, g)
    }
    // 内切圆
    _incircle(options, g) {
        let o = this.options.o
        let points = this.options._points || []
        let r = _.dis(o, _.mid.apply(null, points.slice(0, 2)))

        this._regularShape('incircle', [o], {
            ...options,
            radius: r
        }, g)
    }

    // 正玄曲线
    // y=Asin(ωx+φ)+k
    _sin(options, g = this.svg) {
        let o = this.options.o || [0, 0]
        let points = new PointPath({
            ...options,
            o
        })._sin().join(" ")
        this._createEle("polyline", {
            id: 'sin',
            points
        }, g)
    }
    // 余弦
    _cos(options, g = this.svg) {
        let o = this.options.o || [0, 0]
        let points = new PointPath({
            ...options,
            o
        })._cos().join(" ")
        this._createEle("polyline", {
            id: 'cos',
            points
        }, g)
    }
    // 正切
    _tan(options, g = this.svg) {
        let o = this.options.o || [0, 0]
        let points = new PointPath({
            ...options,
            o
        })._tan().join(" ")
        this._createEle("polyline", {
            id: 'tan',
            points
        }, g)
    }
}