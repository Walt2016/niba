//顶点 vertices
//分割点
// 参数：[x,y],[r1,r2],n
//半径 r,r1~r2  , [r1,r2,r3]
//optionsions{o:[xy],r:[r1,r2],n:n,rn:"random"}
//regular, direction, sAngle
//分割圆弧
var cutpoints = function (options) {
    let {
        o,
        r,
        n,
        sAngle = 0,
        direction,
        regular = true
    } = options
    // o = o || center
    var arr = [],
        a;
    // var options = options || {};
    // var sAngle = options.sAngle || 0;
    // var direction = options.direction;
    // var regular = options.regular == null ? true : options.regular;

    var _cut = function (o, r, n, i, regular, direction) {
        if (regular) {
            if (direction === "top") {
                a = 1.25 * Math.PI + 0.5 * Math.PI * i / n
            } else {
                a = i * 2 * Math.PI / n + (sAngle / 2 * Math.PI) //等角
            }
        } else { //随机角
            if (direction === "top") {
                a = 1.25 * Math.PI + 0.5 * Math.PI * Math.random()
            } else if (direction === "outter") {
                a = 1 * Math.PI * Math.random()
            } else {
                a = 2 * Math.PI * Math.random()
            }
        }
        arr[i] = [o[0] + r * Math.cos(a), o[1] + r * Math.sin(a)]
    }

    if (Array.isArray(r)) {
        var len = r.length
        for (var i = 0; i < n; i++) {
            var rn = r[i % len]
            _cut(o, rn, n, i, regular, direction)
        }
    } else if (/~/.test(r)) {
        var rs = r.split("~").map(function (t) {
            return +t
        })
        for (var i = 0; i < n; i++) {
            var rn = rs[0] + (rs[1] - rs[0]) * Math.random();
            _cut(o, rn, n, i, regular, direction)
        }
    } else {
        for (var i = 0; i < n; i++) {
            _cut(o, r, n, i, regular, direction)
        }
    }

    return arr
}

//距离 distance
var dis = function (p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
};
//中心点
var mid = function (p1, p2) {
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]
}
//均分点meanSplit。分割n次，分割成n+1段
//分割直线
var split = function (p1, p2, n) {
    var ps = [];
    for (var i = 1; i <= n; i++)
        ps[ps.length] = this.toV(p).scale(i / (n + 1)).toP(this);
    return ps;
}

export {
    cutpoints,
    dis,
    mid,
    split
}