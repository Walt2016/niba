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

//邻居互换  数组,固定序号
var neighborSwap = function (arr, index) {
    // arr.splice(1,1,arr[0])
    for (let i = 0; i < arr.length; i = i + 2) {
        arr.splice(i, 1, ...arr.splice(i + 1, 1, arr[i]))
    }
    return arr
    // 
    // let res = [];
    // // let fix = arr.splice(index, 1)[0];
    // // for (let i = 0; i < arr.length;  i++) {
    // for (let i = arr.length - 1; i >= 0; i--) {
    //     res.push(arr[i-1])
    //     arr.splice(i-1, 1);
    //     // let temp = arr[i];
    //     // arr[i] = arr[i + 1];
    //     // arr[i + 1] = temp;
    // }
    // // res.splice(index, 0, fix);
    // return res
}

//两个元素交换位置
function swapArr(arr, x, y) {
    // arr[x] = arr.splice(y, 1, arr[x])[0];
    arr.splice(x, 1, ...arr.splice(y, 1, arr[x]))
    return arr;
}

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


//兼容IE ，nodeList.forEach
var _forEach = function (arr, callback) {
    if (!arr) return;
    for (var i = 0; i < arr.length; i++) {
        callback(arr[i], i)
    }
};

export {
    _type,
    shuffle,
    neighborSwap,
    _forEach
}