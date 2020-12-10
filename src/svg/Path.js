// 万能函数path
export default class Path {
    constructor() {

    }
    // 链接点 [p1,p2]  =>[[x,y],[x,y]]  通用链接方式 polyline
    d(points, closed, broken) {
        return points.map((t, index) => {
            return `${ (broken ? index %2 ===0 : index===0) ? "M" : t.length ===7 ? "A": t.length ===4 ? "Q" : "L"}${t.join(" ")}`
        }).join(" ") + (closed ? ' z' : '')
    }
    // 闭合线段[p1,p2,p3] p1->p2->p3->p1
    closedLinePath(points) {
        return points.map((t, index) => {
            return (index === 0 ? "M" : "L") + t.join(" ")
        }).concat(["z"]).join(" ")
    }
    // 折线[p1,p2,p3,p4]  p1->p2  p3->p4
    brokenLinePath(points) {
        return points.map((t, index) => {
            return (index % 2 === 0 ? "M" : "L") + t.join(" ")
        }).join(" ")
    }
    // 线段，二维点[[p1,p2],[p3,p4]] => [[[x,y],[x,y]],[[x,y],[x,y]]]
    d2(segments) {
        return segments.map(t => {
            return `M${t[0].join(" ")} L${t[1].join(" ")}`
        }).join(" ")
    }


    rect2path(x, y, width, height, rx, ry) {
        /* * rx 和 ry 的规则是： * 1. 如果其中一个设置为 0 则圆角不生效 * 2. 如果有一个没有设置则取值为另一个 */
        rx = rx || ry || 0;
        ry = ry || rx || 0; //非数值单位计算，如当宽度像100%则移除 
        if (isNaN(x - y + width - height + rx - ry)) return;
        rx = rx > width / 2 ? width / 2 : rx;
        ry = ry > height / 2 ? height / 2 : ry; //如果其中一个设置为 0 则圆角不生效 
        if (0 == rx || 0 == ry) {
            // var path = 
            // 'M' + x + ' ' + y + 
            // 'H' + (x + width) + 不推荐用绝对路径，相对路径节省代码量 
            // 'V' + (y + height) + 
            // 'H' + x + 
            // 'z'; 
            var path = 'M' + x + ' ' + y + 'h' + width + 'v' + height + 'h' + -width + 'z';
        } else {
            var path = 'M' + x + ' ' + (y + ry) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + rx + ' ' + (-ry) + 'h' + (width - rx - rx) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + rx + ' ' + ry + 'v' + (height - ry - ry) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + (-rx) + ' ' + ry + 'h' + (rx + rx - width) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + (-rx) + ' ' + (-ry) + 'z';
        }
        return path;
    }

    ellipse2path(cx, cy, rx, ry) {
        //非数值单位计算，如当宽度像100%则移除 
        if (isNaN(cx - cy + rx - ry)) return;
        var path = 'M' + (cx - rx) + ' ' + cy + 'a' + rx + ' ' + ry + ' 0 1 0 ' + 2 * rx + ' 0' + 'a' + rx + ' ' + ry + ' 0 1 0 ' + (-2 * rx) + ' 0' + 'z';
        return path;
    }

    line2path(x1, y1, x2, y2) {
        //非数值单位计算，如当宽度像100%则移除 
        if (isNaN(x1 - y1 + x2 - y2)) return;
        x1 = x1 || 0;
        y1 = y1 || 0;
        x2 = x2 || 0;
        y2 = y2 || 0;
        var path = 'M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2;
        return path;
    }

    // polygon折线转换 points = [x1, y1, x2, y2, x3, y3 ...]; 
    polyline2path(points) {
        var path = 'M' + points.slice(0, 2).join(' ') + 'L' + points.slice(2).join(' ');
        return path;
    } // polygon多边形转换 points = [x1, y1, x2, y2, x3, y3 ...]; 
    polygon2path(points) {
        var path = 'M' + points.slice(0, 2).join(' ') + 'L' + points.slice(2).join(' ') + 'z';
        return path;
    }
}