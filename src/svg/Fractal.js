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
        // fractalLevel = fractalLevel - 1
        // let points = options._points || []
        if (fractalColorful && colors) {
            let color = colors[fractalLevel % colors.length]
            Object.assign(options, {
                color,
                fill: color,
                'stroke-color': color
            })
        }
        let fn = this['_' + fractalType]
        // this['_' + fractalType] && this['_' + fractalType](options)
        fractalTimerUse ? setTimeout(() => {
            fn.call(this, options)
        }, fractalLevel * fractalTimerDelay) : fn.call(this, options)

    }
    _midSeg(options) {
        // debugger
        let {
            fractalLevel,
            fractalOffset,
            fractalTimerUse,
            fractalTimerDelay,
            fractalColorful,
            _points: points,
            fractalType
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
            fractalTimerUse,
            fractalTimerDelay,
            fractalColorful,
            _points: points,
            fractalType
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
            fractalOffset,
            fractalTimerUse,
            fractalTimerDelay,
            fractalColorful,
            _points: points,
            fractalType
        } = options
        let r = options.r * Math.pow(fractalOffset, fractalLevel)
        let seg = new ArcSeg({
            ...options,
            r,
        })
        this.draw(Object.assign({}, options, {
            _points: seg.points,
            // _points: options._seg({
            //     ...options,
            //     r
            // }),
            fractalLevel,
            fractalUse: fractalLevel > 1,
        }))

    }
    _rotate(options) {
        let {
            fractalLevel,
            fractalOffset,
            fractalTimerUse,
            fractalTimerDelay,
            fractalColorful,
            _points: points,
            fractalType
        } = options
        // let r = options.r * Math.pow(fractalOffset, fractalLevel)
        let seg = new ArcSeg({
            ...options,
            angle: options.angle + fractalOffset
            // r,
        })
        this.draw(Object.assign({}, options, {
            _points: seg.points,
            // _points: options._seg({
            //     ...options,
            //     r
            // }),
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
            fractalColorful,
            _points: points,
            fractalType
        } = options

        points.forEach((t, index) => {
            let fn = () => {
                let o = t
                let r = options.r * Math.pow(fractalOffset, fractalLevel)
                let seg = new ArcSeg({
                    ...options,
                    o,
                    r,
                    // n: options.n
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
            fractalColorful,
            _points: points,
            fractalType
        } = options
        points.forEach((t, index) => {
            let fn = () => {
                let o = t
                let r = options.r * Math.pow(fractalOffset, fractalLevel)
                let seg = new ArcSeg({
                    ...options,
                    o,
                    r,
                    // n: options.n
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