import config from '../config'
import {
    _type,
    kebab
} from '../utils'
import {
    arcseg
} from './points1'
let {
    env,
    center
} = config

//连字符
var hyphenate = function (str) {
    return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
};
var createSvgDom = function (tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag)
}
var svgWrappper = function (svgDom) {
    var svg = createSvgDom("svg")
    var options = Object.assign(env, {
        fill: 'red'
    })
    console.log(options, document.body)
    for (var key in options) {
        svg.setAttribute(key, options[key])
    }
    if (Array.isArray(svgDom)) {
        svgDom.forEach(function (t) {
            svg.appendChild(t)
        })
    } else if (svgDom) {
        svg.appendChild(svgDom)
    }
    return svg
}

var wrapper;
var setup=function(){
    wrapper = svgWrappper()
    document.body.appendChild(wrapper);
}


//多边形
var polygon = function (options) {
    let points = arcseg(options)
    options.points = points.join(" ")
}

//图形
var shape = function (tag, options) {
    options = defaultOptions(tag, options)
    console.log(options)
    if ('polygon' === tag) {
        polygon(options);
    }
    var sd = createSvgDom(tag)
    for (var key in options) {
        if (key == 'text') {
            sd.textContent = options[key]
        } else {
            sd.setAttribute(hyphenate(key), options[key])
        }
    }
    return sd
}

//默认参数
var defaultOptions = function (tag, options) {
    let _default = {}
    let {
        width,
        height,
        cx,
        cy
    } = env
    switch (tag) {
        case 'circle':
            _default = {
                cx,
                cy,
                r: 40,
                stroke: 'black',
                strokeWidth: 2,
                fill: 'red'
            }
            break;
        case 'text':
            _default = {
                x: cx,
                y: 20,
                fontSize: 20,
                text: 'SVG'
            }
            break;
        case 'rect':
            _default = {
                // x="20" y="20" rx="20" ry="20"
                x: cx,
                y: cy,
                width: 100,
                height: 30,
                fill: 'rgb(0,0,255)',
                strokeWidth: 2,
                stroke: 'rgb(0, 0, 0)'
                // style: 'fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)'
            }
            break;
        case 'line':
            _default = {
                x1: 0,
                y1: cy, //380,
                x2: width, //620,
                y2: cy, //380,
                stroke: 'black',
                strokeWidth: 1.5
            };
            break;
        case 'path':
            _default = {
                d: "M1 20 L20 1 L40 20 Z",
                style: "stroke: black; stroke-width: 1"
            };
            break;
        case 'polygon':
            _default = {
                o: center,
                r: 100,
                n: 5,
                sAngle: 0,
                stroke: 'black',
                strokeWidth: 1
                // style: 'fill:white;stroke:#000000;stroke-width:1;fill-rule:nonzero;'
            }
            break;
    }

    _synonym(options)
    //style
    _style(options)

    return Object.assign(_default, options)
}

//同义词转化
var _synonym = function (options) {
    //同义词
    var synonym = {
        color: 'fill',
        linecolor: 'stroke',
        linewidth: 'strokeWidth'
    }
    //同义词
    Object.keys(options).forEach(t => {
        let key = synonym[t.toLowerCase()]
        if (key) {
            options[key] = options[t]
        }
    })
}

//样式转化
var _style = function (options) {
    options.style = options.style || ['fill', 'stroke', 'strokeWidth', 'fillRule'].filter(t => {
        return Object.hasOwnProperty.call(options, t)
    }).map(t => {
        return kebab(t) + ':' + options[t]
    }).join(";")
}



//画图
var draw = function (arr, options) {

    if (!Array.isArray(arr)) {
        arr = [arr]
    }
    var _draw = function (done) {
        arr.forEach(function (t, index) {
            switch (_type(t)) {
                case 'string':
                    t = shape(t, options)
                    break;
                case 'object':
                    t = shape(t.shape, Object.assign({}, options, t))
                    break;
                default:
                    if (_type(t).test(/svg/i)) {
                        console.log("is svg element")
                    }
                    break;
            }
            console.log(_type(t))
            if (options && options.delay) {
                setTimeout(function () {
                    wrapper.appendChild(t)

                    if (options.loop == true && (index == arr.length - 1)) {
                        // while (wrapper.firstChild) {
                        //     wrapper.removeChild(wrapper.firstChild);
                        // }
                        done()
                    }
                }, index * options.delay)
            } else {
                wrapper.appendChild(t)
            }
        })

    }


    if (options && options.loop) {
        setInterval(() => {

            _draw(() => {
                setTimeout(() => {
                    while (wrapper.firstChild) {
                        wrapper.removeChild(wrapper.firstChild);
                    }
                }, options.delay)
            })

        }, arr.length * options.delay)
    } else {
        _draw()
    }
};


export {
    setup,
    draw,
    shape
}