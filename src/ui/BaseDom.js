import _ from '../utils/index'
export default class BaseDom {
    constructor(options) {
        Object.assign(this, {
            labels: {
                o: 'center',
                r: 'radius',
                n: 'edge'
            }
        }, options)
        this.initEl()
        this.setData(options.data)
        console.log(this)
    }
    // 初始化el
    initEl() {
        let container = this._query(this.el) || document.body
        let el = this._div({
            id: "wrapper"
        })
        this._appendTo(container, el)
        this.el = el
    }
    // 渲染接口
    render() {}
    setData(data) {
        // 解析字段
        this.parser(data)
        // 渲染
        this.render()
    }
    // 解析
    parser(data = this.data) {
        if (_.type(data) === "object") {
            this.fields = []
            this.group = []
            // this.fields = 
            this.parseFields(data, this.options, this.labels)

            // if (this.group) {
            //     this.group = this.groupFieldsByConfig(this.group, this.fields)
            // }
        }
    }
    // 入参转换 dataModel 数据 options 参数  labels参数字典
    parseFields(data = {}, options = {}, labels = {}, group) {
        // let fields = []
        // debugger
        for (let key in data) {
            let child = data[key]
            if (_.type(child) === "object") { // 子对象分成一组
                this.parseFields(child, options, labels, key)
            } else {
                let label = labels[key] ? labels[key] : key;
                let field = {
                    name: key,
                    key: group ? [group, "$", key].join("") : key,
                    label,
                    value: data[key],
                    type: _.type(data[key]),
                }
                // 必填项
                let required = this.required.includes(field.key)
                if (required) {
                    Object.assign(field, {
                        required
                    })
                }
                // 格式校验
                let validated = this.validated[field.key]
                if (validated) {
                    Object.assign(field, {
                        validated
                    })
                }

                // if (options[key]) {
                //     field = {
                //         key: group ? _.camelCase(group, key) : key,
                //         label,
                //         value: data[key],
                //         type: "select",
                //         options: options[key]
                //     }
                // } else {
                //     field = {
                //         key: group ? _.camelCase(group, key) : key,
                //         label,
                //         value: data[key],
                //         type: _.type(data[key])
                //     }
                // }
                // debugger
                if (group) {
                    if (_.type(options[group]) === "object" && Array.isArray((options[group][key])) || Array.isArray(options[key])) {
                        field.type = "select"
                        field.options = options[group] ? options[group][key] : options[key]
                    }
                } else {
                    if (Array.isArray(options[key])) {
                        field.type = "select"
                        field.options = options[key]
                    }
                }


                this.fields[this.fields.length] = field
                let status = false
                if (key === "show" || key === "use") {
                    status = field.value
                }
                // 分组
                this.groupFields(group || "global", field, status)
                // if (group) {
                //     let g = this.group.filter(t => t.label === group)
                //     if (g[0]) {
                //         g[0].fields.push(field)
                //     } else {
                //         this.group[this.group.length] = {
                //             label: group,
                //             fields: [field]
                //         }
                //     }
                // }
            }

        }
        // return this.fields
    }
    // 字段分组
    groupFields(group, field, status) {
        let g = this.group.filter(t => t.label === group)
        if (g[0]) {
            g[0].fields.push(field)
            if (status) g[0].status = true
        } else {
            this.group[this.group.length] = {
                label: group,
                fields: [field],
                status
            }
        }
    }
    // 字段分组
    groupFieldsByConfig(group, fields) {
        return group.map(item => {
            for (let key in item) {
                return {
                    label: key,
                    fields: item[key].map(t => {
                        let field = fields.filter(f => f.key.toLocaleLowerCase() === t.toLocaleLowerCase())[0]
                        // 显示去掉分组前缀
                        let label = field.label.replace(new RegExp(key + "(\\w+)", 'i'), '$1')
                        return {
                            ...field,
                            label
                        }
                    })
                }
            }
        })
    }

    // 数据模型
    _dataModel(fields = this.fields, form = this.form) {
        let model = {}
        if (fields) {
            fields.forEach(t => {
                let val = this._get(t, form)
                // 分组
                let arr = t.key.split("$")
                if (arr.length === 2) {
                    let group = arr[0]
                    let child = model[group]
                    if (_.type(child) === "object") {
                        child[arr[1]] = val
                    } else {
                        model[group] = {}
                        model[group][arr[1]] = val
                    }
                } else {
                    model[t.key] = val
                }

            })
        }
        // debugger
        return model
    }

    // 随机数
    _random() {
        return "_" + Math.random().toString(16).slice(2)
    }
    // 查询简易
    $(el, parent) {
        return this._query(el, parent)
    }
    // 查询
    _query(el, parent) {
        if (parent) {
            if (typeof parent === "string") {
                if (parent.charAt(0).match(/[\#\.]/)) {
                    return document.querySelector(parent + " " + el)
                }
                return document.querySelector("#" + parent + " " + el)
            }
            // return document.querySelector("#" + parent.id + " " + el)
            if (parent.id) {
                return document.querySelector("#" + parent.id + " " + el)
            } else {
                parent.id = this._random()
                return document.querySelector("#" + parent.id + " " + el)
            }
        }
        return this.isDom(el) ? el : document.querySelector(el)
        // if ("htmldivelement" === _.type(el)) {
        //     return el
        // }
        // return document.querySelector(el)
    }

    _queryAll(el, parent) {
        let id = el
        if (parent) {
            if (typeof parent === "string") {
                if (parent.charAt(0).match(/[\#\.]/)) {
                    id = parent + " " + el
                } else {
                    id = "#" + parent + " " + el
                }
            } else if (this.isDom(parent)) {
                if (parent.id) {
                    id = "#" + parent.id + " " + el
                } else {
                    parent.id = this._random()
                    id = "#" + parent.id + " " + el
                }
            }
        }
        return Array.from(document.querySelectorAll(id))
    }

    //上溯
    _closest(el, cls) {
        if (!el.parentNode) { //document  ie8不支持parentNode
            return null
        } else if (cls.charAt(0) === "." && el.className.split(" ").indexOf(cls.substring(1)) >= 0) {
            return el;
        } else if (cls.charAt(0) === "#" && el.id.toLowerCase() === cls.substring(1).toLowerCase()) {
            return el;
        } else if (el.tagName.toLowerCase() === cls.toLowerCase()) {
            return el
        } else {
            return this._closest(el.parentNode, cls)
        }
    }

    _appendTo(el, child, props) {
        // el = el ? this._query(el) : document.body
        if (Array.isArray(child)) {
            child.forEach(t => this._appendTo(el, t, props))
        } else if (child) {
            props && this._attr(child, props)
            el.appendChild(child)
        }
        return el
    }
    // 创建Dom
    _createEle(tag, options, parent) {
        let ele = document.createElement(tag)
        for (let key in options) {
            if (options[key] !== undefined) {
                switch (key.toLocaleLowerCase()) {
                    case "class":
                        ele.className = options[key]
                        break;
                        // case "name":
                    case "id":
                        ele[key] = options[key]
                        break;
                    case "innertext":
                    case "innerhtml":
                        if (['div'].includes(tag)) {
                            ele[key] = options[key]
                        } else {
                            ele.setAttribute(key, options[key])
                        }
                        break;
                    case "value":
                        if (['input', 'option'].includes(tag)) {
                            ele[key] = options[key]
                        } else {
                            ele.setAttribute(key, options[key])
                        }
                        break;
                    case "click": // 点击事件
                        ele.addEventListener("click", options[key], false)
                        break;
                    case "focus":
                        ele.addEventListener("focus", options[key], false)
                        break;
                    case "blur":
                        ele.addEventListener("blur", options[key], false)
                        break;
                    case "change":
                        ele.addEventListener("change", options[key], false)
                        break;
                    case "onchange":
                        ele.onchange = options[key]
                        break;
                    case "input": // 输入事件
                        ele.oninput = options[key]
                        break;
                    case "options": // 下拉选项
                        if (tag === "select") {
                            options[key].forEach(t => {
                                let opt = new Option(t, t);
                                if (options.value === t) {
                                    opt.selected = true
                                }
                                ele[key].add(opt);
                            })
                        }
                        break
                    case "children":
                    case "slot":
                        ele.appendChild(options[key])
                        break
                    default:
                        ele.setAttribute(key, options[key])
                        break;

                }
            }
        }
        parent && parent.appendChild(ele)
        return ele
    }

    _div(options, parent) {
        let innerText = options["innerText"] || options["text"]
        return this._createEle("div", {
            ...options,
            innerText
        }, parent)
    }

    _icon(options, parent) {
        return this._createEle("i", {
            ...options,
            class: 'icon ' + options.class
        }, parent)
    }

    //允许一次加多个样式
    //去重
    _addClass(el, cls) {
        if (Array.isArray(el)) {
            el.forEach(t => {
                this._addClass(t, cls)
            })
            return el
        }
        var arr1 = el.className.split(" ")
        var arr2 = cls.split(" ")
        var obj = {}
        arr1.forEach(t => {
            obj[t] = 1
        })
        arr2.forEach(t => {
            obj[t] = 1
        })
        var keys = []
        for (var key in obj) {
            keys.push(key)
        }
        el.className = keys.join(" ")
        return el;
    }
    _removeClass(el, cls) {
        if (Array.isArray(el)) {
            el.forEach(t => {
                this._removeClass(t, cls)
            })
            return el
        }
        var arr1 = el.className.split(" ")
        var arr2 = cls.split(" ")
        var obj = {}
        arr1.forEach(t => {
            if (arr2.indexOf(t) === -1) {
                obj[t] = 1
            }
        })
        var keys = []
        for (var key in obj) {
            keys.push(key)
        }
        el.className = keys.join(" ")
        return el;
    }
    _hasClass(el, cls) {
        var arr = el.className.split(" ")
        return arr.indexOf(cls) >= 0
    }
    _toggle(el, cls, codition) {
        if (Array.isArray(el)) {
            el.forEach(t => {
                this._toggle(t, cls, codition)
            })
        } else {
            if (_.type(cls) === "string") {
                if (codition !== undefined) {
                    this[codition ? '_addClass' : '_removeClass'](el, cls)
                } else {
                    this[!this._hasClass(el, cls) ? '_addClass' : '_removeClass'](el, cls)
                }
            } else if (_.type(cls) === "function") {
                cls(el, codition)
            }
        }
    }
    _getFormItem(field, form) {
        let key = field.key
        let formitem = this._query("[key='" + key + "']", form)
        return formitem
    }
    _getField(el) {
        let key;
        if (this.isDom(el)) {
            key = el.getAttribute('key');
            return this.fields.find(t => t.key === key)
        } else if (_.type(el) === "string") {
            key = el
            return this.fields.find(t => t.key === key)
        }
    }
    // get value
    _get(field, form) {
        // if (this.isDom(field)) {
        //     return this._attr(field, "value")
        // }
        let formitem = this._getFormItem(field, form)
        if (formitem) {
            let value = formitem.value
            switch (field.type) {
                case "number":
                    return Number(value)
                    break;
                case "object":
                    return JSON.parse(value)
                    break;
                case "array":
                    if (/\[.*?\]/.test(value)) {
                        return JSON.parse(value)
                    } else {
                        return value.split(",").map(t => +t)
                    }

                    break;
                case "boolean":
                    return formitem.checked
                    break;
                case "select":
                default:
                    return value
            }
        }

    }
    // set value
    _set(key, value) {
        let field = this.fields.find(t => t.key === key)
        if (field) {
            let formitem = this._getFormItem(field, form)
            switch (field.type) {
                case "number":
                    formitem.value = Number(value)
                    break;
                case "object":
                    formitem.value = JSON.parse(value)
                    break;
                case "array":
                    if (/\[.*?\]/.test(value)) {
                        formitem.value = JSON.parse(value)
                    } else {
                        formitem.value = value.join(",")
                    }

                    break;
                case "boolean":
                    formitem.value = formitem.checked
                    break;
                case "select":
                default:
                    formitem.value = value
                    break;
            }
        }
    }
    // get or set attribute
    _attr(el, pops, val) {
        if (_.type(pops) === "object") {
            Object.keys(pops).forEach(t => el.setAttribute(t, pops[t]))
        } else if (_.type(pops) === "string") {
            if (val) {
                el.setAttribute(pops, val)
            }
            return el.getAttribute(pops)
        }
    }
    // 样式
    _css(el, pops) {
        if (_.type(pops) === "object") {
            let css = Object.keys(pops).map(t => `${t}:${pops[t]}`).join(";")
            el.setAttribute("style", css)
        }
    }
    // 兄弟节点
    _siblings(el) {
        return Array.from(el.parentNode.children)
    }
    // 菜单actived
    _actived(el) {
        this._removeClass(this._siblings(el), 'actived')
        this._addClass(el, 'actived')
    }
    // 隐藏
    _hide(el) {
        this._removeClass(el, 'show')
    }
    // 显示
    _show(el) {
        this._addClass(el, 'show')
    }
    // 判断是dom节点
    // "htmldivelement" === _.type(el)
    isDom(el) {
        return (typeof HTMLElement === 'function') ? (el instanceof HTMLElement) : (el && (typeof el === 'object') && (el.nodeType === 1) && (typeof el.nodeName === 'string'));
    }
    // 校验
    _validate(el) {
        let callback = (el) => {
            let field = this._getField(el)
            this._checkRequired(el, field)
            let validated = field.validated

            if (validated) {
                let value = el.value
                validated.max && this._tips(el, field, +value > validated.max, validated.message)
                validated.min && this._tips(el, field, +value < validated.min, validated.message)
                validated.format && this._tips(el, field, !validated.format.test(value), validated.message)
            }
        }
        if (el) {
            callback(el)
        } else {
            // 全量检查
            this.fields.forEach(t => {
                let el = this._getFormItem(t)
                callback(el)
                // t.validated && this._toggle(el, callback, el.value === "")
            })
        }
    }

    // 提示
    _tips(el, field, condition, message) {
        let formItem = this._closest(el, ".form-item")
        let tips = this._query(".tips", formItem) || this._div({
            class: 'tips'
        }, formItem)
        if (condition) {
            this._addClass(el, 'required')
            let style = window.getComputedStyle(el)
            let {
                width,
                height
            } = style
            let offset = parseInt(width) + 40
            let {
                offsetLeft,
                offsetTop
            } = el
            this._show(tips)
            this._css(tips, {
                left: (offsetLeft - offset) + 'px',
                top: (offsetTop) + 'px',
                width: offset + 'px',
                height
            })
            // let field = this._getField(el)
            tips.innerText = message && message.replace(/({\d})/, (_, m) => {
                return field.label
            }) || `${field.label}值不能为空`
            // tips.innerText = `${field.label}值不能为空`

        } else {
            this._removeClass(el, 'required')
            this._hide(tips)
        }
    }

    // 判断是否为空
    _checkRequired(el, field) {
        let callback = (el, condition) => {
            this._tips(el, field, condition)
        }
        if (el) {
            // let field = this._getField(el)
            // 判断空 校验
            field.required && this._toggle(el, callback, el.value === "")
        } else {
            // 全量检查
            this.fields.forEach(t => {
                let el = this._getFormItem(t)
                t.required && this._toggle(el, callback, el.value === "")
            })
        }
    }
    // 阻止冒泡
    _stopProp(e) {
        // var e = (evt) ? evt : window.event;
        if (window.event) {
            e.cancelBubble = true; // ie下阻止冒泡
        } else {
            //e.preventDefault();
            e.stopPropagation(); // 其它浏览器下阻止冒泡
        }
    }
}