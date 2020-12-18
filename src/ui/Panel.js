import BaseDom from "./BaseDom";
import Dragger from "./Dragger"

export default class Panel extends BaseDom {
    constructor(options) {
        super(options)
        // this.init()
    }
    // init() {
    //     // let el = this.el ? this.el : this._div({
    //     //     id: "wrapper"
    //     // })

    //     // if(this.el){
    //     //     // this.el=this._appendTo(null, el)

    //     // }
    //     let root = this._div({
    //         id: "wrapper"
    //     })
    //     this._appendTo(this.el, root)
    //     this.el = root
    //     debugger



    //     // this.el = el
    // }
    // 实现接口
    render() {
        // let el = this.el ? this.el : this._div({
        //     id: "wrapper"
        // })
        let el = this.el
        let panel = this._panel()
        el.appendChild(panel)
        // this._appendTo(null, el)
        // this.el = el
    }
    _panel(options) {
        let {
            title,
            body,
            footer,
            tools
        } = options || this
        console.log(this)

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
                // let groupItemBody=this._queryAll(".form-group-item-body",panel)
                // this._toggle(groupItemBody,"close")
                // let panel_body = this._query(".panel-body", panel)
                // this._toggle(panel, "fullheight")
                // this._toggle(panel_body, "hide")
                // let panel_footer = this._query(".panel-footer", panel)
                // this._toggle(panel_footer, "hide")
            }
        }, panelHeader)

        this._icon({
            class: 'right',
            click: (e) => {
                let el = e.target
                // this._toggle(el, "down")
                let panel = this._closest(el, ".panel")
                this._toggle(panel, "fadeout")
                // let wrapper = this._closest(el, "#wrapper")
                // let btn = this._query("#configBtn", wrapper)
                // this._toggle(btn, "hide")
            }
        }, panelHeader)

        let panelBody = this._div({
            class: 'panel-body'
        }, panel)

        let panelFooter = this._div({
            class: "panel-footer"
        }, panel);



        if (Array.isArray(body)) {
            body.forEach(t => {
                t.setAttribute("form", id)
                panelBody.appendChild(t)
            })

        } else if (body) {
            body.setAttribute("form", id)
            panelBody.appendChild(body)
        }

        if (footer) {
            footer.setAttribute("form", id)
            panelFooter.appendChild(footer)
        }

        let toolsWrapper = this._div({
            class: "tools"
        }, panelFooter)
        if (Array.isArray(tools)) {
            tools.forEach(t => {
                toolsWrapper.appendChild(t)
            })
        } else if (tools) {
            toolsWrapper.appendChild(tools)
        }

        // new Dragger(panelHeader, panel)
        return panel
    }
}