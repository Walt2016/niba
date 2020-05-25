import Panel from "./Panel";
import {
    _type
} from "../utils"

export default class Form extends Panel {
    constructor(options) {
        super(options)
        // this.render()
    }
    // 实现接口
    render() {
        let el = this.el ? this.el : this._div({
            id: "wrapper"
        })
        let panel=this._query(".panel.ui",el)
        let form=this._form()
        if(panel){
            // el.removeChild(panel)
            el.replaceChild(form,panel)
        }else{
            el.appendChild(form) //options
        }
        
       
        this._appendTo(null, el)
        this.el = el
    }

    _form(options) {
        let {
            el,
            fields = [],
            click,
            events = [],
            btn,
            btns = [],
            title
        } = this

        let tools;
        if (btns.length > 0) {
            tools = btns.map(t => {
                return this._btn(
                    Object.assign(t, {
                        fields
                    })
                )
            })
        } else {
            tools = btn ? this._btn(
                Object.assign(btn, {
                    fields
                })
            ) : ""
        }


        let form = this._panel({
            title,
            class: 'ui',
            body: fields.map(t => {
                return this._formItem(t)
            }),
            tools
        })
        this._appendTo(el, form)
        return form
    }
    _formItem(field, form) {
        let {
            label,
            key,
            value,
            type,
            btn
        } = field
        let formItem = this._div({
            class: "form_item"
        })
        let labelDiv = this._div({
            class: "form_item_label",
            text: label
        })

        formItem.appendChild(labelDiv)

        switch (type) {
            case "textarea":
                let textarea = this._textarea(Object.assign({
                    class: 'form_item_textarea',
                    value,
                    name: key
                }, field))
                formItem.appendChild(textarea)
                break;
            case "trueorfalse":
            case "boolean":
                let div = this._trueorfalse(Object.assign({
                    class: 'form_item_select',
                    name: key
                }, field))
                formItem.appendChild(div)
                break;
            case "select":
                let select = this._select(Object.assign({
                    class: 'form_item_select',
                    value,
                    name: key
                }, field))
                formItem.appendChild(select)
                break
            default:
                let input = this._input({
                    class: 'form_item_input',
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

    _btn({
        click,
        text,
        form,
        name,
        fields
    }) {
        let btn = this._createEle("button", {
            type: "button",
            form,
            name,
            innerText: text
        })

        btn.onclick = (e) => {
            let form = this._closest(e.target, ".panel").id
            console.log(fields)
            let bizModel = {}
            if (fields) {
                fields.forEach(t => {
                    bizModel[t.key] = this._get(t, form)
                })
            }

            let inputs = this._queryAll("[name='input']", form)
            let output = this._query("[name='output']", form)
            let fn = this._query("[name='function']", form)

            let values = []
            inputs.forEach(t => {
                values.push(JSON.parse(t.value))
            })
            let result = ""
            switch (name) {
                case "submit":
                    click(bizModel)

                    break;
                case "to_form":
                    click(JSON.parse(output.value));
                    break;
                default:

                    if (fn) {
                        try {
                            let e_str = eval("(" + fn.value + ")(...values)")

                            result = e_str ? JSON.stringify(e_str) : ""
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

    _select(field) {
        let select = this._createEle("select", field);
        field.options.forEach(t => {
            let opt = new Option(t, t);
            if (field.value === t.value) {
                opt.selected = true
            }
            select.options.add(opt);
        })
        return select
    }

    _input(field) {
        let {
            value,
            type
        } = field

        switch (type) {
            case "array":
                value = value.join(",")
                break;
            case "object":
                value = JSON.stringify(value)
                break;
        }
        let input = this._createEle("input", Object.assign(field, {
            type: 'text',
            value
        }))
        return input
    }

    _textarea(field) {
        return this._createEle("textarea",
            Object.assign(field, {
                innerHTML: text,
                value: value ? JSON.stringify(value) : ""
            })
        )
    }

    _trueorfalse(field) {
        let checkbox = this._createEle("input",
            Object.assign(field, {
                type: "checkbox",
                checked: field.value ? true : undefined
            })
        );
        return checkbox
    }

}