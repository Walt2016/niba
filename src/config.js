function getObjXy(obj) {
    var xy = obj.getBoundingClientRect();
    var top = xy.top - document.documentElement.clientTop + document.documentElement.scrollTop, //document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
        bottom = xy.bottom,
        left = xy.left - document.documentElement.clientLeft + document.documentElement.scrollLeft, //document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
        right = xy.right,
        width = xy.width || right - left, //IE67不存在width 使用right - left获得
        height = xy.height || bottom - top;

    return {
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        width: width,
        height: height
    }
}

let env = (function () {
    let wrap = document.querySelector("#svg-container")
    var width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth || 640;
    var height = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 400;


    // wrap.style.width = "calc(100% - 250px)"
    // wrap.style.height = height+'px'

    let xy = getObjXy(wrap)

    // wrap.setAttribute()
    // debugger


    return {
        width,
        height,
        cx: width / 2,
        cy: height / 2,
        ...xy
    }
}())
let center = [env.cx, env.cy];
let words = ['stroke', 'fill', 'width'];

export default {
    env,
    center,
    words
}