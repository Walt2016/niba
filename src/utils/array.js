//数组排序工具

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

