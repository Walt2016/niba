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

export {
    _type,
    _sin,
    _cos,
    _polar,
    _mid,

    splitWords,
    camelCase,
    kebab
}