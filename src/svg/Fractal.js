import _ from '../utils/index'
import MidSeg from '../points/MidSeg'
import {
    ArcSeg
} from '../points'
export default class Fractal {
    constructor(draw, options) {
        this.draw = draw
        Object.assign(options, {
            fractalOffset: 0,
            fractalTimerDelay: 500
        }, {
            ...options,
            fractalLevel: options.fractalLevel - 1
        })

        let {
            fractalLevel,
            fractalOffset = 0,
            fractalTimerUse,
            fractalTimerDelay = 500,
            fractalColorful,
            _points: points,
            _colors: colors,
            fractalType
        } = options


        if (fractalColorful && colors) {
            let color = colors[fractalLevel % colors.length]
            Object.assign(options, {
                color,
                fill: color,
                'stroke-color': color
            })
        }
        let fn = this['_' + fractalType]
        if (fn) {
            fractalTimerUse ? setTimeout(() => {
                fn.call(this, options)
            }, fractalLevel * fractalTimerDelay) : fn.call(this, options)
        }
    }
    // 边镜像
    _edgeMirror(options) {
        let {
            fractalLevel,
            _points: points
        } = options
        let midPoints = _.mid2(points)
        midPoints.forEach(t => {
            let mirrorPoints = _.mirror2(points, t)
            this.draw(Object.assign({}, options, {
                _points: mirrorPoints,
                fractalLevel,
                fractalUse: fractalLevel > 1
            }))
        })
    }
    // 顶点镜像
    _vertexMirror(options) {
        let {
            fractalLevel,
            _points: points
        } = options

        points.forEach(t => {
            let mirrorPoints = _.mirror2(points, t)
            this.draw(Object.assign({}, options, {
                _points: mirrorPoints,
                fractalLevel,
                fractalUse: fractalLevel > 1
            }))
        })


    }
    _radiusRatio(options) {
        let {
            fractalLevel,
            fractalOffset,
            _points: points,
            curveRadiusRatio
        } = options
        fractalLevel = fractalLevel - 1
        curveRadiusRatio -= fractalOffset * fractalLevel
        this.draw(Object.assign({}, options, {
            _points: points,
            curveRadiusRatio,
            fractalLevel,
            fractalUse: fractalLevel > 1
        }))

    }
    _midSeg(options) {
        // debugger
        let {
            fractalLevel,
            fractalOffset,
            _points: points
        } = options
        // fractalLevel = fractalLevel - 1
        let midseg = new MidSeg({
            points,
            offset: fractalOffset
        })
        this.draw(Object.assign({}, options, {
            _points: midseg.points,
            fractalLevel,
            fractalUse: fractalLevel > 1,
            r: _.dis(midseg.points[0], options.o)
        }))
    }
    _zoom(options) {
        let {
            fractalLevel,
            fractalOffset,
            _points: points
        } = options
        this.draw(Object.assign({}, options, {
            _points: points,
            fractalLevel,
            fractalUse: fractalLevel > 1,
            transform: `scale(${fractalOffset* (fractalLevel+1) },${fractalOffset*(fractalLevel+1)})`
        }))
    }
    _scale(options) {
        let {
            fractalLevel,
            fractalOffset
        } = options
        let r = options.r * Math.pow(fractalOffset, fractalLevel)
        let seg = new ArcSeg({
            ...options,
            r,
        })
        this.draw(Object.assign({}, options, {
            _points: seg.points,
            fractalLevel,
            fractalUse: fractalLevel > 1,
        }))

    }
    _rotate(options) {
        let {
            fractalLevel,
            fractalOffset
        } = options
        let seg = new ArcSeg({
            ...options,
            angle: options.angle + fractalOffset
        })
        this.draw(Object.assign({}, options, {
            _points: seg.points,
            angle: options.angle + fractalOffset,
            fractalLevel,
            fractalUse: fractalLevel > 1,
        }))
    }
    _reproduce(options) {
        let {
            fractalLevel,
            fractalOffset,
            fractalTimerUse,
            fractalTimerDelay,
            _points: points
        } = options

        points.forEach((t, index) => {
            let fn = () => {
                let o = t
                let r = options.r * Math.pow(fractalOffset, fractalLevel)
                let seg = new ArcSeg({
                    ...options,
                    o,
                    r
                })
                this.draw(Object.assign({}, options, {
                    o,
                    r,
                    _points: seg.points,
                    fractalLevel,
                    fractalUse: fractalLevel > 1
                }))
            }
            fractalTimerUse ? setTimeout(fn, fractalLevel * fractalTimerDelay * (index + 1)) : fn()
        })

    }
    _tree(options) {
        let {
            fractalLevel,
            fractalOffset,
            fractalTimerUse,
            fractalTimerDelay,
            _points: points
        } = options
        points.forEach((t, index) => {
            let fn = () => {
                let o = t
                let r = options.r * Math.pow(fractalOffset, fractalLevel)
                let seg = new ArcSeg({
                    ...options,
                    o,
                    r
                })
                this.draw(Object.assign({}, options, {
                    o,
                    r,
                    _points: seg.points.slice(0, 3),
                    fractalLevel,
                    fractalUse: fractalLevel > 1
                }))
            }
            fractalTimerUse ? setTimeout(fn, fractalLevel * fractalTimerDelay * (index + 1)) : fn()
        })
    }

}