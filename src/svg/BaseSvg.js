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
            props: 'orient,radiusRatio,angleOffset,controller,ratio,sticks,colorfulOpacity,colorful,markerArrow,propA,propB,iterationCount,duration,name,o,r,n,shape,radius,fill,color,text,opacity,lineWidth,lineOpactiy,dashLine,dashArray,textColor,textFontSize,interval,linecap,linejoin,dashAnimation,animationTwinkle,rotate,level,offset,type,use'.split(",")
        });
        ['rect', 'g', 'text', 'path', 'pattern', 'marker'].forEach(t => {
            Object.assign(this, {
                [`_${t}`]: (options, parent) => {
                    return this._createEle(t, {
                        id: t,
                        ...options
                    }, parent)
                }
            })
        })
    }
    _createEle(tag, options, parent) {
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
        parent && parent.appendChild(ele)
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
    _defs(parent) {
        return this._createEle("defs", {}, parent)
    }

    _use(parent) {
        return this._createEle("use", {
            x: 0,
            y: 0,
            width,
            height,
            'xlink:href': '#shape'
        }, parent)
    }
    _symbol(parent) {
        return this._createEle("symbol", {
            id: "shape"
        }, parent)
    }
    _circle(o, r, options, g) {
        return this._createEle('circle', {
            cx: o[0],
            cy: o[1],
            r,
            id: 'circle',
            ...options
        }, g)
    }
}