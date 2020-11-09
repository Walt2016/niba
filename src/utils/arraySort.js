
//两个元素交换位置
const swapArr = (arr, x, y) => {
    // arr[x] = arr.splice(y, 1, arr[x])[0];
    arr.splice(x, 1, ...arr.splice(y, 1, arr[x]))
    return arr;
}
//从第几个开始重新编号
const newSeq = (arr, index) => {
    arr.splice(0, 0, ...arr.splice(index, arr.length - index))
    return arr
}


//邻居互换  数组,固定序号
const neighborSwap = (arr, index) => {
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
const intervalSort = (arr, index) => {
    if (index !== undefined) {
        newSeq(arr, index)
    }
    for (let i = 0; i < arr.length - 2; i++) {
        swapArr(arr, i + 1, i + 2)
    }
    return arr
}

//错位排序
const misplaced = (arr) => {
    for (let i = 0; i < arr.length / 2 + 1; i++) {
        var cur = arr.pop();
        arr.splice(i * 2 + 1, 0, cur)
    }
    return arr
}

//奇偶数排序oddEvenSort
function paritySort(arr) {
    let seq = arr.map((t, i) => {
        return i
    })

    seq = seq.sort((a, b) => {
        if (a % 2 === 0) {
            if (b % 2 !== 0) {
                return -1;
            }
            return 0;
        } else {
            return 1
        }
    })
    console.log(seq)

    return seq.map(t => {
        return arr[t]
    })
}


//数组乱序 random
const shuffle = (arr, index) => {
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


export default {
    neighborSwap,
    intervalSort,
    misplaced,
    paritySort,
    shuffle
}