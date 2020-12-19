import config from '../config'
import _ from '../utils/index'
import Waveform from './Waveform'
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
            props: 'skewX,borderRadius,name,color1,color2,controlLink,controlPoint,closed,broken,markerArrow,waveform,splitNum,recycleIndex,arrow,largeArcFlag,xAxisRotation,sweepFlag,orient,radiusRatio,angleOffset,controller,ratio,sticks,colorfulOpacity,colorful,markerArrow,propA,propB,iterationCount,duration,name,o,r,n,shape,radius,fill,color,text,opacity,lineWidth,lineOpactiy,dashLine,dashArray,dashOffset,textColor,textFontSize,interval,linecap,linejoin,dashAnimation,animationTwinkle,rotate,level,offset,type,use'.split(",")
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
        let defs = this._defs(g)
        let pattern = this._createEle("pattern", {
            id: "shape-pattern",
            x: 10,
            y: 10,
            width: 0.2,
            height: 0.2
            // patternUnits: options.patternUnits || "objextBoundingBox"  // userSpaceOnUse
        }, defs)
        this._circle([10, 10], 10, {
            fill: 'red'
        }, pattern)

        let pat = this._createEle("pattern", {
            id: "shape-pattern-pat",
            x: "6%",
            width: "50%",
            height: "50%",
            // patternUnits: "userSpaceOnUse"
        }, defs)
        this._createEle("line", {
            x1: 4,
            x2: 4,
            y2: '100%'
        }, pat)
        this._createEle("line", {
            x1: 8,
            x2: 8,
            y2: '100%'
        }, pat)
        this._createEle("line", {
            x1: 16,
            x2: 16,
            y2: '100%'
        }, pat)


        //     <path d="M-1,1 l2,-2
        //     M0,4 l4,-4
        //     M3,5 l2,-2" 
        //  style="stroke:black; stroke-width:1" />

        let diagonalHatch = this._createEle("pattern", {
            id: "shape-pattern-diagonalHatch",
            // x: "6%",
            width: "4",
            height: "4",
            patternUnits: "userSpaceOnUse"
        }, defs)

        this._path("M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2", {
            stroke: "black",
            "stroke-width": 1
        }, diagonalHatch)


        let lv = this._createEle("pattern", {
            id: "shape-pattern-lv",
            x: 0,
            y: 0,
            width: "20",
            height: "20",
            patternUnits: "userSpaceOnUse"
        }, defs)

        // this._path("M0,0 H 10 V 20 H10 V -10 H -20 V -10 z", {
        //     stroke: "black",
        //     "stroke-width": 1,
        //     fill: "red"
        // }, lv)
        this._rect([0, 0], [10, 10], {
            fill: "red"
        }, lv)
        this._rect([10, 10], [20, 20], {
            fill: "green"
        }, lv)

    }
    // 格子图案
    _chequer(options, g) {
        let {
            chequerSize,
            chequerColor1 = "red",
            chequerColor2 = "green",
            chequerBorderRadius1 = 1,
            chequerBorderRadius2 = 1
        } = options
        let defs = this._defs(g)
        let chequer = this._createEle("pattern", {
            id: "shape-pattern-chequer",
            x: 0,
            y: 0,
            width: chequerSize * 2,
            height: chequerSize * 2,
            patternUnits: "userSpaceOnUse"
        }, defs)
        this._rect([0, 0], [chequerSize, chequerSize], {
            fill: chequerColor1,
            rx: chequerBorderRadius1,
            ry: chequerBorderRadius1,
        }, chequer)
        this._rect([chequerSize, chequerSize], [chequerSize * 2, chequerSize * 2], {
            fill: chequerColor2,
            rx: chequerBorderRadius2,
            ry: chequerBorderRadius2,
        }, chequer)

    }
    // 条纹
    _stripe(options, g) {
        let {
            stripeSize = 10,
                stripeColor1 = "red",
                stripeColor2 = "green",
                stripeBorderRadius1 = 1,
                stripeBorderRadius2 = 1,
                stripeRadio = 0.2,
                stripeSkewX = 0
        } = options
        let defs = this._defs(g)
        let stripe = this._createEle("pattern", {
            id: "shape-pattern-stripe",
            x: 0,
            y: 0,
            width: stripeSize * 2,
            height: stripeSize,
            patternUnits: "userSpaceOnUse"
        }, defs)
        // let d = "M0,0 H10 L 20,10  V-10 Z"
        // let d = "M0,0 H10  V10 Z"
        // 三角形
        // let d = `M0,0 h${stripeSize} v${stripeSize} Z`
        // this._path(d, {
        //     fill: stripeColor1
        // }, stripe)

        // let d2 = `M${stripeSize},${stripeSize} h${stripeSize} v${stripeSize} Z`
        // this._path(d2, {
        //     fill: stripeColor2
        // }, stripe)


        let d = `M0,0 h${stripeSize*stripeRadio} v${stripeSize} h${stripeSize*stripeRadio*-1} Z`
        this._path(d, {
            fill: stripeColor1,
            transform: `skewX(${stripeSkewX})`
        }, stripe)

        let d2 = `M${stripeSize},0 h${stripeSize*stripeRadio} v${stripeSize} h${stripeSize*stripeRadio*-1} Z`
        this._path(d2, {
            fill: stripeColor2,
            transform: `skewX(${stripeSkewX})`
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
        if (options.gradientType === "radialGradient") {
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

        this._createEle("stop", {
            offset: '0%',
            'stop-color': options.gradientColor1
        }, grad)
        this._createEle("stop", {
            offset: '100%',
            'stop-color': options.gradientColor2
        }, grad)

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