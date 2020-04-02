import BaseDom from "./baseDom";

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
            text: title
        })
        let toolsWrapper=this._div({
            class:"tools"
        })
        toolsWrapper.appendChild(tools)
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