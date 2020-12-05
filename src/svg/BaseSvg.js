import config from '../config'
import _ from '../utils/index'
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
        // let svg = this._svg()
        // document.body.appendChild(svg);
        Object.assign(this, {
            // svg,
            width,
            height,
            props: 'largeArcFlag,xAxisRotation,sweepFlag,orient,radiusRatio,angleOffset,controller,ratio,sticks,colorfulOpacity,colorful,markerArrow,propA,propB,iterationCount,duration,name,o,r,n,shape,radius,fill,color,text,opacity,lineWidth,lineOpactiy,dashLine,dashArray,dashOffset,textColor,textFontSize,interval,linecap,linejoin,dashAnimation,animationTwinkle,rotate,level,offset,type,use'.split(",")
        });
        ['rect', 'g', 'pattern', 'marker'].forEach(t => {
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
    // svg包围
    _svg(svgDom) {
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
            fill: 'black',
            'font-size': 12,
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
    _line(p1, p2, props, g) {
        this._createEle("line", {
            x1: p1[0],
            y1: p1[1],
            x2: p2[0],
            y2: p2[1],
            ...props
        }, g)
    }
    // // 线段
    // _line(points, options, g = this.svg) {
    //     let props = this._lineProps(options)
    //     this._createEle("line", {
    //         x1: points[0][0],
    //         y1: points[0][1],
    //         x2: points[1][0],
    //         y2: points[1][1],
    //         ...props
    //     }, g)
    // }

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
}