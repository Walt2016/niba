//分叉 
//分形fractal;
var branch = function (options, callback) {
    let {
        level = 3
    } = options
    options.level = level
    var _branch = function (options) {
        let {
            level
        } = options
        if (level-- <= 0) {
            return
        }
        options.level = level
        if (callback) {
            options = callback(options)
            let points = options.points
            points.forEach(t => {
                _branch(
                    Object.assign(options, {
                        o: t,
                        level
                    })
                )
            })
        }
    }
    _branch(options)
}

//统计图形个数
// level2=  1+n
// 3= 1+  n+  n*n  
//4= 1+n+n*n+ n*n*n
var stat = function (level, n) {
    let total = 0
    while (level-- > 0) {
        total += Math.pow(n, level)
    }
    return total
}

export default {
    branch,
    stat
}