import Panel from "./Panel";
import {
    _type
} from "../utils"

export default class Form extends Panel {
    constructor(options) {
        super(options)
    }
    // 实现接口
    render() {
        let el = this.el ? this.el : this._div({
            id: "wrapper"
        })
        // let panel = this._query(".panel.ui", el)
        // let form = this.group ? this._group() : this._form()
        let form = this._panelWrap()
        el.appendChild(form)
        // if (panel) {
        //     el.replaceChild(form, panel)
        // } else {
        //     el.appendChild(form) //options
        // }
        this._appendTo(null, el)
        this.el = el
    }

    _panelWrap(options) {
        let {
            el,
            fields = [],
            btn,
            btns = [],
            title
        } = options || this
        let tools = this._tools(btns.length > 0 ? btns : btn, fields)


        let form = this._panel({
            title,
            class: 'ui',
            body: this.group ? this._group() : this._form(),
            // body: fields.map(t => {
            //     return this._formItem(t)
            // }),
            tools
        })
        this._appendTo(el, form)
        return form

    }
    // 表单
    _form(options) {
        let {
            fields = [],
        } = options || this

        let form = this._div({
            class: "form"
        })

        fields.forEach(t => {
            form.appendChild(this._formItem(t))
        })
        return form
    }

    // 按钮
    _tools(btns, fields) {
        let tools;
        if (Array.isArray(btns)) {
            tools = btns.map(t => {
                return this._btn(
                    Object.assign(t, {
                        fields
                    })
                )
            })
        } else {
            tools = btns ? this._btn(
                Object.assign(btns, {
                    fields
                })
            ) : ""
        }
        return tools

    }
    // 表单分组
    _group() {
        let {
            group
        } = this
        let formGroupWrap = this._div({
            class: "form-group-wrap"
        })
        group.forEach(t => {
            let formGroup = this._div({
                class: "form-group-item",
            })
            let formGroupItemTitle = this._div({
                class: "form-group-item-title",
                text: t.label
            })
            formGroup.appendChild(formGroupItemTitle)

            t.fields.map(t => {
                formGroup.appendChild(this._formItem(t))
            })

            formGroupWrap.appendChild(formGroup)

        })
        return formGroupWrap
    }

    // 表单单元
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

    // 按钮
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
            let dataModel = this._dataModel(fields, form)

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
                    click(dataModel)

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

    // 下拉选项
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

    // 输入框
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

    // 文本框
    _textarea(field) {
        return this._createEle("textarea",
            Object.assign(field, {
                innerHTML: text,
                value: value ? JSON.stringify(value) : ""
            })
        )
    }

    // 是否
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