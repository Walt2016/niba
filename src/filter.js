//反色
function reverse(canvas) {
    let ctx = canvas.getContext("2d")
    let cols = canvas.width;
    let rows = canvas.height;
    let imgData = ctx.getImageData(0, 0, cols, rows)
    let data = imgData.data
    var len = imgData.data.length;
    for (var i = 0; i < len; i += 4) {
        let r = data[i],
            g = data[i + 1],
            b = data[i + 2]

        data[i] = 255 - r;
        data[i + 1] = 255 - g;
        data[i + 2] = 255 - b;
        data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
}

//灰色
//  newr = (r * 0.272) + (g * 0.534) + (b * 0.131);
//  newg = (r * 0.349) + (g * 0.686) + (b * 0.168);
//  newb = (r * 0.393) + (g * 0.769) + (b * 0.189);

function gray(canvas) {
    let ctx = canvas.getContext("2d")
    let cols = canvas.width;
    let rows = canvas.height;
    let imgData = ctx.getImageData(0, 0, cols, rows)
    let data = imgData.data
    var len = imgData.data.length;
    for (var i = 0; i < len; i += 4) {
        // var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        // data[i] = avg;
        // data[i + 1] = avg;
        // data[i + 2] = avg;
        let r = data[i],
            g = data[i + 1],
            b = data[i + 2]

        data[i] = (r * 0.272) + (g * 0.534) + (b * 0.131);
        data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
        data[i + 2] = (r * 0.393) + (g * 0.769) + (b * 0.189);
    }
    ctx.putImageData(imgData, 0, 0);
}


/**
	 * deep clone image data of canvas
	 * 
	 * @param context
	 * @param src
	 * @returns
	 */
	var copyImageData= function(context, src)
	{
	    var dst = context.createImageData(src.width, src.height);
	    dst.data.set(src.data);
	    return dst;
	}
/**
 * after pixel value - before pixel value + 128
 * 浮雕效果
 */
var relief = function (canvas) { //context, canvasData
    let ctx = canvas.getContext("2d")
    let cols = canvas.width;
    let rows = canvas.height;
    let imgData = ctx.getImageData(0, 0, cols, rows)
    let data = imgData.data
    console.log("Canvas Filter - relief process");
    var tempCanvasData = copyImageData(ctx, imgData);
    for (var x = 1; x < tempCanvasData.width - 1; x++) {
        for (var y = 1; y < tempCanvasData.height - 1; y++) {

            // Index of the pixel in the array    
            var idx = (x + y * tempCanvasData.width) * 4;
            var bidx = ((x - 1) + y * tempCanvasData.width) * 4;
            var aidx = ((x + 1) + y * tempCanvasData.width) * 4;

            // calculate new RGB value
            var nr = tempCanvasData.data[aidx + 0] - tempCanvasData.data[bidx + 0] + 128;
            var ng = tempCanvasData.data[aidx + 1] - tempCanvasData.data[bidx + 1] + 128;
            var nb = tempCanvasData.data[aidx + 2] - tempCanvasData.data[bidx + 2] + 128;
            nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
            ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
            nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);

            // assign new pixel value    
            imgData.data[idx + 0] = nr; // Red channel    
            imgData.data[idx + 1] = ng; // Green channel    
            imgData.data[idx + 2] = nb; // Blue channel    
            imgData.data[idx + 3] = 255; // Alpha channel    
        }
    }
}

export default {
    reverse,
    gray,
    relief
}