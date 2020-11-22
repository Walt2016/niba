// 多段线曲线
import BaseEntity from './BaseEntity'
import Colors from '../colors'
import {
    ArcSeg
} from '../points'
export default class PolyCurve extends BaseEntity {
    constructor(options, draw) {
        super(options, draw)
        this.setPoints(new ArcSeg(options))
        this.setControllers(new ArcSeg({
            ...options,
            r: options.r * 2,
            angle: 180 / options.n
        }))
    }
    update(options) {
        Object.assign(this, options)
        if (options.colorful) {
            this.setEnumerable("colors", new Colors())
            // this._colors = new Colors()
        }
        return this.setPoints(new ArcSeg(this))
    }
}