import BaseDom from "./BaseDom";
import Dragger from "./Dragger"

export default class SliderBar extends BaseDom {
    constructor(options) {
        super(options)
    }
    render() {
        let el = this.el ? this.el : this._div({
            id: "wrapper"
        })
        let bar = this._bar()
        el.appendChild(bar)
        this._appendTo(null, el)
        this.el = el
    }
    _bar() {
        let div = this._div({
            class: 'sliderbar'
        })
        let bar = this._div({
            class: 'bar'
        }, div)
        let progress = this._div({
            class: 'progress'
        }, div)
        let dot = this._div({
            class: 'dot'
        }, div)


        return div
    }
}