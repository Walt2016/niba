//类型判断
const _type = (o) => {
    if (o === null) return 'null';
    if (o === undefined) return 'undefined'; //兼容ie8
    var s = Object.prototype.toString.call(o);
    var t = s.match(/\[object (.*?)\]/)[1].toLowerCase();
    return t === 'number' ? isNaN(o) ? 'nan' : !isFinite(o) ? 'infinity' : t : t;
}
const isUndefined = (o) => {
    _type(o) === 'undefined'
}
export default {
    _type,
    isUndefined
}