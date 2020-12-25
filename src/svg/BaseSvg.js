import config from '../config'
import _ from '../utils/index'
import Waveform from './Waveform'
import Pattern from './Pattern'
let {
    env,
    center
} = config
let {
    width,
    height
} = env
export default class BaseSvg {
    constructor(options) {
        this._init(options)
    }
    _init(options) {

        Object.assign(this, {
            width,
            height,
            options
            // props: 'size,skewX,borderRadius,name,color1,color2,controlLink,controlPoint,closed,broken,markerArrow,waveform,splitNum,recycleIndex,arrow,largeArcFlag,xAxisRotation,sweepFlag,orient,radiusRatio,angleOffset,controller,ratio,sticks,colorfulOpacity,colorful,markerArrow,propA,propB,iterationCount,duration,name,o,r,n,shape,radius,fill,color,text,opacity,lineWidth,lineOpactiy,dashLine,dashArray,dashOffset,textColor,textFontSize,interval,linecap,linejoin,dashAnimation,animationTwinkle,rotate,level,offset,type,use'.split(",")
        });
        ['g', 'marker'].forEach(t => {
            Object.assign(this, {
                [`_${t}`]: (props, g) => {
                    return this._createEle(t, {
                        id: t,
                        ...props
                    }, g)
                }
            })
        })
    }
    _createEle(tag, props, g) {
        let ele = document.createElementNS('http://www.w3.org/2000/svg', tag)
        for (let key in props) {
            if (props[key] !== undefined) {
                switch (key.toLocaleLowerCase()) {
                    case "class":
                        ele.className = props[key]
                        break;
                    case "name":
                    case "innertext":
                    case "id":
                    case "innerhtml":
                    case "value":
                    case "textcontent":
                        ele[key] = props[key]
                        break;
                    case "click":
                        ele.addEventListener("click", props[key], false)
                        break;
                    default:
                        ele.setAttribute(key, props[key])
                        break;
                }
            }
        }
        g && g.appendChild(ele)
        return ele
    }
    // 判断node是否存在
    _has(id) {
        return document.querySelector("#" + id)
    }
    // svg包围
    _svg(svgDom) {
        let svg = this._createEle("svg", {
            width: "100%",
            height: "100%",
            viewBox: `0,0,${width},${height}`
            // preserveAspectRatio: "XMidYMid meet"
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
    _defs(g) {
        return this._createEle("defs", {}, g)
    }

    _use(g) {
        return this._createEle("use", {
            x: 0,
            y: 0,
            width,
            height,
            'xlink:href': '#shape'
        }, g)
    }
    _symbol(g) {
        return this._createEle("symbol", {
            id: "shape"
        }, g)
    }
    _circle(o, r, props, g) {
        return this._createEle('circle', {
            cx: o[0],
            cy: o[1],
            r,
            id: 'circle',
            ...props
        }, g)
    }
    _text(p, text, props, g) {
        return this._createEle('text', {
            x: p[0],
            y: p[1],
            textContent: text,
            // fill: 'black',
            // 'font-size': 12,
            ...props
        }, g)
    }
    _path(d, props, g) {
        return this._createEle('path', {
            d,
            id: 'path',
            ...props
        }, g)
    }
    // 链接点 [p1,p2]  =>[[x,y],[x,y]] 
    _d(points, options = {}, callback) {
        let {
            closed,
            broken = false,
            waveform = "line"
        } = options
        closed = closed === undefined ? true : closed

        let wf = new Waveform(points, options, callback)
        if (wf['_' + waveform]) {
            return wf['_' + waveform]()
        }
        return wf.d()
        // return wf.d(points, {
        //     closed,
        //     broken
        // })
    }
    _line(p1, p2, props, g) {
        this._createEle("line", {
            x1: p1[0],
            y1: p1[1],
            x2: p2[0],
            y2: p2[1],
            ...props
        }, g)
    }
    _rect(p1, p2, props, g) {
        this._createEle("rect", {
            x: p1[0],
            y: p1[1],
            width: p2[0] - p1[0],
            height: p2[1] - p1[0],
            ...props
        }, g)
    }
    // 图案
    _pattern(options, g) {
        let {
            size = 10,
                name = "diagonalStripe",
                color1 = 'red',
                color2 = 'red',
                skewX = 0,
                opacity = 1
        } = options

        let defs = this._defs(g)
        let patternWarper = this._createEle("pattern", {
            id: "shape-pattern",
            x: 0,
            y: 0,
            width: size * 2,
            height: size * 2,
            patternUnits: "userSpaceOnUse"
        }, defs)
        let pattern = new Pattern(options)
        let d = pattern["_" + name] ? pattern["_" + name]() : pattern["_diagonalStripe"]()
        let params = {}
        if (skewX) {
            params.transform = `skewX(${skewX})`
        }
        if (opacity) {
            params.opacity = opacity
        }

        if (Array.isArray(d)) {
            d.forEach((t, index) => {
                this._path(t, {
                    ...params,
                    fill: options['color' + (index + 1)],
                }, patternWarper)
            })

        } else {
            this._path(d, {
                ...params,
                fill: color1
            }, patternWarper)
        }
    }
    // 格子图案
    _chequer(options, g) {
        let {
            size,
            color1 = "red",
            color2 = "green",
            borderRadius1 = 1,
            borderRadius2 = 1
        } = options
        let r = size
        let defs = this._defs(g)
        let chequer = this._createEle("pattern", {
            id: "shape-pattern-chequer",
            x: 0,
            y: 0,
            width: r * 2,
            height: r * 2,
            patternUnits: "userSpaceOnUse"
        }, defs)
        this._rect([0, 0], [r, r], {
            fill: color1,
            rx: borderRadius1,
            ry: borderRadius1,
        }, chequer)
        this._rect([r, r], [r * 2, r * 2], {
            fill: color2,
            rx: borderRadius2,
            ry: borderRadius2,
        }, chequer)

    }
    // 条纹 竖直
    _stripe(options, g) {
        let {
            size = 10,
                color1 = "red",
                color2 = "green",
                borderRadius1 = 1,
                borderRadius2 = 1,
                radio = 0.2,
                skewX = 0
        } = options
        let r = size
        let defs = this._defs(g)
        let stripe = this._createEle("pattern", {
            id: "shape-pattern-stripe",
            x: 0,
            y: 0,
            width: r * 2,
            height: r,
            patternUnits: "userSpaceOnUse"
        }, defs)
        // let d = "M0,0 H10 L 20,10  V-10 Z"
        // let d = "M0,0 H10  V10 Z"
        // 三角形
        // let d = `M0,0 h${r} v${r} Z`
        // this._path(d, {
        //     fill: stripeColor1
        // }, stripe)

        // let d2 = `M${r},${r} h${r} v${r} Z`
        // this._path(d2, {
        //     fill: stripeColor2
        // }, stripe)


        let d = `M0,0 h${r*radio} v${r} h${r*radio*-1} Z`
        this._path(d, {
            fill: color1,
            transform: `skewX(${skewX})`
        }, stripe)

        let d2 = `M${r},0 h${r*radio} v${r} h${r*radio*-1} Z`
        this._path(d2, {
            fill: color2,
            transform: `skewX(${skewX})`
        }, stripe)
    }
    // 斜条纹线
    _diagonalStripe(options, g) {

        let {
            size = 10,
                color1 = "red",
                color2 = "green",
                borderRadius1 = 1,
                borderRadius2 = 1,
                radio = 0.2,
                skewX = 0,
                offset = 0
        } = options
        let r = size
        let defs = this._defs(g)
        let stripe = this._createEle("pattern", {
            id: "shape-pattern-diagonalStripe",
            x: 0,
            y: 0,
            width: r * 2,
            height: r * 2,
            patternUnits: "userSpaceOnUse"
        }, defs)

        let d = this._d([
            [
                [0, 0],
                [r * 2, r * 2],
                [r + offset, r * 2],
                [0, r - offset]
            ],
            [
                [r + offset, 0],
                [r * 2, 0],
                [r * 2, r - offset]
            ]
        ])
        this._path(d, {
            fill: color1
        }, stripe)
    }
    //     <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">  
    //     <stop offset="0%" stop-color="red"/>  
    //     <stop offset="50%" stop-color="black" stop-opacity="0"/>  
    //     <stop offset="100%" stop-color="blue"/>  
    //   </linearGradient>  
    // 渐变
    _gradient(options, g) {
        let defs = this._defs(g)
        let grad
        if (options.type === "radialGradient") {
            grad = this._createEle("radialGradient", {
                id: "shape-gradient"
            }, defs)
        } else {
            grad = this._createEle("linearGradient", {
                x1: "0",
                x2: "0",
                y1: "0",
                y2: '1',
                id: "shape-gradient"
            }, defs)
        }
        let list = [1, 2],
            len = list.length
        list.forEach((t, index) => {
            this._createEle("stop", {
                offset: 100 * index / (len - 1) + '%',
                'stop-color': options['color' + (index + 1)]
            }, grad)
        })


        // this._createEle("stop", {
        //     offset: '0%',
        //     'stop-color': options.color1
        // }, grad)
        // this._createEle("stop", {
        //     offset: '100%',
        //     'stop-color': options.color2
        // }, grad)

    }

    // 获取对象参数  对象名称
    _options(options, moduleName) {
        if (_.type(options[moduleName]) === "object") {
            return options[moduleName]
        }
        let opt = {};

        for (let key in options) {
            if (_.type(options[key]) !== "object") {
                opt[key] = options[key]
            }
        }
        return opt;


        // // flat 格式属性
        // let opt = {};
        // this.props.forEach(t => {
        //     if (moduleName) {
        //         let name = _.camelCase([moduleName, t])
        //         if (options[name]) {
        //             opt[t] = options[name]
        //         }
        //     } else {
        //         if (options[t]) {
        //             opt[t] = options[t]
        //         }
        //     }
        // })
        // return opt
    }
    // 判断模块是否显示
    _show(options, moduleName) {
        if (_.type(options[moduleName]) === "object") {
            return options[moduleName].show || options[moduleName].use
        }
        // flat 格式属性
        return options[_.camelCase([moduleName, "show"])] || options[_.camelCase([moduleName, "use"])]
    }
    // 线条属性
    _lineProps(opt = {}) {
        return {
            stroke: opt.color || opt.stroke || 'black',
            'stroke-opacity': _.isUndefined(opt.opacity) ? 1 : opt.opacity,
            'stroke-width': opt.lineWidth || opt.strokeWidth || 1,
            'stroke-dasharray': opt.dashLine ? opt.dashArray || [5, 5] : undefined,
            'stroke-dashoffset': opt.dashOffset ? opt.dashOffset : undefined,
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
    _append(parent, child) {
        parent.appendChild(child)
    }


}