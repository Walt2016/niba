import config from './config'
//类型判断
const _type = function (o) {
    if (o === null) return 'null';
    if (o === undefined) return 'undefined'; //兼容ie8
    var s = Object.prototype.toString.call(o);
    var t = s.match(/\[object (.*?)\]/)[1].toLowerCase();
    return t === 'number' ? isNaN(o) ? 'nan' : !isFinite(o) ? 'infinity' : t : t;
}

// 角度转弧度
function _sin(a = 0) {
    return Math.sin(a * Math.PI / 180)
}

function _cos(a = 0) {
    return Math.cos(a * Math.PI / 180)
}

// 极坐标
function _polar(o = [0, 0], r = 0, a = 0) {
    return [o[0] + r * _cos(a), o[1] + r * _sin(a)]
}
// 中点
function _mid(p1 = [0, 0], p2 = [0, 0]) {
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]
}
// 距离
function _dis(p1 = [0, 0], p2 = [0, 0]) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]))
}
// 夹角
function _atan(p1 = [0, 0], p2 = [0, 0]) {
    return Math.atan2(p2[1] - p1[1],p2[0] - p1[0]) * 180 / Math.PI
}
// // 方向
// function _dir(p1 = [0, 0], p2 = [0, 0]) {
//     var x = Math.abs(p1[0] - p2[0]);
//     var y = Math.abs(p1[1] - p2[1]);
//     var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
//     var cos = y / z;
//     var radina = Math.acos(cos); //用反三角函数求弧度
//     var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度

//     if (p2[0] > p1[0] && p2[1] > p1[1]) { //鼠标在第四象限
//         angle = 180 - angle;
//     }

//     if (p2[0] == p1[0] && p2[1] > p1[1]) { //鼠标在y轴负方向上
//         angle = 180;
//     }

//     if (p2[0] > p1[0] && p2[1] == p1[1]) { //鼠标在x轴正方向上
//         angle = 90;
//     }

//     if (p2[0] < p1[0] && p2[1] > p1[1]) { //鼠标在第三象限
//         angle = 180 + angle;
//     }

//     if (p2[0] < p1[0] && p2[1] == p1[1]) { //鼠标在x轴负方向
//         angle = 270;
//     }

//     if (p2[0] < p1[0] && p2[1] < p1[1]) { //鼠标在第二象限
//         angle = 360 - angle;
//     }



//     return angle;
// }
//均分点meanSplit。分割n次，分割成n+1段
//分割直线
function split(p1, p2, n) {
    var ps = [];
    for (var i = 1; i <= n; i++)
        ps[ps.length] = this.toV(p).scale(i / (n + 1)).toP(this);
    return ps;
}

//判断对象是否有属性 ，忽略大小写
function hasProp(obj, key, ignoreCase) {
    if (ignoreCase) {
        key = key.toLowerCase()
        for (let k in obj) {
            if (k.toLowerCase() == key) {
                return true
            }
        }
    } else {
        return Object.hasOwnProperty.call(obj, key)
    }
}
//获取对象的值  ，忽略大小写
function getValue(obj, key, ignoreCase) {
    if (ignoreCase) {
        key = key.toLowerCase()
        for (let k in obj) {
            if (k.toLowerCase() == key) {
                return obj[k]
            }
        }
    } else {
        return obj[key]
    }
}
//按长度排序
function sortByLen(arr) {
    return arr.map(i => ({
            raw: i,
            len: i.length
        }))
        .sort((p, n) => n.len - p.len)
        .map(i => i.raw)
}
let words = config.words ? sortByLen(config.words) : []
var wordsReg = words.length > 0 ? RegExp(words.join("|"), 'i') : RegExp(/\w+/, 'i')


//切分原则，比对最长的单词，剩余的可递归
function splitWords(t) {
    if (!t) return []
    if (config.splitWords && hasProp(config.splitWords, t, true)) {
        return getValue(config.splitWords, t, true)
    }
    // console.log(t)
    var m = t.match(wordsReg)
    if (m) {
        var arr = []
        var index = m.index
        var word = m[0]
        var last = ""
        if (word == t) {
            return arr.concat([word])
        } else {
            if (index == 0) {
                arr.push(word);
                last = t.slice(word.length)
            } else {
                arr.push(t.slice(0, index))
                last = t.slice(index)
            }
            return arr.concat(splitWords(last))
        }
    }
    return [t]
}

//首字母大写
function firstCapital(t) {
    return t.slice(0, 1).toUpperCase() + t.slice(1)
}

//小驼峰
function camelCase(ggname) {
    if (!ggname) return ""
    if (config.camelCase) {
        let _gg = config.camelCase.filter(t => t.toLowerCase() == ggname.toLowerCase())[0]
        if (_gg) {
            return _gg
        }
    }
    return splitWords(ggname).map((t, i) => {
        if (i == 0) {
            return t.slice(0, 1).toLowerCase() + t.slice(1)
        }
        return t.slice(0, 1).toUpperCase() + t.slice(1)
    }).join("")
}

//中划线 短横
function kebab(ggname) {
    return splitWords(ggname.toLowerCase()).join("-")
}

function _pos(e, canvas) {
    let x = e.clientX,
        y = e.clientY
    var canvasBox = canvas.getBoundingClientRect(); //获取canvas元素的边界框
    return [(x - canvasBox.left) * (canvas.width / canvasBox.width), (y - canvasBox.top) * (canvas.height / canvasBox.height)]
}

export {
    _type,
    _sin,
    _cos,
    _polar,
    _mid,
    _dis,
    _atan,
    _pos,

    splitWords,
    camelCase,
    kebab
}