//dotarray 点阵
import sort from './sort'

function _lattice({
    a,
    b
}) {
    let points = []
    for (let i = -1 * a; i < a; i++) {
        for (let j = -1 * b; j < b; j++) {
            points.push([i, j])
        }
    }
    return points
}
// {
//     width,
//     height
// },
//图形点阵
function latticepoints(options) {
    let {
        o = [0, 0],
            n = 3,
            r = 10
    } = options
    let points = []

    if (Array.isArray(n)) {
        points = _lattice({
            a: n[0],
            b: n[1] || n[0]
        }).map(t => [t[0] * r + o[0], t[1] * r + o[1]])
    } else {
        points = _lattice({
            a: n,
            b: n
        }).map(t => [t[0] * r + o[0], t[1] * r + o[1]])
    }

    if (options.sort &&
        sort[options.sort]) {
        points = sort[options.sort](points)
    }
    return points
}


// //图形点阵
// function lattice(canvas) {
//     let ctx = canvas.getContext("2d")
//     let cols = canvas.width;
//     let rows = canvas.height;
//     var imgData = ctx.getImageData(0, 0, cols, rows)
//     let data = imgData.data
//     // console.log(data)
//     var len = imgData.data.length;
//     var res = [];
//     for (var i = 0; i < rows; i++) {
//         for (var j = 0; j < cols; j++) {
//             var pos = (i * cols + j) * 4;
//             if (data[pos] > 0) {
//                 res.push([j, i])
//             }
//         }
//     }
//     return res
// }

export {
    latticepoints
    // ,
    // dots
}

// for (var i = 1; i <= rows; i++) {
//     for (var j = 1; j <= cols; j++) {
//         var pos = ((i - 1) * cols + (j)) * 4 - 1;
//         if (data.data[pos] > 0) {
//             // res += `<span class="black" style="left: ${j*10}px;top: ${i*10}px"></span>`
//             // res.push([j * 10, i * 10])
//             res.push([j , i ])
//         }
//     }
// }
// wrap.innerHTML = res;
// //获取图片像素点阵
// var canvas = document.createElement('canvas');
// var ctx = canvas.getContext('2d');
// var cols = 16;
// var rows = 16;

// function lattice(txt){
//     cols = txt.length * 16
//     canvas.width = cols;
//     canvas.height = rows;
//     ctx.clearRect(0,0,cols,rows);
//     ctx.font = "16px SimSun";
//     ctx.fillStyle = "#000";
//     ctx.fillText(txt, 0, 14);
//     var data = ctx.getImageData(0, 0, cols, rows)
//     var len = data.data.length;
//     var res = '';
//     for(var i = 1; i <= rows; i++){
//         for(var j = 1; j <= cols; j++){
//             var pos = (( i-1 )*cols+( j ))*4 -1;
//             if(data.data[pos] > 0){
//                 res += `<span class="black" style="left: ${j*10}px;top: ${i*10}px"></span>`
//             }
//         }
//     }
//     wrap.innerHTML = res;
// }
// function draw(){
//     var txt = text.value;
//     if(txt){
//         lattice(txt);
//     }
// }    
// draw();