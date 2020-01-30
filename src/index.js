import {
    draw as drawSvg,
    shape
} from './mysvg'
import {
    draw as drawCanvas
} from './mycanvas'

// function component() {
//     var element = document.createElement('div');
//     element.innerHTML = ['Hello', 'webpack'].join(" ")
//     return element;
// }

// document.body.appendChild(component());

// console.log(circle)
// draw('circle', {
//     color: 'blue',
//     lineColor: 'red',
//     lineWidth:10,
//     r:100
// })

// draw([{
//     shape:'circle',
//     color:'red'
// },{
//     shape:'text'
// },{
//     shape:'line'
// },{
//     shape:'rect',
//     width:100,
//     height:200,
// }],{
//     color:'pink'
// })

// circle(null,100)

let pic = [{
        shape: 'text',
        text: '美国队长',
        y:30
    }, {
        shape: 'circle',
        color: 'red',
        r: 200
    }, {
        shape: 'circle',
        color: 'white',
        r: 150
    }, {
        shape: 'circle',
        color: 'red',
        r: 100
    },
    // {
    //     shape: 'circle',
    //     color: 'blue',
    //     r: 50
    // },
    // {
    //     shape: 'rect',
    //     width: 100,
    //     height: 200,
    // }, 
    // {
    //     shape: 'polygon',
    //     r: 100,
    //     n: 10,
    //     style: 'fill:#cccccc;stroke:#000000;stroke-width:1;fill-rule:nonzero;'
    // },

    // shuffle,
    // neighborSwap,
    // intervalSort,
    // misplacedSort,
    , {
        shape: 'polygon',
        r: 50,
        n: 5,
        color: 'purple',
        sort:'paritySort'
        // style: 'fill:#cccccc;stroke:#000000;stroke-width:1;fill-rule:nonzero;'
    }
]

let opt = {
    color: 'pink',
    delay: 0
}

// [{
//     shape:'circle',
//     r:200,
//     color:'red'
// },{
//     shape:'circle',

//     r:100,
//     color:'blue'
// }]

drawCanvas(pic, opt)
drawSvg(pic, opt)
// document.body.appendChild()