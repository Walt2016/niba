import BaseDom from "./BaseDom";

export default class Panel extends BaseDom {
    constructor(options) {
        super(options)
    }
    _panel(options) {
        let {
            title,
            body,
            footer,
            tools
        } = options

        let id = this._random()
        let panel = this._div({
            class: 'panel' + (options['class'] ? " " + options['class'] : ""),
            id
        })

        let panelHeader = this._div({
            class: "panel_header",
            text: title,

        })
        let expandbtn = this._div({
            class: "fold",
            // text: "",
            click: (e) => {
                console.log(e.target)
                let el = e.target
                this._toggle(el, "down")
                let panel = this._closest(el, ".panel")
                let panel_body = this._query(".panel_body", panel)
                this._toggle(panel_body, "hide")
                let panel_footer = this._query(".panel_footer", panel)
                this._toggle(panel_footer, "hide")
            }
        })

        let toolsWrapper = this._div({
            class: "tools"
        })
        if (Array.isArray(tools)) {
            tools.forEach(t => {
                toolsWrapper.appendChild(t)
            })
        } else if(tools){
            toolsWrapper.appendChild(tools)
        }

        panelHeader.appendChild(expandbtn)
        panelHeader.appendChild(toolsWrapper)

        let panelBody = this._div({
            class: 'panel_body'
        })

        let panelFooter = this._div({
            class: "panel_footer"
        });

        if (Array.isArray(body)) {
            body.forEach(t => {
                // t.form=id
                t.setAttribute("form", id)
                panelBody.appendChild(t)
            })

        } else {
            body.setAttribute("form", id)
            panelBody.appendChild(body)
        }

        if (footer) {
            footer.setAttribute("form", id)
            panelFooter.appendChild(footer)
        }


        panel.appendChild(panelHeader)
        panel.appendChild(panelBody)
        panel.appendChild(panelFooter)
        return panel
    }
}