// 极坐标云点

export default class PolarSeg {
    constructor(options) {

        Object.assign(this, {
                o: [0, 0],
                r: 100,
                n: 3,
                a1: 0,  //sAngle
                a2: 360,  //eAngle
                phi: 0
            },
            options)
        this.center = this.o

    }
    update() {
        this.phi++ //动画入参
    }

}