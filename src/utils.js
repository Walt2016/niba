import config from './config'
//类型判断
const _type = function (o) {
    if (o === null) return 'null';
    if (o === undefined) return 'undefined'; //兼容ie8
    var s = Object.prototype.toString.call(o);
    var t = s.match(/\[object (.*?)\]/)[1].toLowerCase();
    return t === 'number' ? isNaN(o) ? 'nan' : !isFinite(o) ? 'infinity' : t : t;
}

//数组乱序
var shuffle = function (arr, index) {
    if (index === undefined) {
        for (let i = arr.length - 1; i >= 0; i--) {
            let rIndex = Math.floor(Math.random() * (i + 1));
            // 打印交换值
            // console.log(i, rIndex);
            let temp = arr[rIndex];
            arr[rIndex] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    let res = [];
    // 取出固定值
    let fix = arr.splice(index, 1)[0];
    for (let i = arr.length - 1; i >= 0; i--) {
        let rIndex = Math.floor(Math.random() * (i + 1));
        res.push(arr[rIndex]);
        arr.splice(rIndex, 1);
    }
    // 将固定值放入指定位置
    res.splice(index, 0, fix);
    return res;
}


//两个元素交换位置
function swapArr(arr, x, y) {
    // arr[x] = arr.splice(y, 1, arr[x])[0];
    arr.splice(x, 1, ...arr.splice(y, 1, arr[x]))
    return arr;
}

//邻居互换  数组,固定序号
var neighborSwap = function (arr, index) {
    if (index === undefined) {
        for (let i = 0; i < arr.length; i = i + 2) {
            swapArr(arr, i, i + 1)
        }
        return arr
    } else {
        let fix = arr.splice(index, 1)[0];
        for (let i = 0; i < arr.length; i = i + 2) {
            swapArr(arr, i, i + 1)
        }
        arr.splice(index, 0, fix);
        return arr
    }
}
//隔位重排
function intervalSort(arr, index) {
    if (index !== undefined) {
        newSeq(arr, index)
    }
    for (let i = 0; i < arr.length - 2; i++) {
        swapArr(arr, i + 1, i + 2)
    }
    return arr
}

//从第几个开始重新编号
function newSeq(arr, index) {
    arr.splice(0, 0, ...arr.splice(index, arr.length - index))
    return arr
}

// console.log(newSeq([1, 2, 3, 4, 5], 1))

//数组每隔n位截取一次
function chunk(arr, num) {
    let j = 0,
        o = j;
    let newArray = [];
    while (j < arr.length) {
        j += num;
        newArray.push([arr.slice(o, j)]);
        o = j;
    }
    return newArray;
}


// console.log(intervalSort([0, 1, 2, 3, 4]))




//置顶移动
function toFirst(fieldData, index) {
    if (index != 0) {
        // fieldData[index] = fieldData.splice(0, 1, fieldData[index])[0]; 这种方法是与另一个元素交换了位子，
        fieldData.unshift(fieldData.splice(index, 1)[0]);
    }
}


// 3:up 上移动一格
function upGo(fieldData, index) {
    if (index != 0) {
        fieldData[index] = fieldData.splice(index - 1, 1, fieldData[index])[0];
    } else {
        fieldData.push(fieldData.shift());
    }
}

// down 下移动一格
function downGo(fieldData, index) {
    if (index != fieldData.length - 1) {
        fieldData[index] = fieldData.splice(index + 1, 1, fieldData[index])[0];
    } else {
        fieldData.unshift(fieldData.splice(index, 1)[0]);
    }
}


//冒泡排序
var bubleSort = function (arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
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
    shuffle,
    neighborSwap,
    intervalSort,
    splitWords,
    camelCase,
    kebab
}