// 填充图案
import Path from './Path'
export default class Pattern extends Path {
    constructor(options) {
        super([], options)
        let {
            size = 10,
                offset = 0,
                list = [{
                    color: "red"
                }, {
                    color: "green"
                }]
        } = options
        let r = size
        Object.assign(this, {
            size,
            r,
            offset
        })

    }
    // 斜线
    _diagonalStripe() {
        let {
            r,
            offset
        } = this
        return [
            [
                [0, 0],
                [r * 2, r * 2],
                [r + offset, r * 2],
                [0, r - offset]
            ],
            [
                [r + offset, 0],
                [r * 2, 0],
                [r * 2, r - offset]
            ]
        ].map(t => this.d(t))

        // let d = this.d([
        //     [
        //         [0, 0],
        //         [r * 2, r * 2],
        //         [r + offset, r * 2],
        //         [0, r - offset]
        //     ],
        //     [
        //         [r + offset, 0],
        //         [r * 2, 0],
        //         [r * 2, r - offset]
        //     ]
        // ])
        // return d
    }

    // 格子图案
    _chequer() {
        let {
            r,
            offset
        } = this
        return [this.rect([0, 0], r, r), this.rect([r, r], r, r)]
        // return [this.rect([0, 0], r, r), this.rect([r, r], r, r)].join(" ")
    }

    // 点点
    _dot() {
        let {
            r,
            offset
        } = this
        r = r / 2
        return [this.circle([r, r], r), this.circle([3 * r, 3 * r], r)]
    }

}