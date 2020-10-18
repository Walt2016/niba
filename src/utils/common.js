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

export default {
    firstCapital,
    camelCase
}