var createSvgDom = function (tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag)
}
var svgWrappper = function (svgDom) {
    var svg = createSvgDom("svg")
    var options = {
        width: 640,
        height: 400
    }
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
//连字符
var hyphenate = function (str) {
    return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
};

//图形
var shape = function (tag, options) {
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


//原型
var circle = shape("circle", {
    cx: 100,
    cy: 50,
    r: 40,
    stroke: 'black',
    strokeWidth: 2,
    fill: 'red'
})
// <text x="200" y="20" font-size="20">SVG 华东地区手机12个月的数据 柱状图</text>

//文字
var text = shape("text", {
    x: 200,
    y: 20,
    fontSize: 20,
    text: ' 柱状图'
})

//矩形
var rect = shape("rect", {
    width: 100,
    height: 30,
    fill: 'rgb(0,0,255)',
    strokeWidth: 12,
    stroke: 'rgb(0, 0, 0)'
    // style: 'fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)'
})

//线条
//  <line x1="20" y1="380" x2="620" y2="380" stroke="black" stroke-width="1.5" />
var line = shape("line", {
    x1: 20,
    y1: 380,
    x2: 620,
    y2: 380,
    stroke: 'black',
    strokeWidth: 1.5
})

//线条
//  <line x1="20" y1="380" x2="20" y2="1" style="stroke: black; stroke-width: 1.5" />

var line2 = shape("line", {
    x1: 20,
    y1: 380,
    x2: 20,
    y2: 1,
    stroke: 'black',
    strokeWidth: 1.5
})

//路径
// <path d="M1 20 L20 1 L40 20 Z" style="stroke: black; stroke-width: 1" />
// <path d="M600 360 L620 380 L600 400 Z" style="stroke: black; stroke-width: 1" />
var path = shape("path", {
    d: "M1 20 L20 1 L40 20 Z",
    style: "stroke: black; stroke-width: 1"
})
//路径
var path2 = shape("path", {
    d: "M600 360 L620 380 L600 400 Z",
    style: "stroke: black; stroke-width: 1"
})


//画图
var draw = function (svgDom, options) {
    var svg = svgWrappper()
    document.body.appendChild(svg);
    if (!Array.isArray(svgDom)) {
        svgDom = [svgDom]
    }
    var options = options || {}

    svgDom.forEach(function (t, index) {
        if (options.delay) {
            setTimeout(function () {
                svg.appendChild(t)
            }, 1000 * index * options.delay)
        } else {
            svg.appendChild(t)
        }
    })
};


//极坐标图形表示
//polar  log
//     所以，将直角坐标（x，y）转为极坐标（r，θ）
// r = √( x2+y2)
// θ = tan-1 (y/x)

//直角坐标变极坐标
var toPolar = function (log) {
    var x = log.x,
        y = log.y
    return {
        r: Math.sqrt(x * x + y * y),
        a: Math.atan2(y, x)
    }
}
//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

console.log(toPolar({
    x: 100,
    y: 100
}))






// {
//     delay: 1
// }
// draw([circle, text, rect, line, line2, path, path2])



/**
 * Created by Wandergis on 2015/7/8.
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
 */

//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
function bd09togcj02(bd_lon, bd_lat) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02tobd09(lng, lat) {
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
}

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function wgs84togcj02(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat]
    }
}

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02towgs84(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        mglat = lat + dlat;
        mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat]
    }
}

function transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}

export {
    draw,
    circle,
    text,
    rect,
    line,
    line2,
    path,
    path2
}