// import {
//     setup as setupSvg,
//     draw as drawSvg,
//     shape
// } from './mysvg'
import {
    setup as setupCanvas,
    draw as drawCanvas,
    lattice,
    clear,
    anime,
    animate
} from './draw'
// import {
//     figures
// } from './sample/text'

import {
    arcseg
} from './points'
import {
    Ball,
    Polygon,
    BaseEntity,
    Rect,
    FoldLine,
    Ray,
    Text,
    Arc
} from './entity'

import {
    _type,
} from './utils'

import {
    figures
} from './sample/5'

import {
    LineSeg,
    PlaneSeg,
    ArcSeg
} from './points'

import Colors from './colors'

import {
    Branch
} from './fractal'

import Grid from './coord/Grid'
import Events from './events'

let {
    ctx,
    canvas,
    width,
    height
} = setupCanvas()





// let {
//     points
// } = new ArcSeg({
//     o: [width / 2, height / 2],
//     r: 150,
//     n: 8
// })

// let {
//     points
// } = new LineSeg({
//     p1: [0, 0],
//     p2: [width, height],
//     n:3
// })


// layout
let {
    points
} = new PlaneSeg({
    p1: [10, 10],
    p2: [width - 100, height - 100],
    n: 2,
    random: true
})


let {
    colors
} = new Colors({
    color: 'colorful',
    n: 100
})
let entities = []
points.forEach((t, i) => {
    // entities[entities.length] = new Ball({
    //     o: t,
    //     r: 2,
    //     n: 5,
    //     // color:'red',
    //     color: colors[i % 10]

    //     // animate:'move2'
    // })

    // entities[entities.length] = new Text({
    //     o: t,
    //     text:"hhh"
    // })

    // entities[entities.length] = new Ray({
    //     o: t,
    //     r: 10,
    //     n: 5,
    //     animate:'roll'
    // })


    // entities[entities.length] = new FoldLine({

    //     p1:[100,100],
    //     p2:[300,300]
    //     // o: t,
    //     // r: 10,
    //     // n:5,
    //     // width,
    //     // height,
    //     // speed: 3,
    //     // animate: "move2,bounce" //,roll
    // })

    entities[entities.length] = new Polygon({
        o: t,
        r: 100,
        n: 3,
        width,
        height,
        speed: 3,
        // animate: "move2,bounce" //,roll
    })

    // entities[entities.length] = new Rect({
    //     o: t,
    //     a: 45,
    //     r: 20,
    //     n: 5,
    //     width,
    //     height,
    //     speed: 3,
    //     animate: "move2,bounce" //,roll
    // })
})

// drawCanvas(entities)


// animate(entities)

// new Grid({
//     ctx,
//     padding: 10
// })

// new Events({
//     ctx,
//     canvas
// })

import Axis from './coord/Axis'

// new Axis({ctx,canvas}){
import {
    ColorBalls
} from './entity'

let cb = new ColorBalls({
    o: [width / 2, height / 2],
    r: 100,
    n: 60
})
// cb.draw(ctx)

// animate([cb])
let branch = new Branch({
    // o: [width/3, height-100],
    o: [width / 2, height / 2],
    r: 100,
    n: 3,
    ctx,
    shrink: 0.5,
    level: 8,
    direction: -45,
    shape: 'Polygon'
})

import UI from './ui'

new UI.Form({
    el: "#wrapper",
    fields: [{
        "key": "o",
        "label": "center",
        value: [width / 2, height / 2],
    }, {
        "key": "r",
        "label": "radius",
        value: 100,
    }, {
        "key": "n",
        "label": "sides",
        value: 3,
    },
    {
        "key": "level",
        "label": "level",
        value: 8,
    },
    {
        "key": "shrink",
        "label": "shrink",
        value: 0.5,
    }],
    title: "Params",
    btn: {
        text: "draw",
        name: 'submit',
        click: (e) => {
            console.log(e)
            branch.update(e).clear().draw()
            // branch.draw()
        }
    }
})



// function component() {
//     var element = document.createElement('div');
//     element.innerHTML = ['Hello', 'webpack'].join(" ")
//     return element;
// }

// document.body.appendChild(component());

// console.log(figures)

// setupCanvas()
// drawCanvas(figures)
// anime(figures)

// import a from './sample/a'