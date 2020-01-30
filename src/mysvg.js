import {
    cutpoints
} from './points'
import {
    _type,
    shuffle,
    neighborSwap,
    intervalSort
} from './utils'
import config from './config'

let {
    wrapperOptions,
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
    var options = Object.assign(wrapperOptions, {
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

//图形
var shape = function (tag, options) {
    options = defaultOptions(tag, options)
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
    } = wrapperOptions
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
                x: 200,
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
            options = options || {}
            let r = options.r || 100
            let n = options.n || 5
            let points = cutpoints(center, r, n)
            // points = shuffle(points)
            // points = neighborSwap(points, 2)
            points = intervalSort(points,2)

            // points
            _default = {
                points: points.join(" "),
                stroke: 'black',
                strokeWidth: 1,
                style: 'fill:white;stroke:#000000;stroke-width:1;fill-rule:nonzero;'
            }
            break;

    }
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

    return Object.assign(_default, options)
}

// //原型
// var circle = shape("circle", {
//     cx: 100,
//     cy: 50,
//     r: 40,
//     stroke: 'black',
//     strokeWidth: 2,
//     fill: 'red'
// })
// // <text x="200" y="20" font-size="20">SVG 华东地区手机12个月的数据 柱状图</text>

// //文字
// var text = shape("text", {
//     x: 200,
//     y: 20,
//     fontSize: 20,
//     text: ' 柱状图'
// })

// //矩形
// var rect = shape("rect", {
//     width: 100,
//     height: 30,
//     fill: 'rgb(0,0,255)',
//     strokeWidth: 12,
//     stroke: 'rgb(0, 0, 0)'
//     // style: 'fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)'
// })

// //线条
// //  <line x1="20" y1="380" x2="620" y2="380" stroke="black" stroke-width="1.5" />
// var line = shape("line", {
//     x1: 20,
//     y1: 380,
//     x2: 620,
//     y2: 380,
//     stroke: 'black',
//     strokeWidth: 1.5
// })

// //线条
// //  <line x1="20" y1="380" x2="20" y2="1" style="stroke: black; stroke-width: 1.5" />

// var line2 = shape("line", {
//     x1: 20,
//     y1: 380,
//     x2: 20,
//     y2: 1,
//     stroke: 'black',
//     strokeWidth: 1.5
// })

// //路径
// // <path d="M1 20 L20 1 L40 20 Z" style="stroke: black; stroke-width: 1" />
// // <path d="M600 360 L620 380 L600 400 Z" style="stroke: black; stroke-width: 1" />
// var path = shape("path", {
//     d: "M1 20 L20 1 L40 20 Z",
//     style: "stroke: black; stroke-width: 1"
// })
// //路径
// var path2 = shape("path", {
//     d: "M600 360 L620 380 L600 400 Z",
//     style: "stroke: black; stroke-width: 1"
// })



//画图
var draw = function (svgDomArr, options) {
    var wrapper = svgWrappper()
    document.body.appendChild(wrapper);
    if (!Array.isArray(svgDomArr)) {
        svgDomArr = [svgDomArr]
    }
    svgDomArr.forEach(function (t, index) {
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
            }, 1000 * index * options.delay)
        } else {
            wrapper.appendChild(t)
        }
    })
};


export {
    draw,
    shape
}