export default class BaseFractal {
    constructor(options) {
        for (let key in options) {
            if (options[key] instanceof CanvasRenderingContext2D) {
                // 不可枚举属性  this.ctx
                Object.defineProperty(this, key, {
                    value: options[key],
                    enumerable: false
                })
            } else {
                this[key] = options[key]
            }
        }
        let {
            level,
            n
        } = options
        // this.count = this.stat(level, n)
        // 计数器
        Object.defineProperty(this, "count", {
            value: this.stat(level, n),
            enumerable: false
        })
        console.log("count=" + this.count)
        // 定时器
        Object.defineProperty(this, "timmers", {
            value: [],
            enumerable: false
        })

    }
    update(options) {
        return Object.assign(this, options)
    }
    clear() {
        // this.ctx.fillStyle = 'rgba(0,0,0, .01)';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // ctx.
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // this.timmer&&clearTimeout(this.timmer)

        this.timmers.forEach(t => {
            t && clearTimeout(t)
        })
        this.timmers.length=0
        return this
    }

    //统计图形个数
    // level2=  1+n
    // 3= 1+  n+  n*n  
    //4= 1+n+n*n+ n*n*n
    stat(level, n) {
        let total = 0
        while (level-- > 0) {
            total += Math.pow(n, level)
        }
        return total
    }
}