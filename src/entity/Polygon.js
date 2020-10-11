// 多边形
import BaseEntity from './BaseEntity'
import {
    ArcSeg
} from '../points'
export default class Polygon extends BaseEntity {
    constructor(options) {
        super(options)
        this.setPoints(new ArcSeg(options))
    }
    update(options) {
        Object.assign(this, options)
        return this.setPoints(new ArcSeg(this))
    }
}