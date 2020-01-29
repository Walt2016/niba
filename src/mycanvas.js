import {
    _forEach
} from './utils'
import {
    cutpoints
} from './points'
var canvas = document.createElement('canvas')
var ctx = canvas.getContext("2d")

let width = 300;
let height = 400;


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
var line = function (arr, closePath) {
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    _forEach(arr, function (t, i) {
        if (i === 0) {
            ctx.moveTo.apply(ctx, t)
        }
        ctx.lineTo.apply(ctx, t)
    })
    var closePath = closePath == null ? false : closePath
    if (closePath)
        ctx.closePath();
    ctx.stroke()
};


//射线
//一中心p,多中心o [p1,p2]
var ray = function (o, arr) {
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    if (_.type(o[0]) === "array") { //二维数组  多中心
        var n = o.length;
        _.forEach(arr, function (t, i) {
            ctx.moveTo.apply(ctx, o[i % n])
            ctx.lineTo.apply(ctx, t)
        })
    } else {
        _.forEach(arr, function (t, i) {
            ctx.moveTo.apply(ctx, o)
            ctx.lineTo.apply(ctx, t)
        })
    }
    ctx.stroke()
};
//圆形
var circle = function (o, r) {
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.arc.apply(ctx, o.concat([r, 0, 2 * Math.PI]))
    ctx.stroke()
}
//弧线
var arc = function (o, arr) {
    var len = arr.length
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    _.forEach(arr, function (t, i) {
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
//规则多边形
var regularPloygon = function (o, r, n, sAngle) {
    var n = n || 4
    var ps = cutpoints(o, r, n, {
        sAngle: sAngle
    })
    line(ps, true)
}
//打点
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
//文字
var text = function (text, p) {
    ctx.fillStyle = "#000";
    ctx.font = "8px Verdana";
    ctx.fillText(text, p[0], p[1]);
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