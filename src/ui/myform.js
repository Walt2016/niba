function _random() {
    return "_" + Math.random().toString(16).slice(2)
}

function _query(el, parent) {
    if (parent) {
        if (typeof parent == "string") {
            if (parent.charAt(0).match(/[\#\.]/)) {
                return document.querySelector(parent + " " + el)
            }
            return document.querySelector("#" + parent + " " + el)
        }
        return document.querySelector("#" + parent.id + " " + el)
    }
    return document.querySelector(el)
}

function _queryAll(el, parent) {
    if (parent) {
        if (typeof parent == "string") {
            if (parent.charAt(0).match(/[\#\.]/)) {
                return document.querySelectorAll(parent + " " + el)
            }
            return document.querySelectorAll("#" + parent + " " + el)
        }
        return document.querySelectorAll("#" + parent.id + " " + el)
    }
    return document.querySelectorAll(el)
}

//上溯
function _closest(el, cls) {
    if (!el.parentNode) { //document  ie8不支持parentNode
        return null
    } else if (cls.charAt(0) === "." && el.className.split(" ").indexOf(cls.substring(1)) >= 0) {
        return el;
    } else if (cls.charAt(0) === "#" && el.id.toLowerCase() === cls.substring(1).toLowerCase()) {
        return el;
    } else if (el.tagName.toLowerCase() === cls.toLowerCase()) {
        return el
    } else {
        return _closest(el.parentNode, cls)
    }
}

function _appendTo(el, form) {
    el = el ? document.querySelector(el) : document.body
    el.appendChild(form)
}

function _createEle(tag, options) {
    let ele = document.createElement(tag)
    for (let key in options) {
        if (['name', 'innertext', 'id', 'innerHTML', 'value'].indexOf(key.toLocaleLowerCase())) {
            ele[key] = options[key]
        } else {
            ele.setAttribute(key, options[key])
        }
    }
    return ele
}


export default class MyForm {
    constructor(options) {
        Object.assign(this, options)
        this._form(options)

    }

    _form(options) {
        let {
            el,
            fields,
            click,
            events = [],
            btn,
            btns = [],
            title
        } = options

        let form = this._panel({
            title,
            body: fields.map(t => {
                return this._formItem(t)
            }),
            footer: btn ? this._btn(
                Object.assign(btn, {
                    fields
                })
            ) : ""
        })
        // el = el ? document.querySelector(el) : document.body
        // el.appendChild(form)
        _appendTo(el, form)
        return form
    }

    _panel(options) {
        let {
            title,
            body,
            footer
        } = options

        let id = _random()
        let panel = this._div({
            class: 'panel',
            id
        })

        let panelHeader = this._div({
            class: "panel_header",
            text: title
        })

        let panelBody = this._div({
            class: 'panel_body'
        })

        let panelFooter = this._div({
            class: "panel_footer"
        });

        if (Array.isArray(body)) {
            body.forEach(t => {
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

    _div(options) {
        let div = _createEle("div", Object.assign(options, {
            innerText: options["text"]
        }))
        return div
    }


    _btn({
        click,
        text,
        form,
        name,
        fields
    }) {
        let btn = _createEle("button", {
            type: "button",
            form,
            name,
            innerText: text
        })

        btn.onclick = (e) => {
            // let form = e.target.getAttribute("form")

            let form = _closest(e.target, ".panel").id

            console.log(fields)
            let bizModel = {}
            if (fields) {
                fields.forEach(t => {
                    bizModel[t.key] = _query("[name='" + t.key + "']", form).value
                })
            }



            let inputs = _queryAll("[name='input']", form)
            let output = _query("[name='output']", form)
            let fn = _query("[name='function']", form)


            // let inputs = document.querySelectorAll(form + " [name='input']")
            // let output = document.querySelector(form + " [name='output']")
            // let fn = document.querySelector(form + " [name='function']") //textarea
            let values = []
            inputs.forEach(t => {
                values.push(JSON.parse(t.value))
            })
            let result = ""
            switch (name) {
                case "submit":
                    click(bizModel)

                    _query("#" + form).appendChild(_div({
                        text: JSON.stringify(bizModel)
                    }))
                   break;
                case "to_form":
                    click(JSON.parse(output.value));
                    // result = JSON.stringify(click(JSON.parse(output.value)))
                    break;

                default:

                    if (fn) {
                        try {
                            let e_str = "(" + fn.value + ")(...values)"
                            result = JSON.stringify(eval(e_str))
                        } catch (e) {
                            result = e
                        }

                    } else {
                        result = JSON.stringify(click(...values))

                    }


                    if (output) {
                        output.value = result
                    }


            }
        }
        return btn
    }


    _input(options) {
        let {
            id,
            value
        } = options
        let input = _createEle("input", Object.assign(options, {
            type: 'text',
            id,
            value: JSON.stringify(value)
        }))
        return input
    }

    _textarea(options) {
        let {
            id,
            value,
            text
        } = options
        return _createEle("textarea",
            Object.assign(options, {
                id,
                innerHTML: text,
                value: JSON.stringify(value)
            })
        )
    }

    _trueorfalse(options) {
        let {
            value
        } = options
        let select = _createEle("select", options);

        [{
            label: "true",
            value: true
        }, {
            label: "false",
            value: false
        }].forEach(t => {
            let opt = new Option(t.label, t.value);
            select.options.add(opt);
        })
        return select

    }

    _formItem(field, form) {
        let {
            label,
            key,
            value,
            type,
            btn
        } = field
        let formItem = _div({
            class: "form-item"
        })
        let labelDiv = _div({
            class: "form-item-label",
            text: label
        })

        formItem.appendChild(labelDiv)

        switch (type) {
            case "textarea":
                let textarea = _textarea(Object.assign({
                    class: 'form-item-textarea',
                    value,
                    name: key
                }, field))
                formItem.appendChild(textarea)
                break;
            case "trueorfalse":
                let div = _trueorfalse(Object.assign({
                    class: 'form-item-select',
                    name: key
                }, field))
                formItem.appendChild(div)
                break;
            default:
                let input = _input({
                    class: 'form-item-input',
                    value,
                    name: key
                })
                formItem.appendChild(input)
        }
        if (btn) {
            formItem.appendChild(_btn(Object.assign(btn, {
                form
            })))
        }
        return formItem

    }

    _wrapper(options) {
        let {
            title,
            events,
            inputs
        } = options
        let fields = inputs.map(t => {
            console.log(typeof t)
            let type = "textarea"
            if (typeof t == "boolean") {
                type = "trueorfalse"
            }
            return {
                label: 'input',
                key: 'input',
                type,
                value: t
            }
        })

        fields.push({
            label: 'function',
            key: 'function',
            type: 'textarea',
            text: events[0], //onclick
            btn: {
                text: "exe",
                click: events[0],
                name: 'exe'
            }
        })
        fields.push({
            label: 'output',
            key: 'output',
            type: 'textarea',
            btn: {
                text: "toForm",
                click: events[1],
                name: 'to_form'
            }
        })
        return _form({
            el: "#wrapper",
            fields,
            // events,
            title
        })
    }

    _list(options) {
        let {
            el,
            fields
        } = options
        let table = _createEle("table")
        let tr = _createEle("tr")

        table.appendChild(tr)
        //header
        fields.forEach(t => {
            let th = _createEle("th", {
                innerText: t.label
            })
            tr.appendChild(th)
        })

        //mock 
        for (let i = 0; i < 10; i++) {
            let tr = _createEle("tr")
            fields.forEach(t => {
                let td = _createEle("td", {
                    innerText: _random()
                })
                tr.appendChild(td)
            })
            table.appendChild(tr)
        }

        let list = _panel({
            title: "List",
            body: table
        })

        _appendTo(el, list)
        return list
    }


}









// export {
//     _form,
//     _wrapper
// }