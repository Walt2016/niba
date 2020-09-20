import Panel from "./Panel";


export default class List extends Panel{
    constructor(options){
        super(options)
        
    }
    render(){
        this.List=this._list()
    }
    _list(options) {
        let {
            el,
            fields
        } = options || this
        let table = this._createEle("table")
        let tr = this._createEle("tr")

        table.appendChild(tr)
        //header
        fields.forEach(t => {
            let th = this._createEle("th", {
                innerText: t.label
            })
            tr.appendChild(th)
        })

        //mock 
        for (let i = 0; i < 10; i++) {
            let tr = this._createEle("tr")
            fields.forEach(t => {
                let td = this._createEle("td", {
                    innerText: this._random()
                })
                tr.appendChild(td)
            })
            table.appendChild(tr)
        }

        let list = this._panel({
            title: "List",
            body: table
        })

        this._appendTo(el, list)
        return list
    }
}