import MidSeg from '../points/MidSeg'
import _ from '../utils/index'
import Transform from '../points/Transform'
import './index.css'
import {
    ArcSeg
} from '../points'
import BaseSvg from './baseSvg'
import Fractal from './Fractal'

export default class DrawSVG extends BaseSvg {
    constructor(options) {
        super(options)
    }
    // 图形合成:入口函数
    _draw(options) {
        // 背景图案
        if (options.patternShow) {
            this._pattern(options)
        }
        // 网格坐标
        if (options.gridShow) {
            this._grid(options)
        }
        // 极坐标
        if (options.polarShow) {
            this._polar(options)
        }
        // x轴
        if (options.axisXShow || options.axisYShow) {
            this._marker()
        }
        if (options.axisXShow) {
            this._axisX(options)
        }
        if (options.axisYShow) {
            this._axisY(options)
        }

        // 图形
        this._shape(options)
    }
    // 规则参数
    _regualrOptions(options, prefix) {
        let opt = {};
        this.props.forEach(t => {
            if (prefix) {
                let name = _.camelCase([prefix, t])
                if (options[name]) {
                    opt[t] = options[name]
                }
            } else {
                if (options[t]) {
                    opt[t] = options[t]
                }
            }
        })
        return opt
    }
    // 线条属性
    _lineProps(opt = {}) {
        return {
            stroke: opt.color || opt.stroke || 'black',
            'stroke-opacity': _.isUndefined(opt.opacity) ? 1 : opt.opacity,
            'stroke-width': opt.lineWidth || opt.strokeWidth || 1,
            'stroke-dasharray': opt.dashLine ? opt.dashArray || [5, 5] : undefined,
            'stroke-linecap': opt.linecap ? opt.linecap : undefined,
            'stroke-linejoin': opt.linejoin,
            'style': opt.dashAnimation ? 'animation:shift 3s infinite linear' : undefined,
            'marker-end': opt['marker-end'] ? opt['marker-end'] : undefined
        }
    }
    // 图形属性
    _shapeProps(opt) {
        return opt.fill ? {
            fill: opt.color || 'red',
            'fill-opacity': _.isUndefined(opt.opacity) ? 1 : opt.opacity
        } : {
            fill: 'transparent',
        }
    }
    // 动画属性
    _animationProps(opt, t = opt.o || [this.width / 2, this.height / 2]) {
        return opt.use ? {
            'style': `animation:${opt.name} ${opt.duration||1}s ${opt.iterationCount||'infinite'} linear`,
            'transform-origin': `${t[0]}px ${t[1]}px`
            // 'style': opt.dashAnimation ? 'animation:shift 3s infinite linear' : undefined
        } : {}
    }
    // 变形属性
    _transformProps(opt, t = opt.o || [this.width / 2, this.height / 2]) {
        if (opt.use) {
            let transform = ""
            switch (opt.name) {
                case "skew":
                    transform = `${opt.name}X(${opt.propA})${opt.name}Y(${opt.propB})` //,${opt.propB}
                    break;
                case "rotate":
                    transform = `${opt.name}(${opt.propA})`
                    break;
                default:
                    transform = `${opt.name}(${opt.propA},${opt.propB})`

            }

            return {
                transform,
                'transform-origin': `${t[0]}px ${t[1]}px`
            }
        }

        // return opt.use ? {
        //     // transform: 'scale(2,2)',
        //     transform: `${opt.name}(${opt.propA},${opt.propB})`,
        //     'transform-origin': `${t[0]}px ${t[1]}px`
        // } : {}
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
    // 线段
    _line(points, options, g = this.svg) {
        let props = this._lineProps(options)
        this._createEle("line", {
            x1: points[0][0],
            y1: points[0][1],
            x2: points[1][0],
            y2: points[1][1],
            ...props
            // ...options
        }, g)
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

        this._path({
            d
        }, g)

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
            this._circle({
                cx: o[0],
                cy: o[1],
                r: interval * i
            }, g)
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
        this._path({
            d
        }, g)
    }
    // 箭头
    _marker() {
        let defs = this._defs(this.svg)
        let market = this._marker({
            id: 'markerArrow',
            markerWidth: 13,
            markerHeight: 13,
            refx: 2,
            refy: 6,
            orient: 'auto'
        }, defs)

        this._path({
            d: this._d([
                [2, 2],
                [2, 11],
                [10, 6],
                [2, 2]
            ]),
            fill: 'red'
        }, market)
    }
    // x轴
    _axisX(options) {
        let {
            width,
            height
        } = this
        let opt = this._regualrOptions(options, "axisX")
        // let props = this._lineProps(opt)
        let g = this._g({
            // ...props,
            id: 'axisX',
            fill: 'transparent'
        }, this.svg)

        // let offset = 150
        let offset = (width - 10 * 50) / 2
        let points = [
            [0 + offset, height / 2],
            [width - offset, height / 2]
        ]
        this._axis(points, opt, g)
    }
    // y轴
    _axisY(options) {
        let {
            width,
            height
        } = this
        let opt = this._regualrOptions(options, "axisY")
        // let props = this._lineProps(opt)
        let g = this._g({
            // ...props,
            id: 'axisY',
            fill: 'transparent'
        }, this.svg)
        // let offset = 150
        let offset = (height - 10 * 50) / 2
        let points = [
            [width / 2, 0 + offset],
            [width / 2, height - offset]
        ]
        this._axis(points, opt, g)
    }
    // 坐标轴
    _axis(points, opt, g) {
        this._line(points, {
            ...opt,
            'marker-end': 'url(#markerArrow)'
        }, g)
        // 刻度
        if (opt.sticks) {
            this._line(points, {
                ...opt,
                lineWidth: 10,
                dashLine: true,
                dashArray: [1, 50]
            }, g)
        }
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

        this._circle({
            cx: 10,
            cy: 10,
            fill: 'red',
            r: 5
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
    _d(points, z, curve) {
        if (curve) { // 曲线
            let n = points.length
            let {
                ratio = 0.5,
                    controller,
                    radiusRatio = 0.5,
                    angleOffset = 0,
                    orient
            } = curve
            return points.map((t, index) => {
                let next = points[index + 1 >= n ? 0 : index + 1]
                let mid = _.mid(t, next)
                let dis = _.dis(t, next)
                let cp = _.polar(mid, radiusRatio * dis, orient ? _.atan(t, next) - 90 + angleOffset : angleOffset)
                if (controller) {
                    this._circle({
                        cx: cp[0],
                        cy: cp[1],
                        fill: 'red',
                        r: 5
                    }, this.svg)
                }
                return `M${t.join(" ")} Q${cp.join(" ")} ${next.join(" ")}`
            }).join(" ")
        }
        if (z) { // 闭合线段
            // p.concat(["z"])
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

        let d = ""
        if (options.curveUse) {
            // 曲线
            let curveOpt = this._regualrOptions(options, "curve")
            d = this._d(points, true, curveOpt)
        } else {
            // 直线
            d = this._d(points, true)
        }

        if (options.edgeShow) { // 有边
            let defaultOpt = this._regualrOptions(options)
            let opt = this._regualrOptions(options, "edge")
            let edgeShapeProps = this._shapeProps(defaultOpt)
            let edgeLineProps = this._lineProps(opt)
            this._path({
                ...edgeShapeProps,
                ...edgeLineProps,
                d,
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
        } else { // 无边
            // this._path({
            //     d
            // }, g)
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
        this._path({
            d
        }, groupRadius)
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
        this._path({
            d
        }, groupRadius)
    }
    // 旁切圆
    _excircle(options, g) {
        this._regularShape('excircle', [options.o], {
            ...options,
            'excircleRadius': options.r
        }, g)
    }
}