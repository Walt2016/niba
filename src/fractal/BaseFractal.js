export default class BaseFractal {
    constructor(options) {
        Object.assign(this,options)
        let {
            level,
            n
        } = options
        this.count = this.stat(level, n)
        console.log("count="+this.count)

    }
    update(options){
      return  Object.assign(this,options)
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