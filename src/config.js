


let env = (function () {
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
let center = [env.cx, env.cy];
let words = ['stroke', 'fill', 'width'];

export default {
    env,
    center,
    words
}