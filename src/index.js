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


let pic = [{
        shape: 'text',
        text: '美国队长',
        y: 30
    }, {
        shape: 'circle',
        color: 'red',
        r: 200
    }, {
        shape: 'circle',
        color: 'white',
        r: 160
    }, {
        shape: 'circle',
        color: 'red',
        r: 120
    },
    {
        shape: 'circle',
        color: 'blue',
        r: 80
    }, {
        shape: 'polygon',
        r: 75,
        n: 5,
        color: 'white',
        sort: 'paritySort'
    }
]

let opt = {
    color: 'pink',
    delay: 0
}

drawCanvas(pic, opt)
drawSvg(pic, opt)