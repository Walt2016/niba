import config from './config'
import {
    _type,
} from './utils'
import {
    cutpoints,
    dis
} from './points'
import filter from './filter'
import {
    lattice,
    dots
} from './lattice'
import color from './color'
import fractal from './fractal'
let {
    wrapperOptions,
    center
} = config
let {
    width,
    height
} = wrapperOptions

let canvas, ctx;
var setup = function () {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext("2d")
    canvas.width = width
    canvas.height = height
    document.body.appendChild(canvas)
    // var el = this.el = _.query(options.el)
    // el.appendChild(canvas)
    // var padding = options.padding || 0,
    //     paddingLeft = options.paddingLeft || padding,
    //     paddingRight = options.paddingRight || padding,
    //     paddingTop = options.paddingTop || padding,
    //     paddingBottom = options.paddingBottom || padding;
    // this.center = [this.width / 2, this.height / 2];
    // this.lefttop = [0 + paddingLeft, 0 + paddingTop];
    // this.leftbottom = [0 + paddingLeft, this.height - paddingBottom];
    // this.rightbottom = [this.width - paddingRight, this.height - paddingBottom];
    // this.righttop = [this.width - paddingRight, 0 + paddingTop];
}

var clear = function () {
    ctx.clearRect(0, 0, width, height);
};

//链接
//arr, shape
var link = function (opt) {
    var _link = function (p1, p2, shape, sAngle, eAngle) {
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        switch (shape) {
            case "line":
                ctx.moveTo.apply(ctx, p1)
                ctx.lineTo.apply(ctx, p2)
                break;
            case "arc":
                var sAngle = sAngle || 0;
                var eAngle = eAngle || (sAngle + Math.PI)
                var r = this.dis(p1, p2) / 2
                var o = this.mid(p1, p2)
                ctx.arc.apply(ctx, o.concat([r, sAngle, eAngle]))
                break;
            case "circle":
                var sAngle = 0;
                var eAngle = 2 * Math.PI
                var r = this.dis(p1, p2) / 2
                var o = this.mid(p1, p2)
                ctx.arc.apply(ctx, o.concat([r, sAngle, eAngle]))
                break;
        }
        ctx.stroke()
    }

    var len = arguments.length
    if (len === 3) {
        var p1 = arguments[0],
            p2 = arguments[1];
        var shape = arguments[2];
        _link(p1, p2, shape)

    } else if (len === 2) {
        var arr = arguments[0],
            len = arr.length,
            shape = arguments[1];
        for (var i = 0; i < len - 1; i++) {
            _link.apply(this, arr.slice(i, i + 2).concat([shape]))
        }
    } else if (len === 1) {
        var arr = opt.points,
            len = arr.length,
            shape = opt.shape,
            sAngle = opt.sAngle,
            eAngle = opt.eAngle

        for (var i = 0; i < len - 1; i++) {
            _link.apply(this, arr.slice(i, i + 2).concat([shape, sAngle, eAngle]))
        }
    }

};


//打点
var dot = (options) => {
    let {
        points,
        showLabel
    } = options
    ctx.fillStyle = "#0000ff";
    let _dot = (t) => {
        ctx.beginPath();
        ctx.arc(t[0], t[1], 3, 0, 2 * Math.PI);
        // ctx.stroke();
        ctx.fill();
        if (showLabel)
            this.text(Math.floor(t[0]) + "," + Math.floor(t[1]), [t[0] - 5, t[1] + 10])
    }
    if (_type(points[0]) === "array") { //二维数组
        points.forEach(t => _dot(t))
    } else {
        _dot(points)
    }
    return options
}



//弧线
var arc = (opitons) => {
    let {
        o,
        strokeStyle = "#000"
    } = opitons
    let points = cutpoints(opitons)
    let len = points.length
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    points.forEach((t, i) => {
        let t1 = i + 1 < len ? points[i + 1] : points[0];
        let r = dis(t, t1, o)
        ctx.arcTo.apply(ctx, t.concat(t1).concat([r]))
    })
    ctx.stroke()
    return Object.assign(opitons, {
        points
    })
}

//连线
var line = (options) => {
    let {
        points,
        fillStyle,
        strokeStyle = "#000",
        closePath = true,
        colors,
        index = 0
    } = options
    if (colors)
        strokeStyle = colors[index]
    if (fillStyle) ctx.fillStyle = fillStyle //"white"
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    points.forEach((t, i) => {
        if (i === 0) {
            ctx.moveTo.apply(ctx, t)
        }
        ctx.lineTo.apply(ctx, t)
    })
    if (closePath)
        ctx.closePath();
    ctx.stroke()
    if (fillStyle) ctx.fill()

    return options
};


//射线
//一中心p,多中心o [p1,p2]
var ray = (options) => {
    let {
        o,
        strokeStyle = "#000",
        colors,
        index = 0
    } = options
    let points = cutpoints(options)
    // options.points = points

    if (colors) {
        ctx.strokeStyle = colors[index]
    } else {
        ctx.strokeStyle = strokeStyle;
    }

    ctx.beginPath();
    if (Array.isArray(o[0])) { //二维数组  多中心
        var n = o.length;
        points.forEach((t, i) => {
            ctx.moveTo.apply(ctx, o[i % n])
            ctx.lineTo.apply(ctx, t)
        })
    } else {
        points.forEach((t, i) => {
            ctx.moveTo.apply(ctx, o)
            ctx.lineTo.apply(ctx, t)
        })
    }
    ctx.stroke()
    // return options
    return Object.assign(opitons, {
        points
    })
};
//正方形，矩形
var rect = (options) => {
    let {
        o,
        r,
        strokeStyle = '#000',
        fillStyle
    } = options
    ctx.strokeStyle = strokeStyle;
    if (fillStyle)
        ctx.fillStyle = fillStyle
    ctx.beginPath();
    ctx.rect.apply(ctx, [o[0] - r / 2, o[1] - r / 2].concat([r, r]))
    ctx.stroke()
    if (fillStyle)
        ctx.fill()
    return options
}
//圆形
var circle = function (options) {
    let {
        o,
        r,
        fillStyle,
        strokeStyle = '#000'
    } = options
    ctx.strokeStyle = strokeStyle
    if (fillStyle)
        ctx.fillStyle = fillStyle
    ctx.beginPath();
    ctx.arc.apply(ctx, o.concat([r, 0, 2 * Math.PI]))
    ctx.stroke()
    if (fillStyle)
        ctx.fill()
    return options
}

//文字
var text = function (options) {
    let {
        text,
        x,
        y,
        fillStyle
    } = options
    ctx.fillStyle = fillStyle
    ctx.font = "20px Verdana";
    ctx.fillText(text, x, y);
    return options
}

//规则多边形
var polygon = function (options) {
    let points = cutpoints(options)
    return line(Object.assign(options, {
        points
    }))
}
//同义词
var _synonym = function (options) {
    var synonym = {
        color: 'fillStyle',
        linecolor: 'strokeStyle',
        // linewidth: 'strokeWidth'
    }
    Object.keys(options).forEach(t => {
        let key = synonym[t.toLowerCase()]
        if (key) {
            options[key] = options[t]
        }
    })
    return options
}
//默认参数
var defaultOptions = function (tag, options) {
    let _default = {}
    switch (tag) {
        case 'circle':
            _default = {
                o: center,
                r: 100,
                color: 'red',
                lineColor: 'black'
            }
            break;
        case 'text':
            _default = {
                x: center[0],
                y: 20,
                fontSize: 20,
                text: 'Canvas'
            }
            break;
        case 'polygon':
            _default = {
                o: center,
                r: 100,
                n: 5,
                sAngle: 0,
                // color: 'blue',
                lineColor: 'black'
            }
            break;
        case 'rect':
            _default = {
                o: center,
                r: 100,
                sAngle: 0,
                color: 'blue',
                lineColor: 'black'
            }
            break;
        case 'ray':
            _default = {
                o: center,
                r: 100,
                n: 5,
                sAngle: 0,
                // color: 'blue',
                lineColor: 'black'
            }
            break;
        case 'arc':
            _default = {
                o: center,
                r: 100,
                n: 5,
                sAngle: 0,
                // color: 'blue',
                lineColor: 'black'
            }
            break;
        case 'dot':
            _default = {
                o: center,
                r: 50,
                n: 4
            }
            break;
    }

    return _synonym(Object.assign(_default, options))
}


//图形
var shape = function (tag, options) {
    options = defaultOptions(tag, options)
    switch (tag) {
        case "circle":
            options = circle(options);
            break;
        case 'text':
            options = text(options);
            break;
        case 'polygon':
            options = polygon(options);
            break;
        case 'ray':
            options = ray(options);
            break;
        case 'arc':
            options = arc(options);
            break;
        case 'rect':
            options = rect(options);
            break;
        case 'lattice':
            doFilter('lattice')
            break;
        case 'dot':
            options.points = lattice(canvas, options)
            options = dot(options)
            break;
    }
    // console.log(options)
    return options
}

//滤镜
function doFilter(t, options) {
    if (t === 'lattice') {
        let points = lattice(canvas)
        console.log(points)
        clear()
        let colors = color.circle(points.length)
        points.forEach((t, i) => {
            let opt = Object.assign(options, {
                o: t,
                shape: 'circle',
                r: 2,
                color: colors[i] // hsla()
            })
            if (i % 100 == 0)
                circle(opt)
        })
    } else {
        filter[t] && filter[t](canvas)
    }
}

//分形调用
var doFractal = function (t, options) {
    let {
        level = 3,
            n = 5
    } = options
    let len = fractal.stat(level, n)
    console.log(len)
    let colors = color.circle(len)
    options.colors = colors
    // options.index = 0
    let index = 0
    fractal[t](options, function (options) {
        // options.index++
        index++
        Object.assign(options, {
            index
        })
        return shape(options.shape, options)
    })
}

//画图
var draw = function (arr, options) {
    arr.forEach(t => {
        switch (_type(t)) {
            case 'string':
                shape(t, options)
                break;
            case 'object':

                //分形
                if (t.fractal) {
                    doFractal(t.fractal, Object.assign({}, options, t))
                } else {
                    //画图
                    if (t.shape) {
                        shape(t.shape, Object.assign({}, options, t))
                    }
                }

                //滤镜
                if (t.filter) {
                    doFilter(t.filter, Object.assign({}, options, t))
                }

                break;
            default:
                if (_type(t).test(/svg/i)) {
                    console.log("is svg element")
                }
                break;
        }
    })
}

var animate = function (arr, options, duration) {
    let index = 0;
    (function _ani() {
        if (index++ >= 1000) {
            return false
        }
        clear()
        draw(arr, options)
        // switch (act) {
        //     case "point":
        //         _this.point.call(_this, arr[index++])
        //         break;
        //     case "line":
        //         _this.line.call(_this, arr.slice(index++, index + 1))
        //         break;
        //     case "ray":
        //         if (cs) {
        //             _this.ray.call(_this, cs[index % cs.length], arr.slice(index++, index))
        //         } else {
        //             _this.ray.call(_this, _this.center, arr.slice(index++, index))
        //         }

        //         break;
        // }
        setTimeout(_ani, duration)
    })();

}


export {
    setup,
    draw,
    shape,
    clear
}