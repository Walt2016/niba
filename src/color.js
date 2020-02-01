var regObj = {
    hex: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
    hex3: /^#([0-9a-fA-f]{3})$/,
    hex6: /^#([0-9a-fA-f]{6})$/,
    rgba: /^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/g
}
//#fff #ffffff
var isHex = function (color) {
    return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color);
};
//#fff
var isHex3 = function (color) {
    return /^#([0-9a-fA-f]{3})$/.test(color);
};
//#ffffff
var isHex6 = function (color) {
    return /^#([0-9a-fA-f]{6})$/.test(color);
};
var isRgba = function (color) {
    return /^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/g.test(color)
};

var rgbaWrapper = function (rgbaArr) { //[1,1,1,1]
    return (rgbaArr.length === 4 ? 'rgba(' : 'rgb(') + rgbaArr + ')'
};
var rgbaArr = function (color) { //rgba(0,0,0,0.1)
    if (isRgba(color)) {
        return color.match(/0\.\d{1,2}|\d{1,3}/g).map(function (t) {
            return +t;
        })
    } else if (isHex(color)) {
        if (color.length === 4) { //#fff
            return color.match(/[0-9a-fA-f]{1}/g).map(function (t) {
                return '0x' + t + t << 0
            })
        } else { //#ffffff
            return color.match(/[0-9a-fA-f]{2}/g).map(function (t) {
                return '0x' + t << 0
            })
        }
    } else if (_.isArray(color)) {
        return color;
    } else if (_.isNumber(color)) {
        color &= 0xFFFFFF;
        return [
            (color >> 16) & 0xFF,
            (color >> 8) & 0xFF,
            color & 0xFF,
        ];
    }
};
var _max = function (arr) {
    return Math.max.apply(Math, arr)
}
var _min = function (arr) {
    return Math.min.apply(Math, arr)
}

//rgb2hex
var hex = function (color) {
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
};
//hex2rgb
var rgb = function (color, alpha) {
    if (!color) return;
    if (isRgba(color)) return color;
    var arr = rgbaArr(color);
    if (alpha) arr[3] = alpha;
    return rgbaWrapper(arr);
};

//深色  随机深色(rgb两位小于 80)，指定颜色加深
var dark = function (color, level) {
    color = rgbaArr(color)
    level = level || 0.5;
    return rgbaWrapper(color.map(function (t) {
        return t * (1 - level) << 0
    }))
}
var deepdark = function (color) {
    return dark(color, 0.1);
}

var hsla = function () {
    return "hsla(" + [Math.random() * 360 << 0] + ",50%,50%,0.5)";
}
var hsl = function () { //微信小程序不支持hsl
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

//浅色  
var light = function (color, level) {
    color = rgbaArr(color)
    level = level || 0.5;
    return rgbaWrapper(color.map(function (t) {
        return t + (255 - t) * level << 0
    }))
}
//透明度
var alpha = function (color, a) {
    color = rgbaArr(color)
    if (a) color[3] = a;
    return rgbaWrapper(color);
}

//web安全色   
var webSafeColor = function (color) {
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

    color = rgb(color)
    color = rgbaArr(color)
    //RGB值是51的倍数
    for (var i = 0; i < 3; i++) {
        var q1 = Math.floor(color[i] / 51) * 51;
        var q2 = Math.ceil(color[i] / 51) * 51;
        if (Math.abs(q1 - color[i]) <= Math.abs(q2 - color[i])) color[i] = q1;
        else color[i] = q2;
    }
    return hex(rgbaWrapper(color));
}

var _isUndefined = function (t) {
    return t === undefined
}
var _cos = function (t) {
    return Math.cos(t * Math.PI / 180)
}
//色相环
var colorCircle = function (len, alpha) {
    var a = 0,
        step = 360 / len,
        arr = [],
        r, g, b;
    for (var i = 0; i < len; i++) {
        a += step
        r = _cos(a) * 127 + 128 << 0;
        g = _cos(a + 120) * 127 + 128 << 0;
        b = _cos(a + 240) * 127 + 128 << 0;
        arr[arr.length] = rgbaWrapper(_isUndefined(alpha) ? [r, g, b] : [r, g, b, alpha]);
    }
    return arr;
}
export {
    rgb,
    hex,
    dark,
    deepdark,
    hsla,
    hsl,
    alpha,
    webSafeColor,
    colorCircle
}

// var Color = function (color, alpha) {
//     if (!(this instanceof Color)) return new Color(color, alpha);
//     // color = color || '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6); //"#000";
//     if (isRgba(color) || isHex(color)) {
//         this.color = rgbaArr(color);
//     } else {
//         //分类颜色
//         //红 100
//         //绿 010
//         //青 001 
//         //黄 110 
//         //紫 101
//         //全彩 111
//         //黑白灰 000
//         var colorMap = {
//             red: [1, 0, 0],
//             green: [0, 1, 0],
//             syan: [0, 0, 1],
//             yellow: [1, 1, 0],
//             purple: [1, 0, 1],
//             gray: [0, 0, 0],
//             colorful: [1, 1, 1]
//         }

//         var arr = color in colorMap ? colorMap[color] : colorMap["colorful"];
//         var r = arr[0],
//             g = arr[1],
//             b = arr[2];
//         if (r & g & b === 1) { //全彩
//             arr = arr.map(function (t) {
//                 return Math.random() * 255 << 0;
//             });
//         } else if (r & g & b === 0) { //灰
//             var t = Math.random() * 255 << 0;
//             arr = [t, t, t];
//         } else {
//             var rgb = 155;
//             var c = (Math.random() * (255 - rgb) << 0) + rgb;
//             arr = arr.map(function (t) {
//                 return t === 1 ? (Math.random() * (255 - rgb) << 0) + rgb : Math.random() * (c / 2) << 0;
//             });
//         }
//         if (alpha) arr[arr.length] = alpha;
//         this.color = arr;
//     }
// }
// return _.createClass(Color, {
//         toString: function () {
//             return rgbaWrapper(this.color);
//         },
//         hsla: function () {
//             return "hsla(" + [Math.random() * 360 << 0] + ",50%,50%,0.5)";
//         },
//         hsl: function () { //微信小程序不支持hsl
//             // return "hsl(" + [Math.random() * 360 << 0] + ",50%,50%)";
//             var r, g, b, cc = this.color.map(function (t, i) {
//                     t /= 255
//                     if (i === 0)
//                         r = t;
//                     else if (i === 1)
//                         g = t;
//                     else(i === 2)
//                     b = t;
//                     return t
//                 }),
//                 max = _max(cc),
//                 min = _min(cc),
//                 l = (max + min) / 2,
//                 s, h;
//             if (max === min) {
//                 s = 0;
//                 h = 0;
//             }
//             if (l < 0.5)
//                 s = (max - min) / (max + min)
//             else
//                 s = (max - min) / (2.0 - max - min)
//             if (r === max)
//                 h = (g - b) / (max - min)
//             if (g === max)
//                 h = 2.0 + (b - r) / (max - min)
//             if (b === max)
//                 h = 4.0 + (r - g) / (max - min)
//             h = (h * 60 + 360) % 360
//             s = s * 100 + '%'
//             l = l * 100 + '%'
//             return 'hsl(' + [h, s, l] + ')'
//         },
//         //深色  随机深色(rgb两位小于 80)，指定颜色加深
//         dark: function (color, level) {
//             color = color ? rgbaArr(color) : this.color;
//             level = level || 0.5;
//             return rgbaWrapper(color.map(function (t) {
//                 return t * (1 - level) << 0
//             }))
//         },
//         deepdark: function () {
//             return this.dark(null, 0.1);
//         },
//         //浅色  
//         light: function (color, level) {
//             color = color ? rgbaArr(color) : this.color;
//             level = level || 0.5;
//             return rgbaWrapper(color.map(function (t) {
//                 return t + (255 - t) * level << 0
//             }))
//         },
//         //透明度
//         alpha: function (a) {
//             if (a) this.color[3] = a;
//             return rgbaWrapper(this.color);
//         },
//         rgb: function (color, alpha) {
//             if (!color) return this.alpha(alpha)
//             return this.constructor.rgb(color, alpha)
//         },
//         //混合
//         mix: function (color1, color2) {
//             var args = Array.prototype.slice.call(arguments);
//             args[args.length] = this.rgb();
//             return this.constructor.mix(args);
//         },
//         //rgb2hex
//         hex: function (color) {
//             return this.constructor.hex(color || this.color);
//         },
//         //色相环
//         circle: function (len) {
//             return this.constructor.circle(len);
//         },
//         //互补色
//         complementary: function (color) {
//             return this.constructor.complementary(color || this.color);
//         },
//         //颜色过渡  gradient
//         tween: function (color, step, easing) {
//             return this.constructor.tween(this.color, color, step, easing)
//         },
//         // 灰度值的心理学公式  值越小越深 <192为深色
//         grayLevel: function (color) {
//             color = color ? rgbaArr(color) : this.color;
//             return 0.30 * color[0] + 0.59 * color[1] + 0.11 * color[2]
//         },
//         isDark: function (color) {
//             return this.grayLevel(color) < 192
//         },
//         isLight: function (color) {
//             return !this.isDark(color)
//         },
//         //web安全色   
//         webSafeColor: function (color) {
//             if (!color) {
//                 //216个安全色
//                 var arr = ['00', '33', '66', '99', 'CC', 'FF'],
//                     len = arr.length,
//                     colorArr = [];
//                 for (var r = 0; r < len; r++)
//                     for (var g = 0; g < len; g++)
//                         for (var b = 0; b < len; b++)
//                             colorArr[colorArr.length] = '#' + arr[r] + arr[g] + arr[b];
//                 return colorArr;
//             }

//             color = this.rgb(color)
//             color = rgbaArr(color)
//             //RGB值是51的倍数
//             for (var i = 0; i < 3; i++) {
//                 var q1 = Math.floor(color[i] / 51) * 51;
//                 var q2 = Math.ceil(color[i] / 51) * 51;
//                 if (Math.abs(q1 - color[i]) <= Math.abs(q2 - color[i])) color[i] = q1;
//                 else color[i] = q2;
//             }
//             return this.hex(rgbaWrapper(color));
//         }
//     },
//     //静态方法
//     {
//         //混合  [c1,c2,c3]  或  color1, color2 
//         mix: function (colorArr) {
//             if (_.isArray(colorArr)) {
//                 var len = colorArr.length,
//                     arr = new Array(len);
//                 for (var i = 0; i < len; i++) {
//                     arr[i] = rgbaArr(colorArr[i]);
//                 }
//                 var _mix = arr[0].map(function (t, i) {
//                     if (i === 3) {
//                         for (var j = 1; j < len; j++) {
//                             t += _.isUndefined(arr[j][i]) ? 1 : arr[j][i];
//                         }
//                         return (t / len).toFixed(2);
//                     } else {
//                         for (var j = 1; j < len; j++) {
//                             t += arr[j][i];
//                         }
//                         return t / len << 0
//                     }
//                 })
//                 return rgbaWrapper(_mix);
//             } else {
//                 var len = arguments.length,
//                     arr = [];
//                 if (len === 0) return;
//                 for (var i = 0; i < len; i++) {
//                     arr[i] = rgbaArr(arguments[i]);
//                 }
//                 return this.mix.call(this, arr)
//             }

//         },
//         //rgb2hex
//         hex: function (color) {
//             if (!color) return;
//             if (isHex6(color)) return color;
//             if (isHex3(color)) {
//                 return color.replace(/[0-9a-fA-f]/g, function (m) {
//                     return m + m;
//                 });
//             }

//             function _hex(rgbaArr) {
//                 return "#" + rgbaArr.map(function (t, i) {
//                     return i > 2 ? null : ('0' + (+t).toString(16)).slice(-2);
//                 }).join("")
//             }
//             return _hex(rgbaArr(color))
//         },
//         //hex2rgb
//         rgb: function (color, alpha) {
//             if (!color) return;
//             if (isRgba(color)) return color;
//             var arr = rgbaArr(color);
//             if (alpha) arr[3] = alpha;
//             return rgbaWrapper(arr);
//         },
//         //互补色
//         complementary: function (color) {
//             var arr = rgbaArr(color),
//                 max = _max(arr),
//                 min = _min(arr),
//                 sum = max + min;
//             return rgbaWrapper(arr.map(function (t) {
//                 return sum - t
//             }));
//         },
//         //色相环
//         circle: function (len, alpha) {
//             var a = 0,
//                 step = 360 / len,
//                 arr = [],
//                 r, g, b;
//             for (var i = 0; i < len; i++) {
//                 a += step
//                 r = _.cos(a) * 127 + 128 << 0;
//                 g = _.cos(a + 120) * 127 + 128 << 0;
//                 b = _.cos(a + 240) * 127 + 128 << 0;
//                 arr[arr.length] = rgbaWrapper(_.isUndefined(alpha) ? [r, g, b] : [r, g, b, alpha]);
//             }
//             return arr;
//         },
//         //颜色过渡  gradient
//         tween: function (color1, color2, step, easing) {
//             step = step || 1;
//             easing = easing || "linear";
//             var start = rgbaArr(color1),
//                 end = rgbaArr(color2),
//                 colorArr = [];
//             for (var i = 0; i <= step; i++) {
//                 var k = _.Easing[easing](i / step);
//                 colorArr[colorArr.length] = rgbaWrapper(end.map(function (t, i) {
//                     return i > 2 ? +(start[i] + (t - start[i]) * k).toFixed(2) : start[i] + (t - start[i]) * k << 0
//                 }))
//             }
//             return colorArr;
//         },
//         //深色  随机深色(rgb两位小于 80)，指定颜色加深
//         dark: function (level) {
//             var n = Math.random() * 3 << 0;
//             return rgbaWrapper([255, 255, 255].map(function (t, i) {
//                 return i !== n ? Math.random() * 80 << 0 : t * Math.random() << 0;
//             }));
//         },
//         deepdark: function () {
//             var n = Math.random() * 3 << 0;
//             return rgbaWrapper([255, 255, 255].map(function (t, i) {
//                 return i !== n ? Math.random() * 20 << 0 : t * Math.random() << 0;
//             }));
//         },
//         //浅色  
//         light: function (level) {
//             var n = Math.random() * 3 << 0;
//             return rgbaWrapper([255, 255, 255].map(function (t, i) {
//                 return i !== n ? 120 + Math.random() * 136 << 0 : t * Math.random() << 0;
//             }));
//         },
//     })