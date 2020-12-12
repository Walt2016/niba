// 几何数学计算

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

// 镜像
const mirror = (p, o) => {
    return [2 * o[0] - p[0], 2 * o[1] - p[1]]
}

// 线段分割： 分割数量
const split = (p1, p2, splitNum) => {
    let r = dis(p1, p2)
    let a = atan(p1, p2)
    return Array.from({
        length: splitNum + 2
    }, (_, index) => {
        return polar(p1, index * r / (splitNum + 1), a)
    })
}


// 多个点的镜像
const mirror2 = (points, o) => {
    return points.map(t => {
        return mirror(t, o)
    })
}
// 多个点的中点
const mid2 = (points) => {
    let n = points.length
    return points.map((t, index) => {
        let next = points[index + 1 >= n ? 0 : index + 1]
        return mid(t, next)
    })
}

export default {
    sin,
    cos,
    polar,
    mid,
    dis,
    atan,
    mirror,
    mirror2,
    mid2,
    split
}