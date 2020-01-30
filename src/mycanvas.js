import {
    _type,
    neighborSwap
} from './utils'
import {
    cutpoints
} from './points'
import config from './config'
let {
    wrapperOptions,
    center
} = config
var canvas = document.createElement('canvas')
var ctx = canvas.getContext("2d")

let {
    width,
    height
} = wrapperOptions

canvas.width = width
canvas.height = height

document.body.appendChild(canvas)


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


    // if(_.type())
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

//连线
var line = function (arr, closePath, options) {
    let {
        color
    } = options
    if (color) ctx.fillStyle = color //"white"
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    arr.forEach((t, i) => {
        if (i === 0) {
            ctx.moveTo.apply(ctx, t)
        }
        ctx.lineTo.apply(ctx, t)
    })
    var closePath = closePath == null ? false : closePath
    if (closePath)
        ctx.closePath();
    ctx.stroke()
    if (color) ctx.fill()
};


//射线
//一中心p,多中心o [p1,p2]
var ray = function (o, arr) {
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    if (_.type(o[0]) === "array") { //二维数组  多中心
        var n = o.length;
        arr.forEach((t, i) => {
            ctx.moveTo.apply(ctx, o[i % n])
            ctx.lineTo.apply(ctx, t)
        })

    } else {
        arr.forEach((t, i) => {
            ctx.moveTo.apply(ctx, o)
            ctx.lineTo.apply(ctx, t)
        })
    }
    ctx.stroke()
};

//弧线
var arc = function (o, arr) {
    var len = arr.length
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    arr.forEach((t, i) => {
        var t1 = i + 1 < len ? arr[i + 1] : arr[0];
        var r = dis(t, t1, o)
        ctx.arcTo.apply(ctx, t.concat(t1).concat([r]))
    })
    ctx.stroke()
}
//正方形，矩形
var rect = function (o, r) {
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.rect.apply(ctx, [o[0] - r / 2, o[1] - r / 2].concat([r, r]))
    ctx.stroke()
}

var point = function (arr, showLabel) {
    var _this = this;
    ctx.fillStyle = "#0000ff";

    var _point = function (t) {
        ctx.beginPath();
        ctx.arc(t[0], t[1], 3, 0, 2 * Math.PI);
        // ctx.stroke();
        ctx.fill();
        if (showLabel)
            _this.text(Math.floor(t[0]) + "," + Math.floor(t[1]), [t[0] - 5, t[1] + 10])
    }
    if (_.type(arr[0]) === "array") { //二维数组
        arr.forEach(function (t) {
            _point(t)
        })
    } else {
        _point(arr)
    }
}

// var canvas = _.createEle("canvas");
// canvas.width = this.width = options.width || 300;
// canvas.height = this.height = options.height || 400;
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

// var ctx = this.ctx = canvas.getContext("2d")
//圆形
var circle = function (options) {
    let {
        o,
        r,
        color,
        lineColor
    } = options
    ctx.strokeStyle = lineColor
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc.apply(ctx, o.concat([r, 0, 2 * Math.PI]))
    ctx.stroke()
    ctx.fill()
}

//文字
var text = function (options) {
    let {
        text,
        x,
        y,
        color
    } = options
    ctx.fillStyle = color
    ctx.font = "20px Verdana";
    ctx.fillText(text, x, y);
}

//规则多边形
var polygon = function (options) {
    let {
        o,
        r,
        n,
        sAngle,
        color
    } = options
    // var n = n || 4
    var ps = cutpoints(o, r, n, {
        sAngle: sAngle
    })
    ps = neighborSwap(ps)
    line(ps, true, {
        color
    })
}
//打点
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
                x: 200,
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
                color: 'blue'
            }
            break;
    }
    //同义词
    var synonym = {
        color: 'fillStyle',
        linecolor: 'strokeStyle',
        // linewidth: 'strokeWidth'
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


//图形
var shape = function (tag, options) {
    options = defaultOptions(tag, options)
    switch (tag) {
        case "circle":
            circle(options);
            break;
        case 'text':
            text(options);
            break;
        case 'polygon':
            polygon(options);
            break;

    }

}

var draw = function (arr, options) {

    arr.forEach(t => {

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




    })


}

export {
    draw,
    shape
}