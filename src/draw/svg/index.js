import config from '../../config'
import MidSeg from '../../points/MidSeg'
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
        let svg = document.createElementNS('http://www.w3.org/2000/svg', tag)
        for (let key in options) {
            svg.setAttribute(key, options[key])
        }
        return svg
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
                // stroke: 'red'
            })
            this._svg.appendChild(center)
            points.forEach(t => {
                let circle = this._createEle("circle", {
                    cx: t[0],
                    cy: t[1],
                    r: options.controllerRadius || 5,
                    fill: options.controllerFill ? options.controllerColor || 'red' : 'transparent',
                    stroke: options.controllerColor || 'red',
                })
                this._svg.appendChild(circle)
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