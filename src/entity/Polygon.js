// 多边形
import BaseEntity from './BaseEntity'
import Colors from '../colors'
import {
    ArcSeg
} from '../points'
export default class Polygon extends BaseEntity {
    constructor(options,draw) {
        super(options,draw)
        this.setPoints(new ArcSeg(options))
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