// const figures = [{
//     shape: 'text',
//     text: 'hello 2020',
//     color: 'red',//'#000',
//     fontSize: '200px Verdana',
//     filter:'lattice',
//     y:200
//     // x:-300
//     // o:[0,0]
// }]

// export {
//     figures
// }

import {
    setup as setupCanvas,
    draw as drawCanvas
} from '../draw'

import {
    Text
} from '../entity'
import UI from '../ui'
import Events from '../events'
let {
    ctx,
    canvas,
    width,
    height
} = setupCanvas()

let text = new Text({
    ctx,
    pos:[width/2-100,height/2-50],
    // x: width/2-100,
    // y: height/2-50,
    width: 50,
    height: 100,
    text:'hello world',
    border:true,
    wrap:true,
    lineHeight:20,
    letterSpacing:0,
    fontSize:20
    // radius: 20,
    // fillColor:'red'
})

text.draw()

let ui=new UI.Form({
    data: text,
    options: {
        color: ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple"]
    },
    btns: [{
        text: "apply",
        name: 'submit',
        click: (e) => {
            console.log(e)
            text.reset().update(e).clear().draw()
        }
    }]
})
console.log(ui)