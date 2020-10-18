// 数学计算

// 角度转弧度
const sin = (a = 0) => {
    return Math.sin(a * Math.PI / 180)
}

const cos = (a = 0) => {
    return Math.cos(a * Math.PI / 180)
}

// 极坐标
const polar = (o = [0, 0], r = 0, a = 0) => {
    return [+(o[0] + r * cos(a)).toFixed(2), +(o[1] + r * sin(a)).toFixed(2)]
}
// 中点
const mid = (p1 = [0, 0], p2 = [0, 0]) => {
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]
}
// 距离
const dis = (p1 = [0, 0], p2 = [0, 0]) => {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]))
}
// 夹角
const atan = (p1 = [0, 0], p2 = [0, 0]) => {
    return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI
}

export default {
    sin,
    cos,
    polar,
    mid,
    dis,
    atan
}