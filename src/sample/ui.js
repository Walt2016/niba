
import UI from './ui'

new UI.Form({
    // input:branch
    fields: branch,
    options:{
        shape:["Polygon","Ray","Arc","Ball"]
    },
    
    // [{
    //     "key": "o",
    //     "label": "center",
    //     value: [width / 2, height / 2],
    // }, {
    //     "key": "r",
    //     "label": "radius",
    //     value: 100,
    // }, {
    //     "key": "n",
    //     "label": "sides",
    //     value: 3,
    // },
    // {
    //     "key": "level",
    //     "label": "level",
    //     value: 8,
    // },
    // {
    //     "key": "shrink",
    //     "label": "shrink",
    //     value: 0.5,
    // }],
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