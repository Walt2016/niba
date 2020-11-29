import config from '../config'
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
        let svg = this._svg()
        document.body.appendChild(svg);
        Object.assign(this, {
            svg,
            width,
            height,
            props: 'orient,radiusRatio,angleOffset,controller,ratio,sticks,colorfulOpacity,colorful,markerArrow,propA,propB,iterationCount,duration,name,o,r,n,shape,radius,fill,color,text,opacity,lineWidth,lineOpactiy,dashLine,dashArray,dashOffset,textColor,textFontSize,interval,linecap,linejoin,dashAnimation,animationTwinkle,rotate,level,offset,type,use'.split(",")
        });
        ['rect', 'g', 'text', 'pattern', 'marker'].forEach(t => {
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
}