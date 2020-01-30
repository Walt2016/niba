//数组排序工具



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


//错位排序
function misplacedSort(arr) {
    for (let i = 0; i < arr.length / 2 + 1; i++) {
        var cur = arr.pop();
        arr.splice(i * 2 + 1, 0, cur)
    }
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


export {
    shuffle,
    neighborSwap,
    intervalSort,
    misplacedSort,
}