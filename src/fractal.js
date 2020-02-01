import {
    cutpoints
} from './points'

//分叉 
//分形fractal;
var branch = function (options, callback) {
    let {
        o,
        r,
        d = 'top',
        level = 3
    } = options
    options.level = level
    options.d = d
    // var level = level || 6;
    // var _this = this;
    var _branch = function (options) {
        let {
            o,
            r,
            d,
            level
        } = options

        if (level-- === 0) {
            return
        }
        options.level = level
        // shape(options)
        if (callback) {
            let points = callback(options)
            points.forEach(t => {
                _branch(
                    Object.assign(options, {
                        o: t,
                        level
                    })
                )
            })

        }
        // callback && callback(options)
        // r = r * 0.9
        // var ps = cutpoints(o, r, 2, {
        //     regular: false,
        //     direction: d
        // })
        // let ponits = cutpoints(Object.assign(options, {
        //     r: r * 0.9,
        //     regular: false,
        //     direction: d,
        //     level
        // }))
        // _this.ray(o, ps)

        // ponits.forEach(function (t) {
        //     // _branch(t, r, d, level)
        //     _branch(options,{
        //         o:t
        //     })
        // })
    }
    _branch(options)
}

export default {
    branch
}