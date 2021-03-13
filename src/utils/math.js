// 几何数学计算
// Two decimal places
const twoDecimal = (n) => +Number(n).toFixed(2)
// matrix ( a2-D array),
const isMatrix = (p) => Array.isArray(p[0])
// 角度转弧度
const deg2rad = (a) => a * Math.PI / 180
const rad2deg = (r) => twoDecimal(r * 180 / Math.PI)

// 角度转弧度
const sin = (a = 0) => {
    return Math.sin(deg2rad(a))
}

const cos = (a = 0) => {
    return Math.cos(deg2rad(a))
}

const tan = (a = 0) => {
    return Math.tan(deg2rad(a))
}

// 极坐标
const polar = (o = [0, 0], r = 0, a = 0) => {
    return [o[0] + r * cos(a), o[1] + r * sin(a)].map(t => twoDecimal(t))
}
// 中点
const mid = (p1 = [0, 0], p2 = [0, 0]) => {
    if (isMatrix(p1)) {
        let n = p1.length
        return p1.map((t, index) => {
            let next = p1[index + 1 >= n ? 0 : index + 1]
            return mid(t, next)
        })
    }
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2].map(t => twoDecimal(t))
}

// 距离
const dis = (p1 = [0, 0], p2 = [0, 0]) => {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]))
}
// 夹角
const atan = (p1 = [0, 0], p2 = [0, 0]) => {
    return rad2deg(Math.atan2(p2[1] - p1[1], p2[0] - p1[0]))
}

// 三点夹角
// cosO = (OA*OA + OB*OB - AB*AB ) / 2*OA*OB
const includedAngle = (A, O, B) => {
    let OA = dis(O, A)
    let OB = dis(O, B)
    let AB = dis(A, B)
    let cosO = (OA * OA + OB * OB - AB * AB) / (2 * OA * OB)
    return rad2deg(Math.acos(cosO))
}


// 镜像
// Angle of Refraction折射角
// index of Refraction折射角
const mirror = (p, o, radio = 1, refraction) => {
    if (isMatrix(p)) {
        return p.map(t => mirror(t, o, radio, refraction))
    }
    if (refraction) {
        let r = dis(p, o) * radio
        let a = atan(p, o)
        return polar(o, r, a + refraction)
    }
    if (radio === 1) {
        return [2 * o[0] - p[0], 2 * o[1] - p[1]]
    }
    return [(radio + 1) * o[0] - radio * p[0], (radio + 1) * o[1] - radio * p[1]]
}

// 中心点
const center = points => {
    let n = points.length
    let sum = points.reduce((sum, t) => {
        sum[0] += t[0]
        sum[1] += t[1]
        return sum
    }, [0, 0])
    return sum.map(t => t / n)
}

// 放大缩小
const scale = (p, radio, o) => {
    if (isMatrix(p)) {
        o = o || center(p)
        return p.map(t => {
            let deta = [t[0] - o[0], t[1] - o[1]]
            return [o[0] + deta[0] * radio, o[1] + deta[1] * radio]
        })
    }
    let deta = [p[0] - o[0], p[1] - o[1]]
    return [o[0] + deta[0] * radio, o[1] + deta[1] * radio]


}
// const zoom =(o,p,radio)=>{

// }

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

// 移动
const move = (p, from, to, radio) => {
    let deta = [to[0] - from[0], to[1] - from[1]]
    if (isMatrix(p)) {
        if (radio) {
            let points = p.map(t => [t[0] + deta[0], t[1] + deta[1]])
            return scale(points, radio)
        }
        return p.map(t => [t[0] + deta[0], t[1] + deta[1]])
    } else {
        return [p[0] + deta[0], p[1] + deta[1]]
    }
}

export default {
    sin,
    cos,
    polar,
    mid,
    dis,
    atan,
    mirror,
    split,
    twoDecimal,
    tan,
    move,
    includedAngle,
    scale
}