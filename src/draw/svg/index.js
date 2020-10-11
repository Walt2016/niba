import config from '../../config'
import MidSeg from '../../points/MidSeg'
import {
    _sin
} from '../../utils'
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
        // for (let key in options) {
        //     svg.setAttribute(key, options[key])
        // }
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
                        // ele[key] = options[key]
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
    _path(options) {
        console.log(options)
        let points = options._points || []
        // 边
        if (options.showSides) {
            let d = points.map((t, index) => {
                return (index === 0 ? "M" : "L") + t.join(" ")
            }).concat(["z"]).join(" ")
            let sides = this._createEle("path", {
                d,
                stroke: options.color || 'black',
                "stroke-width": options.lineWidth,
                fill: options.fill ? options.color : 'transparent'
            })
            this._svg.appendChild(sides)
        }
        // 半径
        if (options.showRadius) {
            let d = points.map((t, index) => {
                return `M${options.o.join(" ")} L${t.join(" ")}`
            }).concat(["z"]).join(" ")
            let path = this._createEle("path", {
                d,
                stroke: options.color || 'black',
                "stroke-width": options.lineWidth,
                fill: options.fill ? options.color : 'transparent'
            })
            this._svg.appendChild(path)
        }

        // 控制点
        if (options.showController) {
            // 圆心
            let center = this._createEle("circle", {
                cx: options.o[0],
                cy: options.o[1],
                r: 8,
                fill: 'red',
            })
            this._svg.appendChild(center)
            // 控制点
            points.forEach((t, index) => {
                switch (options.controllerShape) {
                    case "rect":
                        // 正方形
                        let width = _sin(45) * options.controllerRadius || 5
                        let rect = this._createEle("rect", {
                            x: t[0] - width / 2,
                            y: t[1] - width / 2,
                            width,
                            height: width,
                            fill: options.controllerFill ? options.controllerColor || 'red' : 'transparent',
                            stroke: options.controllerColor || 'red',
                        })
                        this._svg.appendChild(rect)
                        break;
                    default:
                        // 原型
                        let circle = this._createEle("circle", {
                            cx: t[0],
                            cy: t[1],
                            r: options.controllerRadius || 5,
                            fill: options.controllerFill ? options.controllerColor || 'red' : 'transparent',
                            stroke: options.controllerColor || 'red',
                        })
                        this._svg.appendChild(circle)
                        break;

                }


                // 标注文字
                if (options.controllerText) {
                    let text = this._createEle("text", {
                        x: t[0],
                        y: t[1],
                        fill: 'black',
                        innerText: index
                    })
                    this._svg.appendChild(text)
                }

            })
        }

        // 分形
        if (options.midSeg) {
            let midseg = new MidSeg({
                points: options._points,
                offset: options.offset || 0
            })
            this._path(Object.assign({}, options, {
                _points: midseg.points,
                level: options.level - 1,
                midSeg: options.level > 1
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