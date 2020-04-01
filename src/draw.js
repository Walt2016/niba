import config from './config'
import {
    _type,
} from './utils'

import filter from './filter'
import {
    latticepoints,
    dots
} from './lattice'
// import color from './color'
// import fractal from './fractal'
import {
    pixel,
    _pre,
    _div
} from './charactergraphics'

import {
    Ball,
    Polygon,
    BaseEntity,
    Rect,
    FoldLine,
    Ray,
    Text,
    Arc
} from './entity'
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
    return {
        ctx,
        canvas,
        width,
        height
    }
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

// function setup() {
//     canvas = document.querySelector("#canvas");
//     ctx = canvas.getContext("2d");
//     window.addEventListener("resize", resize);
//     canvas.addEventListener("click", draw);
//     resize();
//   }

//   function resize() {
//     w = canvas.width = window.innerWidth;
//     h = canvas.height = window.innerHeight;
//     ctx.fillStyle = "black";
//     ctx.lineWidth = config.lineWidth;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     draw();
//   }

var clear = function () {
    ctx.clearRect(0, 0, width, height);
};

function fill({
    color
}) {
    ctx.fillStyle = color
    ctx.rect(0, 0, width, height)
    ctx.fill();
}

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




//点阵
var lattice = function (options) {
    let points = latticepoints(options)
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
                o: center,
                // x: center[0],
                // y: 20,
                // fontSize: 20,
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
        case 'lattice':
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
            options = new Circle(options);
            break;
        case 'text':
            options =new  Text(options);
            // console.log(options)
            break;
        case 'polygon':
            options =new Polygon(options);
            break;
        case 'ray':
            options = new Ray(options);
            break;
        case 'arc':
            options =new  Arc(options);
            break;
        case 'rect':
            options =new  Rect(options);
            break;
        case 'lattice':
            options = lattice(options)
            break;
    }
    // console.log(options)
    return options
}


//滤镜
function doFilter(t, options) {
    if (t === 'lattice') {
        let points = pixel({
            canvas,
            gap: 6
        })
        console.log(points)
        clear()
        // let colors = color.circle(points.length)
        let balls = []
        let stricks = []
        points.forEach((t, i) => {
            // balls.push(new Ball(...[t[0] * 3, t[1] * 6]))
            balls.push(new Ball({
                o: [t[0] * 3, t[1] * 6]
            }))
            // stricks.push(new Stick({
            //     o: [t[0] * 3, t[1] * 6]
            // }))


            let opt = Object.assign(options, {
                o: [t[0] * 3, t[1] * 6], // t.map(t=>[t[0]*8,t[1]*2]),
                shape: 'circle',
                r: 2,
                color: '#000'
                // color: colors[i] // hsla()
            })
            // if (i % 100 == 0) {
            //     circle(opt)
            // }

            ctx.beginPath();
            circle(opt)
            // ctx.arc(t[0], t[1], 2, 0, 2 * Math.PI);
            ctx.fill();

        })
        // _pre(points)
        // _div(points)
        animate(balls)
        // animate(stricks)
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
    // let len = fractal.stat(level, n)
    // console.log(len)
    // // let colors = color.circle(len)
    // // options.colors = colors
    // // options.index = 0
    // let index = 0
    // fractal[t](options, function (options) {
    //     // options.index++
    //     index++
    //     Object.assign(options, {
    //         index
    //     })
    //     return shape(options.shape, options)
    // })
}

function figure(options) {

    if (options.points) {
        let {
            points
        } = new Seg[options.points.layout](options.points)
    }



    // let {
    //     colors
    // } = new Colors({
    //     color: 'colorful',
    //     n: 100
    // })
    let entities = []
    points.forEach((t, i) => {
        entities[entities.length] = new entity[o.shape](
            Object.assign(options, {
                o: t,
                r: 2,
                n: 5,
                // color:'red',
                // color: colors[i % 10]

                // animate:'move2'
            })
        )


    })
}


//画图
var draw = function (arr, options) {
    console.log(arr)
    arr.forEach(t => {
        // console.log(t, options)
        if (t instanceof BaseEntity) {
            t.drawController(ctx)
            t.draw(ctx)
        } else {

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

        }


    })
}

//动画
let anime = (figures, options) => {
    setInterval(() => {
        clear()
        figures = figures.map(t => {
            let {
                sign = 1
            } = t
            let {
                prop,
                range = [0, 0],
                speed,
                act
            } = Object.assign({}, t.anime, options)
            if (t[prop] > range[1]) {
                t.sign = -1
            } else if (t[prop] < range[0]) {
                t.sign = 1
            }
            t[prop] = t[prop] + sign * speed
            return t
        })

        draw(figures)
    }, 17);

}

//光影动画
function animate(balls) {
    (function _inner() {
        ctx.fillStyle = 'rgba(0,0,0, .08)';
        ctx.fillRect(0, 0, width, height);
        balls.forEach(t => {
            t.update();
            t.draw(ctx);
            // shape("circle", {r:2,color:"red",o:[t.x,t.y]})
        })
        requestAnimationFrame(_inner);
    })()
}

export {
    setup,
    draw,
    shape,
    clear,
    anime,
    animate
}