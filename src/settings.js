


let wrapperOptions = (function () {
    var width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth || 640;
    var height = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 400;
    return {
        width,
        height,
        cx: width / 2,
        cy: height / 2
    }
}())
let center = [wrapperOptions.cx, wrapperOptions.cy];
let words = ['stroke', 'fill', 'width'];

export {
    wrapperOptions,
    center
}