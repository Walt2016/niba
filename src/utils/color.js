import _ from './index'
const rgbaWrapper = (rgbaArr) => { //[1,1,1,1]
    return (rgbaArr.length === 4 ? 'rgba(' : 'rgb(') + rgbaArr + ')'
}

//色相环
const colorCircle = (len, alpha = 1) => {
    var a = 0,
        step = 360 / len,
        arr = [],
        r, g, b;
    for (var i = 0; i < len; i++) {
        a += step
        r = _.cos(a) * 127 + 128 << 0;
        g = _.cos(a + 120) * 127 + 128 << 0;
        b = _.cos(a + 240) * 127 + 128 << 0;
        arr[arr.length] = rgbaWrapper(_.isUndefined(alpha) ? [r, g, b] : [r, g, b, alpha]);
    }
    return arr;
}

export default {
    colorCircle
}