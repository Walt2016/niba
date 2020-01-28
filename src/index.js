import {
    draw,
    circle
} from './mysvg'

// function component() {
//     var element = document.createElement('div');
//     element.innerHTML = ['Hello', 'webpack'].join(" ")
//     return element;
// }

// document.body.appendChild(component());

console.log(circle)
// draw('circle', {
//     color: 'blue',
//     lineColor: 'red',
//     lineWidth:10,
//     r:100
// })

draw([{
    shape:'circle',
    color:'red'
},{
    shape:'text'
},{
    shape:'line'
},{
    shape:'rect',
    width:100,
    height:200,
}],{
    color:'pink'
})
// document.body.appendChild()