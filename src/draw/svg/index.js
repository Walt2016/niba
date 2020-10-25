import config from '../../config'
import MidSeg from '../../points/MidSeg'
import _ from '../../utils/index'
import Transform from '../../points/Transform'
import {
    ArcSeg
} from '../../points'
let {
    env,
    center
} = config
let {
    width,
    height
} = env

export default class DrawSVG {
    constructor(options) {
        this.init(options)
    }
    init(options) {
        let _svg = this.svgWrappper()
        document.body.appendChild(_svg);
        // let defs = this._defs()
        // _svg.appendChild(defs)
        // let g = this._g()
        // defs.appendChild(g)
        // let _symbol=this._symbol()
        // _svg.appendChild(_symbol)
        // setTimeout(()=>{
        // let use = this._use()
        // _svg.appendChild(use)
        // },2000)

        Object.assign(this, {
            _svg,
            // _svg: _symbol,
            width,
            height
        })
    }
    _createEle(tag, options) {
        let ele = document.createElementNS('http://www.w3.org/2000/svg', tag)
        for (let key in options) {
            if (options[key] !== undefined) {
                switch (key.toLocaleLowerCase()) {
                    case "class":
                        ele.className = options[key]
                        break;
                    case "name":
                    case "innertext":
                    case "id":
                    case "innerhtml":
                    case "value":
                    case "textcontent":
                        ele[key] = options[key]
                        break;
                    case "click":
                        ele.addEventListener("click", options[key], false)
                        break;
                    default:
                        ele.setAttribute(key, options[key])
                        break;
                }
            }
        }
        return ele
    }
    svgWrappper(svgDom) {
        let svg = this._createEle("svg", {
            width,
            height
        })
        if (Array.isArray(svgDom)) {
            svgDom.forEach(t => {
                svg.appendChild(t)
            })
        } else if (svgDom) {
            svg.appendChild(svgDom)
        }
        return svg
    }
    _regualrOptions(options, prefix) {
        let opt = {};
        ['shape', 'radius', 'fill', 'color', 'text', 'opacity', 'lineWidth', 'lineOpactiy', 'dashLine', 'dashArray', 'textColor', 'textFontSize', 'interval'].forEach(t => {
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
            'stroke-dasharray': opt.dashLine ? opt.dashArray || [5, 5] : undefined
        }
    }
    // 图形属性
    _shapeProps(opt) {
        return opt.fill ? {
            fill: opt.color || 'red',
            'fill-opacity': _.isUndefined(opt.opacity) ? 1 : opt.opacity,
        } : {
            fill: 'transparent'
        }
    }
    // 规则图形
    _regularShape(name, points, options) {
        let opt = this._regualrOptions(options, name)
        let props = Object.assign(this._lineProps(opt), this._shapeProps(opt))

        points.forEach((t, index) => {
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
                    // 原型
                    Object.assign(props, {
                        cx: t[0],
                        cy: t[1],
                        r: opt.radius || 5,
                    })
                    break;
            }
            let shape = this._createEle(opt.shape, props)
            this._svg.appendChild(shape)

            // 标注文字
            if (opt.text) {
                let text = this._createEle("text", {
                    x: t[0],
                    y: t[1],
                    fill: opt.textColor || opt.color || 'black',
                    textContent: index,
                    'font-size': opt.textFontSize || 12
                })
                this._svg.appendChild(text)
            }
        })
    }
    _line(points, options) {
        let props = {
            x1: points[0][0],
            y1: points[0][1],
            x2: points[1][0],
            y2: points[1][1],
        }
        Object.assign(props, this._lineProps(options))

        let line = this._createEle("line", props)
        this._svg.appendChild(line)

    }
    // 坐标轴
    _axis(options) {
        let opt = this._regualrOptions(options, "axis")
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
        let pros = this._lineProps(opt)

        let axis = this._createEle("path", Object.assign(pros, {
            d
        }))
        this._svg.appendChild(axis)
    }
    // 图形组成
    _path(options) {
        console.log(options)
        let points = options._points || []
        // 边
        let d = points.map((t, index) => {
            return (index === 0 ? "M" : "L") + t.join(" ")
        }).concat(["z"]).join(" ")
        if (options.sidesShow) {
            let defaultOpt = this._regualrOptions(options)
            let opt = this._regualrOptions(options, "sides")
            let shapePros = this._shapeProps(defaultOpt)
            let sidesProps = this._lineProps(opt)
            let sides = this._createEle("path", Object.assign(shapePros, sidesProps, {
                d
            }))
            this._svg.appendChild(sides)
        } else {
            let defaultOpt = this._regualrOptions(options)
            let shapePros = this._shapeProps(defaultOpt)
            let sides = this._createEle("path", Object.assign(shapePros, {
                d
            }))
            this._svg.appendChild(sides)
        }
        // 半径
        if (options.radiusShow) {
            let d = points.map((t, index) => {
                return `M${options.o.join(" ")} L${t.join(" ")}`
            }).join(" ")
            let opt = this._regualrOptions(options, "radius")
            let radiusProps = this._lineProps(opt)
            let radius = this._createEle("path", Object.assign(radiusProps, {
                d
            }))
            this._svg.appendChild(radius)
        }

        // 顶点
        if (options.vertexShow) {
            this._regularShape('vertex', points, options)
        }
        // 圆心
        if (options.centerShow) {
            this._regularShape('center', [options.o], options)
        }

        // 分形
        if (options.midSeg) {
            let midseg = new MidSeg({
                points: options._points,
                offset: options.offset || 0
            })
            let level = options.level - 1

            if (options._colors) {
                options.color = options._colors[level % options._colors.length]
            }

            this._path(Object.assign({}, options, {
                _points: midseg.points,
                level,
                midSeg: level > 1,
            }))
        }

        // 坐标
        if (options.axisShow) {
            this._axis(options)

        }
    }
    clear() {
        let div = this._svg
        while (div.hasChildNodes()) //当div下还存在子节点时 循环继续
        {
            div.removeChild(div.firstChild);
        }
        return this
    }
    _defs() {
        return this._createEle("defs")
    }
    _g() {
        return this._createEle("g", {
            id: 'shape'
        })
    }
    _use() {
        return this._createEle("use", {
            x: 0,
            y: 0,
            width,
            height,
            'xlink:href': '#shape'
        })
    }
    _symbol() {
        return this._createEle("symbol", {
            id: "shape"
        })
    }
}