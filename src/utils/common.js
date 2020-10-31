//首字母大写
const firstCapital = (t) => {
    return t.slice(0, 1).toUpperCase() + t.slice(1)
}
//小驼峰
const camelCase = (arr) => {
    return arr.map((t, index) => {
        return index === 0 ? t.toLowerCase() : firstCapital(t)
    }).join("")
}



const rquery = /^(?:[^?]*\?)?([\w\d\-\/=&%]+)/;

const getParamsUrl = (str = location.href, separator = '&') => {
    var query = String(str).match(rquery),
        key,
        value;

    if (query == null) return hash;

    query = query.pop();


    return query.split(separator).reduce((hash, pair) => {
        if (pair.indexOf('=') > 0) {
            pair = decodeURIComponent(pair).split('=');

            key = pair.shift();
            // 如果query中某个变量值包含等号
            // 我们应该重新组合起来
            value = pair.join('=');

            if (value != void 0) {
                value = value.replace('+', ' ');
            }
        } else {
            key = decodeURIComponent(pair);
            value = void 0;
        }

        hash[key] = value;

        return hash;
    }, {});
}

export default {
    firstCapital,
    camelCase,
    getParamsUrl
}