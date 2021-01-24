import config from '../config'
let {
    env,
    center
} = config
let {
    width,
    height
} = env

import Polygon from '../entity/Polygon'
import UI from '../ui'
import Group from '../svg/group'
let dataModel = {
    // 图形  全局
    // global: {
    o: [width / 2, height / 2].map(t => +t.toFixed(2)),
    r: 100,
    n: 6,
    angle: 0,
    // fill: false,
    // color: "red",
    // 边
    edge: {
        show: true,
        text:{
            show:false,
            color:'red'
        }
        // lineWidth: 1,
        // color: 'red'
    }

   

}


let polygon = new Polygon(dataModel, "svg")
let options = Group._options(polygon)
// let tabs = Group._tabs()
let validated = Group.validated
let required = Group.required
// debugger
polygon.draw()
let ui = new UI.Form({
    el: "#params-container",
    data: polygon,
    options,
    group: true,
    // tabs,
    validated,
    required,
    btns: [{
            text: "apply",
            name: 'submit'
        },
        {
            text: 'reset',
            name: 'reset'
        }
    ]
})
console.log(ui)