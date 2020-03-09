//文字图形

var width, height
var gap = 6 //间距
//二维数组
function loop(handleCell, handleRow) {
    // let 
    for (var x = 0; x < width; x += gap) {
        for (var y = 0; y < height; y += gap) {
            handleCell && handleCell(x, y)
        }
        handleRow && handleRow(x, y)
    }
    // for (var y = 0; y < height; y += gap) {
    //     for (var x = 0; x < width; x += gap) {
    //         handleCell && handleCell(x, y)
    //     }
    //     handleRow && handleRow(x, y)
    // }
}
//图形点阵
function pixel(options) { //canvas,gap
    let {
        canvas,
        gap = 6 //采样间隙
    } = options
    let ctx = canvas.getContext("2d")
    let cols = width = canvas.width;
    let rows = height = canvas.height;
    // fill({color:"rgb(255,0,0)"})
    var imgData = ctx.getImageData(0, 0, cols, rows)
    let data = imgData.data
    // console.log(data)
    var len = imgData.data.length;
    var points = [];
    // //rgba
    for (var i = 0; i < rows; i += gap) {
        for (var j = 0; j < cols; j += gap) {
            var pos = (i * cols + j) * 4;
            // 判断像素点是不是红色
            if (data[pos] == 255 && data[pos + 1] == 0 && data[pos + 2] == 0 && data[pos + 3] == 255) {
                // var dot = new Dot(x, y);
                points.push([j / gap, i / gap])
                // points.push([i, j])
            }
        }
    }
    console.log(points)
    return points
}


function _style() {
    let style = document.createElement('style')
    // style.setAttribute('id', id)
    style.innerText = ".pre{position:relative;}.black{outline: 1px solid #000;width: 20px;height: 20px;position:absolute;}.black:hover{background:#ccc}"
    document.head.appendChild(style)
}

function _div(points) {
    _style()
    let div = document.createElement("div");
    div.className = "pre"
    points = points.map(t => t.toString())
    let str = ""
    let gap = 1
    for (let i = 0; i < width; i += gap) {
        for (let j = 0; j < height; j += gap) {
            // str += " "
            if (points.indexOf([i, j].toString()) >= 0) {
                // str += "1"
                str += `<span class="black" style="left: ${j*10}px;top: ${i*10}px"></span>`
            }
        }
        str += "\n"
    }
    div.innerHTML = str
    document.body.appendChild(div)
}



function _pre(points) {
    let pre = document.createElement("pre");
    points = points.map(t => t.toString())
    let str = ""
    let gap = 1
    // loop((x, y) => {
    //     str += " "
    //     if (points.indexOf([x, y].toString()) >= 0) {
    //         str += "1"
    //     }
    //     // if (points.indexOf([y, x].toString()) >= 0) {
    //     //     str += "1"
    //     // }

    // }, (x, y) => {
    //     str += "\n"
    // })
    for (let i = 0; i < width; i += gap) {
        for (let j = 0; j < height; j += gap) {
            str += " "
            if (points.indexOf([i, j].toString()) >= 0) {
                str += "1"
            }
        }
        str += "\n"
    }
    pre.innerHTML = str
    document.body.appendChild(pre)
}

export {
    pixel,
    _pre,
    _div
}