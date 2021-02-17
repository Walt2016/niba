import BaseDom from "./BaseDom";
import Dragger from "./Dragger"

export default class Panel extends BaseDom {
    constructor(options) {
        super(options)
    }

    // 实现接口
    render() {
        let el = this.el
        let panel = this._panel()
        el.appendChild(panel)
    }
    _panel(options) {
        let {
            title,
            body,
            footer,
            tools
        } = options || this

        let id = this._random()
        let panel = this._div({
            class: 'panel fullheight' + (options && options['class'] ? " " + options['class'] : ""),
            id
        })

        let panelHeader = this._div({
            class: "panel-header",
            text: title,
        }, panel)

        this._icon({
            class: 'up',
            click: (e) => {
                let el = e.target
                this._toggle(el, "down")
                let panel = this._closest(el, ".panel")
                let groupItem = this._queryAll(".form-group-item", panel)
                this._toggle(groupItem, "close")
            }
        }, panelHeader)

        this._icon({
            class: 'right',
            click: (e) => {
                let el = e.target
                let panel = this._closest(el, ".panel")
                this._toggle(panel, "fadeout")
            }
        }, panelHeader)

        let panelBody = this._div({
            class: 'panel-body'
        }, panel)

        let panelFooter = this._div({
            class: "panel-footer"
        }, panel);

        this._appendTo(panelBody, body, {
            form: id
        })

        this._appendTo(panelFooter, footer, {
            form: id
        })

        let toolsWrapper = this._div({
            class: "tools"
        }, panelFooter)
        this._appendTo(toolsWrapper, tools)

        // new Dragger(panelHeader, panel)
        return panel
    }
}