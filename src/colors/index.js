// 颜色
import _ from '../utils/index'
export default class Colors extends Array {
    constructor() {
        super()
    }
    // constructor(options = {
    //     color: '#000000',
    //     alpha: 1,
    //     n: 5
    // }) {
    //     super()
    //     let {
    //         color,
    //         alpha,
    //         n
    //     } = options
    //     let colors = this.genColors(color, alpha, n)

    //     colors.forEach(t => {
    //         this.push(t)
    //     })
    // }
    genColors(color, alpha, n) {
        let colors = []
        for (let i = 0; i < n; i++) {
            colors[colors.length] = this.genColor(color, alpha)
        }
        return colors
    }
    genColor(color, alpha) {
        //分类颜色
        //红 100
        //绿 010
        //青 001 
        //黄 110 
        //紫 101
        //全彩 111
        //黑白灰 000
        var colorMap = {
            red: [1, 0, 0],
            green: [0, 1, 0],
            syan: [0, 0, 1],
            yellow: [1, 1, 0],
            purple: [1, 0, 1],
            gray: [0, 0, 0],
            colorful: [1, 1, 1]
        }

        var arr = color in colorMap ? colorMap[color] : colorMap["colorful"];
        var r = arr[0],
            g = arr[1],
            b = arr[2];
        if (r & g & b === 1) { //全彩
            arr = arr.map(function (t) {
                return Math.random() * 255 << 0;
            });
        } else if (r & g & b === 0) { //灰
            var t = Math.random() * 255 << 0;
            arr = [t, t, t];
        } else {
            var rgb = 155;
            var c = (Math.random() * (255 - rgb) << 0) + rgb;
            arr = arr.map(function (t) {
                return t === 1 ? (Math.random() * (255 - rgb) << 0) + rgb : Math.random() * (c / 2) << 0;
            });
        }
        if (alpha) arr[arr.length] = alpha;
        // this.color =this.rgbaWrapper(arr) 
        return this.rgbaWrapper(arr)

    }
    //#fff #ffffff
    isHex(color) {
        return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color);
    }
    //#fff
    isHex3(color) {
        return /^#([0-9a-fA-f]{3})$/.test(color);
    }
    //#ffffff
    isHex6(color) {
        return /^#([0-9a-fA-f]{6})$/.test(color);
    }
    isRgba(color) {
        return /^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/g.test(color)
    }
    rgbaWrapper(rgbaArr) { //[1,1,1,1]
        return (rgbaArr.length === 4 ? 'rgba(' : 'rgb(') + rgbaArr + ')'
    }
    rgbaArr(color) { //rgba(0,0,0,0.1)
        if (this.isRgba(color)) {
            return color.match(/0\.\d{1,2}|\d{1,3}/g).map(function (t) {
                return +t;
            })
        } else if (this.isHex(color)) {
            if (color.length === 4) { //#fff
                return color.match(/[0-9a-fA-f]{1}/g).map(function (t) {
                    return '0x' + t + t << 0
                })
            } else { //#ffffff
                return color.match(/[0-9a-fA-f]{2}/g).map(function (t) {
                    return '0x' + t << 0
                })
            }
        } else if (Array.isArray(color)) {
            return color;
        } else if (typeof color == "number") {
            color &= 0xFFFFFF;
            return [
                (color >> 16) & 0xFF,
                (color >> 8) & 0xFF,
                color & 0xFF,
            ];
        }
    }

    hsla() {
        return "hsla(" + [Math.random() * 360 << 0] + ",50%,50%,0.5)";
    }
    hsl() { //微信小程序不支持hsl
        // return "hsl(" + [Math.random() * 360 << 0] + ",50%,50%)";
        var r, g, b, cc = this.color.map(function (t, i) {
                t /= 255
                if (i === 0)
                    r = t;
                else if (i === 1)
                    g = t;
                else(i === 2)
                b = t;
                return t
            }),
            max = _max(cc),
            min = _min(cc),
            l = (max + min) / 2,
            s, h;
        if (max === min) {
            s = 0;
            h = 0;
        }
        if (l < 0.5)
            s = (max - min) / (max + min)
        else
            s = (max - min) / (2.0 - max - min)
        if (r === max)
            h = (g - b) / (max - min)
        if (g === max)
            h = 2.0 + (b - r) / (max - min)
        if (b === max)
            h = 4.0 + (r - g) / (max - min)
        h = (h * 60 + 360) % 360
        s = s * 100 + '%'
        l = l * 100 + '%'
        return 'hsl(' + [h, s, l] + ')'
    }
    //深色  随机深色(rgb两位小于 80)，指定颜色加深
    dark(color, level) {
        color = color ? rgbaArr(color) : this.color;
        level = level || 0.5;
        return this.rgbaWrapper(color.map(function (t) {
            return t * (1 - level) << 0
        }))
    }
    deepdark() {
        return this.dark(null, 0.1);
    }
    //浅色  
    light(color, level) {
        color = color ? this.rgbaArr(color) : this.color;
        level = level || 0.5;
        return this.rgbaWrapper(color.map(function (t) {
            return t + (255 - t) * level << 0
        }))
    }
    //透明度
    alpha(a) {
        if (a) this.color[3] = a;
        return this.rgbaWrapper(this.color);
    }
    rgb(color, alpha) {
        if (!color) return this.alpha(alpha)
        return this.rgb(color, alpha)
    }
    //混合  [c1,c2,c3]  或  color1, color2 
    mix(colorArr) {
        if (_.isArray(colorArr)) {
            var len = colorArr.length,
                arr = new Array(len);
            for (var i = 0; i < len; i++) {
                arr[i] = rgbaArr(colorArr[i]);
            }
            var _mix = arr[0].map(function (t, i) {
                if (i === 3) {
                    for (var j = 1; j < len; j++) {
                        t += _.isUndefined(arr[j][i]) ? 1 : arr[j][i];
                    }
                    return (t / len).toFixed(2);
                } else {
                    for (var j = 1; j < len; j++) {
                        t += arr[j][i];
                    }
                    return t / len << 0
                }
            })
            return this.rgbaWrapper(_mix);
        } else {
            var len = arguments.length,
                arr = [];
            if (len === 0) return;
            for (var i = 0; i < len; i++) {
                arr[i] = rgbaArr(arguments[i]);
            }
            return this.mix.call(this, arr)
        }

    }
    //
    rgb2hex(color) {
        if (!color) return;
        if (isHex6(color)) return color;
        if (isHex3(color)) {
            return color.replace(/[0-9a-fA-f]/g, function (m) {
                return m + m;
            });
        }

        function _hex(rgbaArr) {
            return "#" + rgbaArr.map(function (t, i) {
                return i > 2 ? null : ('0' + (+t).toString(16)).slice(-2);
            }).join("")
        }
        return _hex(rgbaArr(color))
    }
    //
    hex2rgb(color, alpha) {
        if (!color) return;
        if (isRgba(color)) return color;
        var arr = rgbaArr(color);
        if (alpha) arr[3] = alpha;
        return this.rgbaWrapper(arr);
    }
    //互补色
    complementary(color) {
        var arr = rgbaArr(color),
            max = _max(arr),
            min = _min(arr),
            sum = max + min;
        return this.rgbaWrapper(arr.map(function (t) {
            return sum - t
        }));
    }
    //色相环
    circle(len, alpha) {
        var a = 0,
            step = 360 / len,
            arr = [],
            r, g, b;
        for (var i = 0; i < len; i++) {
            a += step
            r = _.cos(a) * 127 + 128 << 0;
            g = _.cos(a + 120) * 127 + 128 << 0;
            b = _.cos(a + 240) * 127 + 128 << 0;
            arr[arr.length] = this.rgbaWrapper(_.isUndefined(alpha) ? [r, g, b] : [r, g, b, alpha]);
        }
        return arr;
    }
    //颜色过渡  gradient
    tween(color1, color2, step, easing) {
        step = step || 1;
        easing = easing || "linear";
        var start = rgbaArr(color1),
            end = rgbaArr(color2),
            colorArr = [];
        for (var i = 0; i <= step; i++) {
            var k = _.Easing[easing](i / step);
            colorArr[colorArr.length] = this.rgbaWrapper(end.map(function (t, i) {
                return i > 2 ? +(start[i] + (t - start[i]) * k).toFixed(2) : start[i] + (t - start[i]) * k << 0
            }))
        }
        return colorArr;
    }
    //深色  随机深色(rgb两位小于 80)，指定颜色加深
    dark(level) {
        var n = Math.random() * 3 << 0;
        return this.rgbaWrapper([255, 255, 255].map(function (t, i) {
            return i !== n ? Math.random() * 80 << 0 : t * Math.random() << 0;
        }));
    }
    deepdark() {
        var n = Math.random() * 3 << 0;
        return this.rgbaWrapper([255, 255, 255].map(function (t, i) {
            return i !== n ? Math.random() * 20 << 0 : t * Math.random() << 0;
        }));
    }
    //浅色  
    light(level) {
        var n = Math.random() * 3 << 0;
        return this.rgbaWrapper([255, 255, 255].map(function (t, i) {
            return i !== n ? 120 + Math.random() * 136 << 0 : t * Math.random() << 0;
        }));
    }
    // 灰度值的心理学公式  值越小越深 <192为深色
    grayLevel(color) {
        color = color ? this.rgbaArr(color) : this.color;
        return 0.30 * color[0] + 0.59 * color[1] + 0.11 * color[2]
    }
    isDark(color) {
        return this.grayLevel(color) < 192
    }
    isLight(color) {
        return !this.isDark(color)
    }
    //web安全色   
    webSafeColor(color) {
        if (!color) {
            //216个安全色
            var arr = ['00', '33', '66', '99', 'CC', 'FF'],
                len = arr.length,
                colorArr = [];
            for (var r = 0; r < len; r++)
                for (var g = 0; g < len; g++)
                    for (var b = 0; b < len; b++)
                        colorArr[colorArr.length] = '#' + arr[r] + arr[g] + arr[b];
            return colorArr;
        }

        color = this.rgb(color)
        color = this.rgbaArr(color)
        //RGB值是51的倍数
        for (var i = 0; i < 3; i++) {
            var q1 = Math.floor(color[i] / 51) * 51;
            var q2 = Math.ceil(color[i] / 51) * 51;
            if (Math.abs(q1 - color[i]) <= Math.abs(q2 - color[i])) color[i] = q1;
            else color[i] = q2;
        }
        return this.hex(this.rgbaWrapper(color));
    }
}