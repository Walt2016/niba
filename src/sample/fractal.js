import {
    setup as setupCanvas,
    draw as drawCanvas,
} from './draw'
import {
    Branch
} from './fractal'


import Events from './events'
let {
    ctx,
    canvas,
    width,
    height
} = setupCanvas()


new Events({
    ctx,
    canvas
})

let branch = new Branch({
    o: [width / 2, height / 2],
    r: 100,
    n: 3,
    ctx,
    shrink: 0.5,
    level: 8,
    // angle: -45,
    a1:0,
    a2:360,
    shape: 'Polygon',
    alpha:0.5,
    showController:false,
    fill:true,
    colorful:true,
    color:"red"
})
console.log(branch)
// console.log(branch.test)


import UI from '../ui'

new UI.Form({
    data:branch,
    options:{
        shape:["Polygon","Ray","Arc","ArcTo","Ball","Circle"], //,"Rect"
        color:["red","blue","black","green","yellow","pink","gray","purple"]
    },
    title: "UI",
    btns: [{
        text: "draw",
        name: 'submit',
        click: (e) => {
            console.log(e)
            branch.update(e).clear().draw()
        }
    },{
        text: "anime",
        name: 'submit',
        click: (e) => {
            console.log(e)
            branch.anime()
        }
    }]
})
