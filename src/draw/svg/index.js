import config from '../../config'
import MidSeg from '../../points/MidSeg'
import _ from '../../utils/index'
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
        Object.assign(this, {
            _svg,
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
                        ele['textContent'] = options[key]
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
        ['shape', 'radius', 'fill', 'color', 'text', 'opacity', 'lineWidth', 'lineOpactiy', 'dashLine', 'dashArray'].forEach(t => {
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
    _lineProps(opt) {
        return {
            // fill: opt.fill ? opt.color : 'transparent',
            // opacity: _.isUndefined(opt.opacity) ? 1 : opt.opacity,
            stroke: opt.color || 'black',
            'stroke-opacity': _.isUndefined(opt.opacity) ? 1 : opt.opacity,
            'stroke-width': opt.lineWidth || 1,
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
                    fill: opt.textColor || 'black',
                    innerText: index
                })
                this._svg.appendChild(text)
            }
        })
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
            // let opt = this._regualrOptions(options, "sides")
            let shapePros = this._shapeProps(defaultOpt)
            // let sidesProps = this._lineProps(opt)
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
            // let color = options._colors && options._colors[level]
            this._path(Object.assign({}, options, {
                _points: midseg.points,
                level,
                midSeg: level > 1,
            }))
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
}