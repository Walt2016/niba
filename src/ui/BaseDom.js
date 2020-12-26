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
    initEl() {
        // this.el = this._query(options.el)
        let root = this._div({
            id: "wrapper"
        })
        this._appendTo(this.el, root)
        this.el = root
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
        for (let key in data) {
            let child = data[key]
            if (_.type(child) === "object") {

                this.parseFields(child, options, labels, key)
            } else {
                let label = labels[key] ? labels[key] : key;
                let field = {
                    key: group ? [group, "$", key].join("") : key,
                    label,
                    value: data[key],
                    type: _.type(data[key])
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
                    }
                    else {
                        if (Array.isArray(options[key])) {
                            field.type = "select"
                            field.options = options[key]
                        }
                    }


                    this.fields[this.fields.length] = field
                    // 分组
                    this.groupFields(group || "global", field)
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
        groupFields(group, field) {
            let g = this.group.filter(t => t.label === group)
            if (g[0]) {
                g[0].fields.push(field)
            } else {
                this.group[this.group.length] = {
                    label: group,
                    fields: [field]
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
            if ("htmldivelement" === _.type(el)) {
                return el
            }
            return document.querySelector(el)
        }

        _queryAll(el, parent) {
            if (parent) {
                if (typeof parent === "string") {
                    if (parent.charAt(0).match(/[\#\.]/)) {
                        return document.querySelectorAll(parent + " " + el)
                    }
                    return document.querySelectorAll("#" + parent + " " + el)
                }
                // return document.querySelectorAll("#" + parent.id + " " + el)
                if (parent.id) {
                    return document.querySelectorAll("#" + parent.id + " " + el)
                } else {
                    parent.id = this._random()
                    return document.querySelectorAll("#" + parent.id + " " + el)
                }
            }
            return document.querySelectorAll(el)
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

        _appendTo(el, form) {
            el = el ? this._query(el) : document.body
            el.appendChild(form)
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
                        case "name":
                        case "innertext":
                        case "id":
                        case "innerhtml":
                        case "value":
                            ele[key] = options[key]
                            break;
                        case "click": // 点击事件
                            ele.addEventListener("click", options[key], false)
                            break;
                        case "input": // 输入事件
                            ele.oninput = options[key]
                            break;
                        case "options": // 下拉选项
                            options[key].forEach(t => {
                                let opt = new Option(t, t);
                                if (options.value === t) {
                                    opt.selected = true
                                }
                                ele[key].add(opt);
                            })
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
            return this._createEle("div", {
                ...options,
                innerText: options["text"]
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
        _toggle(el, cls) {
            if (el.length) {
                el.forEach(t => {
                    this._toggle(t, cls)
                })
            } else {
                if (this._hasClass(el, cls)) {
                    this._removeClass(el, cls)
                } else {
                    this._addClass(el, cls)
                }
            }
        }
        _get(field, form) {
            let formitem = this._query("[name='" + field.key + "']", form)
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
        _set(key, value) {
            let field = this.fields.filter(t => t.key === key)[0]
            if (field) {
                let formitem = this._query("[name='" + field.key + "']")
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
    }